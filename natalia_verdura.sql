-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2021 a las 01:58:58
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `natalia_verdura`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `equipo_id` int(11) NOT NULL,
  `equipo_modelo` varchar(250) NOT NULL,
  `marca_equipo_fk` int(11) NOT NULL,
  `tipo_equipo_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`equipo_id`, `equipo_modelo`, `marca_equipo_fk`, `tipo_equipo_fk`) VALUES
(1, 'ZIva', 2, 1),
(2, '464sxl multifuncion', 1, 2),
(3, 'Optima comun', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadosreparacion`
--

CREATE TABLE `estadosreparacion` (
  `estado_id` int(11) NOT NULL,
  `estado_tipo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estadosreparacion`
--

INSERT INTO `estadosreparacion` (`estado_id`, `estado_tipo`) VALUES
(1, 'Recibido'),
(2, 'Cancelado'),
(3, 'Pedido a Garantía'),
(4, 'Baja de equipo'),
(5, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcasequipos`
--

CREATE TABLE `marcasequipos` (
  `marca_equipo_id` int(11) NOT NULL,
  `marca_equipo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marcasequipos`
--

INSERT INTO `marcasequipos` (`marca_equipo_id`, `marca_equipo`) VALUES
(1, 'Lexmark'),
(2, 'Bangho');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficinas`
--

CREATE TABLE `oficinas` (
  `oficina_id` int(11) NOT NULL,
  `oficina_nombre` varchar(250) NOT NULL,
  `oficina_direccion` varchar(500) NOT NULL,
  `oficina_email` varchar(250) NOT NULL,
  `oficina_telefono` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `oficinas`
--

INSERT INTO `oficinas` (`oficina_id`, `oficina_nombre`, `oficina_direccion`, `oficina_email`, `oficina_telefono`) VALUES
(1, 'Cobranzas', 'Calle falsa 456', 'cobranzas@obelisco.com', '11-4568-9564'),
(2, 'Recursos humanos', 'Calle falsa 4569', 'rrhh@obelisco.com', '789-45674556');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `pedido_id` int(11) NOT NULL,
  `equipo_id_fk` int(11) NOT NULL,
  `serial_number` varchar(250) NOT NULL,
  `oficina_id_fk` int(11) NOT NULL,
  `pedido_problema` text NOT NULL,
  `pedido_fecha_inicio` date NOT NULL,
  `estado_id_fk` int(11) NOT NULL,
  `pedido_fecha_finalizacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`pedido_id`, `equipo_id_fk`, `serial_number`, `oficina_id_fk`, `pedido_problema`, `pedido_fecha_inicio`, `estado_id_fk`, `pedido_fecha_finalizacion`) VALUES
(1, 2, '456789-7', 1, 'Traba Hojas', '2021-11-24', 5, '2021-11-24'),
(2, 3, 'si-c45698754', 2, 'Se apaga', '2021-11-24', 1, '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposequipos`
--

CREATE TABLE `tiposequipos` (
  `tipo_equipo_id` int(11) NOT NULL,
  `tipo_equipo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiposequipos`
--

INSERT INTO `tiposequipos` (`tipo_equipo_id`, `tipo_equipo`) VALUES
(1, 'pc'),
(2, 'impresora');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`equipo_id`),
  ADD KEY `marca_equipo_fk` (`marca_equipo_fk`),
  ADD KEY `tipo_equipo_fk` (`tipo_equipo_fk`);

--
-- Indices de la tabla `estadosreparacion`
--
ALTER TABLE `estadosreparacion`
  ADD PRIMARY KEY (`estado_id`);

--
-- Indices de la tabla `marcasequipos`
--
ALTER TABLE `marcasequipos`
  ADD PRIMARY KEY (`marca_equipo_id`);

--
-- Indices de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`oficina_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedido_id`),
  ADD KEY `estado_id_fk` (`estado_id_fk`),
  ADD KEY `equipo_id_kf` (`equipo_id_fk`),
  ADD KEY `oficina_id_fk` (`oficina_id_fk`);

--
-- Indices de la tabla `tiposequipos`
--
ALTER TABLE `tiposequipos`
  ADD PRIMARY KEY (`tipo_equipo_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `equipo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estadosreparacion`
--
ALTER TABLE `estadosreparacion`
  MODIFY `estado_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `marcasequipos`
--
ALTER TABLE `marcasequipos`
  MODIFY `marca_equipo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `oficina_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tiposequipos`
--
ALTER TABLE `tiposequipos`
  MODIFY `tipo_equipo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `marca_equipo_fk` FOREIGN KEY (`marca_equipo_fk`) REFERENCES `marcasequipos` (`marca_equipo_id`),
  ADD CONSTRAINT `tipo_equipo_fk` FOREIGN KEY (`tipo_equipo_fk`) REFERENCES `tiposequipos` (`tipo_equipo_id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `equipo_id_kf` FOREIGN KEY (`equipo_id_fk`) REFERENCES `equipos` (`equipo_id`),
  ADD CONSTRAINT `estado_id_fk` FOREIGN KEY (`estado_id_fk`) REFERENCES `estadosreparacion` (`estado_id`),
  ADD CONSTRAINT `oficina_id_fk` FOREIGN KEY (`oficina_id_fk`) REFERENCES `oficinas` (`oficina_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
