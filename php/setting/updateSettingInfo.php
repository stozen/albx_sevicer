<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
$data = $_POST;
if (!isset($data['comment_status'])) {
    $data['comment_status'] = 0;
}
if (!isset($data['comment_reviewed'])) {
    $data['comment_reviewed'] = 0;
}
// $sql = "SELECT O.value FROM options o WHERE o.`key` IN ('site_logo','site_name','site_description','site_keywords','comment_status','comment_reviewed')";
// $arr = query($sql);
foreach ($data as $key => $value) {
    // $value['value']
    $sql = "UPDATE options o SET o.value = '{$value}' WHERE o.`key` = '{$key}'";
    $res = excute($sql);
    if ($res) {
        $flag = false;
    }

}
$res = array('code' => 200, 'msg' => "修改失败");
if (!$flag) {
    $res['code'] = 100;
    $res['msg'] = "修改成功";
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>
