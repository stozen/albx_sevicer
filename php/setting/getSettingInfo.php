<?php
header('Content-Type:text/html;charset=utf-8');
require_once "../../util/php/DButil.php";

$sql = "SELECT O.value FROM options o WHERE o.`key` IN ('site_url','site_logo','site_name','site_description','site_keywords','site_footer','comment_status','comment_reviewed')";
$data = query($sql);
// echo '<pre>';
// print_r($data);
// echo '</pre>';
$res = array("code" => 200, "msg" => "无法获取数据操作");
if (!empty($data)) {
    $res = array("code" => 100, "data" => $data);
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);

?>
