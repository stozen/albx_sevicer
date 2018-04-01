/*
 * @Author: Jack Lu 
 * @Date: 2018-03-03 16:02:35 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 15:21:49
 */
/* 登录验证请求ajax */
checkLogin(1, logined());
function logined(){
    $(function () {
        // 请求退出
        // $.get("./php/login/logout.php",
        //     function (res, textStatus, jqXHR) {
        // 通过location.href获取id
        // var search = getSearch();
        // var id = search.id;
        var id = $.cookie("user_id");
        // console.log(id);
        // console.log(location.search);
        $.post("./php/users/getUserInfo.php", {
            "id": id
        },
            function (res, textStatus, jqXHR) {
                // console.log(res);
                // 获取数据填写头像.用户名
                var name = res.data[0].nickname;
                var avatar = res.data[0].avatar;
                $(".profile .name").text(name);
                $(".profile .avatar").attr("src", avatar);
                // var adminPassword = res.data[0].password;
                if (res.data[0].id == 1) {
                    $(".aside .nav li:nth-child(4)").show();
                } else {

                    $(".aside .nav li:nth-child(4)").remove();
                    // $(".aside .nav li:nth-child(4)").hide();

                }

            },
            "json"
        );
        var iframe = $("#inner-frame");

        // // 设置为个人中心传入id
        // $("#menu-posts li a").on("click",function(){
        //     // console.log("haha");
        //     iframe.attr("src",this.href+"?id=" + id);
        //     // console.log(iframe.attr("src"));
        //     return false;
        // })
        // console.log(iframe);
        // 跳转页面
        setiframe(iframe);

        $(".aside a").on("click", function () {
            // var iframe = $("#inner-frame");
            if ($(this).siblings().size() == 0) {
                iframe.attr("src", this.href + "?id=" + id);
                return false;
            }
        });

        // 设置为添加文章传入id
        $("#profile").on("click", function () {
            // console.log("haha");
            iframe.attr("src", this.href + "?id=" + id);
            // console.log(iframe.attr("src"));
            return false;
        })

        // 窗口大小变化事件函数
        $(window).on("resize", function () {
            setiframe(iframe);
        })

        function setiframe(iframe) {
            // console.log(iframe);
            var targetWidth = $(".main").width();
            // console.log(iframe.width());
            var targetHeight = $(window).height() - 80;
            // console.log(targetHeight);
            iframe.width(targetWidth);
            iframe.height(targetHeight);
        }

        // 点击退出登录
        $("#logout").on("click", function () {
            $.post("./php/login/logout.php",
                function (data, textStatus, jqXHR) {
                    if (data.code == 100) {
                        layer.alert(data.msg, function () {
                            location.href = "./pages/login.html";
                        });
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
