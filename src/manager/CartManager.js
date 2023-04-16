import fs from "fs"

export default class CartManager{

    constructor() {
        this.path = './src/files/products.json'
    }

    addProductInCart = async (cid, pid) => {
        const carritos = await this.getCarts()
        const carritoFiltrado = carritos.find((cart) => cart.id == cid )

        let productInCart = carritoFiltrado.products

        const productoIndex = productInCart.findIndex((prod) => prod.id == pid)

        if (productoIndex !== -1) {
            productInCart[productoIndex].quantity = productInCart[productoIndex].quantity + 1
        } else {
            let product = {
                id: pid,
                quantity: 1
            }
            productInCart.push(product)
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'))
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carritos = JSON.parse(data)
            return carritos
        } else {
            return []
        }
    }

    getCart = async (cid) => {
        const carritos = await this.getCarts()

        const carrito = carritos.find( (cart)=> cart.id == cid )

        return carrito
    }

    addCart = async () => {
        const carritos = await this.getCarts()

        let carrito = {
            products: []
        }

        if (carritos.length === 0) {
            carrito.id = 1
        } else {
            carrito.id = carritos[carritos.length - 1].id + 1
        }

        carritos.push(carrito)

        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'))
        return carrito
    }
}