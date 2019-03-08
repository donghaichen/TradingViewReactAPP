/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost:3306
 Source Schema         : aisiex

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 08/03/2019 16:58:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `aid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `short_con` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签',
  `start_time` timestamp(0) NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` timestamp(0) NULL DEFAULT NULL COMMENT '结束时间',
  `lang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'chs' COMMENT '语言',
  `is_valid` smallint(1) NOT NULL COMMENT '是否有效',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`aid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO `aisiex`.`admin_apis`(`id`, `controller`, `action`, `created_at`, `name_cn`) VALUES (213, 'activity', 'valid', '2019-03-08 15:00:35', NULL);
INSERT INTO `aisiex`.`admin_apis`(`id`, `controller`, `action`, `created_at`, `name_cn`) VALUES (212, 'activity', 'update', '2019-03-08 15:00:20', NULL);
INSERT INTO `aisiex`.`admin_apis`(`id`, `controller`, `action`, `created_at`, `name_cn`) VALUES (211, 'activity', 'show', '2019-03-08 15:00:11', NULL);
INSERT INTO `aisiex`.`admin_apis`(`id`, `controller`, `action`, `created_at`, `name_cn`) VALUES (210, 'activity', 'create', '2019-03-08 15:00:01', NULL);
INSERT INTO `aisiex`.`admin_apis`(`id`, `controller`, `action`, `created_at`, `name_cn`) VALUES (209, 'activity', 'list', '2019-03-08 14:59:45', NULL);



INSERT INTO `aisiex`.`admin_menus`(`id`, `name_cn`, `url`, `parent_id`, `order_id`, `role_id`, `created_at`) VALUES (110, '活动管理', 'activity.html', 61, NULL, NULL, '2019-03-08 16:01:49');
