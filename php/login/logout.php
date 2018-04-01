<?php
header('Content-Type:text/html;charset=utf-8');
session_start();
// 删除session操作
unset($_SESSION["isLogin"]);
$res = array("code" => 200, "msg" => "退出失败");
if (empty($_SESSION["isLogin"])) {
    $res["code"] = 100;
    $res["msg"] = "退出成功";
    // $res = array("code" => 100, "msg" => "退出成功");
}
$json = json_encode($res, JSON_UNESCAPED_UNICODE);
echo $json;
?>
