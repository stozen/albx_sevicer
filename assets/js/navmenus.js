/*
 * @Author: Jack Lu 
 * @Date: 2018-03-11 09:51:03 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 21:29:18
 */
checkLogin(2, logined());

function logined() {
    $(function () {
        $.post("../php/setting/getNavDatas.php",
            function (data) {
                // console.log(data);
                if (data.code == 100) {
                    var data = data.data;
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        html += "<tr nav-id = "+ data[i].id+">";
                        html += "<td class='text-center'> <input type ='checkbox'> </td>";
                        html += "<td><i class = '" + data[i].icon + "' > </i>" + data[i].text + "</td>";
                        html += "<td>" + data[i].title + "</td>";
                        html += "<td>" + data[i].link + "</td>";
                        html += "<td class = 'text-center'><a href = 'javascript:;' class='btn del btn-danger btn-xs'> 删除</a> </td>";
                        html += "</tr >";
                    }
                    $("#dataset").html(html);

                } else {
                    layer.alert(data.msg);
                }
            },
            "json"
        );
        // 显示和隐藏图标
        $("#choose-icon").on("click", function () {
            $(this).children(".icon-list").toggle();
        });
        $(".icon-list .fa").on("click", function () {
            var className = $(this).attr("class");
            $("#choose-icon >span").attr("class", className);
            //为隐藏域赋值
            $("#icon").val(className);

        })
        // 注册添加事件
        $("#nav-data #btn-sure").on("click", function () {
            var data = $("#nav-data").serialize();
            data = data.replace("icon=fa+", "icon=fa ");
            // console.log(data);
            $.post("../php/setting/addNavDatas.php", data,
                function (data, textStatus, jqXHR) {
                    if (data.code == 100) {
                        layer.alert(data.msg);
                        location.reload();
                    } else {
                        layer.alert(data.msg);
                    }
                },
                "json"
            );

        })
        // 注册删除事件
        $("#dataset").on("click",".del",function(){
            var id = $(this).parent().parent().attr("nav-id");
            $.post("../php/setting/delNavData.php", {id : id},
                function (data, textStatus, jqXHR) {
                    if (data.code == 100) {
                        layer.alert(data.msg,{icon : 1},function(){
                            location.reload();
                        })
                    }else {
                        layer.alert(data.msg);
                    }
                    
                },
                "json"
            );
        })
    });
}