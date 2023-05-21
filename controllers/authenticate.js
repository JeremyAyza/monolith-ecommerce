const jwt=require('jsonwebtoken')
 
 
 // Middleware para verificar la validez del JWT
exports.isAdmin=(req, res, next)=> {
	const token = req.cookies.etoken;
	if (!token) {
		return res.render("shop/login", {
			pageTitle: "Login",
			user: null,
			errorMessage: 'Debes inicia sesión para usar esta funcionalidad',
			path: "/",
		});
	}

	try {
		const decoded = jwt.verify(token, 'mysecret');
		req.user = decoded
		if(decoded.admin){
			console.log(' es admin');

			next()
			
		}else{
			
			return res.render("shop/login", {
				pageTitle: "Login",
				user: true,
				errorMessage: 'Debes ser administrador para eso',
				path: "/login",
			});
			
		}

		
	} catch (err) {
		console.log(err
			);
		return res.status(401).send('Token inválido');
	}
}

exports.Auth = (req, res, next) => {
	console.log("logueando 1");
	const token = req.cookies.etoken;
	if (!token) {
		return res.render("shop/login", {
			pageTitle: "Login",
			user: null,
			errorMessage: '',
			path: "/",
		});
	}
	console.log('llamando aunt');


	try {
		console.log("logueanod 2");

		const decoded = jwt.verify(token, 'mysecret');
		req.user = decoded;
		next();


	} catch (err) {
		console.log(err);
		return res.status(401).send('Token inválido');
	}
}

// Middleware para verificar la validez del JWT



// Ruta protegida

