<?php

header('Content-Type:text/html;charset=utf-8');
$result = array("code" => 200, "msg" => "你还没有登录,请先登录");
// echo '<pre>';
// !!!!!开始session操作之前一定要记住session_start();
session_start();
// print_r($_SESSION);
// print_r($_POST);
// echo '</pre>';
// exit();
if (!empty($_SESSION) && $_SESSION["isLogin"] == 1) {
    $result["code"] = 100;
    $result["msg"] = "登录成功!";
}
// $_SESSION
// exit();
$json = json_encode($result);
echo $json;
?>
