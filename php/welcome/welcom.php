<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$arr = array();
// 获取总文章数量
$sql = "SELECT COUNT(*) as pageTotal FROM articles";
$pageTotal = query($sql)[0]["pageTotal"];
$arr[] = $pageTotal;//加进数组里
// 获取总分类数量
$sql = "SELECT COUNT(*) as categoriesTotal FROM categories";
$categoriesTotal = query($sql)[0]["categoriesTotal"];
$arr[] = $categoriesTotal;
$sql = "SELECT COUNT(*) as commentsTotal FROM comments";
$commentsTotal = query($sql)[0]["commentsTotal"];
$arr[] = $commentsTotal;
$sql = "SELECT COUNT(*) as articleDarfted FROM articles WHERE status = 0";
$articleDarfted = query($sql)[0]["articleDarfted"];
$arr[] = $articleDarfted;
$sql = "SELECT COUNT(*) as commentHeld FROM comments WHERE status = 0";
$commentHeld = query($sql)[0]["commentHeld"];
$arr[] = $commentHeld;
// echo '<pre>';
// print_r($arr);
// echo '</pre>';
// exit();
$res = array("code" => 200, "msg" => "获取统计失败");

if (!empty($arr)) {
    $flag = true;
    if (empty($pageTotal)) {
        $res["msg"] = "获取文章统计失败";
        $res["code"] = 200;
        $flag = false;
    }
    if (empty($categoriesTotal)) {
        $res["msg"] .= "获取分类统计失败";
        $res["code"] = 200;
        $flag = false;
    }
    if (empty($commentsTotal)) {
        $res["msg"] .= "获取评论统计失败";
        $res["code"] = 200;
        $flag = false;
    }
    if (empty($articleDarfted)) {
        $res["msg"] .= "获取评论统计失败";
        $res["code"] = 200;
        $flag = false;
    }
    if (empty($commentHeld)) {
        $res["msg"] .= "获取评论统计失败";
        $res["code"] = 200;
        $flag = false;
    }
    if ($flag) {
        $res["code"] = 100;
        $res["msg"] = "获取统计成功";
        $res["data"] = $arr;
    }
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>
   