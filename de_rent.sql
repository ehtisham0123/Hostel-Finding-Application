-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2021 at 12:04 AM
-- Server version: 10.4.19-MariaDB-log
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hostel_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'ehtisham', 'ehtisham@gmail.com', '$2a$10$2V8hrH/m.Mg2Lku1cMkH2OsfywaDWuMH.9GtsIR8RZ.gcDFtG/piW', '2021-05-27 17:51:25', '2021-05-30 17:04:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `housenumber` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `streetnumber` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postalcode` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `contact`, `avatar`, `housenumber`, `streetnumber`, `city`, `state`, `postalcode`, `country`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES
(22, 'Raheel123', 'raheelahmad9258@gmail.com', '$2b$10$zpbk0uwaEnYaji/JLmphUuGxvvUp/TEwpr86pQ1dpnZ87vPHWJevm', 'Raheel', 'Ahmad', 'male', '22', '03525648145', 'raheel.1624993880569.jpg', '3', '5', 'Islamabad', '', '44000', 'Pakistan', '33.6844202', '73.04788479999999', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'Awais123', 'geniusawais08@gmail.com', '$2a$10$AfKHObvc6cIeYcJgzyxUTe.O45sm7dKQDybKuungYutdawObocNyW', 'Awais', 'Sid', 'male', '20', '03215264854', 'awais.1624994228692.jpg', '1', '2', 'Mansehra', '', '21300', 'Pakistan', '34.1642661', '73.26396609999999', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 'ehtisham', 'ehtishamjadoon@gmail.com', '$2a$10$rUlE2pNMENSTR2Xg8YD4Y.qav075SahLOxBNfJkgGdVkowIfj.4Yi', 'ehtisham', 'khan', 'male', '21', '03459550908', 'gbarkz-K3MuW8K67ZI-unsplash.1634323224511.jpg', '213', '213', 'Abottabad', '213', '13123', 'Australia', '34.1760925', '73.2411391', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `warden_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `user_id`, `warden_id`) VALUES
(5, 2, 3),
(6, 2, 2),
(7, 23, 12),
(8, 22, 2);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `warden_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `user_id`, `room_id`, `warden_id`, `created_at`, `updated_at`) VALUES
(67, 26, 41, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `warden_id` bigint(20) UNSIGNED NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `warden_id`, `message`, `status`, `created_at`) VALUES
(35, 23, 12, 'Hello', '1', '2021-06-29 19:41:06'),
(36, 23, 12, 'HY', '0', '2021-06-29 19:46:25'),
(37, 22, 2, 'Hello ?', '1', '2021-10-13 21:25:49');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `per_month_rent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `per_week_rent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `warden_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `details`, `per_month_rent`, `per_week_rent`, `category`, `thumbnail`, `warden_id`) VALUES
(41, 'Lorem Ipsum', 'Why do we use it?\nIt is a lonble content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like ', '140', '499', 'Sports', 'gbarkz-K3MuW8K67ZI-unsplash.1634332868700.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `warden_id` bigint(20) UNSIGNED NOT NULL,
  `booking_id` bigint(20) UNSIGNED NOT NULL,
  `reviews` int(20) NOT NULL,
  `reviews_details` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `room_id`, `warden_id`, `booking_id`, `reviews`, `reviews_details`, `created_at`, `updated_at`) VALUES
(53, 26, 41, 2, 67, 5, 'nt here, content here\', making', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wardens`
--

CREATE TABLE `wardens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `housenumber` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `streetnumber` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postalcode` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wardens`
--

INSERT INTO `wardens` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `contact`, `avatar`, `housenumber`, `streetnumber`, `city`, `state`, `postalcode`, `country`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES
(2, 'Ehtisham213', 'ehtishamjadoon1234@gmail.com', '$2a$10$cz9MyssrG0QLl6NA3nsYjOXvPeILkH4T4UlMaTkLzD3rXIg0pZ.le', 'Ehtisham', 'Jadoon', 'male', '24', '03459550908', 'UENX7241.1634159457382.JPG', '', '', 'Abbottabad', '', '22010', 'Pakistan', '34.2245362', '73.2418879', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Asfandyar123', 'fandiswati34@gmail.com', '$2a$10$ZU19mzHqfZSN4TRq2KpDBuM7fT3/Bih0GHrXiZxMzdkIN84RLkc8O', 'Asfandyar', 'Swati', 'male', '23', '03489081422', 'Asfand.1624992172665.jpeg', '1', '2', 'Mansehra', '', '21300', 'Pakistan', '34.3312587', '73.1980009', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_ibfk_1` (`user_id`),
  ADD KEY `teacher_id` (`warden_id`),
  ADD KEY `course_id` (`room_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`user_id`),
  ADD KEY `teacher_id` (`warden_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`warden_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_ibfk_1` (`booking_id`),
  ADD KEY `reviews_ibfk_2` (`user_id`),
  ADD KEY `reviews_ibfk_3` (`warden_id`),
  ADD KEY `reviews_ibfk_4` (`room_id`);

--
-- Indexes for table `wardens`
--
ALTER TABLE `wardens`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `wardens`
--
ALTER TABLE `wardens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`warden_id`) REFERENCES `wardens` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`warden_id`) REFERENCES `wardens` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`warden_id`) REFERENCES `wardens` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`warden_id`) REFERENCES `wardens` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_4` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
