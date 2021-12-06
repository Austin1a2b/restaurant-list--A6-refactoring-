const mongoose = require('mongoose')
const restaurantListData = require('../restaurantListData')

mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection

const restaurant = require('../../restaurant.json')
const simulationData = restaurant.results

db.on('error', () => { console.log(error) })

db.once('open', () => {
  console.log('connection success')
  simulationData.forEach(data => restaurantListData.create({
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    image: data.image,
    location: data.location,
    phone: data.phone,
    google_map: data.google_map,
    rating: data.rating,
    description: data.description,
  }))
})
