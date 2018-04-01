/*
 * @Author: Jack Lu 
 * @Date: 2018-03-09 18:31:06 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 15:25:51
 */
// 登录验证
checkLogin(2, logined());
function logined (){
    $(function () {
        //站点内容统计：
        $.post("../php/welcome/welcom.php",
            function (data, textStatus, jqXHR) {
                // console.log(data);
                if (data.code == 100) {
                    data = data.data;
                    $("#articleTotal").text(data[0]);
                    $("#categoryTotal").text(data[1]);
                    $("#commentTotal").text(data[2]);
                    $("#articleDarfted").text(data[3]);
                    $("#commentHeld").text(data[4]);

                } else {
                    layer.alert("data.msg");
                }

            },
            "json"
        );

    });

}