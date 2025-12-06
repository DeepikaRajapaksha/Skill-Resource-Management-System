-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.42 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for resourse_management_system
DROP DATABASE IF EXISTS `resourse_management_system`;
CREATE DATABASE IF NOT EXISTS `resourse_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `resourse_management_system`;

-- Dumping structure for table resourse_management_system.personnel
DROP TABLE IF EXISTS `personnel`;
CREATE TABLE IF NOT EXISTS `personnel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `level` enum('Junior','Mid-Level','Senior') DEFAULT 'Junior',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table resourse_management_system.personnel: ~2 rows (approximately)
REPLACE INTO `personnel` (`id`, `name`, `email`, `role`, `level`, `created_at`, `updated_at`) VALUES
	(1, 'Deepika', 'testing@gmail.com', 'Frontend Developer', 'Mid-Level', '2025-12-02 06:13:49', '2025-12-02 06:21:49'),
	(3, 'Sewwandi', 'sewwandi@gmail.com', 'Backend Developer', 'Mid-Level', '2025-12-05 14:28:09', '2025-12-05 14:31:51');

-- Dumping structure for table resourse_management_system.personnel_skills
DROP TABLE IF EXISTS `personnel_skills`;
CREATE TABLE IF NOT EXISTS `personnel_skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `personnel_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `proficiency` enum('Beginner','Intermediate','Advanced','Expert') NOT NULL DEFAULT 'Beginner',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `personnel_id` (`personnel_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `personnel_skills_ibfk_1` FOREIGN KEY (`personnel_id`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personnel_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table resourse_management_system.personnel_skills: ~2 rows (approximately)
REPLACE INTO `personnel_skills` (`id`, `personnel_id`, `skill_id`, `proficiency`, `created_at`, `updated_at`) VALUES
	(2, 3, 2, 'Intermediate', '2025-12-05 14:46:58', '2025-12-05 14:46:58'),
	(3, 3, 1, 'Advanced', '2025-12-06 21:23:03', '2025-12-06 21:23:03');

-- Dumping structure for table resourse_management_system.projectassignments
DROP TABLE IF EXISTS `projectassignments`;
CREATE TABLE IF NOT EXISTS `projectassignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `personnel_id` int NOT NULL,
  `role_in_project` varchar(255) DEFAULT NULL,
  `assigned_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table resourse_management_system.projectassignments: ~3 rows (approximately)
REPLACE INTO `projectassignments` (`id`, `project_id`, `personnel_id`, `role_in_project`, `assigned_at`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Leader', '2025-12-06 18:21:32', '2025-12-06 18:21:32', '2025-12-06 18:21:32'),
	(2, 1, 1, 'Leader', '2025-12-06 19:54:11', '2025-12-06 19:54:11', '2025-12-06 19:54:11'),
	(3, 1, 1, 'Leader', '2025-12-06 22:07:45', '2025-12-06 22:07:45', '2025-12-06 22:07:45');

-- Dumping structure for table resourse_management_system.projects
DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Planning','Active','Completed') NOT NULL DEFAULT 'Planning',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table resourse_management_system.projects: ~1 rows (approximately)
REPLACE INTO `projects` (`id`, `name`, `description`, `start_date`, `end_date`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 'RMS', 'Create Resturant Management System Go Ahead.', '2020-05-15', '2022-10-30', 'Planning', '2025-12-05 12:34:41', '2025-12-05 12:34:58');

-- Dumping structure for table resourse_management_system.project_skills
DROP TABLE IF EXISTS `project_skills`;
CREATE TABLE IF NOT EXISTS `project_skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `min_proficiency` enum('Beginner','Intermediate','Expert') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `project_skills_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table resourse_management_system.project_skills: ~1 rows (approximately)
REPLACE INTO `project_skills` (`id`, `project_id`, `skill_id`, `min_proficiency`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Intermediate', '2025-12-05 12:54:21', '2025-12-05 12:54:21');

-- Dumping structure for table resourse_management_system.sequelizemeta
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table resourse_management_system.sequelizemeta: ~11 rows (approximately)
REPLACE INTO `sequelizemeta` (`name`) VALUES
	('20251129052952-create-users-table.js'),
	('20251202044121-create-personnel.js'),
	('20251202140340-create-skills-table.js'),
	('20251202142038-create-personnel-skill.js'),
	('20251204122713-add-updated-at-to-skills.js'),
	('20251204124705-create-personnel_skills.js'),
	('20251204141457-create-personnel_skills.js'),
	('20251205065214-create-projects.js'),
	('20251205071019-create-projectSkills.js'),
	('20251205073905-create-project_required_skills.js'),
	('20251205075521-create-project_assignments.js');

-- Dumping structure for table resourse_management_system.skills
DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table resourse_management_system.skills: ~2 rows (approximately)
REPLACE INTO `skills` (`id`, `name`, `category`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'React', 'Framework', 'Good girl\n', '2025-12-04 12:06:25', '2025-12-05 19:52:56'),
	(2, 'Phython', 'Language', 'Good to see you good', '2025-12-04 12:07:23', '2025-12-04 18:04:40');

-- Dumping structure for table resourse_management_system.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table resourse_management_system.users: ~1 rows (approximately)
REPLACE INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
	(4, 'admin@example.com', '$2b$10$4C4pvyp1t606J7bxG8dI5O98TvS6aKqsXE3Cm7aHZXA8Rg/fyxlIS', '2025-11-29 06:49:09');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
