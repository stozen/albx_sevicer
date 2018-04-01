<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
// 执行更新操作
$id = $_POST["id"];
unset($_POST['id']);
$res = update("articles", $_POST, $id);

$arr = array("code" => 200, "msg" => "请填入数据完整");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "编辑成功";
        # code...
} else {
    $arr["msg"] = "编辑失败,请联系管理员";
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
?>
