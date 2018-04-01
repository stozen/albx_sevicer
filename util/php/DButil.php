<?php
// header('Content-Type:text/html;charset=utf-8');
require_once "config.php";
//1. 建立连接数据库函数
function connect()
{
    $connect = mysqli_connect(HOST, DB_USER, DB_PWD);
    // 选择数据库
    mysqli_select_db($connect, DB_NAME);
    // 设置字符集
    mysqli_set_charset($connect, DB_CHARSET);

    return $connect;
}
    
// 2.查询数据库
function query($sql)
{
    $con = connect();
    $res = mysqli_query($con, $sql);
    $arr = array();
    // 获取从数据库返回来的数据,转化成关联数据接受
    while ($row = mysqli_fetch_assoc($res)) {
        $arr[] = $row;
    }
    return $arr;
}
// 添加操作
function insert($table, $arr)
{
    $con = connect();
    $keys = array_keys($arr);
    $values = array_values($arr);
    $sql = "INSERT INTO {$table} (" . implode(",", $keys) . ") VALUES ('" . implode("','", $values) . "')";
    // echo $sql;
    // exit();
    $res = mysqli_query($con, $sql);
    return $res;
}
// 删除操作
function delete($sql)
{
    $con = connect();
    return mysqli_query($con, $sql);
}
// 执行sql语句操作
function excute($sql)
{
    $con = connect();
    return mysqli_query($con, $sql);
}
// 更新操作
function update($table, $arr, $id)
{
    $con = connect();
    $sql = "UPDATE $table SET ";
    foreach ($arr as $key => $value) {
        $sql .= "{$key} = '{$value}' ,";
    }
    $sql = substr($sql, 0, -1);
    $sql .= "WHERE ID = {$id}";
    // return $sql;
    return mysqli_query($con, $sql);
}
?>
