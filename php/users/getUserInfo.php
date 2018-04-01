<?php
// header('Content-Type:application/json;charset=utf-8');
// header("Content-Type: application/json;charset=utf-8");
// header("Content-Type: text/plain;charset=utf-8"); 
header("Content-Type: application/json;charset=utf-8"); 
//header("Content-Type: text/xml;charset=utf-8"); 
//header("Content-Type: text/html;charset=utf-8"); 
// header("Content-Type: application/javascript;charset=utf-8"); 
// 引入数据库操作函数
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
$id = $_POST["id"];
$sql = "SELECT * FROM users u WHERE id = {$id}";
// echo $sql;
$arr = query($sql);
if (!empty($arr)) {
    $res = array("code" => 100, "data" => $arr);
} else {
    $res = array("code" => 200, "msg" => "无法获取数据操作");
}

$json = json_encode($res, JSON_UNESCAPED_UNICODE);
echo $json;
?>
