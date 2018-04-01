<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
$sql = "DELETE FROM articles WHERE id = ";
foreach ($_POST as $key => $value) {
    // if ($value == ) {
    //     # code...
    // }
    if ($value == end($_POST)) {
        $sql .= "{$value}";
    } else {
        $sql .= "{$value} OR id = ";
    }
}
$res = delete($sql);
$arr = array("code" => 200, "msg" => "删除数据失败,请联系管理员 666-6666");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "已删除所选数据";
}
$json = json_encode($arr, JSON_UNESCAPED_UNICODE);
echo $json;
?>
