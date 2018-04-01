<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
$id = $_POST["id"];
$sql = "SELECT * FROM articles a WHERE id = {$id}";
$data = query($sql);

$res = array("code" => 200, "msg" => "编辑操作失败");
if (!empty($data)) {
    $res["code"] = 100;
    $res["msg"] = "请开始编辑";
    $res["data"] = $data;
}
$json = json_encode($res, JSON_UNESCAPED_UNICODE);
echo $json;

?>
