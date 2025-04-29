import mongoose, { Schema } from 'mongoose';

const NewsletterSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],  // lowercase values
    default: 'active'
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);