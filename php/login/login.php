<?php
header('Content-Type:text/html;charset=utf-8');
// 引入工具--数据库操作函数
require_once "../../util/php/DButil.php";
// 登录验证
// $id = $_GET['id'];
$email = $_POST["email"];
$password = $_POST["password"];
// 建立连接数据库
$connect = connect();

$sql = "SELECT * FROM users u WHERE email = '" . $email . "' AND u.password = '" . $password . "'";

// 查找读取数据库内容
$arr = query($sql);

if (!empty($arr)) {
    // 用100表示请求成功
    if ($arr[0]["status"] == 1) {
        $result = array("code" => 100, "msg" => "登录成功,欢迎使用", "data" => $arr);
        // 开始session操作.读取,设置
        session_start();
        $_SESSION["isLogin"] = 1;
        // echo '<pre>';
        // print_r($_SESSION);
        // echo '</pre>';
        // exit();

    } else {
        $result = array("code" => 200, "msg" => "该用户没有被允许,请联系管理员");
    }
} else {
    // 用200表示请求成功
    $result = array("code" => 200, "msg" => "用户名或者密码错误");
}
$json = json_encode($result, JSON_UNESCAPED_UNICODE);
echo $json;
?>
