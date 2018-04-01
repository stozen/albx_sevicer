/*
 * @Author: Jack Lu 
 * @Date: 2018-03-09 19:31:17 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 15:23:39
 */
checkLogin(2, logined());
function logined(){
    $(function () {
        // 修改密码按钮事件
        $(".form-horizontal #btn-sure").on("click", function () {
            var oldPassword = $("#old").val();
            // console.log(oldPassword);
            var password = $("#password").val();
            // console.log(password);
            var confirm = $("#confirm").val();
            // console.log(confirm);
            var userId = $.cookie("user_id");
            // console.log(userId);
            if (oldPassword == password) {
                layer.alert("新密码和旧密码一致");
                return;
            }
            if (confirm != password) {
                layer.alert("新设置的密码不一致");
                return;
            }
            var data = {
                id: userId,
                oldPassword: oldPassword,
                password: password,

            }
            $.post("../php/users/updatePassword.php", data,
                function (data, textStatus, jqXHR) {
                    if (data.code == 100) {
                        layer.alert(data.msg, { icon: 1 }, function () {
                            location.href = "./profile.html";
                        });
                    } else {
                        layer.alert(data.msg);
                    }

                },
                "json"
            );
        })
    });

}