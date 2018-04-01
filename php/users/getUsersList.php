<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$sql = "SELECT * FROM users WHERE id != 1";
$arr = query($sql);
$res = array("code" => 200, "msg" => "无法获取数据操作");
if (!empty($arr)) {
    $res = array("code" => 100, "data" => $arr);
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);

?>
