const  categoryRepository = require("../DAO/repository/Category.repository")
const errorConstants = require("../constants/errorConstants");
const addCategory = (req, res) => {
    const body = req.body
    //name -> not null, description -> may or may not be null
    
    if(!body.name){
        res.status(400).send({
            message: "Name Cannot be empty"
        });
        return;
    }
    
    categoryRepository.createCategory({
        name: body.name,
        description: body.description
    }).then(result => {
        console.log(`Category Name: ${result.name} created successfully`);
        res.status(201).send(result);
    }).catch(error => {
        if(error.name === "SequelizeUniqueConstraintError"){
            console.log(error.errors[0]);
            res.status(400).send({
                message: `${body.name} already exsits`
            });
            return;
        }
        throw error;
    })
    .catch(error => {
        console.log(`Error in Creating category: ${body.name}. Error message: ${error.message}`)
        res.status(500).send({
            message: "Error in Creating category"
        })
    })
}

const fetchAllCategories = (req, res) => {
    categoryRepository.fetchAllCategories()
    .then(categories => {
        console.log("All categories fetched")
        res.status(200).send(categories);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send("Error in loading all categories, Please try again after somtimes")
    })
}

const fetchCategoryById = (req, res) => {
    const categoryId = req.params.categoryId;
    
    categoryRepository.fetchCategoryById(categoryId)
    .then(result => {
        if(!result){
            throw new Error(errorConstants.MISSING_CATEGORY)
            // res.status(404).send({
            //     "message": "The requested categoryId doesnot exists the system!"
            // });
            // return;
        }
        res.status(200).send(result)
        console.log(`category of id: ${categoryId} is ${result}`)
    })
    .catch(error => {
        if(error.message === errorConstants.MISSING_CATEGORY) {
            res.status(404).send({
                "message": "The requested categoryId doen't exsits in the system!"
            });
            return;
        }
        throw error;
    })
    .catch(error => {
        res.status(500).send({
            message: "Some Error occured in loading category from Database, Please try again after sometime"
        });

    })
}

const fetchCategoryByName = (req, res) => {
    categoryRepository.fetchCategoryByCriteria({
        where: {
            name: req.params.name
        }
    })
    .then(result => {
        if(!result){
            throw new Error(errorConstants.MISSING_CATEGORY)
        }
        res.status(200).send(result);
        console.log(result.dataValues)
    })
    .catch(error => {
        if(error.message === errorConstants.MISSING_CATEGORY) {
            res.status(404).send({
                "message": "The requested categoryId doen't exsits in the system!"
            });
            return;
        }
        throw error;
    })
    .catch(error => {
        res.status(500).send({
            "message": `Some Error Occured!, message:${error.message}`
        })
    })
}

// const deleteCategory = (req,res) => {
//     categoryId = req.params.id;
//     categoryRepository.deleteCategory(categoryId)
//     .then(result => {
//         res.status(200).send({
//             "category": result,
//             "message": "category deleted" 
//         })
//     }).catch(error => {
//         res.status(500).send({
//             "message": "Error!"
//         })
//     })
// }
module.exports = {
    addCategory: addCategory,
    fetchAllCategories: fetchAllCategories,
    fetchCategoryById: fetchCategoryById,
    fetchCategoryByName: fetchCategoryByName,
    // deleteCategory: deleteCategory
}