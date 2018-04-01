<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
$id = $_POST['id'];
$sql = "SELECT o . value FROM options o WHERE o . `key` = 'nav_menus'";
$arrData = query($sql);
$data = $arrData[0]['value'];
$data = json_decode($data);
foreach ($data as $key => $value) {

    if ($value->id == $id) {
        array_splice($data, $key, 1);
    }
}
$json = json_encode($data, JSON_UNESCAPED_UNICODE);
// 写sql语句
$sql = "UPDATE options o SET o.value = '{$json}' WHERE o.`key` = 'nav_menus'";
// 执行sql语句
// echo $sql;
$res = excute($sql);

$arr = array("code" => 200, "msg" => "删除数据失败,请联系管理员 666-6666");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "删除成功";
}

$json = json_encode($arr, JSON_UNESCAPED_UNICODE);
echo $json;

?>
