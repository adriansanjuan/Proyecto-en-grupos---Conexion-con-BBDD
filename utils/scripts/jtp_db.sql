-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-01-2025 a las 16:45:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jtp_db`
--
CREATE DATABASE IF NOT EXISTS `jtp_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `jtp_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `nif` varchar(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `createdDate` date NOT NULL,
  `modifiedDate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `picture` blob DEFAULT NULL,
  `profile` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `nif`, `username`, `password`, `firstName`, `lastName`, `createdDate`, `modifiedDate`, `email`, `picture`, `profile`) VALUES
(1, '1123145E', 'Plapar', 'plapar1234', 'Test', 'Test Test', '2024-12-03', '2024-12-18', 'test@gmail.com', NULL, 'profesor'),
(2, '46089770R', 'Angel', 'asdfg123', 'Angel', 'No Tengo', '2024-12-03', '2024-12-03', 'angel__571@hotmail.com', NULL, 'administrador'),
(3, '46239770Q', 'Adrsan', 'adrian1234', 'Adrian', 'Adrian', '2024-12-03', '2024-12-03', 'adrian@gmail.com', NULL, 'administrador'),
(4, '8549618I', 'Jesher', 'jesus1234', 'Jesus', 'Cristo', '2024-12-03', '2024-12-03', 'jesuscristo@dios.com', NULL, 'administrador');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
