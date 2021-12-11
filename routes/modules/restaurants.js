// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const restaurantData = require('../../models/restaurantListData')

// new 頁面- 新增一家餐廳
router.get('/new', (req, res) => {
  res.render('new',)
})

//接收new的表單內容 , 並儲存到資料庫
router.post('/', (req, res) => {
  const { name, nameEn, category, location, phone, rating, image, description, googleMap } = req.body
  return restaurantData.create({ name, nameEn, category, location, phone, rating, image, description, googleMap })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//show 頁面路由架構 
router.get('/show/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  restaurantData.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.error(error))
})

// edit頁面 路由架構 
router.get('/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  restaurantData.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.error(error))
})

//接收表單資料,更新資料庫內容,=> 餐廳詳細資料的網頁
router.put('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  const { name, nameEn, category, location, phone, rating, image, description, googleMap } = req.body
  return restaurantData.findById(restaurant_id)
    .then(restaurantdata => {
      restaurantdata.name = name
      restaurantdata.nameEn = nameEn
      restaurantdata.category = category
      restaurantdata.location = location
      restaurantdata.phone = phone
      restaurantdata.image = image
      restaurantdata.description = description
      restaurantdata.rating = rating
      restaurantdata.googleMap = googleMap
      return restaurantdata.save()
    })
    .then(() => res.redirect(`/restaurants/show/${restaurant_id}`))
    .catch(error => console.error(error))
})

//刪除功能
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantData.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router