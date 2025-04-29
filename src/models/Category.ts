import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

export interface ICategory {
  name: string;
  description: string;
  slug: string;
  status: 'Active' | 'Inactive';
  icon?: string;
  navbarCategory: mongoose.Types.ObjectId;
  products: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    icon: { type: String },
    navbarCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'NavbarCategory', required: true },
    products: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from name
CategorySchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category; 