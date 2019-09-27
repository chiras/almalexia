-- MySQL dump 10.13  Distrib 5.7.19, for macos10.12 (x86_64)
--
-- Host: localhost    Database: foxbot
-- ------------------------------------------------------
-- Server version	5.7.19

CREATE DATABASE almalexia;
USE almalexia;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `eventid` int(20) NOT NULL AUTO_INCREMENT,
  `eventname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guildid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelid2` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `announceid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `announceid2` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restriction` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `special` int(20),
  `creator` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` int(1) NOT NULL DEFAULT 1,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`eventid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `signups`;
CREATE TABLE `signups` (
  `signupid` int(20) NOT NULL AUTO_INCREMENT,
  `eventid` int(20) NOT NULL,
  `duserid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`signupid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `specials`;
CREATE TABLE `specials` (
  `specialid` int(20) NOT NULL AUTO_INCREMENT,
  `trigg` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rolerestriction` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logourl` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docsurl` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`specialid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO specials (trigg, description, rolerestriction, logourl, docsurl) VALUES ("","","","","");
-- INSERT INTO specials (trigg, description, rolerestriction, logourl, docsurl) VALUES ("ECGAX","blaaaaaaaaa","626472574871928842","www","a");
INSERT INTO specials (trigg, description, rolerestriction, logourl, docsurl) VALUES ("ECG","Our organized PvP group. Check details below!","544485430511271939","https://images-ext-2.discordapp.net/external/QEDZrMVdYGG_lY9Srv3ukGx-6rlEq4YPcHiYzMe8L2U/%3Fw%3D972%26h%3D1157/https/s3-us-west-2.amazonaws.com/www.guilded.gg/ContentMedia/04356f728bf8ac83d1be60065b7dca61-Full.png","LINK to ECG docs");
INSERT INTO specials (trigg, description, rolerestriction, logourl, docsurl) VALUES ("ERG","Our Trial progression group. Check details below!","362321307917877250","https://media.discordapp.net/attachments/558741446329368596/625288780307365889/ERG_Logo.png?width=1474&height=1474","Link to TRIAL docs");


DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `roleid` int(20) NOT NULL AUTO_INCREMENT,
  `eventid` int(20) NOT NULL,
  `rolename` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rolesymbol` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rolemax` int(2) NOT NULL,
  `rolecurrent` int(2) NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `guilds`;
CREATE TABLE `guilds` (
  `guildid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guildname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `officerid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(230) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`guildid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

 INSERT INTO guilds (guildid,guildname,channelid,officerid,logo) VALUES ("624948195079749653","Almalexia's Realm","626386741724708885","625096603052539905","https://images-ext-1.discordapp.net/external/BMLRG9klXozguEpuGEZVKBiEGd0X7ytyaUpnGhWje_c/https/s3-us-west-2.amazonaws.com/www.guilded.gg/team_images/avatars/e02bcbd00f793d50624b2ec1.jpg");
 INSERT INTO guilds (guildid,guildname,channelid,officerid,logo) VALUES ("230586115877240832","Exterminatus","230592026951811074","230588178409455616","https://images-ext-1.discordapp.net/external/BMLRG9klXozguEpuGEZVKBiEGd0X7ytyaUpnGhWje_c/https/s3-us-west-2.amazonaws.com/www.guilded.gg/team_images/avatars/e02bcbd00f793d50624b2ec1.jpg");
 INSERT INTO guilds (guildid,guildname,channelid,officerid,logo) VALUES ("626677421101547521","A2","626677470157864960","626677622054846484","https://images-ext-1.discordapp.net/external/BMLRG9klXozguEpuGEZVKBiEGd0X7ytyaUpnGhWje_c/https/s3-us-west-2.amazonaws.com/www.guilded.gg/team_images/avatars/e02bcbd00f793d50624b2ec1.jpg");





