exports.valdateAddOrUpdateCategroyRequest = (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Requestbody Cannnot be empty !!"
        })
    }
    if(!req.body.name){
        res.status(400).send({
            message: "Category name Cannot be empty !!"
        })
    }
    next()
}


exports.valdateAddOrUpdateProductRequest = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            message: "Request body Cannnot be empty !!"
        })
    }
    if(!req.body.name) {
        res.status(400).send({
            message: "Product name Cannot be empty !!"
        })
    }
    if(!req.body.categoryId) {
        res.status(400).send({
            message: "categoryId cannot be empty !!"
        })
    }
    if(typeof(req.body.categoryId) != "number") {
        res.status(400).send({
            message: "Invalid CategoryId !!"
        })
    }
    next()
}
