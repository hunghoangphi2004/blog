const blogRoutes = require("./blog.routes");
const dashboardRoutes = require("./dashboard.routes");
const tagRoutes = require("./tag.routes")
const systemConfig = require("../../config/system");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/blogs", blogRoutes);
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/tags", tagRoutes);
}