import mongoose from 'mongoose';

const NavbarCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  image: { type: String },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'NavbarCategory' },
  submenu: [{
    name: { type: String, required: true },
    link: { type: String, required: true }
  }]
},
{ timestamps: true }
);

// Pre-save hook to generate slug from title
NavbarCategorySchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug
  }
  next();
});

// Check if model is already compiled to prevent recompilation errors
const NavbarCategory = mongoose.models.NavbarCategory || 
                      mongoose.model('NavbarCategory', NavbarCategorySchema);

export default NavbarCategory;