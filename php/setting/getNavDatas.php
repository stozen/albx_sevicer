<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$sql = "SELECT o . value FROM options o WHERE o . `key` = 'nav_menus'";
$arrData = query($sql);
$res = array("code" => 200, "msg" => "获取数据失败,请联系管理员 666-6666");
if (!empty($arrData)) {
    $res["code"] = 100;
    $res["msg"] = "请开始您的编辑操作";
    $res["data"] = json_decode($arrData[0]["value"]);
}

$json = json_encode($res, JSON_UNESCAPED_UNICODE);
echo $json;

?>
