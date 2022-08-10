CREATE DATABASE `ng_aes` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

CREATE TABLE `estudiantes` (
  `codigoestudiante` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cedula` varchar(45) NOT NULL DEFAULT '',
  `nombres` varchar(45) NOT NULL DEFAULT '',
  `apellidos` varchar(45) NOT NULL DEFAULT '',
  `email` varchar(45) NOT NULL DEFAULT '',
  `estado` varchar(1) NOT NULL DEFAULT '',
  `curso` varchar(45) NOT NULL DEFAULT '',
  `paralelo` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`codigoestudiante`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `profesores` (
  `codigoprofesor` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL DEFAULT '',
  `cantidad_max` int(10) unsigned NOT NULL DEFAULT 0,
  `proyecto` varchar(45) NOT NULL DEFAULT '0',
  `cursos` varchar(45) NOT NULL DEFAULT '',
  `estado` varchar(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`codigoprofesor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `profesores_cursos` (
  `codigoprofesor` int(10) unsigned NOT NULL DEFAULT 0,
  `curso` varchar(45) NOT NULL DEFAULT '0',
  `estado` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `profesores_estudiantes` (
  `codigoprofesor` int(10) unsigned NOT NULL DEFAULT 0,
  `codigoestudiante` int(10) unsigned NOT NULL DEFAULT 0,
  `estado` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
