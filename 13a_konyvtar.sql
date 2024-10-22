-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Okt 22. 20:07
-- Kiszolgáló verziója: 10.4.24-MariaDB
-- PHP verzió: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13a_konyvtar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `authors`
--

CREATE TABLE `authors` (
  `ID` int(11) NOT NULL,
  `author` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `szul_datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `authors`
--

INSERT INTO `authors` (`ID`, `author`, `szul_datum`) VALUES
(1, 'Kővágó Levente', '2005-06-30'),
(3, 'Dudás Leventek', '2005-12-09'),
(5, 'Dudás Leventek', '2024-10-24');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `ID` int(11) NOT NULL,
  `cim` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `kiadas_ev` int(4) NOT NULL,
  `ISBM` varchar(13) COLLATE utf8_hungarian_ci NOT NULL,
  `authors` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`ID`, `cim`, `kiadas_ev`, `ISBM`, `authors`) VALUES
(1, 'Kiskacsa', 2023, '978-4-7216-18', 'Kővágó Levente'),
(4, 'Hellokagegeege', 2022, '7894612832727', 'Levente'),
(5, 'Levente', 2005, '121643616461', 'Dudás Leventek');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `book_authors`
--

CREATE TABLE `book_authors` (
  `ID` int(11) NOT NULL,
  `booksID` int(11) NOT NULL,
  `authorsID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `book_authors`
--

INSERT INTO `book_authors` (`ID`, `booksID`, `authorsID`) VALUES
(1, 1, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `book_authors`
--
ALTER TABLE `book_authors`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `booksID` (`booksID`),
  ADD KEY `authorsID` (`authorsID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `authors`
--
ALTER TABLE `authors`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `books`
--
ALTER TABLE `books`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `book_authors`
--
ALTER TABLE `book_authors`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `book_authors`
--
ALTER TABLE `book_authors`
  ADD CONSTRAINT `book_authors_ibfk_1` FOREIGN KEY (`authorsID`) REFERENCES `authors` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_authors_ibfk_2` FOREIGN KEY (`booksID`) REFERENCES `books` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
