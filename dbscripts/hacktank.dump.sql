-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: db-mysql-nyc3-20454-do-user-8046124-0.b.db.ondigitalocean.com    Database: hacktank
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '041be44c-7396-11ee-971f-5e9c82a32a39:1-167,
7dfa00bf-69d0-11ee-96ce-cec656b41347:1-33';

--
-- Table structure for table `hack_event_settings`
--

DROP TABLE IF EXISTS `hack_event_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hack_event_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `votingDeadline` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hack_event_settings`
--

LOCK TABLES `hack_event_settings` WRITE;
/*!40000 ALTER TABLE `hack_event_settings` DISABLE KEYS */;
INSERT INTO `hack_event_settings` VALUES (1,'Hack 2023',NULL,'27 Oct 2023 12:50:00 CDT');
/*!40000 ALTER TABLE `hack_event_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hacks`
--

DROP TABLE IF EXISTS `hacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` int DEFAULT NULL,
  `hackType` varchar(100) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hack_team` (`teamId`),
  CONSTRAINT `FK_hack_team` FOREIGN KEY (`teamId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hacks`
--

LOCK TABLES `hacks` WRITE;
/*!40000 ALTER TABLE `hacks` DISABLE KEYS */;
INSERT INTO `hacks` VALUES (9,1,'PRODUCT','Simplified SMB customer onboarding',NULL),(10,1,'ENG','CRMC/Support Case - Triage',NULL),(11,2,'PRODUCT','Lineitem Fast Fill',NULL),(12,2,'ENG','Code Optimizer',NULL),(13,3,'PRODUCT','Instruction Extractor',NULL),(14,3,'ENG','First Responder',NULL),(15,4,'PRODUCT','Intelligent Employee banking with AI',NULL),(16,4,'ENG','Doc-er',NULL);
/*!40000 ALTER TABLE `hacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investments`
--

DROP TABLE IF EXISTS `investments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `investorId` int DEFAULT NULL,
  `capital` int DEFAULT NULL,
  `hackId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hack` (`hackId`),
  KEY `FK_investor` (`investorId`),
  CONSTRAINT `FK_hack` FOREIGN KEY (`hackId`) REFERENCES `hacks` (`id`),
  CONSTRAINT `FK_investor` FOREIGN KEY (`investorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investments`
--

LOCK TABLES `investments` WRITE;
/*!40000 ALTER TABLE `investments` DISABLE KEYS */;
INSERT INTO `investments` VALUES (27,4,5000,9),(28,4,10000,10),(29,4,50000,11),(30,4,20000,12),(31,4,5000,13),(32,4,10000,14),(33,3,10000,9),(34,3,20000,10),(35,3,20000,11),(36,3,15000,12),(37,3,10000,15),(38,3,25000,16),(39,1,10000,11),(40,1,15000,12),(41,1,25000,13),(42,1,10000,14),(43,1,10000,15),(44,1,30000,16),(45,2,10000,9),(46,2,30000,10),(47,2,20000,13),(48,2,0,14),(49,2,20000,15),(50,2,20000,16);
/*!40000 ALTER TABLE `investments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user','2023-10-15 16:36:29','2023-10-15 16:36:29'),(2,'moderator','2023-10-15 16:36:29','2023-10-15 16:36:29'),(3,'admin','2023-10-15 16:36:29','2023-10-15 16:36:29');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('2023-10-15 19:21:05','2023-10-15 19:21:05',1,1),('2023-10-16 09:03:56','2023-10-16 09:03:56',1,2),('2023-10-16 09:05:21','2023-10-16 09:05:21',1,3),('2023-10-16 21:26:51','2023-10-16 21:26:51',1,4);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `budget` int DEFAULT NULL,
  `teamName` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Navigators','team1@foo.com','$2a$08$lbmDsS/nvq./hkm.74GRceApHXVpRVoPyhR3Qe2mukEHiEknKByR6','2023-10-15 19:21:04','2023-10-15 19:21:04',100000,'nAvIgators'),(2,'Linecrafters','team2@foo.com','$2a$08$5j8o6V848/O6e9/Ae.aBl.WfoZyjoJV8LWe2VwFw8aofCAzni1s.u','2023-10-16 09:03:56','2023-10-16 09:03:56',100000,'LineCrafters'),(3,'Hermes','team3@foo.com','$2a$08$N9pcGwVmsxuRdwN1JF.6feY/G5sskwqFcTTRYkWHEiAsfw73y4rD6','2023-10-16 09:05:20','2023-10-16 09:05:20',100000,'Hermes (God of Speed)'),(4,'Ragged','team4@foo.com','$2a$08$zoo1VIp5D7SSU33UZJqh9.2DHD3rsXr.MQgiduhg/P9R7EMr/yKbK','2023-10-16 21:26:50','2023-10-16 21:26:50',100000,'(RAG)ged');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-29 15:23:38
