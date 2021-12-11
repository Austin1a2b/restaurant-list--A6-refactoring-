const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nameEn: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  googleMap: String,
  rating: Number,
  description: String,
})

module.exports = mongoose.model('restaurantListData', restaurantSchema)