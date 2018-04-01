<?php
header('Content-Type:text/html;charset=utf-8');

require_once "../../util/php/DButil.php";
// 查询数据库
// 1.连接---查询显示部分
// $con = connect();
$result = array("code" => 200, "msg" => "你还没有登录,请先登录");
// echo '<pre>';
// !!!!!开始session操作之前一定要记住session_start();
session_start();
// print_r($_SESSION);
// print_r($_POST);
// echo '</pre>';
// exit();
if (!empty($_SESSION) && $_SESSION["isLogin"] == 1) {
    // $result["code"] = 100;
    // $result["msg"] = "登录成功!";
    $sql = "SELECT * FROM categories";
    $arr = query($sql);
    // echo '<pre>';
    // print_r($arr);
    // echo '</pre>';
    $html = "";
    foreach ($arr as $key => $value) {
        $html .= "<tr categories_id = {$value['id']}>";
        $html .= "<td><input type='checkbox'></td>";
        $html .= "<td>{$value['name']}</td>";
        $html .= "<td>{$value['slug']}</td>";
        $html .= "<td><a class='edit' href='javascript:;'>编辑</a>&nbsp&nbsp&nbsp&nbsp<a  class='del' href='javascript:;'>删除</a></td>";
        $html .= "</tr>";
    }
    //2.添加操作
    
    //判断是否插入成功,决定是否刷新数据,如果成功了,再刷新,就肯定是最新的数据
    // 今天的策略是使用action标记要做的操作,才插入或删除之类的操作
    //一定要记得先判断在操作
    if (strtoupper($_SERVER["REQUEST_METHOD"] == "POST")) {

        $action = $_GET['action'];
        if ($action == "add") {
            $res = insert("categories", $_POST);
            $arr = array("code" => 200, "msg" => "添加失败,请联系管理员!");
            if ($res) {
                $arr["code"] = 100;
                $arr["msg"] = "添加成功";
            }
            if ($arr["code"] == 100) {
                // echo '<script src="../../assets/lib/jquery/jquery.js"></script>';
                // echo '<script src="../../assets/lib/layer/layer.js"></script>;';
                // echo "<script>layer.alert('{$arr['msg']}',{icon : 1},function(){location.href = './categories.php';}); </script>";
                echo "<script>alert('新增成功');location.href='./categories.php';</script>";
            } else {
                echo "<script>layer.alert({$arr['msg']},{icon : 2});</script>";
            }
                // exit;
        }
        if ($action == "delete") {
            $id = $_POST['id'];
            $sql = "DELETE FROM categories WHERE id = {$id}";
            // 执行删除操作
            $res = delete($sql);
            $arr = array("code" => 200, "msg" => "删除操作失败,请联系管理员!");
            if ($res) {
                $arr["code"] = 100;
                $arr["msg"] = "删除成功";
            }
            $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
            echo $json;
            exit();

        }
        if ($action == "edit") {
            // 编辑之前首先要进去查询操作,将查到的数据返回去
            $id = $_POST['id'];
            $sql = "SELECT * FROM categories WHERE id = {$id}";
            $arr = query($sql);
            // $sql = "DELETE FROM categories WHERE id = {$id}";
            // 判断是否查到数据
            $res = array("code" => 200, "msg" => "编辑操作失败,请联系管理员!");
            if (!empty($arr)) {
                $res["code"] = 100;
                $res["msg"] = "请开始编辑操作!";
                $res["data"] = $arr;
            }
            $json = json_encode($res, JSON_UNESCAPED_UNICODE);
            echo $json;
            exit();
        }
        if ($action == "query") {
            // 编辑之前首先要进去查询操作,将查到的数据返回去
            $id = $_GET['id'];
            // echo '<pre>';
            // print_r($_POST);
            // echo '</pre>';
            // echo $id;
            $res = update("categories", $_POST, $id);

            $arr = array("code" => 200, "msg" => "编辑操作失败,请联系管理员!");
            if ($res) {
                $arr["code"] = 100;
                $arr["msg"] = "编辑成功!";
            }
            // exit();
            if ($arr["code"] == 100) {
                // echo '<script src="../../assets/lib/jquery/jquery.js"></script>';
                // echo '<script src="../../assets/lib/layer/layer.js"></script>;';
                // echo "<script>layer.alert('{$arr['msg']}',{icon : 1},function(){location.href = './categories.php';}); </script>";
                echo "<script>alert('" . "{$arr["msg"]}" . "');location.href='./categories.php';</script>";
            } else {
                echo "<script>alert('" . "{$arr["msg"]}" . "');</script>";
            }
            // $json = json_encode($res, JSON_UNESCAPED_UNICODE);
            // echo $json;
            // exit();
        }
    }
} else {
    echo "<script>alert('" . "你还没有登录请先登录" . "');location.href='../../pages/login.html'</script>";
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Categories &laquo; Admin</title>
  <!-- <link rel="stylesheet" href="../assets/lib/bootstrap/css/bootstrap.css"> -->
  <link rel="stylesheet" href="../../assets/lib/bootstrap/css/bootstrap.css">
  <!-- <link rel="stylesheet" href="../assets/lib/font-awesome/css/font-awesome.css"> -->
  <link rel="stylesheet" href="../../assets/lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../..//assets/css/common.css">
</head>
<body>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>分类目录</h1>
      </div>
      <div class="row">
        <div class="col-md-3">
          <form id="cat-data" action="./categories.php?action=add" method="post">
            <h2>添加新分类目录</h2>
            <div class="form-group">
              <label for="name">名称</label>
              <input id="name" class="form-control" name="name" type="text" placeholder="分类名称">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
              <p class="help-block">https://zce.me/category/<strong>slug</strong></p>
            </div>
            <div class="form-group">
              <!-- <button id="btn-suer" class="btn btn-primary" type="submit">添加</button> -->
              <input id="btn-user" class="btn btn-primary" type="submit" value="添加">
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <div class="page-action">
            <!-- show when multiple checked -->
            <!-- <a class="btn btn-danger btn-sm" href="javascript:;" style="display: block">批量删除</a> -->
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-center" width="40"><input type="checkbox"></th>
                <th>名称</th>
                <th>Slug</th>
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>
            <tbody id="dataset">
                <!-- 输出显示 -->
                <?php
                header('Content-Type:text/html;charset=utf-8');
                echo $html;
                ?>              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <script src="../../assets/lib/jquery/jquery.js"></script>
  <script src="../../assets/lib/bootstrap/js/bootstrap.js"></script>
  <script src="../../assets/lib/jquery/jquery.tmpl.js"></script>
  <script src="../../assets/lib/layer/layer.js"></script>;
  <script>
    //   var dels = $(".del");
    //   console.log(dels);
    // 注册点击上除事件
    $("tr").on("click", ".del",function(){
        var categories_id = $(this).parent().parent().attr("categories_id");
        // console.log(categories_id);
          if (confirm('are you sure to delete it ?')) {
            //   增加action键值对,标识是什么操作
              $.post("./categories.php?action=delete", {id : categories_id},
                  function (data, textStatus, jqXHR) {
                    //   console.log(data);
                      if (data.code == 100) {
                          layer.alert(data.msg,{icon : 1},function(){
                              location.href = "./categories.php";
                          });                          
                      } else {
                          layer.alert("data.msg");
                      }
                  },
                "json"
              );
              
          }
          return false;
      });
    //注册点击修改事件
    $("tr").on("click", ".edit",function(){
        var categories_id = $(this).parent().parent().attr("categories_id"); $.post("./categories.php?action=edit", {id : categories_id},
            function (data, textStatus, jqXHR) {
                // console.log(data);
                if (data.code == 100) {
                    var data = data["data"][0];
                    // console.log(data);
                    $("#cat-data h2").text("请编辑分类目录");
                    $("#name").val(data.name);
                    $("#slug").val(data.slug);
                    $("#btn-user").val("提交");
                    $("#cat-data").attr("action", "./categories.php?action=query&id="+data.id);
                }else {
                    layer.alert("data.msg");
                }
            },
            "json"
        );
    })
  </script>
</body>
</html>
