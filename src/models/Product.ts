import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

export interface IProduct {
  title: string;
  description: string;
  slug: string;
  price: number;
  stock: number;
  features: string[];
  mainImage: string;
  additionalImages: string[];
  navbarCategory: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  subcategory: mongoose.Types.ObjectId;
  status: 'Active' | 'Inactive' | 'Out of Stock' | 'Coming Soon';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    features: [{ type: String }],
    mainImage: { type: String, required: true },
    additionalImages: [{ type: String }],
    navbarCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'NavbarCategory', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    status: { 
      type: String, 
      enum: ['Active', 'Inactive', 'Out of Stock', 'Coming Soon'], 
      default: 'Active' 
    }
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from title
ProductSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema); 