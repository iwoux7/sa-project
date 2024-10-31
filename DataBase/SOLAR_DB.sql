-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 30, 2024 at 07:12 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SOLAR_DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `CUSTOMERS`
--

CREATE TABLE `CUSTOMERS` (
  `CUSTOMER_ID` varchar(50) NOT NULL,
  `USER_ID` varchar(50) NOT NULL,
  `CUSTOMER_NAME` varchar(255) NOT NULL,
  `CUSTOMER_PHONE_NUMBER` varchar(20) NOT NULL,
  `CUSTOMER_ADDRESS` varchar(255) DEFAULT NULL,
  `CUSTOMER_STATUS` varchar(50) DEFAULT NULL CHECK (`CUSTOMER_STATUS` in ('รอการตอบกลับ','ตอบกลับแล้ว','รอการชำระเงิน')),
  `CUSTOMER_QUESTION` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CUSTOMERS`
--

INSERT INTO `CUSTOMERS` (`CUSTOMER_ID`, `USER_ID`, `CUSTOMER_NAME`, `CUSTOMER_PHONE_NUMBER`, `CUSTOMER_ADDRESS`, `CUSTOMER_STATUS`, `CUSTOMER_QUESTION`) VALUES
('CUS001', 'U001', 'อินทิรา อัศวเทวิน', '0963571105', '123 หมู่ 5 ต.ปากช่อง อ.ปากช่อง จ.นครราชสีมา', 'รอการชำระเงิน', 'สามารถปรับมิเตอร์ให้รองรับการใช้งานเพิ่มได้ไหมคะ?'),
('CUS002', 'U002', 'กิตติยา ออมเมตร์', '0948569991', '45/3 ถ.ลาดพร้าว แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร', 'ตอบกลับแล้ว', 'อยากทราบราคาวรวมในการติดตั้งมิเตอร์ใหม่ค่ะ'),
('CUS003', 'U003', 'เมธาวี วงศ์พาณิช', '0642035932', '99 หมู่ 2 ต.บางรัก อ.เมือง จ.สุราษฎร์ธานี', 'ตอบกลับแล้ว', 'เพิ่มอุปกรณ์ตรวจจับค่าไฟได้ไหมคะ?'),
('CUS004', 'U004', 'ชนกันต์ เอกพิมลณ์', '0841258642', '10/5 ซอยอารีย์สัมพันธ์ แขวงพญาไท เขตพญาไท กรุงเทพมหานคร', 'รอการชำระเงิน', 'อยากสอบถามเกี่ยวกับค่าบริการติดตั้งเพิ่มเติมครับ'),
('CUS005', 'U005', 'เกรียงไกร วาณิช', '0641458683', '55/7 หมู่บ้านธนพล ต.มะขามเตี้ย อ.เมือง จ.สุราษฎร์ธานี', 'ตอบกลับแล้ว', 'สามารถเพิ่มฟังก์ชันการแจ้งเตือนได้ไหมครับ?'),
('CUS006', 'U006', 'คิมหันต์ ยศใหญ่', '0929748805', '34 หมู่ 9 ต.หนองแค อ.หนองแค จ.สระบุรี', 'รอการชำระเงิน', 'อยากทราบวิธีการเปลี่ยนประเก็นมิเตอร์ครับ'),
('CUS007', 'U007', 'ภานิตา ชาญรักษ์', '0931280954', '12 ถ.เจริญกรุง แขวงคลองต้นไทร เขตคลองสาน กรุงเทพมหานคร', 'รอการตอบกลับ', 'ขอข้อมูลเพิ่มเติมเกี่ยวกับฟังก์ชันการตรวจสอบการใช้งานค่ะ'),
('CUS008', 'U008', 'กีรติ หวัง', '0832397731', '58 ถ.เลี่ยงเมือง ต.ในเมือง อ.เมือง จ.นครราชสีมา', 'ตอบกลับแล้ว', 'อยากทราบค่าใช่จ่ายในการเปลี่ยนมิเตอร์ครับ'),
('CUS009', 'U009', 'พสุธร ตรีสมสกุล', '0864023067', '71/4 ซอยอ่อนนุช แขวงสวนหลวง เขตสวนหลวง กรุงเทพมหานคร', 'รอการตอบกลับ', 'ขอคำแนะนำในการติดตั้งมิเตอร์ใหม่ครับ');

--
-- Triggers `CUSTOMERS`
--
DELIMITER $$
CREATE TRIGGER `before_insert_customers` BEFORE INSERT ON `CUSTOMERS` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE next_customer_id VARCHAR(50);

    SELECT COALESCE(MAX(CAST(SUBSTRING(CUSTOMER_ID, 4) AS UNSIGNED)), 0) + 1 INTO next_id FROM CUSTOMERS;

    SET next_customer_id = CONCAT('CUS', LPAD(next_id, 3, '0'));

    SET NEW.CUSTOMER_ID = next_customer_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `CUSTOMER_ORDERS`
--

CREATE TABLE `CUSTOMER_ORDERS` (
  `ORDER_ID` varchar(50) NOT NULL,
  `ORDER_DATE` datetime NOT NULL,
  `CUSTOMER_ID` varchar(50) NOT NULL,
  `ORDER_DETAIL` text DEFAULT NULL,
  `ORDER_PRICE` decimal(10,2) NOT NULL CHECK (`ORDER_PRICE` >= 0),
  `PAYMENT_STATUS` varchar(50) DEFAULT NULL CHECK (`PAYMENT_STATUS` in ('รอชำระค่าชิ้นงานรอบแรก','รอยืนยันการชำระเงิน','ยืนยันการชำระเงินรอบแรก','ยืนยันการชำระเงินครบถ้วน')),
  `ORDER_PROCESS` varchar(50) DEFAULT NULL CHECK (`ORDER_PROCESS` in ('รอการตัดสินใจ','กำลังประกอบชิ้นงาน','ชิ้นงานประกอบเสร็จสิ้น','ส่งมอบชิ้นงานเรียบร้อย','ยกเลิกคำสั่งซื้อ')),
  `EXPECTED_FINISH_DATE` datetime DEFAULT NULL,
  `FINISHED_DATE` datetime DEFAULT NULL,
  `APPOINTMENT_DATE` datetime DEFAULT NULL,
  `QUOTATION_NO` varchar(50) DEFAULT NULL,
  `DEVICE_TYPE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CUSTOMER_ORDERS`
--

INSERT INTO `CUSTOMER_ORDERS` (`ORDER_ID`, `ORDER_DATE`, `CUSTOMER_ID`, `ORDER_DETAIL`, `ORDER_PRICE`, `PAYMENT_STATUS`, `ORDER_PROCESS`, `EXPECTED_FINISH_DATE`, `FINISHED_DATE`, `APPOINTMENT_DATE`, `QUOTATION_NO`, `DEVICE_TYPE`) VALUES
('110001', '2024-10-30 01:48:30', 'CUS001', 'ติดตั้งมิเตอร์ไฟฟ้า', 5000.00, 'รอชำระค่าชิ้นงานรอบแรก', 'รอการตัดสินใจ', '2024-11-15 15:00:00', NULL, '2024-10-10 14:00:00', 'QTN202410001', ''),
('110002', '2024-10-30 01:48:30', 'CUS002', 'บำรุงรักษาแผงโซลาร์เซลล์', 2000.00, 'ยืนยันการชำระเงินรอบแรก', 'กำลังประกอบชิ้นงาน', '2024-02-15 10:30:00', NULL, '2024-02-12 10:30:00', 'QTN202410002', ''),
('110003', '2024-10-30 01:48:30', 'CUS003', 'ติดตั้งแบตเตอรี่สำรอง 10 kWh', 15000.00, 'ยืนยันการชำระเงินครบถ้วน', 'ชิ้นงานประกอบเสร็จสิ้น', '2024-10-31 12:00:00', '2024-10-30 11:45:00', '2024-11-01 11:12:00', 'QTN202410003', ''),
('110004', '2024-10-30 01:48:30', 'CUS004', 'ซ่อมบำรุงอุปกรณ์โซลาร์เซลล์', 3000.00, 'รอชำระค่าชิ้นงานรอบแรก', 'ยกเลิกคำสั่งซื้อ', NULL, NULL, '2024-10-05 16:00:00', 'QTN202410004', ''),
('110005', '2024-10-30 01:48:30', 'CUS005', 'ติดตั้งระบบโซลาร์เซลล์ขนาด 5 kW', 45000.00, 'ยืนยันการชำระเงินครบถ้วน', 'ส่งมอบชิ้นงานเรียบร้อย', '2024-12-12 13:00:00', '2024-12-12 13:00:00', '2024-10-12 12:30:00', 'QTN202410005', '');

--
-- Triggers `CUSTOMER_ORDERS`
--
DELIMITER $$
CREATE TRIGGER `before_insert_customer_orders` BEFORE INSERT ON `CUSTOMER_ORDERS` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE next_order_id VARCHAR(50);

    SELECT COALESCE(MAX(CAST(SUBSTRING(ORDER_ID, 3) AS UNSIGNED)), 0) + 1 INTO next_id FROM CUSTOMER_ORDERS;

    SET next_order_id = CONCAT('1100', LPAD(next_id, 3, '0'));

    SET NEW.ORDER_ID = next_order_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_order` BEFORE INSERT ON `CUSTOMER_ORDERS` FOR EACH ROW BEGIN
    DECLARE running_no INT;
    DECLARE formatted_order_id VARCHAR(10);

    SET NEW.ORDER_DATE = CURRENT_TIMESTAMP;

    SET running_no = (SELECT IFNULL(MAX(CAST(SUBSTRING(ORDER_ID, 4) AS UNSIGNED)), 0) + 1 FROM CUSTOMER_ORDERS);
    
    SET formatted_order_id = CONCAT('110', LPAD(running_no, 3, '0'));

    SET NEW.ORDER_ID = formatted_order_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ELEMENTS`
--

CREATE TABLE `ELEMENTS` (
  `ELEMENT_ID` varchar(50) NOT NULL,
  `ELEMENT_NAME` varchar(100) NOT NULL,
  `ELEMENT_DETAIL` text DEFAULT NULL,
  `ELEMENT_UNIT_PRICE` decimal(10,2) DEFAULT NULL CHECK (`ELEMENT_UNIT_PRICE` >= 0),
  `ELEMENT_CATEGORY` varchar(50) DEFAULT NULL,
  `DEVICE_CATEGORY` varchar(50) DEFAULT NULL,
  `SUPPLIER_ID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ELEMENTS`
--

INSERT INTO `ELEMENTS` (`ELEMENT_ID`, `ELEMENT_NAME`, `ELEMENT_DETAIL`, `ELEMENT_UNIT_PRICE`, `ELEMENT_CATEGORY`, `DEVICE_CATEGORY`, `SUPPLIER_ID`) VALUES
('E00001', 'Deep Cycle Battery', 'แบตเตอรี่ Deep Cycle สำหรับการเก็บพลังงานในระบบโซลาร์เซลล์', 15000.00, 'BATTERY', 'BATTERY', 'SUP001'),
('E00002', 'Solar Panel 300W', 'แผงโซลาร์เซลล์ชนิด Polycrystalline ขนาด 300W สำหรับการผลิตไฟฟ้าในบ้าน', 7000.00, 'SOLAR CELL', 'SOLAR CELL', 'SUP002'),
('E00003', 'Inverter 5000W Hybrid', 'อินเวอร์เตอร์ 5000W รองรับการใช้งานร่วมกับระบบโซลาร์เซลล์และแบตเตอรี่', 25000.00, 'INVERTER', 'SOLAR CELL', 'SUP003'),
('E00004', 'Digital Energy Meter', 'มิเตอร์ไฟฟ้าดิจิทัลสำหรับวัดพลังงานในบ้าน ขนาด 1 เฟส', 3000.00, 'METER', 'METER', 'SUP003'),
('E00005', 'Smart Meter 3-Phase', 'มิเตอร์ไฟฟ้าดิจิทัลขนาด 3 เฟส พร้อมเชื่อมต่อระบบ IoT', 8000.00, 'METER', 'METER', 'SUP007'),
('E00006', 'Lithium Battery 48V', 'แบตเตอรี่ลิเธียมสำหรับระบบขนาด 48V 100Ah', 40000.00, 'BATTERY', 'BATTERY', 'SUP004'),
('E00007', 'Solar Wire 4mm2', 'สายไฟโซลาร์เซลล์ ขนาด 4mm2 สำหรับเชื่อมต่อแผงโซลาร์กับอินเวอร์เตอร์', 100.00, 'WIRE', 'SOLAR CELL', 'SUP002'),
('E00008', 'Solar Panel 400W', 'แผงโซลาร์เซลล์ชนิด Monocrystalline ขนาด 400W ประสิทธิภาพสูงสำหรับระบบโซลาร์ขนาดใหญ่', 9500.00, 'SOLAR CELL', 'SOLAR CELL', 'SUP005'),
('E00009', 'Battery Management System (BMS)', 'ระบบจัดการแบตเตอรี่ เพื่อควบคุมและเพิ่มประสิทธิภาพการใช้งานแบตเตอรี่', 12000.00, 'BMS', 'BATTERY', 'SUP007'),
('E00010', 'Surge Protection Device', 'อุปกรณ์ป้องกันไฟกระชาก ช่วยป้องกันอุปกรณ์จากความเสียหายที่เกิดจากไฟกระชาก', 3500.00, 'PROTECTION', 'METER', 'SUP008');

--
-- Triggers `ELEMENTS`
--
DELIMITER $$
CREATE TRIGGER `after_element_insert` AFTER INSERT ON `ELEMENTS` FOR EACH ROW BEGIN
    IF NEW.SUPPLIER_ID IS NOT NULL THEN
        INSERT INTO ELEMENTS_SUPPLIERS (ELEMENT_ID, SUPPLIER_ID, UNIT_PRICE, LAST_UPDATE)
        VALUES (NEW.ELEMENT_ID, NEW.SUPPLIER_ID, NEW.ELEMENT_UNIT_PRICE, NOW());
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_elements` BEFORE INSERT ON `ELEMENTS` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE next_element_id VARCHAR(50);

    SELECT COALESCE(MAX(CAST(SUBSTRING(ELEMENT_ID, 2) AS UNSIGNED)), 0) + 1 INTO next_id FROM Elements;

    SET next_element_id = CONCAT('E', LPAD(next_id, 5, '0'));

    SET NEW.ELEMENT_ID = next_element_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ELEMENTS_IN_QUOTATION`
--

CREATE TABLE `ELEMENTS_IN_QUOTATION` (
  `QUOTATION_NO` varchar(20) NOT NULL,
  `ELEMENT_ID` varchar(50) NOT NULL,
  `ELEMENT_UNIT_PRICE` decimal(10,2) DEFAULT NULL,
  `QUANTITY` int(11) DEFAULT NULL,
  `TOTAL_PRICE` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ELEMENTS_IN_QUOTATION`
--

INSERT INTO `ELEMENTS_IN_QUOTATION` (`QUOTATION_NO`, `ELEMENT_ID`, `ELEMENT_UNIT_PRICE`, `QUANTITY`, `TOTAL_PRICE`) VALUES
('QTN202410001', 'E00001', 15000.00, 2, 30000.00),
('QTN202410002', 'E00002', 7000.00, 5, 35000.00),
('QTN202410003', 'E00004', 3000.00, 3, 9000.00),
('QTN202410004', 'E00006', 40000.00, 4, 160000.00),
('QTN202410005', 'E00008', 9500.00, 3, 28500.00);

-- --------------------------------------------------------

--
-- Table structure for table `ELEMENTS_SUPPLIERS`
--

CREATE TABLE `ELEMENTS_SUPPLIERS` (
  `ELEMENT_ID` varchar(50) NOT NULL,
  `SUPPLIER_ID` varchar(50) NOT NULL,
  `UNIT_PRICE` decimal(10,2) NOT NULL CHECK (`UNIT_PRICE` >= 0),
  `LAST_UPDATE` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ELEMENTS_SUPPLIERS`
--

INSERT INTO `ELEMENTS_SUPPLIERS` (`ELEMENT_ID`, `SUPPLIER_ID`, `UNIT_PRICE`, `LAST_UPDATE`) VALUES
('E00001', 'SUP001', 15000.00, '2024-10-30 00:27:48'),
('E00002', 'SUP002', 7000.00, '2024-10-30 00:27:48'),
('E00003', 'SUP003', 25000.00, '2024-10-30 00:27:48'),
('E00004', 'SUP003', 3000.00, '2024-10-30 00:27:48'),
('E00005', 'SUP007', 8000.00, '2024-10-30 00:27:48'),
('E00006', 'SUP004', 40000.00, '2024-10-30 00:27:48'),
('E00007', 'SUP002', 100.00, '2024-10-30 00:27:48'),
('E00008', 'SUP005', 9500.00, '2024-10-30 00:27:48'),
('E00009', 'SUP007', 12000.00, '2024-10-30 00:27:48'),
('E00010', 'SUP008', 3500.00, '2024-10-30 00:27:48');

-- --------------------------------------------------------

--
-- Table structure for table `HISTORY_ORDERS`
--

CREATE TABLE `HISTORY_ORDERS` (
  `ORDER_DATE` datetime NOT NULL,
  `SUPPLIER_ID` varchar(50) NOT NULL,
  `ELEMENT_ID` varchar(50) NOT NULL,
  `AMOUNT` int(11) NOT NULL CHECK (`AMOUNT` > 0),
  `UNIT_PRICE` decimal(10,2) NOT NULL CHECK (`UNIT_PRICE` > 0),
  `TOTAL_PRICE` decimal(10,2) NOT NULL CHECK (`TOTAL_PRICE` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `HISTORY_ORDERS`
--

INSERT INTO `HISTORY_ORDERS` (`ORDER_DATE`, `SUPPLIER_ID`, `ELEMENT_ID`, `AMOUNT`, `UNIT_PRICE`, `TOTAL_PRICE`) VALUES
('2024-10-30 14:01:20', 'SUP001', 'E00001', 2, 15000.00, 30000.00),
('2024-10-30 14:01:20', 'SUP002', 'E00002', 5, 7000.00, 35000.00),
('2024-10-30 14:01:20', 'SUP003', 'E00004', 3, 3000.00, 9000.00),
('2024-10-30 14:01:20', 'SUP004', 'E00006', 4, 40000.00, 160000.00),
('2024-10-30 14:01:20', 'SUP005', 'E00008', 3, 9500.00, 28500.00);

-- --------------------------------------------------------

--
-- Table structure for table `QUOTATIONS`
--

CREATE TABLE `QUOTATIONS` (
  `QUOTATION_NO` varchar(20) NOT NULL,
  `CO_NAME` varchar(100) NOT NULL,
  `CO_ADDRESS` text DEFAULT NULL,
  `CO_PHONE_NUMBER` varchar(20) NOT NULL,
  `CO_EMAIL` varchar(100) DEFAULT NULL,
  `ORDER_ID` varchar(50) DEFAULT NULL,
  `DEVICE_TYPE` varchar(50) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `WAGE` decimal(10,2) DEFAULT NULL,
  `TOTAL_PRICE` decimal(10,2) DEFAULT NULL,
  `PAYMENT_TYPE` varchar(50) DEFAULT NULL,
  `REMARK` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `QUOTATIONS`
--

INSERT INTO `QUOTATIONS` (`QUOTATION_NO`, `CO_NAME`, `CO_ADDRESS`, `CO_PHONE_NUMBER`, `CO_EMAIL`, `ORDER_ID`, `DEVICE_TYPE`, `CREATE_DATE`, `WAGE`, `TOTAL_PRICE`, `PAYMENT_TYPE`, `REMARK`) VALUES
('QTN202410001', 'Tech Lifestyle', '248 ซ.พิบูลสงคราม 22 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 11000', '0656217887', 'msnntb@gmail.com', '110001', 'BATTERY', '2024-10-30 14:01:20', 500.00, 30500.00, 'Transfer', 'ส่วนลดราคาประจำปี'),
('QTN202410002', 'Tech Lifestyle', '248 ซ.พิบูลสงคราม 22 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 11000', '0656217887', 'msnntb@gmail.com', '110002', 'SOLAR CELL', '2024-10-30 14:01:20', 700.00, 35700.00, 'Credit', 'ลดราคาพิเศษช่วงโปรโมชั่น'),
('QTN202410003', 'Tech Lifestyle', '248 ซ.พิบูลสงคราม 22 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 11000', '0656217887', 'msnntb@gmail.com', '110003', 'METER', '2024-10-30 14:01:20', 300.00, 9300.00, 'Cash', 'แถมอุปกรณ์ติดตั้งฟรี'),
('QTN202410004', 'Tech Lifestyle', '248 ซ.พิบูลสงคราม 22 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 11000', '0656217887', 'msnntb@gmail.com', '110004', 'BATTERY', '2024-10-30 14:01:20', 1650.00, 161650.00, 'Transfer', 'รับประกันสินค้า 1 ปี'),
('QTN202410005', 'Tech Lifestyle', '248 ซ.พิบูลสงคราม 22 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 11000', '0656217887', 'msnntb@gmail.com', '110005', 'SOLAR CELL', '2024-10-30 14:01:20', 750.00, 29250.00, 'Credit', 'ติดตั้งพร้อมบริการตรวจสอบ');

--
-- Triggers `QUOTATIONS`
--
DELIMITER $$
CREATE TRIGGER `after_insert_quotation_elements` AFTER INSERT ON `QUOTATIONS` FOR EACH ROW BEGIN
    INSERT INTO ELEMENTS_IN_QUOTATION (QUOTATION_NO, ELEMENT_ID, ELEMENT_UNIT_PRICE, QUANTITY, TOTAL_PRICE)
    VALUES (NEW.QUOTATION_NO, NEW.ELEMENT_ID, NEW.PRICE, NEW.AMOUNT, NEW.PRICE * NEW.AMOUNT);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_quotation_history` AFTER INSERT ON `QUOTATIONS` FOR EACH ROW BEGIN
    INSERT INTO HISTORY_ORDERS (ORDER_DATE, SUPPLIER_ID, ELEMENT_ID, AMOUNT, UNIT_PRICE, TOTAL_PRICE)
    VALUES (
        NEW.CREATE_DATE,
        (SELECT SUPPLIER_ID FROM ELEMENTS WHERE ELEMENT_ID = NEW.ELEMENT_ID),
        NEW.ELEMENT_ID,
        NEW.AMOUNT,
        NEW.PRICE,
        NEW.AMOUNT * NEW.PRICE
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_quotation` BEFORE INSERT ON `QUOTATIONS` FOR EACH ROW BEGIN
    DECLARE running_no INT;
    DECLARE prefix VARCHAR(10);
    DECLARE formatted_quotation_no VARCHAR(20);
    DECLARE element_price DECIMAL(10,2);
    DECLARE element_name TEXT;
    DECLARE device_type VARCHAR(50);

    -- สร้าง QUOTATION_NO อัตโนมัติ
    SET prefix = CONCAT('QTN', DATE_FORMAT(CURRENT_DATE, '%Y%m'));
    SET running_no = (SELECT IFNULL(MAX(CAST(SUBSTRING(QUOTATION_NO, 10) AS UNSIGNED)), 0) + 1 
                      FROM QUOTATIONS 
                      WHERE QUOTATION_NO LIKE CONCAT(prefix, '%'));
    SET formatted_quotation_no = CONCAT(prefix, LPAD(running_no, 3, '0'));
    SET NEW.QUOTATION_NO = formatted_quotation_no;

    -- ตั้ง CREATE_DATE เป็นวันที่ปัจจุบัน
    SET NEW.CREATE_DATE = CURRENT_TIMESTAMP;

    -- ดึงข้อมูล ELEMENT_NAME, ELEMENT_UNIT_PRICE, และ ELEMENT_CATEGORY จาก ELEMENTS
    SELECT ELEMENT_UNIT_PRICE, ELEMENT_NAME, ELEMENT_CATEGORY 
    INTO element_price, element_name, device_type
    FROM ELEMENTS 
    WHERE ELEMENT_ID = NEW.ELEMENT_ID;

    -- ตั้งค่า PRICE, ELEMENT_DETAIL, และ DEVICE_TYPE ใน QUOTATIONS
    SET NEW.PRICE = element_price;
    SET NEW.ELEMENT_DETAIL = element_name;
    SET NEW.DEVICE_TYPE = device_type;
    
    -- คำนวณ TOTAL_PRICE
    SET NEW.TOTAL_PRICE = (NEW.AMOUNT * element_price) + NEW.WAGE;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `SUPPLIERS`
--

CREATE TABLE `SUPPLIERS` (
  `SUPPLIER_ID` varchar(50) NOT NULL,
  `SUPPLIER_NAME` varchar(100) NOT NULL,
  `SUPPLIER_PHONE_NUMBER` varchar(20) DEFAULT NULL,
  `SUPPLIER_EMAIL` varchar(100) DEFAULT NULL,
  `SUPPLIER_ADDRESS` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `SUPPLIERS`
--

INSERT INTO `SUPPLIERS` (`SUPPLIER_ID`, `SUPPLIER_NAME`, `SUPPLIER_PHONE_NUMBER`, `SUPPLIER_EMAIL`, `SUPPLIER_ADDRESS`) VALUES
('SUP001', 'หจก. สมุทรปราการพาณิชย์', '0957205548', 'info@samutprakan.com', '83/5 ต.สุขสวัสดิ์ ต.บางจาก อ.พระประแดง จ.สมุทรปราการ'),
('SUP002', 'บจก. เชียงใหม่เทรดดิ้ง', '054839401', 'service@cmtrading.com', '99 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่'),
('SUP003', 'บริษัท พัทยาสินค้า', '0934567890', 'sales@pattayaexport.com', '22/1 หมู่บ้านศรีนครินทร์ ต.หนองปรือ อ.บางละมุง จ.ชลบุรี'),
('SUP004', 'หจก. ภูเก็ตวัสดุ', '0945678901', 'contact@phuketmaterial.com', '55/7 ต.วิชิต อ.เมือง จ.ภูเก็ต'),
('SUP005', 'บจก. กรุงเทพสตีล', '0956789012', 'support@bangkoksteel.com', '10/5 ถ.เจริญกรุง แขวงยานนาวา เขตสาทร กรุงเทพมหานคร'),
('SUP006', 'หจก. นครสวรรค์พัฒนา', '0967890123', 'admin@nakhonsawan.co.th', '88 หมู่ 9 ต.หนองบัว อ.หนองบัว จ.นครสวรรค์'),
('SUP007', 'บริษัท อุดรธานีอุตสาหกรรม', '0978083024', 'service@udonindustry.com', '34 ถ.มิตรภาพ ต.หมากแข้ง อ.เมือง จ.อุดรธานี'),
('SUP008', 'บจก. นครปฐมเทรดดิ้ง', '0989012635', 'info@nakornpathom.com', '58 ต.เพชรเกษม อ.สามพราน อ.เมือง จ.นครปฐม'),
('SUP009', 'หจก. สมุยโลจิสติกส์', '0990129730', 'contact@samuilogistics.com', '71/4 หมู่ 9 ต.หน้าเมือง อ.เกาะสมุย จ.สุราษฎร์ธานี'),
('SUP010', 'บริษัท อุตสาหกรรมไทย', '0937459831', 'contact@thaifactory.com', '893 หมู่ 9 ต.หนองแค อ.หนองแค จ.สระบุรี');

--
-- Triggers `SUPPLIERS`
--
DELIMITER $$
CREATE TRIGGER `after_supplier_insert` AFTER INSERT ON `SUPPLIERS` FOR EACH ROW BEGIN
    DECLARE elem_id VARCHAR(50);

    DECLARE cursor1 CURSOR FOR 
    SELECT ELEMENT_ID FROM ELEMENTS WHERE SUPPLIER_ID = NEW.SUPPLIER_ID;

    OPEN cursor1;
    fetch_loop: LOOP
        FETCH cursor1 INTO elem_id;
        IF elem_id IS NULL THEN 
            LEAVE fetch_loop; 
        END IF;

        INSERT INTO ELEMENTS_SUPPLIERS (ELEMENT_ID, SUPPLIER_ID, UNIT_PRICE, LAST_UPDATE)
        VALUES (elem_id, NEW.SUPPLIER_ID, (SELECT ELEMENT_UNIT_PRICE FROM ELEMENTS WHERE ELEMENT_ID = elem_id), NOW());
    END LOOP;

    CLOSE cursor1;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_suppliers` BEFORE INSERT ON `SUPPLIERS` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE next_supplier_id VARCHAR(50);

    SELECT COALESCE(MAX(CAST(SUBSTRING(SUPPLIER_ID, 4) AS UNSIGNED)), 0) + 1 INTO next_id FROM SUPPLIERS;

    SET next_supplier_id = CONCAT('SUP', LPAD(next_id, 3, '0'));

    SET NEW.SUPPLIER_ID = next_supplier_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `USER_ID` varchar(50) NOT NULL,
  `USER_EMAIL` varchar(100) NOT NULL,
  `USER_PASSWORD` varchar(20) NOT NULL,
  `USER_ROLE` varchar(10) NOT NULL CHECK (`USER_ROLE` in ('Admin','User'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`USER_ID`, `USER_EMAIL`, `USER_PASSWORD`, `USER_ROLE`) VALUES
('U001', 'techlifestyle@gmail.com', 'techlifestyle1234', 'Admin'),
('U002', 'kittiya@gmail.com', 'kitty_Pass02', 'User'),
('U003', 'methawi@gmail.com', 'mayyy007', 'User'),
('U004', 'chanakan@gmail.com', 'ckkan_749', 'User'),
('U005', 'kriangkrai@gmail.com', 'kkraiii520', 'User'),
('U006', 'kimha@gmail.com', 'kimmr777', 'User'),
('U007', 'panita@gmail.com', 'panitaaa00', 'User'),
('U008', 'keerati@gmail.com', 'kueaxkeerati', 'User'),
('U009', 'pasuthorn@gmail.com', 'norapasu813', 'User');

--
-- Triggers `USERS`
--
DELIMITER $$
CREATE TRIGGER `before_insert_users` BEFORE INSERT ON `USERS` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE next_user_id VARCHAR(50);

    -- หา ID ล่าสุดในตารางแล้วเพิ่ม 1
    SELECT COALESCE(MAX(CAST(SUBSTRING(USER_ID, 2) AS UNSIGNED)), 0) + 1 INTO next_id FROM USERS;

    -- ฟอร์แมตให้เป็น 'U' ตามด้วยเลข 3 หลัก เช่น 'U001'
    SET next_user_id = CONCAT('U', LPAD(next_id, 3, '0'));

    -- กำหนดค่า USER_ID ที่สร้างใหม่
    SET NEW.USER_ID = next_user_id;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CUSTOMERS`
--
ALTER TABLE `CUSTOMERS`
  ADD PRIMARY KEY (`CUSTOMER_ID`),
  ADD UNIQUE KEY `CUSTOMER_PHONE_NUMBER` (`CUSTOMER_PHONE_NUMBER`),
  ADD KEY `USER_ID` (`USER_ID`);

--
-- Indexes for table `CUSTOMER_ORDERS`
--
ALTER TABLE `CUSTOMER_ORDERS`
  ADD PRIMARY KEY (`ORDER_ID`),
  ADD KEY `QUOTATION_NO` (`QUOTATION_NO`);

--
-- Indexes for table `ELEMENTS`
--
ALTER TABLE `ELEMENTS`
  ADD PRIMARY KEY (`ELEMENT_ID`),
  ADD KEY `SUPPLIER_ID` (`SUPPLIER_ID`);

--
-- Indexes for table `ELEMENTS_IN_QUOTATION`
--
ALTER TABLE `ELEMENTS_IN_QUOTATION`
  ADD PRIMARY KEY (`QUOTATION_NO`,`ELEMENT_ID`),
  ADD KEY `ELEMENT_ID` (`ELEMENT_ID`);

--
-- Indexes for table `ELEMENTS_SUPPLIERS`
--
ALTER TABLE `ELEMENTS_SUPPLIERS`
  ADD PRIMARY KEY (`ELEMENT_ID`,`SUPPLIER_ID`),
  ADD KEY `SUPPLIER_ID` (`SUPPLIER_ID`);

--
-- Indexes for table `HISTORY_ORDERS`
--
ALTER TABLE `HISTORY_ORDERS`
  ADD KEY `SUPPLIER_ID` (`SUPPLIER_ID`),
  ADD KEY `ELEMENT_ID` (`ELEMENT_ID`);

--
-- Indexes for table `QUOTATIONS`
--
ALTER TABLE `QUOTATIONS`
  ADD PRIMARY KEY (`QUOTATION_NO`),
  ADD KEY `ORDER_ID` (`ORDER_ID`);

--
-- Indexes for table `SUPPLIERS`
--
ALTER TABLE `SUPPLIERS`
  ADD PRIMARY KEY (`SUPPLIER_ID`),
  ADD UNIQUE KEY `SUPPLIER_NAME` (`SUPPLIER_NAME`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`USER_ID`),
  ADD UNIQUE KEY `USER_EMAIL` (`USER_EMAIL`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CUSTOMERS`
--
ALTER TABLE `CUSTOMERS`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`);

--
-- Constraints for table `CUSTOMER_ORDERS`
--
ALTER TABLE `CUSTOMER_ORDERS`
  ADD CONSTRAINT `customer_orders_ibfk_1` FOREIGN KEY (`QUOTATION_NO`) REFERENCES `QUOTATIONS` (`QUOTATION_NO`);

--
-- Constraints for table `ELEMENTS`
--
ALTER TABLE `ELEMENTS`
  ADD CONSTRAINT `elements_ibfk_1` FOREIGN KEY (`SUPPLIER_ID`) REFERENCES `suppliers` (`SUPPLIER_ID`);

--
-- Constraints for table `ELEMENTS_IN_QUOTATION`
--
ALTER TABLE `ELEMENTS_IN_QUOTATION`
  ADD CONSTRAINT `elements_in_quotation_ibfk_1` FOREIGN KEY (`QUOTATION_NO`) REFERENCES `quotations` (`QUOTATION_NO`),
  ADD CONSTRAINT `elements_in_quotation_ibfk_2` FOREIGN KEY (`ELEMENT_ID`) REFERENCES `elements` (`ELEMENT_ID`);

--
-- Constraints for table `ELEMENTS_SUPPLIERS`
--
ALTER TABLE `ELEMENTS_SUPPLIERS`
  ADD CONSTRAINT `elements_suppliers_ibfk_1` FOREIGN KEY (`ELEMENT_ID`) REFERENCES `elements` (`ELEMENT_ID`),
  ADD CONSTRAINT `elements_suppliers_ibfk_2` FOREIGN KEY (`SUPPLIER_ID`) REFERENCES `suppliers` (`SUPPLIER_ID`);

--
-- Constraints for table `HISTORY_ORDERS`
--
ALTER TABLE `HISTORY_ORDERS`
  ADD CONSTRAINT `history_orders_ibfk_1` FOREIGN KEY (`SUPPLIER_ID`) REFERENCES `suppliers` (`SUPPLIER_ID`),
  ADD CONSTRAINT `history_orders_ibfk_2` FOREIGN KEY (`ELEMENT_ID`) REFERENCES `elements` (`ELEMENT_ID`);

--
-- Constraints for table `QUOTATIONS`
--
ALTER TABLE `QUOTATIONS`
  ADD CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`ORDER_ID`) REFERENCES `CUSTOMER_ORDERS` (`ORDER_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
