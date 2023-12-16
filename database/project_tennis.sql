-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 16 dec 2023 om 20:05
-- Serverversie: 10.4.25-MariaDB
-- PHP-versie: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_tennis`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblgames`
--

CREATE TABLE `tblgames` (
  `gameId` int(11) NOT NULL,
  `starttijd` time NOT NULL,
  `eindtijd` time NOT NULL,
  `date` date NOT NULL,
  `state` varchar(255) NOT NULL,
  `serving` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `tblgames`
--

INSERT INTO `tblgames` (`gameId`, `starttijd`, `eindtijd`, `date`, `state`, `serving`) VALUES
(8, '10:00:00', '11:00:00', '2022-01-01', 'fin', 1),
(9, '10:00:00', '11:00:00', '2022-01-02', 'fin', 2),
(10, '14:30:39', '00:00:00', '2023-12-13', 'on', 1),
(11, '14:31:30', '00:00:00', '2023-12-13', 'on', 2),
(43, '09:37:15', '00:00:00', '2023-12-15', 'fin', 0),
(44, '09:46:05', '09:46:24', '2023-12-15', 'fin', 1),
(45, '10:22:59', '10:23:20', '2023-12-15', 'fin', 1),
(46, '10:30:19', '10:30:39', '2023-12-15', 'fin', 1),
(47, '11:04:43', '11:05:18', '2023-12-15', 'fin', 0),
(48, '11:31:38', '11:33:21', '2023-12-15', 'fin', 1),
(49, '11:34:03', '11:38:01', '2023-12-15', 'fin', 1),
(50, '11:38:37', '00:00:00', '2023-12-15', 'on', 0),
(51, '11:39:18', '11:40:07', '2023-12-15', 'fin', 0),
(52, '18:10:43', '00:00:00', '2023-12-15', 'on', 1),
(53, '18:16:50', '00:00:00', '2023-12-15', 'on', 1),
(54, '18:17:37', '18:18:44', '2023-12-15', 'fin', 1),
(55, '18:21:10', '18:21:28', '2023-12-15', 'fin', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblsets`
--

CREATE TABLE `tblsets` (
  `gameId` int(11) NOT NULL,
  `setNr` int(11) NOT NULL,
  `gamesT1` int(11) NOT NULL,
  `gamesT2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `tblsets`
--

INSERT INTO `tblsets` (`gameId`, `setNr`, `gamesT1`, `gamesT2`) VALUES
(8, 1, 6, 4),
(8, 2, 3, 6),
(8, 3, 7, 5),
(9, 1, 4, 6),
(9, 2, 6, 3),
(9, 3, 5, 7),
(43, 1, 6, 0),
(43, 2, 6, 0),
(44, 1, 6, 0),
(44, 2, 6, 0),
(45, 1, 6, 2),
(45, 2, 6, 0),
(46, 1, 6, 0),
(46, 2, 6, 0),
(47, 1, 6, 0),
(47, 2, 6, 0),
(48, 1, 6, 0),
(48, 2, 6, 0),
(49, 1, 0, 6),
(49, 2, 0, 6),
(51, 1, 6, 0),
(51, 2, 6, 0),
(55, 1, 6, 0),
(55, 2, 6, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblspelers`
--

CREATE TABLE `tblspelers` (
  `id` int(11) NOT NULL,
  `gebruikersnaam` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profielfoto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `tblspelers`
--

INSERT INTO `tblspelers` (`id`, `gebruikersnaam`, `password`, `email`, `profielfoto`) VALUES
(1, 'NielsBusschaert', 'webcomponents', 'niels.busschaert@gmail.com', ''),
(2, 'Niels Busschaert', 'webcomponents', 'niels.busschaert@gmail.com', ''),
(3, 'Niels', 'elo', 'niels@gmail.com', ''),
(8, 'Fred', 'elo', 'Fred@gmail.com', ''),
(10, 'Lukas', 'elo', 'Lukas@gmail.com', ''),
(11, 'Warre', 'joe', 'Warre@hotmail.com', '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblteam`
--

CREATE TABLE `tblteam` (
  `gameId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `punten` int(11) NOT NULL,
  `games` int(11) NOT NULL,
  `sets` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `tblteam`
--

INSERT INTO `tblteam` (`gameId`, `teamId`, `punten`, `games`, `sets`) VALUES
(8, 1, 10, 2, 1),
(8, 2, 8, 1, 2),
(9, 1, 8, 1, 2),
(9, 2, 10, 2, 1),
(10, 1, 0, 0, 0),
(10, 2, 0, 0, 0),
(11, 1, 0, 0, 0),
(11, 2, 0, 0, 0),
(43, 1, 0, 0, 2),
(43, 2, 0, 0, 0),
(44, 1, 0, 0, 2),
(44, 2, 0, 0, 0),
(45, 1, 0, 0, 2),
(45, 2, 0, 0, 0),
(46, 1, 0, 0, 2),
(46, 2, 0, 0, 0),
(47, 1, 0, 0, 2),
(47, 2, 0, 0, 0),
(48, 1, 0, 0, 2),
(48, 2, 0, 0, 0),
(49, 1, 0, 0, 0),
(49, 2, 0, 0, 2),
(50, 1, 15, 0, 0),
(50, 2, 0, 0, 0),
(51, 1, 0, 0, 2),
(51, 2, 0, 0, 0),
(52, 1, 0, 0, 0),
(52, 2, 0, 0, 0),
(53, 1, 0, 0, 0),
(53, 2, 0, 0, 0),
(54, 1, 0, 0, 0),
(54, 2, 0, 0, 2),
(55, 1, 0, 0, 2),
(55, 2, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tblteamspeler`
--

CREATE TABLE `tblteamspeler` (
  `gameId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `spelerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `tblteamspeler`
--

INSERT INTO `tblteamspeler` (`gameId`, `teamId`, `spelerId`) VALUES
(8, 1, 1),
(8, 1, 2),
(8, 2, 3),
(8, 2, 8),
(9, 1, 10),
(9, 1, 11),
(9, 2, 1),
(9, 2, 2),
(10, 1, 1),
(10, 1, 2),
(10, 2, 3),
(10, 2, 8),
(11, 1, 10),
(11, 1, 11),
(11, 2, 1),
(11, 2, 2),
(43, 1, 3),
(43, 2, 10),
(44, 1, 11),
(44, 2, 1),
(45, 1, 3),
(45, 2, 11),
(46, 1, 3),
(46, 2, 11),
(47, 1, 1),
(47, 1, 10),
(47, 2, 8),
(47, 2, 11),
(48, 1, 3),
(48, 2, 8),
(49, 1, 8),
(49, 2, 3),
(50, 1, 8),
(50, 2, 3),
(51, 1, 10),
(51, 2, 11),
(52, 1, 10),
(52, 2, 11),
(53, 1, 3),
(53, 2, 11),
(54, 1, 3),
(54, 2, 11),
(55, 1, 3),
(55, 1, 11),
(55, 2, 1),
(55, 2, 8);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `tblgames`
--
ALTER TABLE `tblgames`
  ADD PRIMARY KEY (`gameId`);

--
-- Indexen voor tabel `tblsets`
--
ALTER TABLE `tblsets`
  ADD PRIMARY KEY (`gameId`,`setNr`),
  ADD KEY `gameId` (`gameId`);

--
-- Indexen voor tabel `tblspelers`
--
ALTER TABLE `tblspelers`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `tblteam`
--
ALTER TABLE `tblteam`
  ADD PRIMARY KEY (`gameId`,`teamId`);

--
-- Indexen voor tabel `tblteamspeler`
--
ALTER TABLE `tblteamspeler`
  ADD PRIMARY KEY (`gameId`,`spelerId`) USING BTREE,
  ADD KEY `spelerId` (`spelerId`),
  ADD KEY `gameId` (`gameId`,`teamId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `tblgames`
--
ALTER TABLE `tblgames`
  MODIFY `gameId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT voor een tabel `tblspelers`
--
ALTER TABLE `tblspelers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `tblteam`
--
ALTER TABLE `tblteam`
  ADD CONSTRAINT `tblteam_ibfk_1` FOREIGN KEY (`gameId`) REFERENCES `tblgames` (`gameId`) ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `tblteamspeler`
--
ALTER TABLE `tblteamspeler`
  ADD CONSTRAINT `tblteamspeler_ibfk_1` FOREIGN KEY (`gameId`) REFERENCES `tblteam` (`gameId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `tblteamspeler_ibfk_2` FOREIGN KEY (`spelerId`) REFERENCES `tblspelers` (`id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
