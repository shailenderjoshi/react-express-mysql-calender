-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2020 at 05:17 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `calender`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `start` varchar(100) NOT NULL,
  `end` varchar(100) NOT NULL,
  `allday` varchar(5) NOT NULL,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `start`, `end`, `allday`, `createdat`, `userid`) VALUES
(1, 'event 1', '2020-10-11 16:51:30', '0000-00-00 00:00:00', '0', '2020-10-11 11:44:55', 1),
(3, 'event 11', '2020-10-11 05:00:00', '0000-00-00 00:00:00', '0', '2020-10-11 12:00:22', 2),
(31, 'gk', '2020-10-14 00:00:00', '2020-10-15 00:00:00', 'allda', '2020-10-11 21:29:58', 1),
(35, 'hh', '2020-10-15T00:00:00.000Z', '2020-10-16T00:00:00.000Z', '1', '2020-10-11 21:56:34', 1),
(37, 'kaka', '2020-10-23T00:00:00.000Z', '2020-10-24T00:00:00.000Z', 'true', '2020-10-11 22:03:27', 1),
(40, 'pinki', '2020-10-14T00:00:00.000Z', '2020-10-15T00:00:00.000Z', 'true', '2020-10-11 22:13:38', 1),
(41, 'dfsdfsdf', '2020-10-13T00:00:00.000Z', '2020-10-14T00:00:00.000Z', 'true', '2020-10-11 22:17:13', 1),
(42, 'ghhh', '2020-10-21T00:00:00.000Z', '2020-10-22T00:00:00.000Z', 'true', '2020-10-11 22:18:57', 1),
(43, 'hulu', '2020-10-20T00:00:00.000Z', '2020-10-21T00:00:00.000Z', 'true', '2020-10-11 22:21:28', 1),
(44, 'koo', '2020-10-28T00:00:00.000Z', '2020-10-29T00:00:00.000Z', 'true', '2020-10-11 22:22:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'shail', '123'),
(2, 'aman', '123'),
(3, 'amit', '123'),
(4, 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
