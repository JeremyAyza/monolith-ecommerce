-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2023 a las 06:02:42
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `imageUrl`, `price`, `stock`, `createdAt`, `updatedAt`) VALUES
(1, 'Gorra deportiva', 'Si eres amante de los deportes al aire libre, esta gorra deportiva es imprescindible. Con un diseño deportivo y ajustable, te brinda protección contra el sol y te mantiene fresco gracias a su tejido transpirable. Disponible en varios colores vibrantes.', 'https://falabella.scene7.com/is/image/FalabellaPE/882586232_5?wid=800&hei=800&qlt=70', 19.99, 26, '2023-05-17 20:31:42', '2023-05-21 17:24:25'),
(2, 'Camiseta básica', 'Esta camiseta unisex de algodón es perfecta para uso diario. Cómoda y versátil, se adapta a cualquier estilo y ocasión.', 'https://cdn.awsli.com.br/600x700/1226/1226626/produto/65835502/987231fac2.jpg', 24.99, 50, '2023-05-21 22:49:21', '2023-05-22 03:50:57'),
(3, 'Pantalón de mezclilla', 'Un clásico pantalón de mezclilla para hombre con un ajuste perfecto. Ideal para cualquier ocasión casual.', 'https://www.costco.com.mx/medias/sys_master/products/h5b/hcb/120159844237342.jpg', 59.99, 30, '2023-05-21 22:49:21', '2023-05-22 03:51:57'),
(4, 'Camiseta estampada', 'Camiseta de manga corta con un diseño estampado moderno. Fabricada con materiales de alta calidad y disponible en varios colores.', 'https://ae01.alicdn.com/kf/H0e6813e98608428897697c735f349a9cj/Camisetas-De-Toji-Fushiguro-para-hombre-camisa-de-Manga-corta-100-de-algod-n-con-cuello.jpg_Q90.jpg_.webp', 29.99, 40, '2023-05-21 22:49:21', '2023-05-22 03:53:11'),
(5, 'Pantalón de vestir', 'Elegante pantalón de vestir para mujer, ideal para ocasiones formales. Confeccionado con tela suave y cómoda.', 'https://ss521.liverpool.com.mx/sm/86010739.jpg', 79.99, 20, '2023-05-21 22:49:21', '2023-05-22 03:54:11'),
(6, 'Camiseta de rayas', 'Camiseta de manga larga con un patrón de rayas clásicas. Perfecta para un look casual y relajado.', 'https://ae01.alicdn.com/kf/S9a45e2fcbdda4cc4ae87b8b32dbbdf08V/Camiseta-a-rayas-de-algod-n-para-mujer-ropa-Coreana-de-manga-corta-Camisetas-de-verano.jpg', 34.99, 35, '2023-05-21 22:49:21', '2023-05-22 03:54:54'),
(7, 'Shorts deportivos', 'Shorts deportivos de alta calidad para hombres. Diseñados para brindar comodidad y libertad de movimiento durante la actividad física.', 'https://cdn.shopify.com/s/files/1/1582/3499/products/81fe14ac-653f-4a81-a89a-a351aefde37f_8c0d5e84-f46d-430e-a6a3-27f7eba37b17_400x.jpg?v=1678752126', 39.99, 25, '2023-05-21 22:49:21', '2023-05-22 03:55:28'),
(8, 'Camiseta de manga larga', 'Camiseta de manga larga con un estilo moderno y juvenil. Ideal para los días frescos de otoño e invierno.', 'https://m.media-amazon.com/images/I/51Jj6hjwonL._AC_UY550_.jpg', 39.99, 30, '2023-05-21 22:49:21', '2023-05-22 03:56:51'),
(9, 'Pantalón corto', 'Pantalón corto cómodo y ligero para uso diario. Perfecto para actividades al aire libre o para relajarse en casa.', 'https://dpq25p1ucac70.cloudfront.net/seller-place-files/mrkl-files/451/HOMBRE/5040903383-1_180144916776_10.jpeg', 19.99, 45, '2023-05-21 22:49:21', '2023-05-22 03:57:17'),
(10, 'Camiseta gráfica', 'Camiseta con un diseño gráfico llamativo. Destaca con estilo con esta camiseta única y moderna.', 'https://ae01.alicdn.com/kf/Hc273120ddeca457094b6565adbbef248Y/Camiseta-de-Anime-Re-Zero-para-hombre-ropa-de-Life-in-Another-World-Satella-Puck-Rem.jpg_Q90.jpg_.webp', 49.99, 15, '2023-05-21 22:49:21', '2023-05-22 03:57:54'),
(11, 'Leggings deportivos', 'Leggings deportivos de alta calidad para mujeres. Diseñados para brindar comodidad y soporte durante el ejercicio.', 'https://plazavea.vteximg.com.br/arquivos/ids/5053057-1000-1000/image-ec1e4a74194f456f871a52c8ea6964e4.jpg?v=637769438555800000', 44.99, 20, '2023-05-21 22:49:21', '2023-05-22 03:58:20');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
