const express = require('express')
const router = express.Router()

const restaurantData = require('../../models/restaurantListData')
//index 頁面路由架構  
router.get('/', (req, res) => {
  restaurantData.find()
    .lean()
    .then(restaurantsList => res.render('index', { restaurantsList: restaurantsList }))
    .catch(error => console.error(error))
})

module.exports = router