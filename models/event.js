const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const eventSchema = new Schema({
  title: { type: String, required: true },
  location: {
    type: String,
  },
  price: {
    type: String,
    enum: ['$0', '$5-$15', '$20-$45', '$50+']
  },
  image: {
    type: String,
  },
  cast: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  reviews: [reviewSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);