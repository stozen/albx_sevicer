<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$id = $_POST['id'];
$sql = "SELECT a.slug, a.title, a.feature, a.created, a.content, a.category_id, a.status FROM articles a WHERE id = {$id}";
// 执行sql语句
$data = query($sql);
$res = array("code" => 200, "msg" => "获取编辑数据失败,请联系管理员 666-6666");
if (!empty($data)) {
    $res["code"] = 100;
    $res["msg"] = "请开始您的编辑操作";
    $res["data"] = $data;
}

$json = json_encode($res, JSON_UNESCAPED_UNICODE);
echo $json;

?>
