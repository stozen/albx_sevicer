<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_GET);
// echo '</pre>';
$id = $_GET['id'];
            // echo '<pre>';
            // print_r($_POST);
            // echo '</pre>';
            // echo $id;
$res = update("users", $_POST, $id);

$arr = array("code" => 200, "msg" => "修改操作失败,请联系管理员!");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "修改成功!";
}
            // exit();
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
?>
