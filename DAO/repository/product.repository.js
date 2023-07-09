const dbConnection = require("./dbConnection")
const defineProduct = require("../models/Product.model")
const defineCategory = require("../models/Category.model")

// create product table 
// add product 
// select product by id
// select product by criteria
// select all product 
// select product by category id
// delete product by id
// update product

// id, name, description, image, price, category_id

const Product = defineProduct(dbConnection.connection, dbConnection.Datatypes)

const createProductTable = async(froceCreation) => {
    const category = defineCategory(dbConnection.connection, dbConnection.Datatypes)
    Product.belongsTo(category, {
        foreignKey: "categoryId",
        targetKey: "id"
    });
    await Product.sync({force: froceCreation})
}

const createProduct = async(product) => {
    return await Product.create({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        categoryId: product.categoryId
    })
}

const fetchProductById = async(id) => {
    return await Product.findByPk(id)
}

const fetchProductByCriteria = async(criteria) => {
    return await Product.findAll(criteria)
}

const fetchAllProducts = async() => {
    return await Product.findAll();
}

// const fetchProductByCategoryId = async(categoryId) => {
//     return await Product.findAll({
//         where: {
//             categoryId: categoryId
//         }
//     })
// }  

// const fetchProductByName = async(name) => {
//     return await Product.findOne({
//         where: {
//             name: name
//         }
//     })
// }

const createMultipleProducts = async(products) => {
    return await Product.bulkCreate(products)
}

// const deletProduct = async(id) => {
//     const product = await Product.findByPk(pk)
//     await Product.destroy({
//         where:{
//             id: id
//         }
//     })
//     return product
// }

module.exports = {
    Product: Product,
    createProductTable: createProductTable,
    createProduct: createProduct,
    fetchProductById: fetchProductById,
    // fetchProductByName: fetchProductByName,
    fetchProductByCriteria: fetchProductByCriteria,
    fetchAllProducts: fetchAllProducts,
    // fetchProductByCategoryId: fetchProductByCategoryId,
    createMultipleProducts: createMultipleProducts,
    // deletProduct: deletProduct
}