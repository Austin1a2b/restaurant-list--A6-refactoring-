//設定加載模組
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantData = require('./models/restaurantListData')

//載入靜態檔案
app.use(express.static('public'))
// 載入下一行 才能使用 , req.body.名稱
app.use(express.urlencoded({ extended: true }))

//設定使用樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定 port
const port = 3000

//設定 資料庫 
mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection
//連線狀態檢查
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('connection success') })


//提取資料庫的內容 至js 中 --後續要刪掉 
const restaurantsList = require('./restaurant')

//index 頁面路由架構  --資料來源 後續要改為 從資料庫取得 
app.get('/', (req, res) => {
  restaurantData.find()
    .lean()
    .then(restaurantsList => res.render('index', { restaurantsList: restaurantsList }))
    .catch(error => console.error(error))
})


/*
//show 頁面路由架構  --資料來源 後續要改為 從資料庫取得 
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//搜尋功能  --資料來源 後續要改為 從資料庫取得 
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantsList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  res.render('index', { restaurantsList: restaurants, keyword: keyword })
})

*/


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})