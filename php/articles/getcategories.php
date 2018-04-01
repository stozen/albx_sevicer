<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$action = $_GET["action"];

if ($action == "getcategories") {
    $sql = 'SELECT categories.id, categories.name FROM categories';
    $arr = query($sql);
    $res = array("code" => 200, "msg" => "获取分类筛选数据失败");
    if (!empty($arr)) {
        $res["code"] = 100;
        $res["msg"] = "获取成功";
        $res["data"] = $arr;
    }
}

if ($action == "classify") {
    $id = $_POST['id'];
    $status = $_POST['status'];
    $sql = "SELECT COUNT(*) as pageTotal FROM articles as a LEFT JOIN users as b ON a . user_id = b . id LEFT JOIN categories as c ON a . category_id = c . id WHERE a.category_id = {$id} AND a.status = {$status}";
    // echo $sql;
    $arr1 = query($sql)[0]['pageTotal'];
    // echo '<pre>';
    // print_r($arr1);
    // echo '</pre>';
    // exit();
    $currentPage = ((int)$_POST['currentPage'] - 1) * 10;
    $pageCount = $_POST['pageCount'];
    $sql2 = "SELECT a . id, a . title, b . nickname, c . name, a . created, a . status FROM articles as a LEFT JOIN users as b ON a . user_id = b . id LEFT JOIN categories as c ON a . category_id = c . id WHERE a.category_id = {$id} AND a.status = {$status}   LIMIT {$currentPage} , {$pageCount} ";
    // echo $sql2;

    $arr2 = query($sql2);

    $res = array("code" => 200, "msg" => "获取数据失败");
    if (!empty($arr2)) {
        $res['code'] = 100;
        $res["msg"] = "获取数据成功";
        $res['col'] = $arr1;
        $res["data"] = $arr2;
    }
}
$json = json_encode($res, JSON_UNESCAPED_UNICODE);
echo $json;
?>
