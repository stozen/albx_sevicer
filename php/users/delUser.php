<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$ids = $_POST['id'];
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
@$res = implode(",", $ids);
// var_dump($res);
if (!$res) {
    $res = $ids;
}
$sql = "DELETE FROM users WHERE ID IN (" . $ids . ")";
// echo $sql;
$res = delete($sql);
$arr = array("code" => 200, "msg" => "删除失败,请重新操作");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "已删除";
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
?>