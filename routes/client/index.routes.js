const homeRoutes = require("../../routes/client/home.routes.js");

module.exports = (app) => {
    app.use('/', homeRoutes)
}