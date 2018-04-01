/*
 * @Author: Jack Lu 
 * @Date: 2018-03-11 10:11:34 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-14 00:50:57
 */

$(function () {
    // 加载与上传图片
    $("input#logo").on("change", function () {
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
                    $("#site-logo").attr("src", res.path);
                    $("#logo-data").val(res.path);
                } else {
                    layer.alert(res.msg);
                }

            }
        }
    })
    $.post("../php/setting/getSettingInfo.php",
        function (data, textStatus, jqXHR) {
            // console.log(data);
            if (data.code == 100) {
                var data = data.data;
                // console.log(data);
                $("#site-logo").attr("src", data[1].value);
                $("#logo-data").val(data[1].value);
                $("#site_name").val(data[2].value);
                $("#site_description").val(data[3].value);
                $("#site_keywords").val(data[4].value);
                if (data[6].value == 1) {
                    $("#comment_status").prop("checked", true);
                } else {
                    $("#comment_status").prop("checked", false);

                }
                if (data[7].value == 1) {
                    $("#comment_reviewed").prop("checked", true);
                } else {
                    $("#comment_reviewed").prop("checked", false);

                }

            } else {
                layer.alert(data.msg);
            }

        },
        "json"
    );
    $("#btn-sure").on("click", function () {
        var data = $("#setting-data").serialize();
        data = data.replace(/=on/g, "=1");
        $.post("../php/setting/updateSettingInfo.php", data,
            function (data, textStatus, jqXHR) {
                if (data.code == 100) {
                    layer.alert(data.msg, {
                        icon: 1
                    }, function () {
                        location.reload();

                    });
                } else {
                    layer.alert(data.msg, {
                        icon: 2
                    })
                }

            },
            "json"
        );
    })

});