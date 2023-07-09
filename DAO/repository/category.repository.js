const dbconnection = require("./dbConnection")
const defineCategory = require("../models/Category.model")
const connection = require("./dbConnection")
//create row
//select row
//update row
//delete row
//select all 

const Category = defineCategory(dbconnection.connection, dbconnection.Datatypes);

//Create Category Tabel
const createCategoryTable = async (forceCreation) => {
    await Category.sync({force: forceCreation})
}

//create row

const save = async (category) => {
    return await Category.create({
        name: category.name,
        description: category.description
    });
}

//select row by id
const fetchCategoryById = async (id) => {
    return await Category.findByPk(id);
}

//find row by name
const fetchCategoryByCriteria = async (criteria) => {
    return await Category.findAll(criteria)
}

//find all
const fetchAllCategories = async () => {
    return await Category.findAll()
}

//update diescription by id
// const modifyCategoryDescriptionById = async (id, description) => {
//     await Category.update({
//         description: description
//     }, {
//         where: {
//             id: id
//         }
//     })
// }

//update name by id
// const modifyCategoryNameById = async (id, name) => {
//     await Category.update({
//         name: name
//     }, {
//         where: {
//             id: id
//         }
//     })
// }

//delete row by id
const deleteCategory = async (id) => {
    const category = await Category.findByPk(id)
    await Category.destroy({
        where: {
            id: id
        }
    })
    
    return category;
}

module.exports = {
    createCategoryTable: createCategoryTable,
    createCategory: save,
    fetchCategoryByCriteria: fetchCategoryByCriteria,
    fetchCategoryById: fetchCategoryById,
    fetchAllCategories: fetchAllCategories,
    // modifyCategoryDescriptionById: modifyCategoryDescriptionById,
    // modifyCategoryNameById: modifyCategoryNameById,
    deleteCategory: deleteCategory
} 