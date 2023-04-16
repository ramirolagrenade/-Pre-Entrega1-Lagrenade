import { Router } from "express"
import ProductManager from "../manager/ProductManager.js"

const router = Router()

const productManager = new ProductManager('./../src/file/products.json')

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()

    const limit = req.query.limit

    if (!limit) {
        res.send({
            products
        })
    } else if (limit == 0) {
        res.status(400).send({
            status:'Error',
            error: 'Debe ingresar un numero mayor a 0.'
        })
    }
    else {
        let productos = 25

        for (let i = 0; i < limit; i++) {
            productos.push(products[i])
        }

        res.status(200).send({

            productos

        })
    }
})

router.get('/:pid', async (req, res) => {

    const products = await productManager.getProducts()

    const pid = req.params.pid

    let producto = products.find(produ => {
        return produ.id == pid
    })

    if (!producto) {
        return res.status(400).send({
            error: 'Producto no encontrado.'
        })
    }

    res.status(200).send({ producto })

})

router.post('/', async (req, res) => {
    const { title,description,code,price,stock,category,thumbnails } = req.body

    let nuevoProducto 

    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    }

    nuevoProducto = await productManager.addProduct(newProduct)

    if(nuevoProducto){
        res.status(200).send({
            status: 'success',
            nuevoProducto
        })
    }else{
        return res.status(400).send({
            status: "error",
            error: "Valores Incompletos."
        })
    }

})

router.put('/:pid',async (req, res) => {
    const pid = Number (req.params.pid)

    const data = req.body

    let comp = await productManager.updateProduct(pid,data)

    if (comp == false){
        res.status(400).send({
            status:'Error',
            error: 'El id o Propiedad son incorrecto.'
        })
    }
    else{
        res.status(200).send({
            status: 'success',
            msg: `El Producto con id: ${pid} ha sido Modificado.`
        })
    }

})

router.delete('/:pid', async (req, res) =>{
    const pid = req.params.pid

    let comp = productManager.deleteProduct(pid)

    if (comp == false){
        res.status(400).send({
            status:'Error',
            error: 'El id es incorrecto.'
        })
    }
    else{
        res.status(200).send({
            status: 'success',
            msg: `Producto con id: ${pid} Eliminado.`
        })
    }
})

export default router
