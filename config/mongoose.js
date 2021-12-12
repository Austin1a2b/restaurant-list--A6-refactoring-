const mongoose = require('mongoose')

//設定 資料庫 
mongoose.connect('mongodb://localhost/restaurant_list')

const db = mongoose.connection

//連線狀態檢查
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connection success')
})

module.exports = db