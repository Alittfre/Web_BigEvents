-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: big_events
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ev_article_cate`
--

DROP TABLE IF EXISTS `ev_article_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_article_cate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '文章分类是否是被删除\n0 表示 未被删除\n1 表示 已被删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `alias_UNIQUE` (`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章分类信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_article_cate`
--

LOCK TABLES `ev_article_cate` WRITE;
/*!40000 ALTER TABLE `ev_article_cate` DISABLE KEYS */;
INSERT INTO `ev_article_cate` VALUES (1,'测试','test1',1),(2,'科技','tech',0),(3,'教育','edu',0),(4,'文化','culture',0);
/*!40000 ALTER TABLE `ev_article_cate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_articles`
--

DROP TABLE IF EXISTS `ev_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cover_img` varchar(255) NOT NULL,
  `pub_date` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  `cate_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_articles`
--

LOCK TABLES `ev_articles` WRITE;
/*!40000 ALTER TABLE `ev_articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `ev_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_users`
--

DROP TABLE IF EXISTS `ev_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_pic` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_users`
--

LOCK TABLES `ev_users` WRITE;
/*!40000 ALTER TABLE `ev_users` DISABLE KEYS */;
INSERT INTO `ev_users` VALUES (1,'admin','$2a$10$FmbTfNdLSCTKMvUGJkFl3eOf36k3pP.b4jDoJELgVgD4zWxTDPdaC','admin','test@test.com','data:image/png;base64,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');
/*!40000 ALTER TABLE `ev_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-29 17:02:17
