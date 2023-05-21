//DEPENDENCIAS
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
//RUTAS
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");

//CONEXION BD
const { sequelize } = require("./utils/database");


const PORT=process.env.PORT || 3000
const app = express();

//DEFINIENDO ARCHIVO PUBLICO
app.use(express.static(path.join(__dirname, "public")));


// EJS COMO MOTOR DE PLANTILLAS
app.set("view engine", "ejs");
app.set("views", "views");

//MIDELWARE
const { isAdmin } = require("./controllers/authenticate");
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));



//LLAMANDO RUTAS
app.use("/admin", isAdmin,adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404Error);


try {

	//PROBANDO CONEXION DE BD Y SERVER
	sequelize.sync().then(e => console.log("se sincronizó"))
	sequelize.authenticate()
	.then(resp => console.log('Conección con la BD exitosa'))

	app.listen(PORT);
	console.log(`Server is listening http://localhost:${PORT}`);

} catch (error) {
	console.log('No se pudo levantar el servidor');
}