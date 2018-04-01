<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
$id = $_POST['id'];
$oldPassword = $_POST['oldPassword'];
$password = $_POST['password'];
// 先根据id取出原来的密码进行判断
$sql = "SELECT u.password FROM users u WHERE u.id = {$id}";
$data = query($sql)[0];
if ($oldPassword == $data['password']) {
    $res = array('code' => 200, 'msg' => "修改失败");
    $sql = "UPDATE users u SET u.password = {$password} WHERE id = {$id}";
    // echo $sql;
    $con = connect();
    $flag = mysqli_query($con, $sql);
    if ($flag) {
        $res['code'] = 100;
        $res['msg'] = "修改成功";
    }

} else {
    $res = array('code' => 200, 'msg' => "旧密码不正确，请重新输入");
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>
