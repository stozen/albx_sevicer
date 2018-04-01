<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_GET);
// echo '</pre>';`
// echo '<pre>';
$id = $_GET["id"];
$_POST["user_id"] = $id;
// print_r($_POST);
// echo '</pre>';

$arr = array("code" => 200, "msg" => "请填入数据完整");
if (!empty($_POST) && !empty($_POST["title"])) {
    $res = insert("articles", $_POST);
    if ($res) {
        $arr["code"] = 100;
        $arr["msg"] = "添加成功";
        # code...
    } else {
        $arr["msg"] = "无法添加,请联系管理员";
    }
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

?>
