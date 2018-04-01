<?php
header('Content-Type:text/html;charset=utf-8');
// print_r($_FILES);
$file = $_FILES["file"];
$arrFilename = explode(".", $file["name"]);//以"."分割字符串成为数组
$fileExtend = end($arrFilename);//获取数组最后一个成员
// $nameId = time() . mt_rand(1000, 9999);
$nameId = uniqid() . mt_rand(1000, 9999);//第二种生成唯一文件名
$fileName = $nameId . "." . $fileExtend;
// echo $fileName;
if (!file_exists("../../static/uploads/")) {
    // var_dump(file_exists("../../static/uploads"));
    mkdir("../../static/uploads/");
}
$path = "../../static/uploads/{$fileName}";
$res = move_uploaded_file($file["tmp_name"], $path);
$arr = array("code" => 200, "msg" => "上传图片失败!");
if ($res) {
    $arr["code"] = 100;
    $arr["msg"] = "上传成功";
    $arr["path"] = $path;
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
# code...

?>
