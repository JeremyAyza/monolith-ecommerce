const { Order,User, OrderItem, Product } = require('../models/index');


exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

exports.getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
		}
		res.status(200).json(user);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

exports.createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await User.create({ name, email, password });
		res.status(201).json(user);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, email, password,admin } = req.body;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
		}
		await user.update({ name, email, password,admin });
		res.status(200).json(user);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
		}
		await user.destroy();
		res.status(204).json({message:"Eliminado exitosamente"});
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};



// Obtener todas las órdenes
exports.getOrders = async (req, res, next) => {
	console.log('GET ORDERS');
	try {
		const orders = await Order.findAll({
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
		res.json(orders);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

// Obtener una orden por su ID
exports.getOrderById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: 'Orden no encontrada' });
		}
		res.json(order);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

// Crear una nueva orden
exports.createOrder = async (req, res, next) => {
	try {
		const { total } = req.body;
		const order = await Order.create({ total });
		res.status(201).json(order);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

// Actualizar una orden existente
exports.updateOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { total } = req.body;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: 'Orden no encontrada' });
		}
		order.total = total;
		await order.save();
		res.json(order);
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};

// Eliminar una orden existente
exports.deleteOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: 'Orden no encontrada' });
		}
		await order.destroy();
		res.json({ message: 'Orden eliminada' });
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error en el proceso, por favor intentar nuevamente" })
	}
};



