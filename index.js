require("dotenv").config();
const express = require("express")
const app = express();
const port = 3000;
const database = require("./config/database");
const adminRoutes = require("./routes/admin/index.routes");
const clientRoutes = require("./routes/client/index.routes");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const path = require("path")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

// app.get("/",(req,res)=>{
//     res.send("OK");
// })

// App local variables
// const systemConfig = require("./config/system");
// app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.set("view engine", "ejs");
app.set("views", "./views")

app.use(express.static(`${__dirname}/public`))

app.use(expressLayouts);
app.set("layout", "layouts/default");

database.connectDB();

adminRoutes(app);
clientRoutes(app);

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use('/tom-select', express.static(
    path.join(__dirname, 'node_modules/tom-select/dist')
));

app.listen(port, ()=>{
    console.log(`Run on port ${port}`);
})


