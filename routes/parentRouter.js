//api endpoint for category  creates
// -> http://localhost:8000/category/create
// -> http://localhost:8000/category/{categoryid}
categoryRouter = require("./categoryRouter")
productRouter = require("./productRouter")
userRouter = require("./userRouter")

exports.createRoutes = (app) => {
    app.use("/categories", categoryRouter),
    app.use("/products", productRouter),
    app.use("/user", userRouter)
}