/*
 * @Author: Jack Lu 
 * @Date: 2018-03-10 08:56:13 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 19:42:13
 */
checkLogin(2, logined());

function logined() {
    $(function () {
        // 一进来就开始加载数据
        $.post("../php/users/getUsersList.php",

            function (data, textStatus, jqXHR) {
                // console.log(data);
                if (data.code == 100) {
                    var data = data.data;
                    var html = $("#usersdata").tmpl(data);
                    // console.log(html);
                    $("#dataset").empty().append(html); /* 调用模板生成结构 */

                }
            },
            "json"
        );
        // 显示批量操作
        // 1.为每个checkbox注册事件
        $("#dataset").on("click", "td input[type='checkbox']", function () {
            // 判断如果选择项大于1,显示批量删除按钮
            if ($("#dataset :checked").size() > 1) {
                $(".page-action .btn-danger").show();
            } else {
                $(".page-action .btn-danger").hide();
            }
            // 全选按钮判断
            if ($("#dataset :checked").size() == $("#dataset input[type='checkbox']").size()) {
                $("thead #ckAll").prop("checked", true);
            } else {
                $("thead #ckAll").prop("checked", false);
            }
        })
        $("thead #ckAll").on("click", function () {
            if ($("thead #ckAll").prop("checked")) {
                $("#dataset input[type='checkbox']").prop("checked", true);
            } else {
                $("#dataset input[type='checkbox']").prop("checked", false);
            }
            if ($("#dataset :checked").size() > 1) {
                $(".page-action .btn-danger").show();
            } else {
                $(".page-action .btn-danger").hide();
            }
        })

        // 点击删除部分
        $("#dataset").on("click", ".del", function () {
            var userId = $(this).parent().parent().attr("user-id");
            // console.log(userId);
            $.post("../php/users/delUser.php", {
                    id: userId
                },
                function (data) {
                    if (data.code == 100) {
                        layer.alert(data.msg, {
                            icon: 1
                        }, function () {
                            location.reload();
                        })
                    } else {
                        layer.alert(data.msg, {
                            icon: 2
                        }, function () {
                            location.reload();
                        })
                    }
                },
                "json"
            );
        })
        // 批量删除操作
        $(".page-action .btn-danger").on("click", function () {
            var arr = [];
            $("#dataset :checked").each(function (index, element) {
                arr[arr.length] = $(element).parent().parent().attr("user-id");
            })
            $.post("../php/users/delUser.php", {
                    id: arr
                },
                function (data, textStatus, jqXHR) {
                    if (data.code == 100) {
                        layer.alert(data.msg, {
                            icon: 1
                        });
                        location.reload();
                    } else {
                        layer.alert(data.msg);
                    }
                },
                "json"
            );
        });

        // 编辑操作
        $("#dataset").on("click", ".edit", function () {
            var userId = $(this).parent().parent().attr("user-id");
            $.post("../php/users/getUserInfo.php", {
                    id: userId
                },
                function (data) {
                    if (data.code == 100) {
                        var data = data.data[0];
                        // console.log(data);
                        //把最新的数据填充到左边的位置
                        $("#email").val(data.email);
                        $("#slug").val(data.slug);
                        $("#password").val(data.password);
                        $("#nickname").val(data.nickname);
                        //把要修改的用户的id也存放起来，方便在提交修改的时候获取传递到服务器
                        $("#user-data")[0].setAttribute("user-id", data.id); //转换成dom对象设置属性
                        //把标题和按钮的文本修改
                        $("#status").val(data.status);
                        $("#user-data h2").text("修改用户");
                        $("#btn_suer").text("更新");
                        //提示用户在右边进行修改
                        // layer.tips("请在左边用户信息处进行修改", {
                        //     tips: [5, "#0f0"]
                        // });
                    } else {
                        layer.alert(data.msg, {
                            icon: 2
                        }, function () {
                            // location.reload();
                        })
                    }
                },
                "json"
            );
        })

        //点击添加用户--部分
        $("#user-data #btn_suer").on("click", function () {
            var data = $("#user-data").serialize();
            // console.log(data);
            // 判断是编辑还是添加操作
            if ($("#user-data").attr("user-id")) {
                $.post("../php/users/updateUser.php?id=" + $("#user-data").attr("user-id"), data,
                    function (data, textStatus, jqXHR) {
                        if (data.code == 100) {
                            layer.alert(data.msg, {
                                icon: 1
                            }, function () {
                                location.reload();
                            })
                        } else {
                            layer.alert(data.msg)
                        }

                    },
                    "json"
                );
            } else {
                $.post("../php/users/addUser.php", data,
                    function (data, textStatus, jqXHR) {
                        if (data.code == 100) {
                            location.reload();
                        } else {
                            layer.alert(data.msg);
                        }

                    },
                    "json"
                );
            }
            return false;
        })




        // 验证表单部分
        $(function () {
            //jquery.validate
            $("#user-data").validate({
                submitHandler: function () {
                    //验证通过后 的js代码写在这里
                }
                // onfocusout: function (element) { //这个设置是,让表单元素失去焦点后,就验证, 如果不需要,则删掉
                //     $(element).valid();
                // }
            })

        })
        /*-------------验证插件配置 -------------*/

        //配置错误提示的节点，默认为label，这里配置成 span （errorElement:'span'）
        $.validator.setDefaults({
            errorElement: 'span'
        });
        //配置通用的默认提示语
        // $.extend($.validator.messages, {
        //     required: '必填',
        //     equalTo: "请再次输入相同的值"
        // });
        //邮箱 
        jQuery.validator.addMethod("email", function (value, element) {
            var mail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
            return this.optional(element) || (mail.test(value));
        }, $.validator.messages.equalTo);


    });
}