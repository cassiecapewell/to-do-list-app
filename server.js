const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'to-do-list'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response)=>{
  db.collection('to-do-list').find().toArray()
   .then(data => {
       db.collection('to-do-list').countDocuments({completed: false})
       .then(itemsLeft => {
           response.render('index.ejs', { info: data, left: itemsLeft })
       })
   })
   .catch(error => console.error(error))
})


app.post('/addItem', (request, response) => {
    db.collection('to-do-list').insertOne({itemName: request.body.itemName, completed: false})
    .then(result => {
        console.log('item added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('to-do-list').updateOne({itemName: request.body.itemName},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        // upsert: true
    })
    .then(result => {
        console.log('Marked as Complete')
        response.json('Marked as Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markIncomplete', (request, response) => {
    db.collection('to-do-list').updateOne({itemName: request.body.itemName},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        // upsert: true
    })
    .then(result => {
        console.log('Marked as Incomplete')
        response.json('Marked as Incomplete')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
    db.collection('to-do-list').deleteOne({itemName: request.body.itemName})
    .then(result => {
        console.log('item deleted')
        response.json('item deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
