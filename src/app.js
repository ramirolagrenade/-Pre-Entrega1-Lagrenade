import express from "express"
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const PORT = 8080

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.listen( PORT, () =>{
    console.log('Servidor Funcionando '+ PORT)
})

app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)