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
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

-- Dumping structure for table aplikacija.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.admin: ~2 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`admin_id`, `username`, `password_hash`) VALUES
	(1, 'markom', '08D42F6F8E382DF587A19573CC1DEF208BDAF316E3547E580DF25E228EE4D84C4F62EA8F11A6F229C5DC284AE5C666F925F2B594AF50188C4478E24D4E2E775F'),
	(2, 'vekip123', '8d0sau38a098093890a8'),
	(3, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC'),
	(5, 'admin2', '661BB43140229AD4DC3E762E7BDD68CC14BB9093C158C386BD989FEA807ACD9BD7F805CA4736B870B6571594D0D8FCFC57B98431143DFB770E083FA9BE89BC72');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table aplikacija.admin_token
CREATE TABLE IF NOT EXISTS `admin_token` (
  `admin_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`admin_token_id`),
  KEY `fk_admin_token_admin_id` (`admin_id`),
  CONSTRAINT `fk_admin_token_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.admin_token: ~18 rows (approximately)
/*!40000 ALTER TABLE `admin_token` DISABLE KEYS */;
INSERT INTO `admin_token` (`admin_token_id`, `admin_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(1, 3, '2020-06-19 17:36:55', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTUyNTk0MTUuMTAyLCJpYXQiOjE1OTI1ODEwMTV9.-T73m8blDq2CDiXtYCqrEzhxqQ13XxTBI3Xrzaoq1RU', '2020-07-20 15:36:55', 1),
	(2, 3, '2020-06-19 19:00:32', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTUyNjQ0MzIuNjA0LCJpYXQiOjE1OTI1ODYwMzJ9.89crXPFZyXmGHgeDbFXPkDFVQGlAVOke3S3nEyiMECI', '2020-07-20 17:00:32', 1),
	(3, 3, '2020-06-19 21:20:10', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTUyNzI4MTAuNDIyLCJpYXQiOjE1OTI1OTQ0MTB9.Qg5xU-dLAJ-CK6-Tf7Sbe_49pVZ0TJNlgY4YWN9x-U4', '2020-07-20 19:20:10', 1),
	(4, 3, '2020-06-21 17:09:01', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU0MzA1NDEuOTE2LCJpYXQiOjE1OTI3NTIxNDF9.o5F3KGvsyP60oQtpjVX5J4BtygmBgFkTYMTxrACHUOg', '2020-07-22 15:09:01', 1),
	(5, 5, '2020-06-21 18:18:21', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yIiwiZXhwIjoxNTk1NDM0NzAxLjA1OSwiaWF0IjoxNTkyNzU2MzAxfQ.sF_CufrpcPqBu5uwLtUujicKIEBLPONlH3V2sCJn6i8', '2020-07-22 16:18:21', 1),
	(6, 3, '2020-06-21 18:41:55', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU0MzYxMTUuMjQyLCJpYXQiOjE1OTI3NTc3MTV9.IOu4L29iOCIsDWQpggEsqXMG44ECHqEiaBj1ZZvcv8E', '2020-07-22 16:41:55', 1),
	(7, 3, '2020-06-21 19:55:16', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU0NDA1MTYuODk4LCJpYXQiOjE1OTI3NjIxMTZ9.4403STbvh3Pawx_JUDwY_za17u0rna2p4fnDSWZnNww', '2020-07-22 17:55:16', 1),
	(8, 3, '2020-06-21 19:56:09', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU0NDA1NjkuNzgsImlhdCI6MTU5Mjc2MjE2OX0.oAQnJuSw_f25iqqTpXachgnpNmjZHi5N_gggYOjgk9g', '2020-07-22 17:56:09', 1),
	(9, 3, '2020-06-21 23:10:44', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU0NTIyNDQuNjAxLCJpYXQiOjE1OTI3NzM4NDR9.8DPXWl-jlZ0zZxB57UKgZ_SsjqQmjKk95DQJRXia9Fw', '2020-07-22 21:10:44', 1),
	(10, 3, '2020-06-22 15:39:08', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1MTE1NDguNDA3LCJpYXQiOjE1OTI4MzMxNDh9.gex8QL7Gz3-kjl_RGJPej6dpSByCIy4iz6RLLEy58q8', '2020-07-23 13:39:08', 1),
	(11, 3, '2020-06-22 16:21:06', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1MTQwNjYuNzI1LCJpYXQiOjE1OTI4MzU2NjZ9.h3m-rbVmK0fjNQeUYbufTme8_sSGPYgK4SVc2390KcE', '2020-07-23 14:21:06', 1),
	(12, 5, '2020-06-22 16:31:19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yIiwiZXhwIjoxNTk1NTE0Njc5LjkyNywiaWF0IjoxNTkyODM2Mjc5fQ.SLDrIO5inmUiFu-ylX3W04W9xKRzzNogKu8CpglXvlE', '2020-07-23 14:31:19', 1),
	(13, 5, '2020-06-22 16:37:19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yIiwiZXhwIjoxNTk1NTE1MDM5LjU3MywiaWF0IjoxNTkyODM2NjM5fQ.yyWRirgy9glma2Z6UM3fuQru4-PcYpfP4pJ9ia9rxjw', '2020-07-23 14:37:19', 1),
	(14, 3, '2020-06-22 16:42:01', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1MTUzMjEuNDQ1LCJpYXQiOjE1OTI4MzY5MjF9.ZHp925HGLvTFdYhsdTMprKyAC8QAta5wZOyAur6yq3k', '2020-07-23 14:42:01', 1),
	(15, 3, '2020-06-22 16:47:39', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1MTU2NTkuODU4LCJpYXQiOjE1OTI4MzcyNTl9.9jd4DwIE4qAcxawz6ZOhfA9PZFNcKKSbCwm7AdpO4uE', '2020-07-23 14:47:39', 1),
	(16, 3, '2020-06-22 23:01:36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1MzgwOTYuNjYxLCJpYXQiOjE1OTI4NTk2OTZ9.NsqnqMAN3DQJiFfnzF6uCx1pWDmBDoHRlbwdkhjMBto', '2020-07-23 21:01:36', 1),
	(17, 3, '2020-06-22 23:29:07', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1Mzk3NDcuMjcsImlhdCI6MTU5Mjg2MTM0N30.hvefffiEQ7SBkr7OT-pnUFIl20oHShEPomIHf3Cco0U', '2020-07-23 21:29:07', 1),
	(18, 3, '2020-06-22 23:39:35', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1NDAzNzUuNjY3LCJpYXQiOjE1OTI4NjE5NzV9.-07lmRzpptpjiK9cZ-SXuPPQyJuVghfuINTmR1I3W3M', '2020-07-23 21:39:35', 1),
	(19, 3, '2020-06-23 01:48:29', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTU1NDgxMDkuNDc3LCJpYXQiOjE1OTI4Njk3MDl9.76SNNOkF6CRoGLUFGGCxBri7UGUqZXItRXCuEbdy8Qw', '2020-07-23 23:48:29', 1),
	(20, 5, '2020-07-07 13:07:35', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yIiwiZXhwIjoxNTk2Nzk4NDU1LjM3MywiaWF0IjoxNTk0MTIwMDU1fQ.9ClVYOP2M1Bl5GYHKIKZ5wW4o1YFyKZLTRw1tMPPsJQ', '2020-08-07 11:07:35', 1),
	(21, 5, '2020-07-07 14:01:37', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yIiwiZXhwIjoxNTk2ODAxNjk3LjQ0NiwiaWF0IjoxNTk0MTIzMjk3fQ.IDjeC-M0ELDXkSR2iF81BEEgaf7SsAssrmPK8lk5MYo', '2020-08-07 12:01:37', 1),
	(22, 5, '2020-07-08 16:22:44', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjUsInVzZXJuYW1lIjoiYWRtaW4yIiwiZXhwIjoxNTk2ODk2NTY0LjU3MywiaWF0IjoxNTk0MjE4MTY0fQ.CuWK3wUtco-beO5KXtcTZHWhVdyD8zsYSfhMv8C5yRg', '2020-08-08 14:22:44', 1),
	(23, 3, '2020-07-08 18:29:02', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTY5MDQxNDIuMDY1LCJpYXQiOjE1OTQyMjU3NDJ9.PtGcrQLZlPy5sDpUmBvmmrYVBj39K_9TbsWz9NNAtpY', '2020-08-08 16:29:02', 1),
	(24, 3, '2020-07-08 22:52:15', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTY5MTk5MzUuNzEzLCJpYXQiOjE1OTQyNDE1MzV9.KNW_1B8GIedO7ieG4QPOjDcfkH4OWYYLbg6biZASJLI', '2020-08-08 20:52:15', 1),
	(25, 3, '2020-07-09 00:10:05', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTY5MjQ2MDUuNTMsImlhdCI6MTU5NDI0NjIwNX0.GAc7kGRBF9DORgu0C-cPjvsG07pTsH4TaxuSV66nwlM', '2020-08-08 22:10:05', 1),
	(26, 3, '2020-07-09 15:36:53', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlzdHJhdG9ySWQiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE1OTY5ODAyMTMuNSwiaWF0IjoxNTk0MzAxODEzfQ.djpK8S_bazzHS1gkI6GEiEHO4nrVgqOmclU5SVjz40s', '2020-08-09 13:36:53', 1);
/*!40000 ALTER TABLE `admin_token` ENABLE KEYS */;

-- Dumping structure for table aplikacija.movie
CREATE TABLE IF NOT EXISTS `movie` (
  `movie_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL DEFAULT '0',
  `genre` varchar(64) NOT NULL DEFAULT '0',
  `duration` int NOT NULL DEFAULT '0',
  `image_url` varchar(128) NOT NULL DEFAULT '0',
  `director` varchar(64) NOT NULL DEFAULT '0',
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `rating` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `uq_movie_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.movie: ~8 rows (approximately)
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` (`movie_id`, `title`, `genre`, `duration`, `image_url`, `director`, `description`, `rating`) VALUES
	(1, 'Avengers', 'Action', 160, 'assets/img1.jpg', 'Mark M', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc.', 5),
	(2, 'Batman', 'Action', 120, 'assets/img2.jpg', 'Peter V', 'This is a little longer  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc.description', 4),
	(3, 'Rio', 'Animated', 90, 'assest/img3.jpg', 'Kristy Won', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc.', 4),
	(4, 'Joker 3', 'Action', 150, 'assets/img.5.jpg', 'Peter Marks', 'An action packed movie by DC studio  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc.', 0),
	(18, 'Fast 8', 'Cars', 130, '0', 'Philiph Anderson', 'Thisss is a very long desc   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc.', 0),
	(19, 'Alice ', 'Animation', 90, '0', 'Joshep McCully', ' Nesto  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat viverra urna eget dapibus. Etiam mattis ut tellus a porta. Vivamus magna ex, pharetra in fringilla non, sollicitudin imperdiet nisi. Nam urna orci, lobortis a ipsum vitae, sagittis viverra mi. Donec scelerisque aliquet mi consequat suscipit. Maecenas nec commodo sapien, sit amet ullamcorper magna. Aliquam gravida sed nisi vitae faucibus. Phasellus mollis eget erat vel mollis. Donec non posuere erat. Duis non justo vitae arcu ornare consectetur. Vestibulum est nunc, maximus sit amet diam id, dictum commodo risus. Fusce a placerat massa. Aenean rutrum, elit sed sagittis faucibus, ante lorem sodales lorem, vitae semper risus felis eu lacus. Nullam pellentesque eleifend leo, at molestie nunc.', 0);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;

-- Dumping structure for table aplikacija.photo
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `movie_id` int unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`) USING BTREE,
  KEY `fk_photo_movie_id` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.photo: ~0 rows (approximately)
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `movie_id`, `image_path`) VALUES
	(16, 1, '202079-0873517548-avengers_poster.jpg'),
	(17, 2, '202079-3607013772-batman-origins-batman-swing-i15545.jpg'),
	(18, 4, '202079-3603082328-joker_poster.jpg'),
	(19, 18, '202079-2089485333-a092eccd4a6903a38a9e538b89ec17d2.jpg'),
	(20, 19, '202079-8878341209-alice-in-wonderland-alice-i7203.jpg'),
	(21, 3, '202079-3117694498-rio-french-poster.jpg');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

-- Dumping structure for table aplikacija.show_time
CREATE TABLE IF NOT EXISTS `show_time` (
  `show_time_id` int unsigned NOT NULL AUTO_INCREMENT,
  `screening_room` int NOT NULL DEFAULT '0',
  `time` time NOT NULL DEFAULT '00:00:00',
  `date_at` date NOT NULL,
  `date_to` date NOT NULL,
  `movie_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`show_time_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `fk_show_time_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.show_time: ~3 rows (approximately)
/*!40000 ALTER TABLE `show_time` DISABLE KEYS */;
INSERT INTO `show_time` (`show_time_id`, `screening_room`, `time`, `date_at`, `date_to`, `movie_id`) VALUES
	(1, 1, '17:00:00', '2020-06-23', '2020-08-23', 1),
	(3, 2, '20:00:00', '2020-06-24', '2020-09-24', 1),
	(4, 1, '21:00:00', '2020-06-25', '2020-09-20', 1),
	(5, 3, '20:00:00', '2020-07-09', '2020-11-09', 1),
	(6, 2, '18:30:00', '2020-07-14', '2020-10-09', 2);
/*!40000 ALTER TABLE `show_time` ENABLE KEYS */;

-- Dumping structure for table aplikacija.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` int unsigned NOT NULL AUTO_INCREMENT,
  `seats` int NOT NULL DEFAULT '0',
  `forename` varchar(64) NOT NULL DEFAULT '0',
  `surname` varchar(64) NOT NULL DEFAULT '0',
  `phone` varchar(64) NOT NULL DEFAULT '0',
  `show_time_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`ticket_id`),
  KEY `fk_ticket_show_time_id` (`show_time_id`),
  CONSTRAINT `fk_ticket_show_time_id` FOREIGN KEY (`show_time_id`) REFERENCES `show_time` (`show_time_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.ticket: ~2 rows (approximately)
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` (`ticket_id`, `seats`, `forename`, `surname`, `phone`, `show_time_id`) VALUES
	(1, 4, 'Marko', 'Petric', '064-223-111', 1),
	(4, 4, 'Mare', 'Care', '064-111-322', 1);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
