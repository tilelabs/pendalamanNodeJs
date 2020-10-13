import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileUpload      '

//consts database = require('.database)
import {initDatabase, initTable, insertProduct} from '.database.js'
import { getProduct } from './database'


const __dirname = path.resolve()

const app = express()
const db = initDatabase()
initTable(db)

app.set('views',__dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

//log incoming request
app.use(morgan('combined'))

//parse request body --utk membaca body
app.use(bodyParser.urlencoded())

//serve static  file
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res, next) => {
    res.send({success:true})
})

app.get('/product', (req, res, next) => {
    res.render('product')
})

//get product list
app.get('product', (req, res, next) =>{
    getProduct(db).then(product => {
        console.log('Product Result', product)
        res.render('product')
    }).catch(console.error();)
})

//handle form GET method
app.get('/add-product', (req, res, next) => {
    res.send(req.query)
})

//handle form POST method
app.get('/add-product', (req, res, next) => {
    console.log('Request', req.body)

    //insert product
    insertProduct(db, req.body.name, parseInt(req.body.price), '-')
    res.send(req.body)

    //redirect
    res.redirect('/product')
})



app.use((err, req, next) => {
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8000')
})