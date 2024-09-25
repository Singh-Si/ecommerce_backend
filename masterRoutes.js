const masterRoutes = (app)=>{
app.use("/api/v1/user",require("./app/modules/routes/user.routes"));
app.use("/api/v1/country",require("./app/modules/routes/country.routes"));
app.use("/api/v1/state",require("./app/modules/routes/state.routes"));
app.use("/api/v1/product",require("./app/modules/routes/product.routes"));
app.use("/api/v1/category",require("./app/modules/routes/category.routes"));
app.use("/api/v1/subCategory",require("./app/modules/routes/subCategory.routes"));


}

module.exports = masterRoutes