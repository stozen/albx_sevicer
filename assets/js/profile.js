/*
 * @Author: Jack Lu 
 * @Date: 2018-03-07 20:55:16 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 15:28:23
 */
checkLogin(2, logined())
function logined(){
    $(function () {
        // 通过location.href获取id
        // var search = getSearch();
        // console.log(getSearch());
        // var id = search.id;

        // 建立ajax请求服务器数据填充到个人中心
        var id = $.cookie("user_id");
        // 获取用户id--登录时通过get请求过来的
        // console.log(location. search);
        // var fm = new FormData();
        // console.dir(fm);

        // 获取与设置个人数据
        $.post("../php/users/getUserInfo.php", {
            "id": id
        },
            function (res, textStatus, jqXHR) {
                // console.log(res);
                var data = res.data;
                var name = data[0].nickname;
                var avatar = data[0].avatar;
                var email = data[0].email;
                var slug = data[0].slug;
                var nickname = data[0].nickname;
                var bio = data[0].bio;
                // console.log($("#avatar-img").attr("src"));
                $("#avatar-img").attr("src", avatar);
                $("#email").val(email);
                $("#slug").val(slug);
                $("#nickname").val(nickname);
                $("#bio").val(bio);
            },
            "json");

        // 上传与加载图片
        $("#avatar-file").on("change", function () {
            var file = this.files[0];
            var data = new FormData();
            data.append("file", file);
            var xhr = new XMLHttpRequest();
            xhr.open("post", "../php/common/fileUpload.php", true);
            xhr.send(data);
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    var res = JSON.parse(xhr.responseText);
                    if (res.code == 100) {
                        $("#avatar-img").attr("src", res.path);
                    } else {
                        layer.alert(res.msg);
                    }

                }
            }
        })
        //   点击更新个人数据
        $("#btn-sure").on("click", function () {
            // console.log(data);
            var src = $("#avatar-img").attr("src");
            // console.log($("#avatar-img"));
            $("#avatar").val(src);
            var data = $("#userdata").serialize();
            // data = data
            // data = data + "&avatar=" + src;
            $.post("../php/users/editUserInfo.php?id=" + id, data,
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    if (data.code = 100) {
                        layer.alert(data.msg, {
                            icon: 1
                        }, function () {
                            location.reload();
                        }

                        );
                    } else {
                        layer.alert(data.msg);
                    }
                },
                "json"
            );
            return false;
        })


    });
}