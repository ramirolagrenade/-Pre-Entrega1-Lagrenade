import fs from "fs"

export default class ProductManager{

    constructor(){
        this.path = './file/products.json'
    }

    getProducts = async () => {

        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(data)
            return products
        }
        else {
            return []
        }
    }

    validarDatos(productos) {
        if (productos.thumbnail === undefined) {
            productos.thumbnail === '???'
        }
        let verificacion = Object.values(productos)
        if (!verificacion.includes(undefined)) {
            if (productos.thumbnail === '???') {
                productos.thumbnail === undefined
            }
            return true
        }
        else {
            return false
        }
    }

    addProduct = async (newProduct) => {

        let products = await this.getProducts()

        let idProducto = products.length

        let productos = {
            title: newProduct.title,
            description: newProduct.description,
            code: newProduct.code,
            price: newProduct.price,
            status: true,
            stock: newProduct.stock,
            category: newProduct.category,
            thumbnail: newProduct.thumbnail,
            id: idProducto + 1
        }

        if (this.validarDatos(productos)) {

            let producto_code = productos.code

            let producto = products.find(producto => producto.code === producto_code)

            if (!producto) {

                products.push(productos)

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

                return 'Producto Creado.'

            } else {
                return res.status(400).send({
                    status: "error",
                    error: "Codigo ya registrado."
                })
            }

        }
        else {
            return res.status(400).send({
                status: "error",
                error: "Valores Incompletos."
            })
        }

    }

    deleteProduct = async (id) => {
        try {
            let products = await this.getProducts()
            let productIndex = products.findIndex(p => p.id === id)
            if (productIndex === -1) return `Product with id: ${id} not found`
            let productDeleted = products.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            return productDeleted[0]
        } catch (error) {
            return error
        }
    }

    updateProduct = async (IdProducto, data) => {
        try {
            let products = await this.getProducts()

            let productIndex = products.findIndex(producto => producto.id === IdProducto)

            if (productIndex === -1) return error

            products.splice(productIndex, 1, { id: IdProducto, ...data })
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

            return products[productIndex]

        } catch (error) {
            return error
        }
    }
}