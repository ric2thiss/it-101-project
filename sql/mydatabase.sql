-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2025 at 10:45 PM
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
-- Database: `mydatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `id_Number` varchar(11) NOT NULL,
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `Middle_Initial` varchar(2) NOT NULL,
  `Extension_Name` varchar(5) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Sex` varchar(7) NOT NULL,
  `Age` varchar(50) NOT NULL,
  `Purok` varchar(256) NOT NULL,
  `Barangay` varchar(256) NOT NULL,
  `City` varchar(256) NOT NULL,
  `Province` varchar(256) NOT NULL,
  `Country` varchar(256) NOT NULL,
  `Zip_Code` int(11) NOT NULL,
  `Username` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Account_Created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `id_Number`, `First_Name`, `Last_Name`, `Middle_Initial`, `Extension_Name`, `Email`, `Sex`, `Age`, `Purok`, `Barangay`, `City`, `Province`, `Country`, `Zip_Code`, `Username`, `Password`, `Account_Created`) VALUES
(32, '2020-11913', 'Ric Charles', 'Paquibot', 'L', '', 'ric2thiss1@gmail.com', 'male', '23', 'Purok-2A', 'Ampayon', 'Butuan City', 'Agusan Del Norte', 'Philippines', 8600, 'admin1', '$2y$10$ghREMqE/AWXzPps.2D025eTNrfLrSBhxCKWd8U0AgnKObg2bBOeEm', '2025-06-01 13:56:18'),
(33, '2020-1197', 'Ric Charles', 'Paquibot', 'L', '', 'ric2thiss@gmail.com', 'male', '46', 'Purok-2A', 'Ampayon', 'Butuan City', 'Agusan Del Norte', 'Philippines', 8600, 'admin', '$2y$10$zUpkKJdp2jewDVQ0dDmKh.ubWq.Ls51DM2990/oueHvWk/qRr.pIi', '2025-06-01 20:33:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
