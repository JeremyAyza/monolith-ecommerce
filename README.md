<h1 align="center">🛒 Node.js E-commerce</h1>
<p align="center">Fullstack e-commerce web application using Express, EJS, and MySQL with a focus on MVC architecture and clean design.</p>

<p align="center">
  <a href="https://expressjs.com"><img src="https://img.shields.io/badge/Express-4.x-grey?logo=express" /></a>
  <a href="https://ejs.co"><img src="https://img.shields.io/badge/EJS-Templating-yellow?logo=ejs" /></a>
  <a href="https://sequelize.org"><img src="https://img.shields.io/badge/Sequelize-ORM-blue?logo=sequelize" /></a>
  <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-Database-blue?logo=mysql" /></a>
</p>

<p align="center">
  <a href="#-features">✨ Features</a> •
  <a href="#-tech-stack">📦 Tech Stack</a>
</p>

---

## 📸 Demo

<!-- Reemplaza esto por un screenshot de tu app -->
![screenshot](./screenshot.png)

---

## ✨ Features

- 🛍️ Catálogo de productos renderizados dinámicamente
- 🧾 Vista de detalle de productos
- 🧑‍💼 Sistema de usuarios y sesiones
- 🛒 Carrito de compras (en desarrollo o implementado)
- 🧠 Diseño con EJS, CSS puro y FontAwesome para los íconos
- 🗃️ Persistencia de datos usando Sequelize + MySQL
- 🌐 Arquitectura MVC (Models, Views, Controllers)

---

## 📦 Tech Stack

| Tecnología       | Descripción                          |
|------------------|--------------------------------------|
| **Node.js**      | Entorno de ejecución para JS         |
| **Express.js**   | Framework backend ligero             |
| **EJS**          | Motor de templates para vistas       |
| **Sequelize**    | ORM para manipulación de la base de datos |
| **MySQL**        | Base de datos relacional             |
| **FontAwesome**  | Íconos de UI                         |
| **CSS3**         | Estilización personalizada           |

---

## 🎯 Learnings & Highlights

- [x] Integración completa entre servidor, base de datos y vistas
- [x] Renderizado del lado del servidor con lógica embebida en EJS
- [x] Uso de Sequelize para crear modelos relacionales y relaciones
- [x] Variables de entorno seguras con `.env` para configuraciones sensibles
- [x] Middleware y herramientas como `cookie-parser`, `morgan`, y `dotenv`

---

## .env

```bash
DB_USER=root
DB_NAME=tienda_DB
DB_PASSWORD=
DB_HOST=localhost
PORT=4000
DIALECT=mysql
```

