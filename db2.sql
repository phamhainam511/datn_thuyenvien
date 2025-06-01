-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2025 at 07:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db2`
--

-- --------------------------------------------------------

--
-- Table structure for table `bangluong`
--

CREATE TABLE `bangluong` (
  `id_bangluong` int(11) NOT NULL,
  `thuyenvien_id` int(11) NOT NULL,
  `luongcb` decimal(10,0) NOT NULL,
  `tigia` decimal(10,0) NOT NULL,
  `socong` int(11) NOT NULL,
  `thoigian` date NOT NULL,
  `tongtien` decimal(10,0) NOT NULL,
  `phuongthuc` varchar(45) NOT NULL,
  `tinhtrang` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chucvu`
--

CREATE TABLE `chucvu` (
  `id_chucvu` int(11) NOT NULL,
  `tenchucvu` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chucvu`
--

INSERT INTO `chucvu` (`id_chucvu`, `tenchucvu`, `createdAt`, `updatedAt`) VALUES
(1, 'Thuyền trưởng', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(2, 'Đại phó', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(3, 'Phó 2', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(4, 'Phó 3', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(5, 'Thủy thủ trưởng', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(6, 'Thủy thủ', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(7, 'Thợ máy boong', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(8, 'Sỹ quan máy', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(9, 'Thợ máy', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(10, 'No1 CLR', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(11, 'Đầu bếp trưởng', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(12, 'Phụ bếp', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(13, 'Điện trưởng', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(14, 'Thợ điện', '2025-05-28 11:32:12', '2025-05-28 11:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `chucvu_chungchi`
--

CREATE TABLE `chucvu_chungchi` (
  `id_chungchi_chucvu` int(11) NOT NULL,
  `chucvu_id` int(11) NOT NULL,
  `chungchi_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chungchi`
--

CREATE TABLE `chungchi` (
  `id_chungchi` int(11) NOT NULL,
  `tenchungchi` varchar(255) NOT NULL,
  `tieuchuanapdung` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chungchi`
--

INSERT INTO `chungchi` (`id_chungchi`, `tenchungchi`, `tieuchuanapdung`, `createdAt`, `updatedAt`) VALUES
(1, 'Passport', 'Standard-1', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(2, 'Seaman’s Book', 'Standard-2', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(3, 'Cert of competency', 'Standard-3', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(4, 'Basic training cert', 'Standard-4', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(5, 'Adv fire fighting cert', 'Standard-5', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(6, 'Medical first aid và Medical care cert', 'Standard-6', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(7, 'Survival craft và Rescue boats cert', 'Standard-7', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(8, 'Radar cert', 'Standard-8', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(9, 'Arpa cert', 'Standard-9', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(10, 'General Operator’s cert', 'Standard-10', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(11, 'Endorserment of issua GOC cert', 'Standard-11', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(12, 'Bridge team management', 'Standard-12', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(13, 'Engine team management', 'Standard-13', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(14, 'Electronic navigation system (ECDIS)', 'Standard-14', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(15, 'Ship sercurity officer cert', 'Standard-15', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(16, 'Ship sercurity awareness', 'Standard-16', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(17, 'Ship Designated sercurity', 'Standard-17', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(18, 'Health care', 'Standard-18', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(19, 'Cholera cert', 'Standard-19', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(20, 'Fever cert', 'Standard-20', '2025-05-28 11:32:12', '2025-05-28 11:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `hopdong`
--

CREATE TABLE `hopdong` (
  `id_hopdong` int(11) NOT NULL,
  `thuyenvien_id` int(11) NOT NULL,
  `ngayky` datetime NOT NULL,
  `ngayhethan` datetime NOT NULL,
  `ngaythanhly` datetime DEFAULT NULL,
  `trangthaihopdong` varchar(45) NOT NULL,
  `hinhanh` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hopdong`
--

INSERT INTO `hopdong` (`id_hopdong`, `thuyenvien_id`, `ngayky`, `ngayhethan`, `ngaythanhly`, `trangthaihopdong`, `hinhanh`, `createdAt`, `updatedAt`) VALUES
(2, 1, '2025-05-29 00:00:00', '2026-05-29 00:00:00', NULL, 'Có hiệu lực', '/uploads/contract/cons_1748527190328.pdf', '2025-05-29 13:59:50', '2025-05-29 13:59:50');

-- --------------------------------------------------------

--
-- Table structure for table `lichsuditau`
--

CREATE TABLE `lichsuditau` (
  `id_lichsuditau` int(11) NOT NULL,
  `thuyenvien_id` int(11) NOT NULL,
  `chucvu_id` int(11) NOT NULL,
  `tau_id` int(11) NOT NULL,
  `timexuatcanh` datetime NOT NULL,
  `timelentau` datetime NOT NULL,
  `ngayroitau` date DEFAULT NULL,
  `cangroitau` varchar(50) DEFAULT NULL,
  `quoctich_thuyen` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lichsuditau`
--

INSERT INTO `lichsuditau` (`id_lichsuditau`, `thuyenvien_id`, `chucvu_id`, `tau_id`, `timexuatcanh`, `timelentau`, `ngayroitau`, `cangroitau`, `quoctich_thuyen`, `createdAt`, `updatedAt`) VALUES
(3, 1, 1, 1, '2025-05-28 17:14:00', '2025-06-06 04:13:00', '2025-07-07', 'Cảng Tieen Sa', 'MỸ', '2025-05-29 13:10:41', '2025-05-29 13:10:41'),
(4, 1, 2, 1, '2025-05-29 03:33:00', '2025-05-30 13:31:00', '2025-06-26', 'Cảng Tieen Sa', 'MỸ', '2025-05-29 13:36:01', '2025-05-29 13:36:01'),
(5, 1, 1, 2, '2025-05-20 13:39:00', '2025-05-21 13:39:00', '2025-05-29', NULL, NULL, '2025-05-29 13:39:59', '2025-05-29 13:53:04');

-- --------------------------------------------------------

--
-- Table structure for table `loaitau`
--

CREATE TABLE `loaitau` (
  `id_loaitau` int(11) NOT NULL,
  `tenloaitau` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loaitau`
--

INSERT INTO `loaitau` (`id_loaitau`, `tenloaitau`, `createdAt`, `updatedAt`) VALUES
(1, 'Tàu hàng', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(2, 'Tàu gỗ', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(3, 'Tàu công', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(4, 'Tàu dầu (Oil Tanker)', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(5, 'Tàu khí (Gas Tanker)', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(6, 'Tàu hóa chất (Chemical Tanker)', '2025-05-28 11:32:12', '2025-05-28 11:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `phanquyen`
--

CREATE TABLE `phanquyen` (
  `id_phanquyen` int(11) NOT NULL,
  `tenphanquyen` varchar(30) NOT NULL,
  `mota` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phanquyen`
--

INSERT INTO `phanquyen` (`id_phanquyen`, `tenphanquyen`, `mota`, `createdAt`, `updatedAt`) VALUES
(1, 'Quản trị viên', 'Quản lý toàn bộ hệ thống', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(2, 'Nhân viên nhân sự', 'Sử dụng chức năng quản lý hồ sơ', '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(3, 'Nhân viên kế toán', 'Sử dụng chức năng quản lý lương', '2025-05-28 11:32:12', '2025-05-28 11:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('01-create-thuyenvien.js'),
('02-create-chucvu.js'),
('03-create-chungchi.js'),
('04-create-chucvu_chungchi.js'),
('05-create-loaitau.js'),
('06-create-tau.js'),
('07-create-bangluong.js'),
('08-create-hopdong.js'),
('09-create-lichsuditau.js'),
('10-create-phanquyen.js'),
('11-create-taikhoannganhang.js'),
('12-create-thannhan.js'),
('13-create-thuyenvien_chungchi.js'),
('14-create-thuyenvien-hocvan.js'),
('15-create-thuyenvien-ngoaingu.js'),
('16-create-thuyenvien-tailieu.js'),
('17-create-user-1.js');

-- --------------------------------------------------------

--
-- Table structure for table `taikhoannganhang`
--

CREATE TABLE `taikhoannganhang` (
  `thuyenvien_id` int(11) NOT NULL,
  `stk` varchar(15) NOT NULL,
  `tentaikhoan` varchar(45) NOT NULL,
  `tennganhang` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tau`
--

CREATE TABLE `tau` (
  `id_tau` int(11) NOT NULL,
  `tentau` varchar(45) NOT NULL,
  `quoctich` varchar(30) NOT NULL,
  `loaitau_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tau`
--

INSERT INTO `tau` (`id_tau`, `tentau`, `quoctich`, `loaitau_id`, `createdAt`, `updatedAt`) VALUES
(1, 'JAL KAMAL', 'MARSHALL ISLANDS', 1, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(2, 'GUO MAO 1', 'Togo', 2, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(3, 'AMIS INTEGRITY', 'PANAMA', 3, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(4, 'KAMARES', 'PANAMA', 4, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(5, 'SEACON OSAKA', 'PANAMA', 1, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(6, 'SEACON VICTORY', 'PANAMA', 2, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(7, 'FOREST 6', 'HONG KONG', 3, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(8, 'SEACON RIZHAO', 'PANAMA', 5, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(9, 'SKY HEIGHT', 'PANAMA', 1, '2025-05-28 11:32:12', '2025-05-28 11:32:12'),
(10, 'SCO SHANGHAI', 'MARSHALL ISLANDS', 2, '2025-05-28 11:32:12', '2025-05-28 11:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `thannhan`
--

CREATE TABLE `thannhan` (
  `id_thannhan` int(11) NOT NULL,
  `thuyenvien_id` int(11) NOT NULL,
  `hotenbo` varchar(45) DEFAULT NULL,
  `sdtbo` varchar(11) DEFAULT NULL,
  `hotenme` varchar(45) DEFAULT NULL,
  `sdtme` varchar(11) DEFAULT NULL,
  `hotenvo` varchar(45) DEFAULT NULL,
  `sdtvo` varchar(11) DEFAULT NULL,
  `nguoigiamho` varchar(45) DEFAULT NULL,
  `sdtgiamho` varchar(11) DEFAULT NULL,
  `diachi` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuyenvien`
--

CREATE TABLE `thuyenvien` (
  `id_thuyenvien` int(11) NOT NULL,
  `anh` varchar(100) DEFAULT NULL,
  `hoten` varchar(45) NOT NULL,
  `ngaysinh` date NOT NULL,
  `cccd` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `sodienthoai` varchar(45) NOT NULL,
  `chieucao` int(11) NOT NULL,
  `sizegiaybaoho` int(11) NOT NULL,
  `cannang` float NOT NULL,
  `nhommau` varchar(5) NOT NULL,
  `sizegiay` int(11) NOT NULL,
  `tinhtranghonnhan` varchar(20) NOT NULL,
  `trangthai` varchar(20) NOT NULL,
  `ghichu` varchar(255) DEFAULT NULL,
  `thoigian_lenTauDuKien` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thuyenvien`
--

INSERT INTO `thuyenvien` (`id_thuyenvien`, `anh`, `hoten`, `ngaysinh`, `cccd`, `email`, `sodienthoai`, `chieucao`, `sizegiaybaoho`, `cannang`, `nhommau`, `sizegiay`, `tinhtranghonnhan`, `trangthai`, `ghichu`, `thoigian_lenTauDuKien`, `createdAt`, `updatedAt`) VALUES
(1, 'anh1.jpg', 'Nguyễn Văn A', '2004-06-15', '012345678901', 'vana@example.com', '0987654321', 170, 0, 65.5, 'A', 42, 'Độc thân', '', '', '1969-12-31 16:00:00', '2025-05-28 11:32:12', '2025-05-29 13:41:38'),
(2, 'anh2.jpg', 'Trần Thị B', '0000-00-00', '012345678902', 'thib@example.com', '0912345678', 160, 0, 50, 'A', 38, 'Đã kết hôn', '', NULL, NULL, '2025-05-28 11:32:12', '2025-05-28 11:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `thuyenvien_chungchi`
--

CREATE TABLE `thuyenvien_chungchi` (
  `id` int(11) NOT NULL,
  `id_thuyenvien` int(11) NOT NULL,
  `id_chungchi` int(11) NOT NULL,
  `sohieuchungchi` varchar(20) NOT NULL,
  `ngaycap` date NOT NULL,
  `ngayhethan` date NOT NULL,
  `noicap` varchar(100) NOT NULL,
  `xeploai` varchar(30) NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuyenvien_hocvan`
--

CREATE TABLE `thuyenvien_hocvan` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_thuyenvien` int(11) DEFAULT NULL,
  `truongdaotao` varchar(255) DEFAULT NULL,
  `hedaotao` varchar(255) DEFAULT NULL,
  `namtotnghiep` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuyenvien_ngoaingu`
--

CREATE TABLE `thuyenvien_ngoaingu` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_thuyenvien` int(11) DEFAULT NULL,
  `ngonngu` varchar(255) DEFAULT NULL,
  `tenchungchi` varchar(255) DEFAULT NULL,
  `diemso` float DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `ngaycap` datetime DEFAULT NULL,
  `ngayhethan` datetime DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuyenvien_tailieu`
--

CREATE TABLE `thuyenvien_tailieu` (
  `id` int(11) NOT NULL,
  `id_thuyenvien` int(11) NOT NULL,
  `cccd_mattruoc` varchar(255) DEFAULT NULL,
  `cccd_matsau` varchar(255) DEFAULT NULL,
  `phieutiemvacxin` varchar(255) DEFAULT NULL,
  `chungnhanvangda` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `taikhoan` varchar(30) NOT NULL,
  `matkhau` varchar(60) NOT NULL,
  `sdt` varchar(15) DEFAULT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hoten` varchar(255) DEFAULT NULL,
  `phanquyen_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`taikhoan`, `matkhau`, `sdt`, `diachi`, `email`, `hoten`, `phanquyen_id`, `createdAt`, `updatedAt`) VALUES
('admin02', '$2b$10$0rC0nTzgt.JtKxl.ba4dPufeFHffy8juZUCgq/2Nf6c/FxHTwobmK', '0865769653', 'Hải phòng', 'Anh09122003@gmail.com', 'Phạm Anh', 1, '2025-05-28 15:09:52', '2025-05-28 15:59:19'),
('nhanvien1', '123', '0909123456', '123 Lê Lợi, Quận 1', 'leilapham1123@gmail.com', 'Phạm Hải Nam', 2, '2025-05-28 15:12:46', '2025-05-28 15:42:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bangluong`
--
ALTER TABLE `bangluong`
  ADD PRIMARY KEY (`id_bangluong`),
  ADD KEY `thuyenvien_id` (`thuyenvien_id`);

--
-- Indexes for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`id_chucvu`),
  ADD UNIQUE KEY `tenchucvu` (`tenchucvu`);

--
-- Indexes for table `chucvu_chungchi`
--
ALTER TABLE `chucvu_chungchi`
  ADD PRIMARY KEY (`id_chungchi_chucvu`),
  ADD KEY `chucvu_id` (`chucvu_id`),
  ADD KEY `chungchi_id` (`chungchi_id`);

--
-- Indexes for table `chungchi`
--
ALTER TABLE `chungchi`
  ADD PRIMARY KEY (`id_chungchi`),
  ADD UNIQUE KEY `tenchungchi` (`tenchungchi`);

--
-- Indexes for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD PRIMARY KEY (`id_hopdong`),
  ADD KEY `tvhd_thuyenvien` (`thuyenvien_id`);

--
-- Indexes for table `lichsuditau`
--
ALTER TABLE `lichsuditau`
  ADD PRIMARY KEY (`id_lichsuditau`),
  ADD KEY `thuyenvien_id` (`thuyenvien_id`),
  ADD KEY `chucvu_id` (`chucvu_id`),
  ADD KEY `tau_id` (`tau_id`);

--
-- Indexes for table `loaitau`
--
ALTER TABLE `loaitau`
  ADD PRIMARY KEY (`id_loaitau`);

--
-- Indexes for table `phanquyen`
--
ALTER TABLE `phanquyen`
  ADD PRIMARY KEY (`id_phanquyen`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `taikhoannganhang`
--
ALTER TABLE `taikhoannganhang`
  ADD PRIMARY KEY (`thuyenvien_id`);

--
-- Indexes for table `tau`
--
ALTER TABLE `tau`
  ADD PRIMARY KEY (`id_tau`),
  ADD KEY `loaitau_id` (`loaitau_id`);

--
-- Indexes for table `thannhan`
--
ALTER TABLE `thannhan`
  ADD PRIMARY KEY (`id_thannhan`),
  ADD KEY `thuyenvien_id` (`thuyenvien_id`);

--
-- Indexes for table `thuyenvien`
--
ALTER TABLE `thuyenvien`
  ADD PRIMARY KEY (`id_thuyenvien`);

--
-- Indexes for table `thuyenvien_chungchi`
--
ALTER TABLE `thuyenvien_chungchi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_thuyenvien` (`id_thuyenvien`),
  ADD KEY `id_chungchi` (`id_chungchi`);

--
-- Indexes for table `thuyenvien_hocvan`
--
ALTER TABLE `thuyenvien_hocvan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_thuyenvien` (`id_thuyenvien`);

--
-- Indexes for table `thuyenvien_ngoaingu`
--
ALTER TABLE `thuyenvien_ngoaingu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_thuyenvien` (`id_thuyenvien`);

--
-- Indexes for table `thuyenvien_tailieu`
--
ALTER TABLE `thuyenvien_tailieu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_thuyenvien` (`id_thuyenvien`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`taikhoan`),
  ADD KEY `phanquyen_id` (`phanquyen_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bangluong`
--
ALTER TABLE `bangluong`
  MODIFY `id_bangluong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chucvu`
--
ALTER TABLE `chucvu`
  MODIFY `id_chucvu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `chucvu_chungchi`
--
ALTER TABLE `chucvu_chungchi`
  MODIFY `id_chungchi_chucvu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chungchi`
--
ALTER TABLE `chungchi`
  MODIFY `id_chungchi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `hopdong`
--
ALTER TABLE `hopdong`
  MODIFY `id_hopdong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lichsuditau`
--
ALTER TABLE `lichsuditau`
  MODIFY `id_lichsuditau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `loaitau`
--
ALTER TABLE `loaitau`
  MODIFY `id_loaitau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `phanquyen`
--
ALTER TABLE `phanquyen`
  MODIFY `id_phanquyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tau`
--
ALTER TABLE `tau`
  MODIFY `id_tau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `thannhan`
--
ALTER TABLE `thannhan`
  MODIFY `id_thannhan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thuyenvien`
--
ALTER TABLE `thuyenvien`
  MODIFY `id_thuyenvien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `thuyenvien_chungchi`
--
ALTER TABLE `thuyenvien_chungchi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thuyenvien_hocvan`
--
ALTER TABLE `thuyenvien_hocvan`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thuyenvien_ngoaingu`
--
ALTER TABLE `thuyenvien_ngoaingu`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thuyenvien_tailieu`
--
ALTER TABLE `thuyenvien_tailieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bangluong`
--
ALTER TABLE `bangluong`
  ADD CONSTRAINT `bangluong_ibfk_1` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chucvu_chungchi`
--
ALTER TABLE `chucvu_chungchi`
  ADD CONSTRAINT `chucvu_chungchi_ibfk_1` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chucvu_chungchi_ibfk_2` FOREIGN KEY (`chungchi_id`) REFERENCES `chungchi` (`id_chungchi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD CONSTRAINT `tvhd_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lichsuditau`
--
ALTER TABLE `lichsuditau`
  ADD CONSTRAINT `lichsuditau_ibfk_1` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lichsuditau_ibfk_2` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lichsuditau_ibfk_3` FOREIGN KEY (`tau_id`) REFERENCES `tau` (`id_tau`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taikhoannganhang`
--
ALTER TABLE `taikhoannganhang`
  ADD CONSTRAINT `taikhoannganhang_ibfk_1` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tau`
--
ALTER TABLE `tau`
  ADD CONSTRAINT `tau_ibfk_1` FOREIGN KEY (`loaitau_id`) REFERENCES `loaitau` (`id_loaitau`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thannhan`
--
ALTER TABLE `thannhan`
  ADD CONSTRAINT `thannhan_ibfk_1` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thuyenvien_chungchi`
--
ALTER TABLE `thuyenvien_chungchi`
  ADD CONSTRAINT `thuyenvien_chungchi_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `thuyenvien_chungchi_ibfk_2` FOREIGN KEY (`id_chungchi`) REFERENCES `chungchi` (`id_chungchi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thuyenvien_hocvan`
--
ALTER TABLE `thuyenvien_hocvan`
  ADD CONSTRAINT `thuyenvien_hocvan_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thuyenvien_ngoaingu`
--
ALTER TABLE `thuyenvien_ngoaingu`
  ADD CONSTRAINT `thuyenvien_ngoaingu_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thuyenvien_tailieu`
--
ALTER TABLE `thuyenvien_tailieu`
  ADD CONSTRAINT `thuyenvien_tailieu_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`phanquyen_id`) REFERENCES `phanquyen` (`id_phanquyen`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
