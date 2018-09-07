# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 101.132.161.32 (MySQL 5.5.56-MariaDB)
# Database: fruit
# Generation Time: 2018-07-08 10:02:21 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table archive
# ------------------------------------------------------------

CREATE TABLE `archive` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `price` int(20) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `order_id` int(11) unsigned NOT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `archive` WRITE;
/*!40000 ALTER TABLE `archive` DISABLE KEYS */;

INSERT INTO `archive` (`id`, `price`, `name`, `created_at`, `updated_at`, `order_id`, `image_url`)
VALUES
	(1,12,'苹果','2018-06-25 13:10:48',NULL,1,'http://baidu.com');

/*!40000 ALTER TABLE `archive` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cart
# ------------------------------------------------------------

CREATE TABLE `cart` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;

INSERT INTO `cart` (`id`, `user_id`)
VALUES
	(1,1);

/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cart_fruit
# ------------------------------------------------------------

CREATE TABLE `cart_fruit` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `fruit_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `cart_fruit` WRITE;
/*!40000 ALTER TABLE `cart_fruit` DISABLE KEYS */;

INSERT INTO `cart_fruit` (`id`, `cart_id`, `fruit_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,1,3);

/*!40000 ALTER TABLE `cart_fruit` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table category
# ------------------------------------------------------------

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '种类名字，如水果',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`)
VALUES
	(1,'水果'),
	(2,'火果'),
	(3,'木果'),
	(4,'金果');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fruit
# ------------------------------------------------------------

CREATE TABLE `fruit` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `image_id` int(11) unsigned NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `price` int(20) NOT NULL,
  `count` int(20) NOT NULL DEFAULT '0',
  `likes` int(20) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `fruit` WRITE;
/*!40000 ALTER TABLE `fruit` DISABLE KEYS */;

INSERT INTO `fruit` (`id`, `image_id`, `name`, `price`, `count`, `likes`, `created_at`, `updated_at`, `category_id`)
VALUES
	(1,1,'那么大西瓜',5,100,1,'2018-06-23 18:11:53','2018-06-23 18:11:53',1),
	(2,2,'营养木瓜',3,100,3,'2018-06-23 18:10:47','2018-06-23 18:10:47',1),
	(3,3,'美味哈密瓜',3,100,4,'2018-06-23 18:10:47','2018-06-23 18:10:47',4),
	(4,4,'大柚子',4,100,0,'2018-06-23 18:10:47','2018-06-23 18:10:47',1),
	(5,5,'小橘子',5,100,5,'2018-06-23 18:10:47','2018-06-23 18:10:47',1),
	(6,6,'酸溜溜柠檬',3,100,6,'2018-06-23 18:10:47','2018-06-23 18:10:47',1),
	(7,8,'红苹果',5,100,33,'2018-06-23 18:10:47','2018-06-23 18:10:47',1),
	(8,7,'香蕉',5,100,23,'2018-06-23 18:10:47','2018-06-23 18:10:47',3),
	(9,25,'无敌大菠萝',5,100,23,'2018-06-23 18:10:47','2018-06-23 18:10:47',1),
	(11,26,'香甜的水蜜桃',5,100,23,'2018-06-23 18:10:47','2018-06-23 18:10:47',2),
	(12,27,'暴躁的火龙果',5,100,23,'2018-06-23 18:10:47','2018-06-23 18:10:47',1),
	(13,28,'绿绿的猕猴桃',5,100,23,'2018-06-23 18:10:47','2018-06-23 18:10:47',4);

/*!40000 ALTER TABLE `fruit` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table image
# ------------------------------------------------------------

CREATE TABLE `image` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;

INSERT INTO `image` (`id`, `url`)
VALUES
	(1,'http://img.lingximu.com/rn/a11.png'),
	(2,'http://img.lingximu.com/rn/a7.png'),
	(3,'http://img.lingximu.com/rn/a2.png'),
	(4,'http://img.lingximu.com/rn/a13.png'),
	(5,'http://img.lingximu.com/rn/a4.png'),
	(6,'http://img.lingximu.com/rn/a8.png'),
	(7,'http://img.lingximu.com/rn/a12.png'),
	(8,'http://img.lingximu.com/rn/a9.png'),
	(25,'http://img.lingximu.com/rn/a1.png'),
	(26,'http://img.lingximu.com/rn/a10.png'),
	(27,'http://img.lingximu.com/rn/a3.png'),
	(28,'http://img.lingximu.com/rn/a6.png');

/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order
# ------------------------------------------------------------

CREATE TABLE `order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `money` int(20) NOT NULL COMMENT '计算的钱数',
  `pay` int(20) DEFAULT NULL COMMENT '实际支付的钱数',
  `summary` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;

INSERT INTO `order` (`id`, `user_id`, `money`, `pay`, `summary`)
VALUES
	(1,1,10,8,'购买测试的订单');

/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(11) NOT NULL DEFAULT '',
  `sex` tinyint(1) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `sex`, `email`, `password`)
VALUES
	(1,'one',1,'644522083@163.com','123456');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
