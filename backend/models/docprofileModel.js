import mongoose from 'mongoose';

const reviewdocSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const docprofileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    images: [String],
    doctor: {
      // type: mongoose.Schema.Types.ObjectId,
      type: mongoose.Types.ObjectId,

      ref: 'User',
      required: true,
    },
    experience: { type: String, required: true },
    fees: { type: Number, default: 0, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewdocSchema],
  },
  { timestamps: true }
);

const Docprofile = mongoose.model('Docprofile', docprofileSchema);

export default Docprofile;
