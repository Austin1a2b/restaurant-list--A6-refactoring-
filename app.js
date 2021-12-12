//設定加載模組
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()

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

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})