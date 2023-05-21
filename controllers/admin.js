const Product = require("../models/product");



exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDirectory, "views", "add-product.html"));
	
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {

	const newProduct={ 
		title: req.body.title,
		imageUrl: req.body.imageUrl.slice(0, 200),
		price: req.body.price,
		description: req.body.description.slice(0,200),
		stock: req.body.stock 
	}
		

	Product.create(newProduct).then(result => {
		res.redirect("/")
		
	}).catch(err => {
		console.log(err);
		res.status(500).json({ message: 'Error creating product' });
	});

  
};

exports.getEditProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDirectory, "views", "add-product.html"));
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/")
  }

  const productId = parseInt(req.params.productId)

	Product.findByPk(productId)
		.then(product => {
			if (!product) {
				res.status(404).redirect("/");
			}

			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product
			});

		})
		.catch(err => {
			res.status(500).json({ message: 'Error retrieving product' });
		});

};

exports.postEditProduct = (req, res, next) => {
	const newData = {
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description,
	}
	Product.update({ ...newData }, { where: { id: req.body.productId } })
		.then(() => {
			console.log('Producto actualizado');
			res.redirect("/admin/products");
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message: 'Error updating product' });
		});



}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
	Product.destroy({ where: { id: productId } })
  res.redirect("/admin/products");
}


exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDurectory, "views", "shop.html"));
	Product.findAll()
		.then(products => {
			res.render("admin/products", {
				products: products,
				pageTitle: "AdminProducts",
				path: "/admin/products",
			}); 
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Error retrieving products' });
		});


  
};

