-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2015 a las 04:27:26
-- Versión del servidor: 5.6.15-log
-- Versión de PHP: 5.5.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `prestamos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE IF NOT EXISTS `administrador` (
  `admin_user` varchar(15) NOT NULL,
  `admin_password` varchar(15) NOT NULL,
  PRIMARY KEY (`admin_user`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`admin_user`, `admin_password`) VALUES
('ragasi', 'uaz2015');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE IF NOT EXISTS `alumnos` (
  `alumno_matricula` int(8) NOT NULL,
  `alumno_nombre` varchar(20) NOT NULL,
  `alumno_apellidop` varchar(10) NOT NULL,
  `alumno_apellidom` varchar(10) DEFAULT NULL,
  `alumno_carrera` varchar(4) NOT NULL,
  PRIMARY KEY (`alumno_matricula`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`alumno_matricula`, `alumno_nombre`, `alumno_apellidop`, `alumno_apellidom`, `alumno_carrera`) VALUES
(30114635, 'Raúl', 'Garay', 'Silva', 'IC'),
(20114536, 'Rodrigo', 'Martínez', 'Murillo', 'ENF'),
(87496854, 'Antonio', 'Sánchez', 'Ortega', 'ICE'),
(30265415, 'Matha', 'Murillo', 'García', 'IC'),
(30226574, 'Javier', 'Hernández', 'Pérez', 'PSI'),
(52114635, 'Fátima', 'Salinas', 'Pérez', 'PSI'),
(36221456, 'Fátima', 'Figueroa', 'Sánchez', 'ICE'),
(21445398, 'Alfonso', 'Jiménez', 'Muñoz', 'IC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE IF NOT EXISTS `articulos` (
  `articulo_id` int(15) NOT NULL AUTO_INCREMENT,
  `articulo_nombre` varchar(30) NOT NULL,
  `articulo_descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`articulo_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56879 ;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`articulo_id`, `articulo_nombre`, `articulo_descripcion`) VALUES
(1, 'Proyector HP 456', 'proyector'),
(2, 'Canon MG543', 'Cámara Canon 16Mpx'),
(3, 'HP cmp343', 'Impresora Laser'),
(56874, 'SAGA HDMI', 'Convertidor VGA a HDMI'),
(56875, 'Raspberry Pi 2 B', 'Mini Computadora'),
(4, 'Display RP', 'Display para Raspberry Pi 2 B'),
(5, 'Raspberry Pi B+', 'Tarjeta Raspberry Pi modelo B+'),
(56876, 'Wi-Fi nano', 'Antena USB Wi-Fi'),
(56877, 'HDMI', 'Cable HDMI'),
(56878, 'Teclado ', 'Teclado USB'),
(6, 'Ratón', 'Ratón alámbrico USB'),
(7, 'Ratón HP', 'Ratón inalámbrico usb marca HP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linesprestamo`
--

CREATE TABLE IF NOT EXISTS `linesprestamo` (
  `linea_id` int(5) NOT NULL AUTO_INCREMENT,
  `prestamo_id` int(5) NOT NULL,
  `linea_unidades` int(2) NOT NULL,
  `articulo_id` int(15) NOT NULL,
  PRIMARY KEY (`linea_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Volcado de datos para la tabla `linesprestamo`
--

INSERT INTO `linesprestamo` (`linea_id`, `prestamo_id`, `linea_unidades`, `articulo_id`) VALUES
(1, 49834, 1, 1),
(2, 19867, 1, 1),
(3, 19867, 1, 2),
(4, 99977, 1, 56876),
(5, 99977, 1, 56875),
(6, 99977, 1, 6),
(7, 99977, 1, 56877),
(8, 99977, 1, 56878),
(9, 64335, 1, 56874),
(10, 64335, 1, 56876),
(11, 64335, 1, 5),
(12, 64335, 1, 1),
(13, 64335, 1, 56878),
(14, 64335, 1, 6),
(15, 99343, 1, 3),
(16, 99343, 1, 2),
(17, 99343, 1, 1),
(18, 21317, 1, 56875),
(19, 21317, 1, 56874);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE IF NOT EXISTS `prestamos` (
  `prestamo_id` int(5) NOT NULL AUTO_INCREMENT,
  `alumno_matricula` int(8) NOT NULL,
  `prestamo_fecha_prestamo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `prestamo_fecha_devolucion` date DEFAULT NULL,
  `prestamo_estado` varchar(10) NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`prestamo_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=99978 ;

--
-- Volcado de datos para la tabla `prestamos`
--

INSERT INTO `prestamos` (`prestamo_id`, `alumno_matricula`, `prestamo_fecha_prestamo`, `prestamo_fecha_devolucion`, `prestamo_estado`) VALUES
(49834, 30114635, '2015-12-02 17:43:55', '2015-12-02', 'Devuelto'),
(19867, 20114536, '2015-12-05 02:12:14', NULL, 'Pendiente'),
(99977, 21445398, '2015-12-05 02:13:01', NULL, 'Pendiente'),
(64335, 36221456, '2015-12-05 02:14:19', NULL, 'Pendiente'),
(99343, 30114635, '2015-12-05 03:26:33', NULL, 'Pendiente'),
(21317, 87496854, '2015-12-05 03:27:04', NULL, 'Pendiente');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
