-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2025 at 03:52 PM
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
-- Database: `db1`
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
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bangluong`
--

INSERT INTO `bangluong` (`id_bangluong`, `thuyenvien_id`, `luongcb`, `tigia`, `socong`, `thoigian`, `tongtien`, `phuongthuc`, `tinhtrang`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1500, 23000, 23, '2025-05-01', 23000000, 'Ngày lên tàu', 'Chưa thanh toán', '2025-05-12 08:48:23', '2025-05-12 08:49:23'),
(2, 2, 1200, 23000, 24, '2025-04-01', 24000000, 'Ngày xuất cảnh', 'Đã thanh toán', '2025-05-12 08:48:23', '2025-05-12 08:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `chucvu`
--

CREATE TABLE `chucvu` (
  `id_chucvu` int(11) NOT NULL,
  `tenchucvu` varchar(30) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chucvu`
--

INSERT INTO `chucvu` (`id_chucvu`, `tenchucvu`, `createdAt`, `updatedAt`) VALUES
(1, 'Thuyền trưởng', '2025-05-12 09:24:05', '2025-05-12 09:24:05'),
(2, 'Sỹ quan boong', '2025-05-12 09:24:05', '2025-05-12 09:24:05'),
(3, 'Máy trưởng', '2025-05-12 09:24:05', '2025-05-12 09:24:05'),
(4, 'Thợ máy', '2025-05-12 09:24:05', '2025-05-12 09:24:05'),
(5, 'Thủy thủ', '2025-05-12 09:24:05', '2025-05-12 09:24:05'),
(6, 'Điện viên', '2025-05-12 09:24:05', '2025-05-12 09:24:05'),
(7, 'Bếp trưởng', '2025-05-12 09:24:05', '2025-05-12 09:24:05');

-- --------------------------------------------------------

--
-- Table structure for table `chucvu_chungchi`
--

CREATE TABLE `chucvu_chungchi` (
  `id_chungchi_chucvu` int(11) NOT NULL,
  `chucvu_id` int(11) NOT NULL,
  `chungchi_id` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chungchi`
--

CREATE TABLE `chungchi` (
  `id_chungchi` int(11) NOT NULL,
  `tenchungchi` varchar(45) NOT NULL,
  `tieuchuanapdung` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chungchi`
--

INSERT INTO `chungchi` (`id_chungchi`, `tenchungchi`, `tieuchuanapdung`, `createdAt`, `updatedAt`) VALUES
(1, 'Chứng chỉ An toàn', 'ISO 9001', '2025-05-12 08:50:04', '2025-05-12 08:50:04'),
(2, 'Chứng chỉ Hàng hải', 'SOLAS', '2025-05-12 08:50:04', '2025-05-12 08:50:04'),
(3, 'Chứng chỉ Y tế', 'WHO', '2025-05-12 08:50:04', '2025-05-12 08:50:04');

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
  `hinhanh` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hopdong`
--

INSERT INTO `hopdong` (`id_hopdong`, `thuyenvien_id`, `ngayky`, `ngayhethan`, `ngaythanhly`, `trangthaihopdong`, `hinhanh`) VALUES
(1, 1, '2024-01-10 09:00:00', '2025-01-10 09:00:00', '2025-01-11 10:00:00', 'Đã thanh lý', '/uploads/contracts/hopdong_1.pdf'),
(2, 2, '2024-03-01 10:30:00', '2025-03-01 10:30:00', '2025-03-05 14:00:00', 'Đã thanh lý', '/uploads/contracts/hopdong_2.pdf'),
(3, 3, '2024-05-20 08:00:00', '2025-05-20 08:00:00', NULL, 'Có hiệu lực', '/uploads/contracts/hopdong_3.pdf'),
(4, 4, '2025-01-01 13:15:00', '2026-01-01 13:15:00', NULL, 'Có hiệu lực', '/uploads/contracts/hopdong_4.pdf'),
(5, 5, '2025-04-15 07:00:00', '2026-04-15 07:00:00', '2026-04-18 15:00:00', 'Đã thanh lý', '/uploads/contracts/hopdong_5.pdf'),
(6, 6, '2025-05-01 09:00:00', '2026-05-01 09:00:00', NULL, 'Chờ thanh lý', '/uploads/contracts/hopdong_6.pdf'),
(7, 7, '2025-05-10 10:00:00', '2026-05-10 10:00:00', NULL, 'Chờ thanh lý', '/uploads/contracts/hopdong_7.pdf'),
(8, 8, '2025-05-15 08:30:00', '2026-05-15 08:30:00', NULL, 'Chờ thanh lý', '/uploads/contracts/hopdong_8.pdf'),
(9, 11, '2025-05-17 00:00:00', '2026-05-17 00:00:00', '2025-05-22 12:07:39', 'Đã thanh lý', '/uploads/contract/cons_1747915476348.pdf');

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
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lichsuditau`
--

INSERT INTO `lichsuditau` (`id_lichsuditau`, `thuyenvien_id`, `chucvu_id`, `tau_id`, `timexuatcanh`, `timelentau`, `ngayroitau`, `cangroitau`, `quoctich_thuyen`, `createdAt`, `updatedAt`) VALUES
(7, 1, 7, 2, '2025-05-16 00:00:00', '2025-01-01 01:00:00', '2025-05-23', 'Cảng Tieen Sa', '', '2025-05-12 09:25:48', '2025-05-16 08:01:06'),
(8, 2, 1, 2, '2025-05-06 00:00:00', '2024-12-31 23:00:00', '2025-05-17', 'Cảng Đà Nẵng', '', '2025-05-12 09:25:48', '2025-05-16 07:56:19'),
(9, 1, 1, 1, '2025-05-17 00:00:00', '2025-01-01 01:45:00', '2025-05-18', 'Cảng Đà Nẵng', '', '2025-05-16 08:45:48', '2025-05-16 08:50:16'),
(10, 1, 3, 3, '2025-05-17 00:00:00', '2025-01-01 01:00:00', '2025-05-18', 'ABC', '', '2025-05-16 20:32:16', '2025-05-16 20:32:16'),
(11, 1, 2, 1, '2025-05-21 00:00:00', '2025-09-22 11:14:00', NULL, NULL, NULL, '2025-05-22 11:14:56', '2025-05-22 11:14:56'),
(12, 9, 1, 2, '2025-05-22 00:00:00', '2025-05-23 11:17:00', '2025-05-25', 'Cảng Tieen Sa', 'MỸ', '2025-05-22 11:17:33', '2025-05-22 11:18:34'),
(13, 11, 1, 2, '2025-05-22 00:00:00', '2025-05-22 15:02:00', '2025-05-22', 'Cảng Tieen Sa', 'MỸ', '2025-05-22 12:02:53', '2025-05-22 12:03:31'),
(14, 11, 1, 2, '2025-05-22 00:00:00', '2025-05-23 12:05:00', '2025-05-22', 'Cảng Tieen Sa', 'MỸ', '2025-05-22 12:05:31', '2025-05-22 12:05:47'),
(15, 11, 1, 1, '2025-05-22 00:00:00', '2025-05-23 12:06:00', '2025-05-22', 'Cảng Tieen Sa', 'MỸ', '2025-05-22 12:06:52', '2025-05-22 12:07:29');

-- --------------------------------------------------------

--
-- Table structure for table `loaitau`
--

CREATE TABLE `loaitau` (
  `id_loaitau` int(11) NOT NULL,
  `tenloaitau` varchar(30) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loaitau`
--

INSERT INTO `loaitau` (`id_loaitau`, `tenloaitau`, `createdAt`, `updatedAt`) VALUES
(1, 'Tàu hàng', '2025-05-12 08:50:21', '2025-05-12 08:50:21'),
(2, 'Tàu dầu', '2025-05-12 08:50:21', '2025-05-12 08:50:21'),
(3, 'Tàu công', '2025-05-12 08:50:21', '2025-05-12 08:50:21'),
(4, 'Tàu hóa chất', '2025-05-12 08:50:21', '2025-05-12 08:50:21');

-- --------------------------------------------------------

--
-- Table structure for table `phanquyen`
--

CREATE TABLE `phanquyen` (
  `id_phanquyen` int(11) NOT NULL,
  `tenphanquyen` varchar(30) NOT NULL,
  `mota` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phanquyen`
--

INSERT INTO `phanquyen` (`id_phanquyen`, `tenphanquyen`, `mota`, `createdAt`, `updatedAt`) VALUES
(1, 'Quản trị viên', 'Quản lý toàn bộ hệ thống', '2025-05-12 08:50:21', '2025-05-12 08:50:21'),
(2, 'Nhân viên nhân sự', 'Sử dụng chức năng quản lý hồ sơ', '2025-05-12 08:50:21', '2025-05-12 08:50:21'),
(3, 'Nhân viên kế toán', 'Sử dụng chức năng quản lý lương', '2025-05-12 08:50:21', '2025-05-12 08:50:21');

-- --------------------------------------------------------

--
-- Table structure for table `taikhoannganhang`
--

CREATE TABLE `taikhoannganhang` (
  `thuyenvien_id` int(11) NOT NULL,
  `stk` varchar(15) NOT NULL,
  `tentaikhoan` varchar(45) NOT NULL,
  `tennganhang` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taikhoannganhang`
--

INSERT INTO `taikhoannganhang` (`thuyenvien_id`, `stk`, `tentaikhoan`, `tennganhang`, `createdAt`, `updatedAt`) VALUES
(1, '123456789012345', 'Nguyen Van A', 'Vietcombank', '2025-05-22 10:41:01', '2025-05-22 10:41:01'),
(2, '987654321098765', 'Tran Thi B', 'ACB', '2025-05-22 10:41:01', '2025-05-22 10:41:01'),
(3, '112233445566778', 'Le Van C', 'Techcombank', '2025-05-22 10:41:01', '2025-05-22 10:41:01'),
(4, '998877665544332', 'Pham Thi D', 'BIDV', '2025-05-22 10:41:01', '2025-05-22 10:41:01'),
(5, '556677889900112', 'Hoang Van E', 'MB Bank', '2025-05-22 10:41:01', '2025-05-22 10:41:01'),
(9, '0123456789', 'Phạm Hải Nam', 'Vietcombank', '2025-05-22 11:09:32', '2025-05-22 11:09:32'),
(10, '0123456789', 'Phạm Hải Nam', 'Vietcombank', '2025-05-22 11:44:35', '2025-05-22 11:44:35'),
(11, '0123456789', 'Pham Duc Trung', 'Techcombank', '2025-05-22 12:02:26', '2025-05-22 12:02:26');

-- --------------------------------------------------------

--
-- Table structure for table `tau`
--

CREATE TABLE `tau` (
  `id_tau` int(11) NOT NULL,
  `tentau` varchar(45) NOT NULL,
  `quoctich` varchar(30) NOT NULL,
  `loaitau_id` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tau`
--

INSERT INTO `tau` (`id_tau`, `tentau`, `quoctich`, `loaitau_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Tàu Biển Đông 01', 'Việt Nam', 1, '2025-05-12 08:50:37', '2025-05-12 08:50:37'),
(2, 'Pacific Voyager', 'Singapore', 2, '2025-05-12 08:50:37', '2025-05-12 08:50:37'),
(3, 'Ocean Dream', 'Nhật Bản', 3, '2025-05-12 08:50:37', '2025-05-12 08:50:37');

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
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thannhan`
--

INSERT INTO `thannhan` (`id_thannhan`, `thuyenvien_id`, `hotenbo`, `sdtbo`, `hotenme`, `sdtme`, `hotenvo`, `sdtvo`, `nguoigiamho`, `sdtgiamho`, `diachi`, `createdAt`, `updatedAt`) VALUES
(1, 1, '', '', 'aasdsa', 'aadsdsa', 'b', 'a', 'a', 'b', 'aasdsa', '2025-05-16 03:05:52', '2025-05-16 08:03:34'),
(2, 3, '1', '2', '3', '4', '5', '6', '7', '8', '9', '2025-05-17 10:40:30', '2025-05-17 10:40:30'),
(3, 7, '1', '2', '3', '4', '5', '6', '7', '8', '9', '2025-05-18 07:52:11', '2025-05-18 07:52:11'),
(4, 8, '1', '2', '3', '4', '5', '6', '7', '8', '9', '2025-05-18 07:58:16', '2025-05-18 07:58:16');

-- --------------------------------------------------------

--
-- Table structure for table `thuyenvien`
--

CREATE TABLE `thuyenvien` (
  `id_thuyenvien` int(11) NOT NULL,
  `anh` varchar(100) DEFAULT NULL,
  `hoten` varchar(45) NOT NULL,
  `cccd` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `sodienthoai` varchar(45) NOT NULL,
  `chieucao` int(11) NOT NULL,
  `cannang` float NOT NULL,
  `nhommau` varchar(5) NOT NULL,
  `sizegiay` int(11) NOT NULL,
  `tinhtranghonnhan` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  `ngaysinh` date DEFAULT NULL,
  `sizegiaybaoho` int(11) DEFAULT NULL,
  `trangthai` varchar(255) NOT NULL DEFAULT 'Đang chờ tàu',
  `ghichu` text DEFAULT NULL,
  `thoigian_lenTauDuKien` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thuyenvien`
--

INSERT INTO `thuyenvien` (`id_thuyenvien`, `anh`, `hoten`, `cccd`, `email`, `sodienthoai`, `chieucao`, `cannang`, `nhommau`, `sizegiay`, `tinhtranghonnhan`, `createdAt`, `updatedAt`, `ngaysinh`, `sizegiaybaoho`, `trangthai`, `ghichu`, `thoigian_lenTauDuKien`) VALUES
(1, '/uploads/crew_photos/crew_photo_1747580101125.jpg', 'Nguyễn Văn AAAAA', '0123456789011', 'vana@example.com', '0987654321', 170, 65.5, 'A', 42, 'Độc thân', '2025-05-12 08:50:37', '2025-05-22 11:14:56', '2020-01-01', 42, 'Đang trên tàu', NULL, NULL),
(2, 'anh2.jpg', 'Trần Thị B', '012345678902', 'thib@example.com', '0912345678', 160, 50, 'A', 38, 'Đã kết hôn', '2025-05-12 08:50:37', '2025-05-12 08:50:37', '1999-01-01', 43, '', NULL, NULL),
(3, NULL, 'Nguyen van 1', '0123456789011', 'anhnguyenhoang321@gmail.com', '0987654321', 170, 65, 'A', 42, 'Độc thân', '2025-05-17 10:40:30', '2025-05-17 10:40:30', '2025-05-18', 42, '', NULL, NULL),
(4, NULL, '1', '2', 'anhnguyenhoang321@gmail.com', '0987654321', 3, 4, 'A', 6, 'Độc thân', '2025-05-17 11:46:14', '2025-05-17 11:46:14', '2025-05-18', 7, '', NULL, NULL),
(5, NULL, 'Nguyễn Văn AA', '0123456789011', 'anhnguyenhoang321@gmail.com', '0987654321', 170, 12, 'A', 6, 'Độc thân', '2025-05-17 11:54:57', '2025-05-17 12:10:21', '2025-05-18', 42, 'Đang chờ tàu', NULL, NULL),
(6, NULL, 'Nguyễn Văn AA', '123123', 'anhnguyenhoang321@gmail.com', '0987654321', 123, 123, 'A', 1, 'Độc thân', '2025-05-17 12:45:04', '2025-05-17 12:45:04', '2025-05-18', 1, 'Đang trên bờ', NULL, NULL),
(7, NULL, 'Nguyễn Văn AA', '0123456789011', 'anhnguyenhoang321@gmail.com', '0987654321', 1, 1, 'A', 1, 'Độc thân', '2025-05-18 07:52:11', '2025-05-18 07:52:11', '2025-05-18', 1, 'Đang chờ tàu', NULL, NULL),
(8, '/uploads/crew_photos/crew_photo_1747580328088.jpg', 'TEST', '0123456789011', 'anhnguyenhoang321@gmail.com', '0987654321', 170, 60, 'A', 42, 'Độc thân', '2025-05-18 07:58:16', '2025-05-18 07:58:48', '2025-05-01', 42, 'Đang chờ tàu', NULL, NULL),
(9, NULL, 'Phạm Hải Nam ', '01122334455', 'phamanh09122003@gmail.com', '0334496575', 170, 80, 'B', 50, 'Độc thân', '2025-05-22 11:09:32', '2025-05-22 11:18:34', '2003-03-11', 50, 'Đang trên bờ', 'Đi tàu VN thui vì ko biết tiếng anh', NULL),
(10, NULL, 'Phạm Hải Nam ', '01122334455', 'leilapham1123@gmail.com', '0334496575', 170, 80, 'A', 0, 'Độc thân', '2025-05-22 11:44:35', '2025-05-22 11:51:48', '2000-12-23', 0, 'Đang chờ tàu', '', '2025-05-24'),
(11, NULL, 'Phạm Đức Trung', '01122334455', 'phamanh09122003@gmail.com', '0334496575', 170, 80, 'A', 50, 'Độc thân', '2025-05-22 12:02:26', '2025-05-22 12:07:29', '2003-12-12', 50, 'Đang chờ tàu', '', '2025-05-27');

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
  `ngayhethan` date DEFAULT NULL,
  `noicap` varchar(100) DEFAULT NULL,
  `xeploai` varchar(30) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `thuyenvien_chungchi`
--

INSERT INTO `thuyenvien_chungchi` (`id`, `id_thuyenvien`, `id_chungchi`, `sohieuchungchi`, `ngaycap`, `ngayhethan`, `noicap`, `xeploai`, `file`, `createdAt`, `updatedAt`) VALUES
(2, 1, 2, 'TEST1', '2025-05-16', '2025-05-16', 'TEST', 'TEST', '/uploads/crew_certificates/crew_cert_1747455804565.png', '2025-05-16 21:23:24', '2025-05-17 08:38:36'),
(3, 4, 1, '123123', '2025-05-18', '2025-05-18', '123123', '123123', NULL, '2025-05-17 11:46:14', '2025-05-17 11:46:14'),
(4, 4, 2, '123123', '2025-05-01', '2025-05-01', '123123', '123123', NULL, '2025-05-17 11:46:14', '2025-05-17 11:46:14'),
(5, 5, 3, '123123', '2025-05-18', '2025-05-18', '123123', '123123', '/uploads/crew_certificates/crew_cert__1747508097657.jpg', '2025-05-17 11:54:57', '2025-05-17 11:54:57'),
(6, 6, 2, '123123', '2025-05-18', '2025-05-19', '123123', '123123', '/uploads/crew_certificates/crew_cert__1747511104013.jpg', '2025-05-17 12:45:04', '2025-05-17 12:45:04'),
(7, 7, 1, '123123', '2025-05-01', '2025-05-23', '123123', '123123', '/uploads/crew_certificates/crew_cert__1747579931343.png', '2025-05-18 07:52:11', '2025-05-18 07:52:11'),
(8, 8, 2, 'ABC', '2025-05-18', '2025-05-19', 'HANOI', 'TOT', '/uploads/crew_certificates/crew_cert__1747580296359.jpg', '2025-05-18 07:58:16', '2025-05-18 07:58:16'),
(9, 1, 2, '123123', '2024-07-27', '2025-06-27', 'HP', 'ok', NULL, '2025-05-22 10:42:49', '2025-05-22 10:45:17'),
(10, 9, 1, '123456', '2024-07-23', '2025-07-23', 'DHHHVN', 'Tốt', NULL, '2025-05-22 11:09:32', '2025-05-22 11:09:32'),
(11, 10, 1, '123456', '2024-12-23', '2025-05-23', '', '', NULL, '2025-05-22 11:44:35', '2025-05-22 11:44:35'),
(12, 11, 1, '123456', '2024-06-18', '2025-06-18', 'DHHHVN', 'Tốt', NULL, '2025-05-22 12:02:26', '2025-05-22 12:02:26');

-- --------------------------------------------------------

--
-- Table structure for table `thuyenvien_hocvan`
--

CREATE TABLE `thuyenvien_hocvan` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_thuyenvien` INT(11) DEFAULT NULL,
  `truongdaotao` VARCHAR(255) DEFAULT NULL,
  `hedaotao` VARCHAR(255) DEFAULT NULL,
  `namtotnghiep` INT(11) DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_hocvan_thuyenvien`
    FOREIGN KEY (`id_thuyenvien`) 
    REFERENCES `thuyenvien` (`id_thuyenvien`) 
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thuyenvien_hocvan`
--

INSERT INTO `thuyenvien_hocvan` (`id`, `id_thuyenvien`, `truongdaotao`, `hedaotao`, `namtotnghiep`, `createdAt`, `updatedAt`) VALUES
(3, 1, 'ABCD', 'Cao đẳng', 123123, '2025-05-16 20:48:17', '2025-05-18 07:55:12'),
(4, 3, 'ABC', 'Cao đẳng', 2025, '2025-05-17 10:40:30', '2025-05-17 10:40:30'),
(5, 4, 'ABC', 'Trung cấp', 1999, '2025-05-17 11:46:14', '2025-05-17 11:46:14'),
(6, 5, 'AVX', 'Trung cấp', 1999, '2025-05-17 11:54:57', '2025-05-17 11:54:57'),
(7, 6, 'AVX', 'Trung cấp', 1999, '2025-05-17 12:45:04', '2025-05-17 12:45:04'),
(8, 7, 'AVX', 'Sau đại học', 1999, '2025-05-18 07:52:11', '2025-05-18 07:52:11'),
(9, 8, 'ABCD', 'Cao đẳng', 1999, '2025-05-18 07:58:16', '2025-05-18 07:58:16'),
(10, 9, 'ĐH Hàng Hải VN', 'Đại học', 2025, '2025-05-22 11:09:32', '2025-05-22 11:09:32'),
(11, 10, 'ĐH Hàng Hải VN', 'Cao đẳng', 2021, '2025-05-22 11:44:35', '2025-05-22 11:44:35'),
(12, 11, 'ĐH Hàng Hải VN', 'Đại học', 2025, '2025-05-22 12:02:26', '2025-05-22 12:02:26');

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
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  `ngaycap` date DEFAULT NULL,
  `ngayhethan` date DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thuyenvien_ngoaingu`
--

INSERT INTO `thuyenvien_ngoaingu` (`id`, `id_thuyenvien`, `ngonngu`, `tenchungchi`, `diemso`, `createdAt`, `updatedAt`, `ngaycap`, `ngayhethan`, `file`) VALUES
(3, 1, 'Tiếng Anh', 'IELTS', 7.5, '2025-05-16 21:11:30', '2025-05-16 21:11:30', '2025-05-17', '2025-05-18', '/uploads/language_certificates/lang_cert_1747455090263.pdf'),
(4, 4, 'Tiếng Anh', '12312', 12, '2025-05-17 11:46:14', '2025-05-17 11:46:14', '2025-05-18', '2025-05-18', NULL),
(5, 4, 'Tiếng Nhật', '123123', 213, '2025-05-17 11:46:14', '2025-05-17 11:46:14', '2025-05-14', '2025-05-16', NULL),
(6, 5, 'Tiếng Anh', '12312', 12, '2025-05-17 11:54:57', '2025-05-17 11:54:57', '2025-05-18', '2025-05-18', '/uploads/language_certificates/lang_cert__1747508097652.jpg'),
(7, 6, 'Tiếng Anh', '12312', 1, '2025-05-17 12:45:04', '2025-05-17 12:45:04', '2025-05-18', '2025-05-18', '/uploads/language_certificates/lang_cert__1747511104013.jpg'),
(8, 7, 'Tiếng Anh', '12312', 123, '2025-05-18 07:52:11', '2025-05-18 07:52:11', '2025-05-01', '2025-05-16', '/uploads/language_certificates/lang_cert__1747579931342.jpg'),
(9, 1, 'Tiếng Trung', 'TEST Còn hạn', 10, '2025-05-18 07:55:46', '2025-05-18 07:55:46', '2025-05-01', '2025-05-31', '/uploads/language_certificates/lang_cert_1747580146372.png'),
(10, 8, 'Tiếng Anh', 'IELTS', 8, '2025-05-18 07:58:16', '2025-05-18 07:58:16', '2025-05-01', '2025-05-17', '/uploads/language_certificates/lang_cert__1747580296357.png'),
(11, 9, 'Tiếng Anh', '', 0, '2025-05-22 11:09:32', '2025-05-22 11:09:32', NULL, NULL, NULL),
(12, 10, 'Tiếng Anh', '', 0, '2025-05-22 11:44:35', '2025-05-22 11:44:35', NULL, NULL, NULL),
(13, 11, 'Tiếng Anh', '', 0, '2025-05-22 12:02:26', '2025-05-22 12:02:26', NULL, NULL, NULL);

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
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thuyenvien_tailieu`
--

INSERT INTO `thuyenvien_tailieu` (`id`, `id_thuyenvien`, `cccd_mattruoc`, `cccd_matsau`, `phieutiemvacxin`, `chungnhanvangda`, `createdAt`, `updatedAt`) VALUES
(1, 1, '/uploads/documents/id_cards/cccd_mattruoc_1_1747580189504.png', '/uploads/documents/id_cards/cccd_matsau_1_1747580189507.jpg', '/uploads/documents/vaccination/phieutiemvacxin_1_1747580189513.jpg', '/uploads/documents/yellow_fever/chungnhanvangda_1_1747580189515.jpg', '2025-05-16 21:33:59', '2025-05-18 07:56:29'),
(2, 3, '/uploads/documents/id_cards/cccd_mattruoc_1747503629984.png', NULL, NULL, NULL, '2025-05-17 10:40:30', '2025-05-17 10:40:30'),
(3, 7, '/uploads/documents/id_cards/cccd_mattruoc_1747579931344.png', '/uploads/documents/id_cards/cccd_matsau_1747579931348.jpg', '/uploads/documents/vaccination/phieutiemvacxin_1747579931348.jpg', '/uploads/documents/yellow_fever/chungnhanvangda_1747579931351.jpg', '2025-05-18 07:52:11', '2025-05-18 07:52:11'),
(4, 8, '/uploads/documents/id_cards/cccd_mattruoc_1747580296360.jpg', '/uploads/documents/id_cards/cccd_matsau_1747580296361.jpg', '/uploads/documents/vaccination/phieutiemvacxin_1747580296362.jpg', '/uploads/documents/yellow_fever/chungnhanvangda_1747580296363.jpg', '2025-05-18 07:58:16', '2025-05-18 07:58:16');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `taikhoan` varchar(30) NOT NULL,
  `matkhau` varchar(60) NOT NULL,
  `phanquyen_id` int(11) NOT NULL,
  `hoten` varchar(255) DEFAULT NULL,
  `sdt` varchar(10) DEFAULT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`taikhoan`, `matkhau`, `phanquyen_id`, `hoten`, `sdt`, `diachi`, `email`, `createdAt`, `updatedAt`) VALUES
('admin', '123456', 1, 'Nguyễn Văn A', '0909123456', '123 Lê Lợi, Quận 1', 'admin@example.com', '2025-05-12 08:50:56', '2025-05-12 08:50:56'),
('ketoan1', '123456', 3, 'Trần Thị C', '0987654321', '456 Hai Bà Trưng, Quận 3', 'ketoan1@example.com', '2025-05-12 08:50:56', '2025-05-12 08:50:56'),
('nhanvien1', '123456', 2, 'Trần Thị B', '0987654321', '456 Hai Bà Trưng, Quận 3', 'nhanvien1@example.com', '2025-05-12 08:50:56', '2025-05-12 08:50:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bangluong`
--
ALTER TABLE `bangluong`
  ADD PRIMARY KEY (`id_bangluong`),
  ADD KEY `thuyenvien_bangluong_idx` (`thuyenvien_id`);

--
-- Indexes for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`id_chucvu`),
  ADD UNIQUE KEY `tenchucvu_UNIQUE` (`tenchucvu`);

--
-- Indexes for table `chucvu_chungchi`
--
ALTER TABLE `chucvu_chungchi`
  ADD PRIMARY KEY (`id_chungchi_chucvu`),
  ADD KEY `cvcc_chucvu_idx` (`chucvu_id`),
  ADD KEY `cvcc_chungchi_idx` (`chungchi_id`);

--
-- Indexes for table `chungchi`
--
ALTER TABLE `chungchi`
  ADD PRIMARY KEY (`id_chungchi`),
  ADD UNIQUE KEY `tenchungchi_UNIQUE` (`tenchungchi`);

--
-- Indexes for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD PRIMARY KEY (`id_hopdong`),
  ADD KEY `chitiet_hopdong_thuyenvien_idx` (`thuyenvien_id`);

--
-- Indexes for table `lichsuditau`
--
ALTER TABLE `lichsuditau`
  ADD PRIMARY KEY (`id_lichsuditau`),
  ADD KEY `thuyenvien_chuyentau_idx` (`thuyenvien_id`),
  ADD KEY `chuyentau_chucvu_idx` (`chucvu_id`),
  ADD KEY `lichsuditau_tau_idx` (`tau_id`);

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
-- Indexes for table `taikhoannganhang`
--
ALTER TABLE `taikhoannganhang`
  ADD PRIMARY KEY (`thuyenvien_id`);

--
-- Indexes for table `tau`
--
ALTER TABLE `tau`
  ADD PRIMARY KEY (`id_tau`),
  ADD KEY `tau_loaitau_idx` (`loaitau_id`);

--
-- Indexes for table `thannhan`
--
ALTER TABLE `thannhan`
  ADD PRIMARY KEY (`id_thannhan`),
  ADD KEY `thannhan_thuyenvien_idx` (`thuyenvien_id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thuyenvien_ngoaingu`
--
ALTER TABLE `thuyenvien_ngoaingu`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `user_phanquyen_idx` (`phanquyen_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bangluong`
--
ALTER TABLE `bangluong`
  MODIFY `id_bangluong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chucvu`
--
ALTER TABLE `chucvu`
  MODIFY `id_chucvu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chucvu_chungchi`
--
ALTER TABLE `chucvu_chungchi`
  MODIFY `id_chungchi_chucvu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chungchi`
--
ALTER TABLE `chungchi`
  MODIFY `id_chungchi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hopdong`
--
ALTER TABLE `hopdong`
  MODIFY `id_hopdong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lichsuditau`
--
ALTER TABLE `lichsuditau`
  MODIFY `id_lichsuditau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `loaitau`
--
ALTER TABLE `loaitau`
  MODIFY `id_loaitau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `phanquyen`
--
ALTER TABLE `phanquyen`
  MODIFY `id_phanquyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tau`
--
ALTER TABLE `tau`
  MODIFY `id_tau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `thannhan`
--
ALTER TABLE `thannhan`
  MODIFY `id_thannhan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `thuyenvien`
--
ALTER TABLE `thuyenvien`
  MODIFY `id_thuyenvien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `thuyenvien_chungchi`
--
ALTER TABLE `thuyenvien_chungchi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `thuyenvien_hocvan`
--
ALTER TABLE `thuyenvien_hocvan`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `thuyenvien_ngoaingu`
--
ALTER TABLE `thuyenvien_ngoaingu`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `thuyenvien_tailieu`
--
ALTER TABLE `thuyenvien_tailieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bangluong`
--
ALTER TABLE `bangluong`
  ADD CONSTRAINT `bangluong_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`);

--
-- Constraints for table `chucvu_chungchi`
--
ALTER TABLE `chucvu_chungchi`
  ADD CONSTRAINT `cvcc_chucvu` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`),
  ADD CONSTRAINT `cvcc_chungchi` FOREIGN KEY (`chungchi_id`) REFERENCES `chungchi` (`id_chungchi`);

--
-- Constraints for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD CONSTRAINT `tvhd_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`);

--
-- Constraints for table `lichsuditau`
--
ALTER TABLE `lichsuditau`
  ADD CONSTRAINT `lichsuditau_chucvu` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`),
  ADD CONSTRAINT `lichsuditau_tau` FOREIGN KEY (`tau_id`) REFERENCES `tau` (`id_tau`),
  ADD CONSTRAINT `lichsuditau_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`);

--
-- Constraints for table `taikhoannganhang`
--
ALTER TABLE `taikhoannganhang`
  ADD CONSTRAINT `nganhang_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`);

--
-- Constraints for table `tau`
--
ALTER TABLE `tau`
  ADD CONSTRAINT `tau_loaitau` FOREIGN KEY (`loaitau_id`) REFERENCES `loaitau` (`id_loaitau`);

--
-- Constraints for table `thannhan`
--
ALTER TABLE `thannhan`
  ADD CONSTRAINT `thannhan_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`);

--
-- Constraints for table `thuyenvien_chungchi`
--
ALTER TABLE `thuyenvien_chungchi`
  ADD CONSTRAINT `thuyenvien_chungchi_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE,
  ADD CONSTRAINT `thuyenvien_chungchi_ibfk_2` FOREIGN KEY (`id_chungchi`) REFERENCES `chungchi` (`id_chungchi`) ON DELETE CASCADE;

--
-- Constraints for table `thuyenvien_tailieu`
--
ALTER TABLE `thuyenvien_tailieu`
  ADD CONSTRAINT `thuyenvien_tailieu_ibfk_1` FOREIGN KEY (`id_thuyenvien`) REFERENCES `thuyenvien` (`id_thuyenvien`) ON DELETE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_phanquyen` FOREIGN KEY (`phanquyen_id`) REFERENCES `phanquyen` (`id_phanquyen`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
