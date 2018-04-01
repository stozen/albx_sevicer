/*
 * @Author: Jack Lu 
 * @Date: 2018-03-08 14:39:54 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 15:21:37
 */
checkLogin(2, logined());
function logined(){
    $(function () {
        // 获取分类信息
        $.post("../php/articles/getcategories.php?action=getcategories",
            function (data, textStatus, jqXHR) {
                // console.log(data);
                if (data.code == 100) {
                    var data = data.data;
                    var html = $("#gc").tmpl(data); //调用模板
                    $("#category").append(html);
                } else {
                    alert(data.msg);
                }
            },
            "json"
        );
        // change事件---input标签的value属性产生改变的时候
        $("#feature").on("change", function () {
            var file = this.files[0];
            // var file2 = this.files[1];
            var data = new FormData();
            data.append("file", file); //传入的值是键值对
            // jq不支持文件上传,所以用原生的方法
            // data.append("file2", file2);多文件上传
            var xhr = new XMLHttpRequest();
            xhr.open("post", "../php/common/fileUpload.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    var res = JSON.parse(xhr.responseText);
                    // console.log(res);
                    if (res.code == 100) {
                        $(".help-block").css("display", "block").attr("src", res.path);
                    } else {
                        layer.alert(res.msg);
                    }
                }
            }

        })

        $("#btn-sure").on("click", function () {

            // var id = getSearch().id;
            // console.log(id);
            var src = $(".help-block").attr("src");

            // 先判断是添加还是修改操作
            if (!$(".form-group #articleId").val()) {
                // 添加操作
                var id = $.cookie("user_id");
                $(".form-group #articleId").remove();
                var data = $("#articledata").serialize();
                data = data + "&feature=" + src;
                $.post("../php/articles/addArticle.php?id=" + id, data,
                    function (data, textStatus, jqXHR) {
                        // console.log(data);
                        if (data.code == 100) {
                            layer.alert(data.msg, function () {
                                location.href = "./articles.html";
                            });
                        } else {
                            layer.alert(data.msg);
                        }
                    },
                    "json"
                );

            } else {
                // 编辑操作
                var data = $("#articledata").serialize();
                data = data + "&feature=" + src;
                // console.log(data);

                $.post("../php/articles/updateArticle.php", data,
                    function (data, textStatus, jqXHR) {
                        console.log(data);
                        if (data.code == 100) {
                            layer.alert(data.msg, function () {
                                location.href = "./articles.html";
                            });
                        } else {
                            layer.alert(data.msg);
                        }
                    },
                    "json"
                );
            }
            return false;
        })
        // 判断是否为编辑操作
        var searchHref = getSearch();
        if (searchHref.action == "edit") {
            var articleId = searchHref.id;
            $.post("../php/articles/getArticles.php", {
                id: articleId
            },
                function (data, textStatus, jqXHR) {
                    console.log(data);
                    if (data.code == 100) {
                        var data = data.data[0];
                        $(".form-group  #articleId").val(articleId);
                        $(".form-group #title").val(data.title);
                        $(".form-group #content").val(data.content);
                        $(".form-group #slug").val(data.slug);
                        $(".form-group #category").val(data.category_id);

                        $(".form-group .thumbnail").show().attr("src", data.feature);
                        var time = data.created.replace(" ", "T");
                        $(".form-group #created").val(time);

                    } else {
                        layer.alert(data.msg);
                    }
                },
                "json"
            );
        }
    });
}