<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$sql = "SELECT COUNT(*) as pageTotal FROM comments";
    // echo $sql;
$arr1 = query($sql)[0]['pageTotal'];

$currentPage = ((int)$_POST['currentPage'] - 1) * 10;
$pageCount = $_POST['pageCount'];
$sql2 = "SELECT c.author,c.content, a.title, c.created,c.status FROM comments AS c LEFT JOIN articles AS a ON c.article_id = a.id ";
    // echo $sql2;

$arr2 = query($sql2);
$res = array("code" => 200, "msg" => "获取数据失败");
if (!empty($arr2)) {
    $res['code'] = 100;
    $res["msg"] = "获取数据成功";
    $res['col'] = $arr1;
    $res["data"] = $arr2;
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>
