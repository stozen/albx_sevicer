<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$res = insert("users", $_POST);
$arr = array("code" => 200, "msg" => "添加失败,请联系管理员!");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "添加成功";
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
?>
