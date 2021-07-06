-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 06. Jul 2021 um 18:14
-- Server-Version: 8.0.13-4
-- PHP-Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `YEfPnCDIbs`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PERMISSIONS`
--

CREATE TABLE `PERMISSIONS` (
  `PermissionId` int(11) NOT NULL,
  `Groupname` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `PERMISSIONS`
--

INSERT INTO `PERMISSIONS` (`PermissionId`, `Groupname`) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PRODUCERS`
--

CREATE TABLE `PRODUCERS` (
  `ProducerId` int(11) NOT NULL,
  `ProducerName` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `PRODUCERS`
--

INSERT INTO `PRODUCERS` (`ProducerId`, `ProducerName`) VALUES
(1, 'Apple'),
(2, 'Samsung'),
(4, 'Test'),
(5, 'Huawei'),
(6, 'ABCSeller'),
(7, 'TestProducer');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PRODUCTS`
--

CREATE TABLE `PRODUCTS` (
  `ProductId` int(11) NOT NULL,
  `Name` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Description` text,
  `ProducerId` int(11) NOT NULL,
  `InStorage` int(11) NOT NULL,
  `Price` float NOT NULL,
  `Rating` enum('0','1','2','3','4','5') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `PRODUCTS`
--

INSERT INTO `PRODUCTS` (`ProductId`, `Name`, `Description`, `ProducerId`, `InStorage`, `Price`, `Rating`) VALUES
(1, 'iPhone X', 'Das original iPhone X im Neuzustand.', 1, 50, 900, '4'),
(21, 'Prod2', ' Gutes Produkt schwöre', 1, 3, 5, '2'),
(22, 'Prod3', ' Prod3', 2, 2, 3, '0'),
(23, 'P4', ' p4', 1, 2, 2, '0'),
(24, 'P5', '5', 1, 0, 5, '0'),
(25, 'Super expensive product', ' This product is super expensive!', 1, 93, 1000000, '0');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `PURCHASES`
--

CREATE TABLE `PURCHASES` (
  `PurchaseId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `totalPrice` double NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `PURCHASES`
--

INSERT INTO `PURCHASES` (`PurchaseId`, `ProductId`, `UserId`, `Amount`, `totalPrice`) VALUES
(1, 1, 1, 1, 800),
(2, 2, 1, 2, 1400),
(3, 1, 1, 1, 800),
(4, 1, 1, 1, 800),
(5, 1, 1, 1, 800),
(6, 1, 1, 1, 800),
(7, 1, 1, 1, 800),
(8, 1, 1, 1, 800),
(9, 1, 1, 1, 800),
(10, 1, 1, 1, 800),
(11, 1, 1, 1, 800),
(12, 1, 1, 1, 800),
(13, 1, 1, 1, 800),
(14, 1, 1, 1, 800),
(15, 1, 1, 1, 800),
(16, 1, 1, 0, 0),
(17, 1, 1, 1, 800),
(18, 1, 1, 1, 800),
(19, 1, 1, 1, 800),
(20, 1, 1, 1, 800),
(21, 1, 1, 1, 800),
(22, 1, 1, 1, 800),
(23, 1, 1, 1, 900),
(24, 1, 1, 1, 900),
(25, 1, 1, 1, 900),
(26, 1, 1, 1, 900),
(27, 1, 1, 1, 900),
(28, 1, 1, 1, 900),
(29, 1, 1, 1, 900),
(30, 1, 1, 5, 4500),
(31, 21, 14, 2, 10),
(32, 24, 14, 1, 5),
(33, 1, 14, 1, 900),
(34, 1, 14, 1, 900),
(35, 1, 14, 1, 900),
(36, 1, 14, 6, 5400),
(37, 1, 14, 8, 7200),
(45, 27, 1, 1, 1),
(46, 27, 1, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `RATING`
--

CREATE TABLE `RATING` (
  `RatingId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Stars` enum('1','2','3','4','5') COLLATE utf8_unicode_ci NOT NULL,
  `Comment` text COLLATE utf8_unicode_ci,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `RATING`
--

INSERT INTO `RATING` (`RatingId`, `UserId`, `ProductId`, `Stars`, `Comment`) VALUES
(1, 1, 1, '4', 'Gutes iPhone! Sehr zufrieden!!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!! !!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!! !!!! !! !!!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!! !!!!!!!!!!!!!!!! !!!!!!!!!!!! !! !!!!!!! !! !!!! !!!!!!!!!!!!!!!!!!!! !!!!!!!'),
(17, 1, 1, '4', ' 4');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `USERS`
--

CREATE TABLE `USERS` (
  `UserId` int(11) NOT NULL,
  `Username` varchar(16) NOT NULL,
  `Password` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `PermissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `USERS`
--

INSERT INTO `USERS` (`UserId`, `Username`, `Password`, `PermissionId`) VALUES
(1, 'Admin', 'd3e1ea832136acae4d025a24546702342a4f1529', 1),
(8, 'Test123', 'f74682dc904e3dfe32f8b68f6326243ee094a5f8', 2),
(14, 'Test', 'f9d5bf521ac032fa5cb97606941f21d14798e002', 2),
(16, 'Tester', 'f9d5bf521ac032fa5cb97606941f21d14798e002', 1),
(18, 'TestUser546', 'f9d5bf521ac032fa5cb97606941f21d14798e002', 2),
(19, 'TTT', 'c61cd12028c5a19b94b18b0244e08ff69c492318', 2),
(20, 'ttt', 'c61cd12028c5a19b94b18b0244e08ff69c492318', 2);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `PERMISSIONS`
--
ALTER TABLE `PERMISSIONS`
  ADD PRIMARY KEY (`PermissionId`);

--
-- Indizes für die Tabelle `PRODUCERS`
--
ALTER TABLE `PRODUCERS`
  ADD PRIMARY KEY (`ProducerId`);

--
-- Indizes für die Tabelle `PRODUCTS`
--
ALTER TABLE `PRODUCTS`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `ProducerFK` (`ProducerId`);

--
-- Indizes für die Tabelle `PURCHASES`
--
ALTER TABLE `PURCHASES`
  ADD PRIMARY KEY (`PurchaseId`),
  ADD KEY `ProductFK` (`ProductId`),
  ADD KEY `UserFK` (`UserId`);

--
-- Indizes für die Tabelle `RATING`
--
ALTER TABLE `RATING`
  ADD PRIMARY KEY (`RatingId`),
  ADD KEY `ProdFK` (`ProductId`),
  ADD KEY `UsFK` (`UserId`);

--
-- Indizes für die Tabelle `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `PermissionFK` (`PermissionId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `PERMISSIONS`
--
ALTER TABLE `PERMISSIONS`
  MODIFY `PermissionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `PRODUCERS`
--
ALTER TABLE `PRODUCERS`
  MODIFY `ProducerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `PRODUCTS`
--
ALTER TABLE `PRODUCTS`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT für Tabelle `PURCHASES`
--
ALTER TABLE `PURCHASES`
  MODIFY `PurchaseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT für Tabelle `RATING`
--
ALTER TABLE `RATING`
  MODIFY `RatingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT für Tabelle `USERS`
--
ALTER TABLE `USERS`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `PRODUCTS`
--
ALTER TABLE `PRODUCTS`
  ADD CONSTRAINT `ProducerFK` FOREIGN KEY (`ProducerId`) REFERENCES `PRODUCERS` (`producerid`);

--
-- Constraints der Tabelle `RATING`
--
ALTER TABLE `RATING`
  ADD CONSTRAINT `ProdFK` FOREIGN KEY (`ProductId`) REFERENCES `PRODUCTS` (`productid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `UsFK` FOREIGN KEY (`UserId`) REFERENCES `USERS` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints der Tabelle `USERS`
--
ALTER TABLE `USERS`
  ADD CONSTRAINT `PermissionFK` FOREIGN KEY (`PermissionId`) REFERENCES `PERMISSIONS` (`permissionid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
