const express = require('express')
const router = express.Router()

const restaurantData = require('../../models/restaurantListData')

//搜尋功能 
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  restaurantData.find()
    .lean()
    .then((restaurantList) => {
      const searchResult = restaurantList.filter(restaurant => {
        return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      })
      res.render('index', { restaurantsList: searchResult })
    })
})

module.exports = router