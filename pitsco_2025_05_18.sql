# ************************************************************
# Sequel Ace SQL dump
# Version 20093
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.0.32)
# Database: database
# Generation Time: 2025-05-18 15:04:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bangluong
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bangluong`;

CREATE TABLE `bangluong` (
  `id_bangluong` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `luongcb` decimal(10,0) NOT NULL,
  `tigia` decimal(10,0) NOT NULL,
  `phuongthuc` varchar(45) NOT NULL,
  `thoigian` date NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedtAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_bangluong`),
  KEY `thuyenvien_bangluong_idx` (`thuyenvien_id`),
  CONSTRAINT `bangluong_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
) ENGINE=InnoDB ;

LOCK TABLES `bangluong` WRITE;
/*!40000 ALTER TABLE `bangluong` DISABLE KEYS */;

INSERT INTO `bangluong` (`id_bangluong`, `thuyenvien_id`, `luongcb`, `tigia`, `phuongthuc`, `thoigian`, `createdAt`, `updatedtAt`)
VALUES
	(3,1,15000000,23000,'Chuyển khoản','2025-05-01','2025-05-12 15:48:23','2025-05-12 15:49:23'),
	(4,2,12000000,23000,'Tiền mặt','2025-05-01','2025-05-12 15:48:23','2025-05-12 15:49:23');

/*!40000 ALTER TABLE `bangluong` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table chucvu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chucvu`;

CREATE TABLE `chucvu` (
  `id_chucvu` int NOT NULL AUTO_INCREMENT,
  `tenchucvu` varchar(30) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_chucvu`),
  UNIQUE KEY `tenchucvu_UNIQUE` (`tenchucvu`)
) ENGINE=InnoDB ;

LOCK TABLES `chucvu` WRITE;
/*!40000 ALTER TABLE `chucvu` DISABLE KEYS */;

INSERT INTO `chucvu` (`id_chucvu`, `tenchucvu`, `createdAt`, `updatedAt`)
VALUES
	(1,'Thuyền trưởng','2025-05-12 16:24:05','2025-05-12 16:24:05'),
	(2,'Sỹ quan boong','2025-05-12 16:24:05','2025-05-12 16:24:05'),
	(3,'Máy trưởng','2025-05-12 16:24:05','2025-05-12 16:24:05'),
	(4,'Thợ máy','2025-05-12 16:24:05','2025-05-12 16:24:05'),
	(5,'Thủy thủ','2025-05-12 16:24:05','2025-05-12 16:24:05'),
	(6,'Điện viên','2025-05-12 16:24:05','2025-05-12 16:24:05'),
	(7,'Bếp trưởng','2025-05-12 16:24:05','2025-05-12 16:24:05');

/*!40000 ALTER TABLE `chucvu` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table chucvu_chungchi
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chucvu_chungchi`;

CREATE TABLE `chucvu_chungchi` (
  `id_chungchi_chucvu` int NOT NULL AUTO_INCREMENT,
  `chucvu_id` int NOT NULL,
  `chungchi_id` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_chungchi_chucvu`),
  KEY `cvcc_chucvu_idx` (`chucvu_id`),
  KEY `cvcc_chungchi_idx` (`chungchi_id`),
  CONSTRAINT `cvcc_chucvu` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`),
  CONSTRAINT `cvcc_chungchi` FOREIGN KEY (`chungchi_id`) REFERENCES `chungchi` (`id_chungchi`)
) ENGINE=InnoDB ;



# Dump of table chungchi
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chungchi`;

CREATE TABLE `chungchi` (
  `id_chungchi` int NOT NULL AUTO_INCREMENT,
  `tenchungchi` varchar(45) NOT NULL,
  `tieuchuanapdung` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_chungchi`),
  UNIQUE KEY `tenchungchi_UNIQUE` (`tenchungchi`)
) ENGINE=InnoDB ;

LOCK TABLES `chungchi` WRITE;
/*!40000 ALTER TABLE `chungchi` DISABLE KEYS */;

INSERT INTO `chungchi` (`id_chungchi`, `tenchungchi`, `tieuchuanapdung`, `createdAt`, `updatedAt`)
VALUES
	(1,'Chứng chỉ An toàn','ISO 9001','2025-05-12 15:50:04','2025-05-12 15:50:04'),
	(2,'Chứng chỉ Hàng hải','SOLAS','2025-05-12 15:50:04','2025-05-12 15:50:04'),
	(3,'Chứng chỉ Y tế','WHO','2025-05-12 15:50:04','2025-05-12 15:50:04');

/*!40000 ALTER TABLE `chungchi` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table lichsuditau
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lichsuditau`;

CREATE TABLE `lichsuditau` (
  `id_lichsuditau` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `chucvu_id` int NOT NULL,
  `tau_id` int NOT NULL,
  `timexuatcanh` datetime NOT NULL,
  `timelentau` datetime NOT NULL,
  `ngayroitau` date DEFAULT NULL,
  `cangroitau` varchar(50)  DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_lichsuditau`),
  KEY `thuyenvien_chuyentau_idx` (`thuyenvien_id`),
  KEY `chuyentau_chucvu_idx` (`chucvu_id`),
  KEY `lichsuditau_tau_idx` (`tau_id`),
  CONSTRAINT `lichsuditau_chucvu` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`),
  CONSTRAINT `lichsuditau_tau` FOREIGN KEY (`tau_id`) REFERENCES `tau` (`id_tau`),
  CONSTRAINT `lichsuditau_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `lichsuditau` WRITE;
/*!40000 ALTER TABLE `lichsuditau` DISABLE KEYS */;

INSERT INTO `lichsuditau` (`id_lichsuditau`, `thuyenvien_id`, `chucvu_id`, `tau_id`, `timexuatcanh`, `timelentau`, `ngayroitau`, `cangroitau`, `createdAt`, `updatedAt`)
VALUES
	(7,1,7,2,'2025-05-16 00:00:00','2025-01-01 01:00:00','2025-05-23','Cảng Tieen Sa','2025-05-12 16:25:48','2025-05-16 15:01:06'),
	(8,2,1,2,'2025-05-06 00:00:00','2024-12-31 23:00:00','2025-05-17','Cảng Đà Nẵng','2025-05-12 16:25:48','2025-05-16 14:56:19'),
	(9,1,1,1,'2025-05-17 00:00:00','2025-01-01 01:45:00','2025-05-18','Cảng Đà Nẵng','2025-05-16 15:45:48','2025-05-16 15:50:16'),
	(10,1,3,3,'2025-05-17 00:00:00','2025-01-01 01:00:00','2025-05-18','ABC','2025-05-17 03:32:16','2025-05-17 03:32:16');

/*!40000 ALTER TABLE `lichsuditau` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table loaitau
# ------------------------------------------------------------

DROP TABLE IF EXISTS `loaitau`;

CREATE TABLE `loaitau` (
  `id_loaitau` int NOT NULL AUTO_INCREMENT,
  `tenloaitau` varchar(30) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_loaitau`)
) ENGINE=InnoDB ;

LOCK TABLES `loaitau` WRITE;
/*!40000 ALTER TABLE `loaitau` DISABLE KEYS */;

INSERT INTO `loaitau` (`id_loaitau`, `tenloaitau`, `createdAt`, `updatedAt`)
VALUES
	(1,'Tàu hàng','2025-05-12 15:50:21','2025-05-12 15:50:21'),
	(2,'Tàu dầu','2025-05-12 15:50:21','2025-05-12 15:50:21'),
	(3,'Tàu công','2025-05-12 15:50:21','2025-05-12 15:50:21'),
	(4,'Tàu hóa chất','2025-05-12 15:50:21','2025-05-12 15:50:21');

/*!40000 ALTER TABLE `loaitau` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table phanquyen
# ------------------------------------------------------------

DROP TABLE IF EXISTS `phanquyen`;

CREATE TABLE `phanquyen` (
  `id_phanquyen` int NOT NULL AUTO_INCREMENT,
  `tenphanquyen` varchar(30) NOT NULL,
  `mota` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_phanquyen`)
) ENGINE=InnoDB ;

LOCK TABLES `phanquyen` WRITE;
/*!40000 ALTER TABLE `phanquyen` DISABLE KEYS */;

INSERT INTO `phanquyen` (`id_phanquyen`, `tenphanquyen`, `mota`, `createdAt`, `updatedAt`)
VALUES
	(1,'Quản trị viên','Quản lý toàn bộ hệ thống','2025-05-12 15:50:21','2025-05-12 15:50:21'),
	(2,'Nhân viên nhân sự','Sử dụng chức năng quản lý hồ sơ','2025-05-12 15:50:21','2025-05-12 15:50:21'),
	(3,'Nhân viên kế toán','Sử dụng chức năng quản lý lương','2025-05-12 15:50:21','2025-05-12 15:50:21');

/*!40000 ALTER TABLE `phanquyen` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table taikhoannganhang
# ------------------------------------------------------------

DROP TABLE IF EXISTS `taikhoannganhang`;

CREATE TABLE `taikhoannganhang` (
  `thuyenvien_id` int NOT NULL,
  `stk` varchar(15) NOT NULL,
  `tentaikhoan` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`thuyenvien_id`),
  CONSTRAINT `nganhang_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
) ENGINE=InnoDB ;



# Dump of table tau
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tau`;

CREATE TABLE `tau` (
  `id_tau` int NOT NULL AUTO_INCREMENT,
  `tentau` varchar(45) NOT NULL,
  `quoctich` varchar(30) NOT NULL,
  `loaitau_id` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tau`),
  KEY `tau_loaitau_idx` (`loaitau_id`),
  CONSTRAINT `tau_loaitau` FOREIGN KEY (`loaitau_id`) REFERENCES `loaitau` (`id_loaitau`)
) ENGINE=InnoDB ;

LOCK TABLES `tau` WRITE;
/*!40000 ALTER TABLE `tau` DISABLE KEYS */;

INSERT INTO `tau` (`id_tau`, `tentau`, `quoctich`, `loaitau_id`, `createdAt`, `updatedAt`)
VALUES
	(1,'Tàu Biển Đông 01','Việt Nam',1,'2025-05-12 15:50:37','2025-05-12 15:50:37'),
	(2,'Pacific Voyager','Singapore',2,'2025-05-12 15:50:37','2025-05-12 15:50:37'),
	(3,'Ocean Dream','Nhật Bản',3,'2025-05-12 15:50:37','2025-05-12 15:50:37');

/*!40000 ALTER TABLE `tau` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thannhan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thannhan`;

CREATE TABLE `thannhan` (
  `id_thannhan` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `hotenbo` varchar(45) DEFAULT NULL,
  `sdtbo` varchar(11) DEFAULT NULL,
  `hotenme` varchar(45) DEFAULT NULL,
  `sdtme` varchar(11) DEFAULT NULL,
  `hotenvo` varchar(45) DEFAULT NULL,
  `sdtvo` varchar(11) DEFAULT NULL,
  `nguoigiamho` varchar(45) DEFAULT NULL,
  `sdtgiamho` varchar(11) DEFAULT NULL,
  `diachi` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_thannhan`),
  KEY `thannhan_thuyenvien_idx` (`thuyenvien_id`),
  CONSTRAINT `thannhan_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
) ENGINE=InnoDB ;

LOCK TABLES `thannhan` WRITE;
/*!40000 ALTER TABLE `thannhan` DISABLE KEYS */;

INSERT INTO `thannhan` (`id_thannhan`, `thuyenvien_id`, `hotenbo`, `sdtbo`, `hotenme`, `sdtme`, `hotenvo`, `sdtvo`, `nguoigiamho`, `sdtgiamho`, `diachi`, `createdAt`, `updatedAt`)
VALUES
	(1,1,'','','aasdsa','aadsdsa','b','a','a','b','aasdsa','2025-05-16 10:05:52','2025-05-16 15:03:34'),
	(2,3,'1','2','3','4','5','6','7','8','9','2025-05-17 17:40:30','2025-05-17 17:40:30'),
	(3,7,'1','2','3','4','5','6','7','8','9','2025-05-18 14:52:11','2025-05-18 14:52:11'),
	(4,8,'1','2','3','4','5','6','7','8','9','2025-05-18 14:58:16','2025-05-18 14:58:16');

/*!40000 ALTER TABLE `thannhan` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thuyenvien
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thuyenvien`;

CREATE TABLE `thuyenvien` (
  `id_thuyenvien` int NOT NULL AUTO_INCREMENT,
  `anh` varchar(100)  DEFAULT NULL,
  `hoten` varchar(45) NOT NULL,
  `cccd` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `sodienthoai` varchar(45) NOT NULL,
  `chieucao` int NOT NULL,
  `cannang` float NOT NULL,
  `nhommau` varchar(5) NOT NULL,
  `sizegiay` int NOT NULL,
  `tinhtranghonnhan` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ngaysinh` date DEFAULT NULL,
  `sizegiaybaoho` int DEFAULT NULL,
  `trangthai` varchar(255)  NOT NULL DEFAULT 'Đang chờ tàu',
  PRIMARY KEY (`id_thuyenvien`)
) ENGINE=InnoDB ;

LOCK TABLES `thuyenvien` WRITE;
/*!40000 ALTER TABLE `thuyenvien` DISABLE KEYS */;

INSERT INTO `thuyenvien` (`id_thuyenvien`, `anh`, `hoten`, `cccd`, `email`, `sodienthoai`, `chieucao`, `cannang`, `nhommau`, `sizegiay`, `tinhtranghonnhan`, `createdAt`, `updatedAt`, `ngaysinh`, `sizegiaybaoho`, `trangthai`)
VALUES
	(1,'/uploads/crew_photos/crew_photo_1747580101125.jpg','Nguyễn Văn AAAAA','0123456789011','vana@example.com','0987654321',170,65.5,'A',42,'Độc thân','2025-05-12 15:50:37','2025-05-18 14:55:01','2020-01-01',42,'Đang chờ tàu'),
	(2,'anh2.jpg','Trần Thị B','012345678902','thib@example.com','0912345678',160,50,'A',38,'Đã kết hôn','2025-05-12 15:50:37','2025-05-12 15:50:37','1999-01-01',43,''),
	(3,NULL,'Nguyen van 1','0123456789011','anhnguyenhoang321@gmail.com','0987654321',170,65,'A',42,'Độc thân','2025-05-17 17:40:30','2025-05-17 17:40:30','2025-05-18',42,''),
	(4,NULL,'1','2','anhnguyenhoang321@gmail.com','0987654321',3,4,'A',6,'Độc thân','2025-05-17 18:46:14','2025-05-17 18:46:14','2025-05-18',7,''),
	(5,NULL,'Nguyễn Văn AA','0123456789011','anhnguyenhoang321@gmail.com','0987654321',170,12,'A',6,'Độc thân','2025-05-17 18:54:57','2025-05-17 19:10:21','2025-05-18',42,'Đang chờ tàu'),
	(6,NULL,'Nguyễn Văn AA','123123','anhnguyenhoang321@gmail.com','0987654321',123,123,'A',1,'Độc thân','2025-05-17 19:45:04','2025-05-17 19:45:04','2025-05-18',1,'Đang trên bờ'),
	(7,NULL,'Nguyễn Văn AA','0123456789011','anhnguyenhoang321@gmail.com','0987654321',1,1,'A',1,'Độc thân','2025-05-18 14:52:11','2025-05-18 14:52:11','2025-05-18',1,'Đang chờ tàu'),
	(8,'/uploads/crew_photos/crew_photo_1747580328088.jpg','TEST','0123456789011','anhnguyenhoang321@gmail.com','0987654321',170,60,'A',42,'Độc thân','2025-05-18 14:58:16','2025-05-18 14:58:48','2025-05-01',42,'Đang chờ tàu');

/*!40000 ALTER TABLE `thuyenvien` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thuyenvien_chungchi
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thuyenvien_chungchi`;

CREATE TABLE `thuyenvien_chungchi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_thuyenvien` int NOT NULL,
  `tenchungchi` varchar(255)  NOT NULL,
  `sohieuchungchi` varchar(20) CHARACTER SET utf8mb4  NOT NULL,
  `ngaycap` date NOT NULL,
  `ngayhethan` date DEFAULT NULL,
  `noicap` varchar(100) CHARACTER SET utf8mb4  NOT NULL,
  `xeploai` varchar(30) CHARACTER SET utf8mb4  DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8mb4  DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_thuyenvien` (`id_thuyenvien`),
  CONSTRAINT `thuyenvien_chungchi_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `thuyenvien_chungchi` WRITE;
/*!40000 ALTER TABLE `thuyenvien_chungchi` DISABLE KEYS */;

INSERT INTO `thuyenvien_chungchi` (`id`, `id_thuyenvien`, `tenchungchi`, `sohieuchungchi`, `ngaycap`, `ngayhethan`, `noicap`, `xeploai`, `file`, `createdAt`, `updatedAt`)
VALUES
	(1,1,'TEST Còn hạn','TEST1','2025-05-14','2025-05-18','TEST','TEST','/uploads/crew_certificates/crew_cert_1747455804565.png','2025-05-17 04:23:24','2025-05-18 14:50:32'),
	(2,1,'TEST Qua hạn','TEST1','2025-05-16','2025-05-16','TEST','TEST','/uploads/crew_certificates/crew_cert_1747455804565.png','2025-05-17 04:23:24','2025-05-17 15:38:36'),
	(3,4,'123123','123123','2025-05-18','2025-05-18','123123','123123',NULL,'2025-05-17 18:46:14','2025-05-17 18:46:14'),
	(4,4,'123123','123123','2025-05-01','2025-05-01','123123','123123',NULL,'2025-05-17 18:46:14','2025-05-17 18:46:14'),
	(5,5,'123123','123123','2025-05-18','2025-05-18','123123','123123','/uploads/crew_certificates/crew_cert__1747508097657.jpg','2025-05-17 18:54:57','2025-05-17 18:54:57'),
	(6,6,'123123','123123','2025-05-18','2025-05-19','123123','123123','/uploads/crew_certificates/crew_cert__1747511104013.jpg','2025-05-17 19:45:04','2025-05-17 19:45:04'),
	(7,7,'123123','123123','2025-05-01','2025-05-23','123123','123123','/uploads/crew_certificates/crew_cert__1747579931343.png','2025-05-18 14:52:11','2025-05-18 14:52:11'),
	(8,8,'ABC','ABC','2025-05-18','2025-05-19','HANOI','TOT','/uploads/crew_certificates/crew_cert__1747580296359.jpg','2025-05-18 14:58:16','2025-05-18 14:58:16');

/*!40000 ALTER TABLE `thuyenvien_chungchi` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thuyenvien_hocvan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thuyenvien_hocvan`;

CREATE TABLE `thuyenvien_hocvan` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_thuyenvien` int DEFAULT NULL,
  `truongdaotao` varchar(255)  DEFAULT NULL,
  `hedaotao` varchar(255)  DEFAULT NULL,
  `namtotnghiep` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `thuyenvien_hocvan` WRITE;
/*!40000 ALTER TABLE `thuyenvien_hocvan` DISABLE KEYS */;

INSERT INTO `thuyenvien_hocvan` (`id`, `id_thuyenvien`, `truongdaotao`, `hedaotao`, `namtotnghiep`, `createdAt`, `updatedAt`)
VALUES
	(3,1,'ABCD','Cao đẳng',123123,'2025-05-17 03:48:17','2025-05-18 14:55:12'),
	(4,3,'ABC','Cao đẳng',2025,'2025-05-17 17:40:30','2025-05-17 17:40:30'),
	(5,4,'ABC','Trung cấp',1999,'2025-05-17 18:46:14','2025-05-17 18:46:14'),
	(6,5,'AVX','Trung cấp',1999,'2025-05-17 18:54:57','2025-05-17 18:54:57'),
	(7,6,'AVX','Trung cấp',1999,'2025-05-17 19:45:04','2025-05-17 19:45:04'),
	(8,7,'AVX','Sau đại học',1999,'2025-05-18 14:52:11','2025-05-18 14:52:11'),
	(9,8,'ABCD','Cao đẳng',1999,'2025-05-18 14:58:16','2025-05-18 14:58:16');

/*!40000 ALTER TABLE `thuyenvien_hocvan` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table hopdong
# ------------------------------------------------------------

DROP TABLE IF EXISTS `hopdong`;

CREATE TABLE `hopdong` (
  `id_hopdong` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `ngayky` datetime NOT NULL,
  `ngayhethan` datetime NOT NULL,
  `ngaythanhly` datetime NOT NULL,
  `trangthaihopdong` varchar(45) NOT NULL,
  `hinhanh` varchar(100) NOT NULL,
  PRIMARY KEY (`id_hopdong`),
  KEY `chitiet_hopdong_thuyenvien_idx` (`thuyenvien_id`),
  CONSTRAINT `tvhd_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


# Dump of table thuyenvien_ngoaingu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thuyenvien_ngoaingu`;

CREATE TABLE `thuyenvien_ngoaingu` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_thuyenvien` int DEFAULT NULL,
  `ngonngu` varchar(255) CHARACTER SET utf8mb4  DEFAULT NULL,
  `tenchungchi` varchar(255) CHARACTER SET utf8mb4  DEFAULT NULL,
  `diemso` float DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ngaycap` date DEFAULT NULL,
  `ngayhethan` date DEFAULT NULL,
  `file` varchar(255)  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `thuyenvien_ngoaingu` WRITE;
/*!40000 ALTER TABLE `thuyenvien_ngoaingu` DISABLE KEYS */;

INSERT INTO `thuyenvien_ngoaingu` (`id`, `id_thuyenvien`, `ngonngu`, `tenchungchi`, `diemso`, `createdAt`, `updatedAt`, `ngaycap`, `ngayhethan`, `file`)
VALUES
	(3,1,'Tiếng Anh','IELTS',7.5,'2025-05-17 04:11:30','2025-05-17 04:11:30','2025-05-17','2025-05-18','/uploads/language_certificates/lang_cert_1747455090263.pdf'),
	(4,4,'Tiếng Anh','12312',12,'2025-05-17 18:46:14','2025-05-17 18:46:14','2025-05-18','2025-05-18',NULL),
	(5,4,'Tiếng Nhật','123123',213,'2025-05-17 18:46:14','2025-05-17 18:46:14','2025-05-14','2025-05-16',NULL),
	(6,5,'Tiếng Anh','12312',12,'2025-05-17 18:54:57','2025-05-17 18:54:57','2025-05-18','2025-05-18','/uploads/language_certificates/lang_cert__1747508097652.jpg'),
	(7,6,'Tiếng Anh','12312',1,'2025-05-17 19:45:04','2025-05-17 19:45:04','2025-05-18','2025-05-18','/uploads/language_certificates/lang_cert__1747511104013.jpg'),
	(8,7,'Tiếng Anh','12312',123,'2025-05-18 14:52:11','2025-05-18 14:52:11','2025-05-01','2025-05-16','/uploads/language_certificates/lang_cert__1747579931342.jpg'),
	(9,1,'Tiếng Trung','TEST Còn hạn',10,'2025-05-18 14:55:46','2025-05-18 14:55:46','2025-05-01','2025-05-31','/uploads/language_certificates/lang_cert_1747580146372.png'),
	(10,8,'Tiếng Anh','IELTS',8,'2025-05-18 14:58:16','2025-05-18 14:58:16','2025-05-01','2025-05-17','/uploads/language_certificates/lang_cert__1747580296357.png');

/*!40000 ALTER TABLE `thuyenvien_ngoaingu` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thuyenvien_tailieu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thuyenvien_tailieu`;

CREATE TABLE `thuyenvien_tailieu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_thuyenvien` int NOT NULL,
  `cccd_mattruoc` varchar(255)  DEFAULT NULL,
  `cccd_matsau` varchar(255)  DEFAULT NULL,
  `phieutiemvacxin` varchar(255)  DEFAULT NULL,
  `chungnhanvangda` varchar(255)  DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_thuyenvien` (`id_thuyenvien`),
  CONSTRAINT `thuyenvien_tailieu_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `thuyenvien_tailieu` WRITE;
/*!40000 ALTER TABLE `thuyenvien_tailieu` DISABLE KEYS */;

INSERT INTO `thuyenvien_tailieu` (`id`, `id_thuyenvien`, `cccd_mattruoc`, `cccd_matsau`, `phieutiemvacxin`, `chungnhanvangda`, `createdAt`, `updatedAt`)
VALUES
	(1,1,'/uploads/documents/id_cards/cccd_mattruoc_1_1747580189504.png','/uploads/documents/id_cards/cccd_matsau_1_1747580189507.jpg','/uploads/documents/vaccination/phieutiemvacxin_1_1747580189513.jpg','/uploads/documents/yellow_fever/chungnhanvangda_1_1747580189515.jpg','2025-05-17 04:33:59','2025-05-18 14:56:29'),
	(2,3,'/uploads/documents/id_cards/cccd_mattruoc_1747503629984.png',NULL,NULL,NULL,'2025-05-17 17:40:30','2025-05-17 17:40:30'),
	(3,7,'/uploads/documents/id_cards/cccd_mattruoc_1747579931344.png','/uploads/documents/id_cards/cccd_matsau_1747579931348.jpg','/uploads/documents/vaccination/phieutiemvacxin_1747579931348.jpg','/uploads/documents/yellow_fever/chungnhanvangda_1747579931351.jpg','2025-05-18 14:52:11','2025-05-18 14:52:11'),
	(4,8,'/uploads/documents/id_cards/cccd_mattruoc_1747580296360.jpg','/uploads/documents/id_cards/cccd_matsau_1747580296361.jpg','/uploads/documents/vaccination/phieutiemvacxin_1747580296362.jpg','/uploads/documents/yellow_fever/chungnhanvangda_1747580296363.jpg','2025-05-18 14:58:16','2025-05-18 14:58:16');

/*!40000 ALTER TABLE `thuyenvien_tailieu` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thuyenvien_trangthai
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thuyenvien_trangthai`;

CREATE TABLE `thuyenvien_trangthai` (
  `thuyenvien_id` int NOT NULL,
  `trangthai_id` int NOT NULL,
  `thoigian` date DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`thuyenvien_id`),
  KEY `chitiet_trangthai_idx` (`trangthai_id`),
  CONSTRAINT `tvtt_thuyenvieni` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`),
  CONSTRAINT `tvtt_trangthai` FOREIGN KEY (`trangthai_id`) REFERENCES `trangthai` (`id_trangthai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `thuyenvien_trangthai` WRITE;
/*!40000 ALTER TABLE `thuyenvien_trangthai` DISABLE KEYS */;

INSERT INTO `thuyenvien_trangthai` (`thuyenvien_id`, `trangthai_id`, `thoigian`, `createdAt`, `updatedAt`)
VALUES
	(1,2,'2025-05-12','2025-05-12 15:50:56','2025-05-12 15:50:56'),
	(2,3,'2025-06-15','2025-05-12 15:50:56','2025-05-12 15:50:56');

/*!40000 ALTER TABLE `thuyenvien_trangthai` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trangthai
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trangthai`;

CREATE TABLE `trangthai` (
  `id_trangthai` int NOT NULL AUTO_INCREMENT,
  `tentrangthai` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_trangthai`)
) ENGINE=InnoDB ;

LOCK TABLES `trangthai` WRITE;
/*!40000 ALTER TABLE `trangthai` DISABLE KEYS */;

INSERT INTO `trangthai` (`id_trangthai`, `tentrangthai`, `createdAt`, `updatedAt`)
VALUES
	(1,'Đang hoạt động','2025-05-12 15:50:56','2025-05-12 15:50:56'),
	(2,'Ngừng hoạt động','2025-05-12 15:50:56','2025-05-12 15:50:56'),
	(3,'Tạm thời khóa','2025-05-12 15:50:56','2025-05-12 15:50:56');

/*!40000 ALTER TABLE `trangthai` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `taikhoan` varchar(30) NOT NULL,
  `matkhau` varchar(30) NOT NULL,
  `phanquyen_id` int NOT NULL,
  `hoten` varchar(255) DEFAULT NULL,
  `sdt` varchar(10) DEFAULT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`taikhoan`),
  KEY `user_phanquyen_idx` (`phanquyen_id`),
  CONSTRAINT `user_phanquyen` FOREIGN KEY (`phanquyen_id`) REFERENCES `phanquyen` (`id_phanquyen`)
) ENGINE=InnoDB ;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`taikhoan`, `matkhau`, `phanquyen_id`, `hoten`, `sdt`, `diachi`, `email`, `createdAt`, `updatedAt`)
VALUES
	('admin','123456',1,'Nguyễn Văn A','0909123456','123 Lê Lợi, Quận 1','admin@example.com','2025-05-12 15:50:56','2025-05-12 15:50:56'),
	('ketoan1','123456',3,'Trần Thị C','0987654321','456 Hai Bà Trưng, Quận 3','ketoan1@example.com','2025-05-12 15:50:56','2025-05-12 15:50:56'),
	('nhanvien1','123456',2,'Trần Thị B','0987654321','456 Hai Bà Trưng, Quận 3','nhanvien1@example.com','2025-05-12 15:50:56','2025-05-12 15:50:56');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
