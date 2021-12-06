//設定加載模組
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

//載入靜態檔案
app.use(express.static('public'))

//設定使用樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定 port
const port = 3000

//提取資料庫的內容 至js 中
const restaurantsList = require('./restaurant')

//index 頁面路由架構
app.get('/', (req, res) => {
  res.render('index', { restaurantsList: restaurantsList.results })
})

//show 頁面路由架構
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantsList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  res.render('index', { restaurantsList: restaurants, keyword: keyword })

})



app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})