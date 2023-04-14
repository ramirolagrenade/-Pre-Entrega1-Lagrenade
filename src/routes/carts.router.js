import { Router } from "express"
import CartManager from "../CartManager.js"

const router = Router()

const cartManager = new CartManager('../file/carts.json')

router.post('/', async (req, res) =>{
    let newCart = await cartManager.addCart()
    res.status(200).send({newCart})
})

router.get('/:cid', async (req, res) =>{
    const cid = req.params.cid
    let carts = await cartManager.getCart(cid)

    res.status(200).send({carts})
})

router.post('/:cid/product/:pid', async(req,res) =>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid

        const result = await cartManager.addProductInCart(cid,pid)

        res.status(200).send(result)
    }catch (error) {
        res.status(400).send({
            status:'Error',
            error:'Un id ingresado es incorrecto.'
        })
    }
})

export default router
