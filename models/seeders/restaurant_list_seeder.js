const mongoose = require('mongoose')
const restaurantListData = require('../restaurantListData')

mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection



db.on('error', () => { console.log(error) })
db.once('open', () => {
  console.log('connection success')
  /*
  for (let i = 0; i <= 8; i++) {
    restaurantListData.create({})
  }

  const restaurant = require('restaurant')
console.log(restaurant)
  */
})


