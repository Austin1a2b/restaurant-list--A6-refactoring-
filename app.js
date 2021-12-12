//設定加載模組
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const restaurantData = require('./models/restaurantListData')

const routes = require('./routes')


//載入靜態檔案
app.use(express.static('public'))
// 載入下一行 , 後續才能使用 req.body.
app.use(express.urlencoded({ extended: true }))

//設定使用樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))
app.use(routes)

//設定 port
const port = 3000

const mongoose = require('mongoose')
//設定 資料庫 
mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection
//連線狀態檢查
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('connection success') })



//搜尋功能 
app.get('/search', (req, res) => {
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

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})