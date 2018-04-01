/*
 * @Author: Jack Lu 
 * @Date: 2018-03-11 15:01:12 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 15:33:15
 */
function checkLogin(flag ,callback){
    var url = "../php/login/checkLogin.php";
    var href = "./login.html";
    if (flag == 1) {
        url = "./php/login/checkLogin.php";
        href = "./pages/login.html";
    }
    /* 登录验证请求ajax */
    $.post(url,
        function (data) {
            if (data.code == 100) {
                // 提高用户体验,用插件layer 提示用户
                // console.log('!');
                // layer.alert("提示内容", {配置选项},回调函数)
                /*             layer.alert(data.msg, {
                                icon: 1
                            }); */
            } else {
                layer.alert(data.msg, {
                    icon: 2
                });
                location.href = href;
            }
        },
        "json"
    );
    
}