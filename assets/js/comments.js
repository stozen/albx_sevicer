/*
 * @Author: Jack Lu 
 * @Date: 2018-03-09 09:46:05 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-15 01:16:02
 */
// 登录验证
checkLogin(2, logined());

function logined() {
    $(function () {
        var pageSize = 3; //显示五个分页
        var currentPage = 1;
        // var totalPages; //总条数
        var startPage = currentPage - Math.floor(pageSize / 2);
        var pageCount = 10;
        initPage();
        function initPage() {
            $.post("../php/comments/getCommentsList.php", {

                    currentPage: currentPage,
                    pageCount: pageCount,
                },
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    var code = data.code;
                    if (code == 100) {
                        var msg = data.msg;
                        var col = data.col
                        var data = data.data;
                        var totalPages = Math.ceil(col / pageCount);
                        var html = $("#ct").tmpl(data);
                        // console.log(html);
                        $("#dataset").empty().prepend(html);
                        // 处理初始页码小于1时
                        startPage = currentPage - Math.floor(pageSize / 2);
                        if (startPage <= 0) {
                            startPage = 1;
                        }
                        // 处理当结尾页数大于总页数时
                        // console.log(totalPages);
                        var endPage = startPage + pageSize - 1;
                        if (endPage > totalPages) {
                            endPage = totalPages;
                            startPage = endPage - 2;
                        }
                        // 处理页数小于5时
                        if (startPage <= 0) {
                            startPage = 1;
                        }
                        var html = "";
                        if (startPage != 1) {
                            html += "<li><a href=\"#\" data-id = " + (currentPage - 1) + ">上一页</a></li>";
                        }
                        for (var i = startPage; i <= endPage; i++) {
                            html += '<li><a href=\"#\" data-id = ' + i + '>' + i + '</a></li>';
                        }
                        if (endPage != totalPages) {

                            html += "<li><a href=\"#\" data-id = " + (currentPage + 1) + ">下一页</a></li>";
                        }
                        // 调用模板生成分页器
                        $("#pagination").html(html);
                    } else {
                        layer.alert(data.msg);
                    }

                    // console.log(totalPages);
                    // console.log(code);

                },
                "json"
            );
        }
        // 为这些动态生成的分页a标签注册点击事件
        $("#pagination").on("click", "a", function () {
            // 获取当前点击页数
            currentPage = +$(this).attr("data-id");
            initPage();
            return false;
        })
    });
}