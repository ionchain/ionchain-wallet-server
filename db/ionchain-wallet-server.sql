/*
 Navicat MySQL Data Transfer

 Source Server         : 192.168.31.182
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : 192.168.31.182
 Source Database       : ionchain-wallet-server

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : utf-8

 Date: 05/23/2018 11:05:10 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `Id` varchar(50) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `wallet_sms`
-- ----------------------------
DROP TABLE IF EXISTS `wallet_sms`;
CREATE TABLE `wallet_sms` (
  `id` varchar(50) CHARACTER SET utf8 NOT NULL,
  `wallet_user_id` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '关联wallet_user主键',
  `mobile` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '手机号码',
  `validate_code` varchar(10) CHARACTER SET utf8 DEFAULT NULL COMMENT '验证码',
  `content` varchar(512) CHARACTER SET utf8 DEFAULT NULL,
  `create_time` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '创建时间',
  `dead_line` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `send_time` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '发送时间',
  `state` varchar(2) CHARACTER SET utf8 NOT NULL DEFAULT '1' COMMENT '有效状态； 1 有效； 0 失效； ',
  `sended` varchar(2) CHARACTER SET utf8 DEFAULT '0' COMMENT '发送状态； 0 未发送；1 发送成功；2 发送失败；',
  `type` varchar(2) CHARACTER SET utf8 NOT NULL DEFAULT '1' COMMENT '短信类型；1：注册；2：找回密码；',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `wallet_token`
-- ----------------------------
DROP TABLE IF EXISTS `wallet_token`;
CREATE TABLE `wallet_token` (
  `id` varchar(50) NOT NULL COMMENT '主键编号',
  `name` varchar(50) DEFAULT NULL COMMENT '代币名称',
  `symbol` varchar(20) DEFAULT NULL COMMENT '代币符号',
  `address` varchar(255) DEFAULT NULL COMMENT '代币合约地址',
  `create_time` varchar(20) DEFAULT NULL,
  `update_time` varchar(20) DEFAULT NULL,
  `decimals` varchar(20) DEFAULT NULL COMMENT '代币精度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `wallet_user`
-- ----------------------------
DROP TABLE IF EXISTS `wallet_user`;
CREATE TABLE `wallet_user` (
  `id` varchar(256) NOT NULL COMMENT '主键',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `mobile` varchar(20) NOT NULL COMMENT '手机号',
  `password` varchar(256) NOT NULL COMMENT '密码',
  `create_time` varchar(20) NOT NULL COMMENT '创建时间',
  `update_time` varchar(20) NOT NULL COMMENT '更新时间',
  `invite_code` varchar(20) DEFAULT NULL COMMENT '邀请码',
  `source` varchar(5) DEFAULT NULL COMMENT '来源分类；1：默认； 2：扩展；3：扩展；',
  `invited_code` varchar(20) DEFAULT NULL COMMENT '被邀请码',
  `state` varchar(5) DEFAULT NULL COMMENT '状态码：1：有效；',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
