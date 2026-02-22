const homeRoutes = require("../../routes/client/home.routes.js");
const blogRoutes = require("../../routes/client/blog.routes.js");
const tagRoutes = require("../../routes/client/tag.routes.js");
const settingMiddleware = require("../../middlewares/client/setting.middleware.js")

module.exports = (app) => {
    app.use(settingMiddleware.settingGeneral);

    app.use('/', homeRoutes)
    app.use('/posts', blogRoutes)
    app.use('/tags', tagRoutes)
}