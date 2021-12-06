const mongoose = ('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
})

module.exports = mongoose.model('restaurantListData', restaurantSchema)