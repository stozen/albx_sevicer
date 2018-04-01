<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";

$id = $_GET['id'];
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
// echo $id;
$res = update("users", $_POST, $id);

$arr = array("code" => 200, "msg" => "更新操作失败,请重新操作!");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "更新成功!";
}
$json = json_encode($arr, JSON_UNESCAPED_UNICODE);
echo $json;
?>
