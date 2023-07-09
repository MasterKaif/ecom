// Product: Product,
//     createProductTable: createProductTable,
//     addProduct: addProduct,
//     fetchProductById: fetchProductById,
//     fetchProductByName: fetchProductByName,
//     fetchProductByCriteria: fetchProductByCriteria,
//     fetchAllProducts: fetchAllProducts,
//     fetchProductByCategoryId: fetchProductByCategoryId,
//     createMultipleProducts: createMultipleProducts,
//     deletProduct: deletProduct

// id, name, description, image, price, category_id

const productRepository = require("../DAO/repository/product.repository")
const errorConstants = require("../constants/errorConstants")
const { Op } = require("sequelize")
/*
SequelizeUniqueConstraintError -> product already exist
SequelizeForeignKeyConstraintError -> invalid category
*/
const addProduct = (req, res) => {
    const body = req.body
    console.log(body)

    if(!body.name || !body.categoryId){
        res.status(400).send({
            "message": "name or categoryId cannot be empty"
        })
    }

    productRepository.createProduct({
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        price: body.price,
        categoryId: body.categoryId
    })
    .then(result => {
        console.log(`Product: ${result.name} added`)
        res.status(200).send(result)
    })
    .catch(error => {
        if(error.name === errorConstants.UNIQUE_KEY_CONSTRAINT_ERROR){
            console.log(error.errors[0])
            res.status(400).send({
                "message": `Product: ${body.name} already exist`
            });
            return
        }
        throw error;

    })
    .catch(error => {
        if(error.name === errorConstants.FOREIGN_KEY_CONSTRAINT_ERROR){
            console.log(error.fields[0])
            res.status(400).send({
                "message": "Invalid Category Tryagain!!"
            })
            return;
        }
        throw error;
    })
    .catch(error => {
        console.log(`Error Occured in adding Product: ${body.name}, Error: ${error.message}`)
        res.status(500).send({
            "message": `Error Occured in adding Product: ${body.name}`
        })
    })
}

//1. product by Name
const fetchProductByName = (req, res) => {
    productRepository.fetchProductByCriteria({
        where: {
            name: req.params.name
        }
    })
    .then(result => {
        res.status(200).send(result)
    })
    .catch(error => {
        res.status(500).send({
            message: "Error in loading product from DB !!"
        })
    })
}

//2. product by categoryId
const fetchProductsByCategoryId = (req, res) => {
    let criteria 
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    if(minPrice && maxPrice){
        criteria = {
            where: {
                [Op.and]: [
                    {
                        categoryId: req.params.categoryId
                    },
                    {
                        price: {
                            [Op.between]: [minPrice, maxPrice]
                        }
                    }
                ]
            },
            order: [['price', 'ASC']]

        }
    } else {
        criteria = {
            where: {
                categoryId: req.params.categoryId
            }
        }
    }

    productRepository.fetchProductByCriteria(criteria)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(error => {
        console.log("Error")
        res.status(500).send({
            message: "Error in loading details"
        })
    })
}

const search = (req, res) => {
    const keyword = req.query.search;
    const keywords = keyword.split(" ");
    var likeKeywords = []

    for(let i=0; i<keywords.length; i++){
        likeKeywords[i] = {
            [Op.or]: [
                {
                    "name": {
                        [Op.like]: `%${keywords[i]}%`
                    }
                },
                {
                    "description": {
                        [Op.like]: `%${keywords[i]}%`
                    }
                }
            ]
        }
    }

    const criteria = {
        where: {
            [Op.or]: likeKeywords
        }
    }

    productRepository.fetchProductByCriteria(criteria)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(error => {
        res.status(500).send({
            error: error,
            message: "Error in loading data from DB !!"
        })
    })
}



module.exports = {
    addProduct: addProduct,
    fetchProductByName: fetchProductByName,
    fetchProductsByCategoryId: fetchProductsByCategoryId,
    search: search
}