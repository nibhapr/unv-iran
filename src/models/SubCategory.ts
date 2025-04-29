import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

export interface ISubCategory {
  title: string;
  description: string;
  slug: string;
  status: 'Active' | 'Inactive';
  image?: string;
  category: mongoose.Types.ObjectId;
  navbarCategory: mongoose.Types.ObjectId;
  products: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    navbarCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'NavbarCategory', required: true },
    products: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from title
SubCategorySchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const SubCategory = mongoose.models.SubCategory || mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);

export default SubCategory; 