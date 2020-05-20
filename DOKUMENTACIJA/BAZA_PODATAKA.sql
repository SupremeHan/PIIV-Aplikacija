-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for aplikacija
DROP DATABASE IF EXISTS `aplikacija`;
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

-- Dumping structure for table aplikacija.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.admin: ~2 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`admin_id`, `username`, `password_hash`) VALUES
	(1, 'markom', '08D42F6F8E382DF587A19573CC1DEF208BDAF316E3547E580DF25E228EE4D84C4F62EA8F11A6F229C5DC284AE5C666F925F2B594AF50188C4478E24D4E2E775F'),
	(2, 'vekip123', '8d0sau38a098093890a8'),
	(3, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table aplikacija.movie
DROP TABLE IF EXISTS `movie`;
CREATE TABLE IF NOT EXISTS `movie` (
  `movie_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL DEFAULT '0',
  `genre` varchar(64) NOT NULL DEFAULT '0',
  `duration` int NOT NULL DEFAULT '0',
  `image_url` varchar(128) NOT NULL DEFAULT '0',
  `director` varchar(64) NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `rating` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `uq_movie_title` (`title`),
  UNIQUE KEY `uq_movie_image_url` (`image_url`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.movie: ~2 rows (approximately)
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` (`movie_id`, `title`, `genre`, `duration`, `image_url`, `director`, `description`, `rating`) VALUES
	(1, 'Avengers', 'Action', 160, 'assets/img1.jpg', 'Mark M', 'This is a long description of the movie', 5),
	(2, 'Batman', 'Action', 120, 'assets/img2.jpg', 'Peter V', 'This is a little longer movie description', 4),
	(3, 'Rio', 'Animated', 90, 'assest/img3.jpg', 'Kristy Won', 'This is the shortest of them all', 4);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;

-- Dumping structure for table aplikacija.photo
DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `movie_id` int unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`) USING BTREE,
  KEY `fk_photo_movie_id` (`movie_id`),
  CONSTRAINT `fk_photo_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.photo: ~1 rows (approximately)
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `movie_id`, `image_path`) VALUES
	(1, 1, '2020515-6667345974-avengers_poster.jpg');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

-- Dumping structure for table aplikacija.ticket
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` int unsigned NOT NULL AUTO_INCREMENT,
  `seats` int unsigned NOT NULL DEFAULT '0',
  `date` varchar(32) NOT NULL DEFAULT '0',
  `time` varchar(32) NOT NULL DEFAULT '0',
  `movie_id` int unsigned NOT NULL DEFAULT '0',
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `screening_room` int NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `fk_ticket_movie_id` (`movie_id`),
  KEY `fk_ticket_user_id` (`user_id`),
  CONSTRAINT `fk_ticket_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.ticket: ~2 rows (approximately)
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` (`ticket_id`, `seats`, `date`, `time`, `movie_id`, `user_id`, `screening_room`) VALUES
	(1, 2, '05-03-2020', '17:30', 1, 1, 1),
	(2, 4, '04-03-2020', '19:00', 2, 2, 2);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;

-- Dumping structure for table aplikacija.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `forname` varchar(64) NOT NULL DEFAULT '0',
  `surname` varchar(64) NOT NULL DEFAULT '0',
  `phone_number` varchar(24) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `forname`, `surname`, `phone_number`) VALUES
	(1, 'User', 'Test', '3434322123'),
	(2, 'User', 'Test1', '223-212-44');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
