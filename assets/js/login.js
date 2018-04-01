/*
 * @Author: Jack Lu 
 * @Date: 2018-03-03 14:49:50 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-09 11:20:29
 */
/* *
登录的逻辑

 */
$(function(){
    $("#btn-login").on("click",function () {
        var data = $("#login-wrap").serialize();
        // console.log(data);     
        $.post("../php/login/login.php", data,
            function (res, textStatus, jqXHR) {
                // console.log(res);
                if (res.code == 100) {
                    // alert(res.msg);
                    var id = res.data[0].id;
                    console.log(id);
                    $.cookie("user_id", id, {path:"/"});//设置id在根目录有效
                    location.href = "../index.html";
                    // location.href = "../index.html";
                } else {
                    layer.alert(res.msg, { icon: 2 });        
                }
            },
            "json"
        );
    })
});
