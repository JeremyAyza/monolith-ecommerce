const { OrderItem, Order, User, Product } = require("../models");
const jwt = require('jsonwebtoken')

//PRODUCTOS
exports.getProducts = (req, res, next) => {

	Product.findAll()
		.then(products => {
			res.render("shop/product-list", {
				products: products,
				pageTitle: "Products",
				path: "/products",
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Error retrieving products' });
		});

};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;


	Product.findByPk(productId)
		.then(product => {
			if (!product) {
				res.status(404).redirect("/");
			}
			res.render("shop/product-detail", {
				product: product,
				path: "/products",
				pageTitle: product.title
			})

		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Error retrieving product' });
		});

};

//------------CART---------------------------
exports.getCart = async (req, res, next) => {
	let cart = { products: [] };
	if (req.cookies.cart) {
		cart = JSON.parse(req.cookies.cart);
	}

	await res.cookie('cart', JSON.stringify(cart));
	res.render("shop/cart", {
		pageTitle: "Carrito de compras ",
		path: "/cart",
		products: cart.products
	});

}

exports.postCart = async (req, res, next) => {

	let productId = req.body.productId;
	productId = parseInt(productId)

	Product.findByPk(productId)
		.then(product => {
			if (!product) {
				res.status(404).redirect("/");
			}

			const { id, title, price } = product

			let cart = { products: [] };

			if (req.cookies.cart) {
				cart = JSON.parse(req.cookies.cart);
			}
			const indexCoincidencia = cart.products.findIndex(p => p.id == productId);
			if (indexCoincidencia !== -1) {
				cart.products[indexCoincidencia].qty++
			}
			else {
				const registerProduct = {
					id,
					price,
					title,
					qty: 1
				}
				cart.products.push(registerProduct)
			}

			res.cookie('cart', JSON.stringify(cart));
			res.redirect("/cart");

		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Error retrieving product' });
		});

}

exports.postCartDeleteProduct = (req, res, next) => {
	const productId = parseInt(req.body.productId);
	cart = JSON.parse(req.cookies.cart);
	const deleteIndex = cart.products.findIndex(p => p.id == productId)
	cart.products.splice(deleteIndex, 1)


	res.cookie('cart', JSON.stringify(cart));
	res.redirect("/cart");



};

exports.updateCart = (req, res, next) => {

	const id = parseInt(req.body.productId);
	const qty = parseInt(req.body.qty);


	const cart = JSON.parse(req.cookies.cart);
	const index = cart.products.findIndex(p => p.id == id);
	if (index !== -1) {
		console.log(cart.products);
		const newQty = cart.products[index].qty + qty;
		if (newQty <= 0) {
			cart.products.splice(index, 1)
			cart.products
		} else {
			cart.products[index].qty = newQty
		}
		//disminuir el stock

		console.log('nuevo valor');
		console.log(cart.products);
		res.cookie('cart', JSON.stringify(cart));
	}
	res.redirect('/cart');
};

//------VENTAS-----------------------------------
exports.postOrder = async (req, res, next) => {
  console.log("POST ORDER");
  try {
    const userId = req?.user?.id;

    const { products } = JSON.parse(req.cookies.cart);
    const total = products.reduce((acc, { price, qty }) => acc + price * qty, 0);

    const { id: orderId } = await Order.create({ total, userId });

    for (let i = 0; i < products.length; i++) {
      const { id, price, qty } = products[i];
      const product = await Product.findByPk(id);
      const newStock = product.stock - qty;
      if (newStock < 0) {
        // No se puede vender porque no hay suficientes
        const cartProducts = products.map((product) => ({
          ...product,
          id: product.id.toString(), // Convertir el ID a string para que sea compatible con EJS
        }));
        return res.render("shop/cart", {
          pageTitle: "No hay suficiente stock, intenta de nuevo",
          path: "/cart",
          products: cartProducts,
        });
      } else {
        await updateProductStock(id, newStock);
        await createOrderItem(id, price, qty, orderId);
      }
    }

    // Limpiar carrito
    await res.cookie("cart", JSON.stringify({ products: [] }));
    res.redirect("/orders");
  } catch (error) {
    console.log("POST ORDER ERROR");
    console.log(error);
    res.status(500).render("error", {
      pageTitle: "Error al realizar la orden",
      path: "/error",
      errorMessage: "Ha ocurrido un error al procesar la orden.",
    });
  }
};

// Función para actualizar el stock del producto
async function updateProductStock(productId, newStock) {
  await Product.update({ stock: newStock }, { where: { id: productId } });
}

// Función para crear un nuevo ítem de orden
async function createOrderItem(productId, price, qty, orderId) {
  await OrderItem.create({
    productId,
    price,
    qty,
    subtotal: qty * price,
    orderId,
  });
}


exports.getOrders = async (req, res, next) => {

	const userId = req.user.id
	try {
		const orders = await Order.findAll({
			where: { userId },
			include: [
				{
					model: OrderItem,
					include: [
						{
							model: Product,
							attributes: ['title']
						}
					]
				}
			]
		});
		
		//res.json(orders)
		await res.render("shop/orders", {
			pageTitle: "Tus Pedidos",
			path: "/",
			orders: orders
		});

	} catch (error) {
		console.log(error);
		res.status(404).render("404", {
			pageTitle: "404",
			path: "/",
		});

	}









};

//--------LOGIN Y REGISTER-------------------------------
exports.getRegister = (req, res, next) => {


	res.render('shop/register', {
		pageTitle: 'Register',
		path: '/register',
		errorMessage: req.user ? 'Ya te encuentras logueado' : null,
		user: req.user
	});

};

exports.postUser = async (req, res) => {
	try {
		const { name, email, password, isAdmin } = req.body;

		// Verificar si el usuario ya existe en la base de datos
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.render('shop/register', {
				pageTitle: 'Register',
				path: '/',
				user: null,
				errorMessage: 'EL EMAIL YA SE ENCUENTRA REGISTRADO'
			});
		}

		// Crear el hash de la contraseña

		// Crear el usuario
		const user = await User.create({
			name,
			email,
			password,
			admin: isAdmin
		});

		// Redireccionar al usuario a la página de inicio de sesión
		return res.render('shop/register', {
			pageTitle: 'Register',
			path: '/',
			user: null,
			errorMessage: 'SE REGISTRÓ EXITOSAMENTE'
		});
	} catch (error) {
		console.log(error);
		res.render('auth/register', {
			pageTitle: 'Register',
			path: '/',
			user: null,
			errorMessage: 'No se pudo crear el usuario'
		});
	}
};

exports.getLogin = (req, res, next) => {

	if (req.user) {
		//ya se encuentra registrado
		res.render("shop/login", {

			pageTitle: "Login",
			user: true,
			errorMessage: 'Ya te encuentras logueado',
			path: "/",
		});
	}
	else {
		res.render("shop/login", {

			pageTitle: "Login",
			user: null,
			errorMessage: false,
			path: "/",
		});
	}
};

exports.loginUser = async (req, res) => {
	// Verificar las credenciales del usuario
	console.log('enviando formulario');

	const { email, password } = req.body;
	console.log('------------', email, password);

	try {
		const user = await User.findOne({
			where: { email, password }
		});

		console.log('----------------------------------------');
		if (!user) {
			return res.render("shop/login", {
				pageTitle: "Login",
				user: null,
				errorMessage: 'Creedenciales incorrectas',
				path: "/",
			});
		}
		console.log('se encontró user');
		const { id, admin } = user
		// Generar un JWT con la información del usuario
		const token = jwt.sign({ id, email, admin }, 'mysecret');

		// Almacenar el JWT en las cookies del navegador

		res.cookie('etoken', token);

		// Redireccionar al usuario a la página de inicio

		res.render("shop/login", {

			pageTitle: "Login",
			user: user,
			errorMessage: 'Ya está logueado',
			path: "/",
		});


	} catch (error) {
		console.log(error);

		res.render("shop/login", {

			pageTitle: "Login",
			user: null,
			errorMessage: 'No se encontró usuario',
			path: "/",
		});


	}


	//const match = await bcrypt.compare(password, user.password);
	//if (!match) {
	//	return res.status(401).send('Credenciales incorrectas');
	//}

}

exports.logout = async (req, res) => {
	res.clearCookie('etoken');

	// Redirigir al usuario a la página de inicio
	res.redirect('/');
	//res.cookie('etoken', JSON.stringify({}));
	//res.render("shop/login", {

	//	pageTitle: "Login",
	//	user: null,
	//	errorMessage: 'Sesion cerrada',
	//	path: "/",
	//});
}
