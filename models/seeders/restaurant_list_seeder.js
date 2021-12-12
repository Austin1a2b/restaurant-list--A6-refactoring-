const db = require('../../config/mongoose')

//提取  設定的 mongodb 格式
const restaurantListData = require('../restaurantListData')

//提取 json  檔案
const restaurant = require('../../restaurant.json')
const simulationData = restaurant.results

db.once('open', () => {
  simulationData.forEach(data => restaurantListData.create({
    name: data.name,
    nameEn: data.name_en,
    category: data.category,
    image: data.image,
    location: data.location,
    phone: data.phone,
    googleMap: data.google_map,
    rating: data.rating,
    description: data.description,
  }))
  console.log('done')
})
