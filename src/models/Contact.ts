import mongoose, { Schema } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Unread', 'Read', 'Replied'],
    default: 'Unread'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model is already defined to prevent overwriting during hot reloads
const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;