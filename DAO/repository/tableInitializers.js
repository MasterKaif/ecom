const CategoryRepository = require("./category.repository")
const productRepository = require("./product.repository")
const userRepository = require("./user.repository")

exports.initializeTables = (forceCreation) => {
    CategoryRepository.createCategoryTable(forceCreation),
    productRepository.createProductTable(forceCreation),
    userRepository.createUserTable(forceCreation)
}