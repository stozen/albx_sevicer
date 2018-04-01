/*
 * @Author: Jack Lu 
 * @Date: 2018-03-06 10:23:09 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-11 15:21:09
 */
checkLogin(2, logined());
function logined(){
    $(function () {
        var pageSize = 5; //显示五个分页
        var currentPage = 1;
        // var totalPages; //总条数
        var startPage = currentPage - Math.floor(pageSize / 2);
        var pageCount = 10;
        // 先初始化页面
        initPage();

        // 分类管理功能的实现
        // $("#categories").on("click",function () {
        $.post("../php/articles/getcategories.php?action=getcategories",
            function (data, textStatus, jqXHR) {
                // console.log(data);
                if (data.code == 100) {
                    var data = data.data;
                    var html = $("#gac").tmpl(data); //调用模板
                    // console.log(html);
                    // $("#categories").off("click");
                    $("#categories").append(html);
                    // console.log($("#categories option"));
                } else {
                    alert(data.msg);
                }
            },
            "json"
        );

        // 为这些动态生成的分页a标签注册点击事件
        $("#pagination").on("click", "a", function () {
            // 获取当前点击页数
            currentPage = +$(this).attr("data-id");
            initPage();
            return false;
        })

        $("#queryby").on("click", function () {
            currentPage = 1;
            initPage();
        })

        // 初始化页面
        function initPage() {
            var id = $("#categories").val();
            var status = $("#status").val();
            $.post("../php/articles/getcategories.php?action=classify", {

                currentPage: currentPage,
                pageCount: pageCount,
                id: id,
                status: status
            },
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    var code = data.code;

                    var totalPages = Math.ceil(data.col / pageCount);
                    // console.log(totalPages);
                    var msg = data.msg;
                    var data = data.data;
                    // console.log(code);
                    getPage(code, data, msg, totalPages);
                    judgeFull(); //执行判断全选--如果上一页全选了,下一页把选项去掉
                },
                "json"
            );
        }

        // 从服务器获取到数据渲染再页面
        function getPage(code, data, msg, totalPages) {

            if (code == 100) {

                var html = $("#mt").tmpl(data); //调用模板生成新闻表格
                // console.log(html);
                $("#dataset").empty().prepend(html);
                // 处理初始页码小于1时
                startPage = currentPage - Math.floor(pageSize / 2);
                if (startPage <= 0) {
                    startPage = 1;
                }
                // 处理当结尾页数大于总页数时
                var endPage = startPage + pageSize - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - 4;
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
                // 设置当前页码突出
                // 注意一定要在添加之后才设置属性
                $("a[data-id='" + currentPage + "']");
                // console.log($('a[data-id="' + currentPage + '"]'));
                $("a[data-id='" + currentPage + "']").css({
                    background: "#eeeeee"
                });
            } else {
                alert(msg);
            }

        }
        // 批量删除注册事件
        $(".page-action .btn-danger").on("click", function () {
            // 先判断是否已选数据
            if ($("#dataset td input[type='checkbox']:checked").size() > 0) {
                if (confirm('真得要删除吗,Qin')) {
                    deleteData();
                }
            } else {
                layer.alert("请选择您要删除的数据");
            }
            return false;
        })

        // 注册tr选中事件
        var flagList = Array(10).fill(true); //快输建一个值一样的数组,存储对象行点击选择的checked
        // console.log(flagList);
        // var flag = true;
        $("#dataset").on("click", "tr", function () {
            var flagIndex = $(this).index();
            // console.log($(this).index());
            $(this).children().first().children().prop("checked", flagList[flagIndex]);
            flagList[flagIndex] = !flagList[flagIndex];
            judgeFull();
        })

        // 注册点击单个删除事件
        $("#dataset").on("click", ".del", function () {
            if (confirm('真得要删除吗,亲')) {
                // 获取文章自定义属性id
                var id = $(this).parent().parent().attr("article-id");
                // console.log(id);
                $.post("../php/articles/delArticles.php", {
                    id: id
                },
                    function (data, textStatus, jqXHR) {
                        // console.log(data);
                        if (data.code == 100) {
                            layer.alert(data.msg, {
                                icon: 1
                            });

                            initPage();
                        } else {
                            layer.alert(data.msg, {
                                icon: 2
                            });
                        }
                    },
                    "json"
                );
            }
        })

        //封装删除多行操作
        function deleteData() {
            // 获取要删除的id
            var checkboxList = $("#dataset td input[type='checkbox']:checked");
            var idList = checkboxList.parent().parent();
            // console.log(idList);
            // var arrId = [];
            var objId = {};
            $.each(idList, function (index, element) {
                // console.log(element);
                objId[index] = $(element).attr("article-id");
                // arrId[arrId.length] = $(element).attr("id"); 
            })
            // console.log(JSON.parse(strJson));
            // console.log(arrId.JSON.s);
            // var objId =Object(arrId);
            // console.log(objId);
            $.post("../php/articles/delArticles.php", objId,
                function (data, textStatus, jqXHR) {
                    // console.log(data);
                    if (data.code == 100) {
                        layer.alert(data.msg, {
                            icon: 1
                        });

                        initPage();
                    } else {
                        layer.alert(data.msg, {
                            icon: 2
                        });
                    }
                },
                "json"
            );
        }

        // 全选全不选按钮注册事件
        $("thead th:first-child").on("click", function () {
            $("#dataset td input[type = 'checkbox']").prop("checked", function (i, val) {
                return !val;
            })
        })
        //注册判断是否符合全选
        function judgeFull() {
            var signInput = $("#dataset td input[type = 'checkbox']");
            var checkedFlag = true;

            $.each(signInput, function (index, element) {
                // console.log(index);
                if (!$(element).prop("checked")) {
                    checkedFlag = false;
                }
            });
            // console.log(checkedFlag);
            $("thead th:first-child").children().prop("checked", checkedFlag);
        }
        // 编辑功能部分
        $("#dataset").on("click", ".btn-default", function () {
            var id = $(this).parent().parent().attr("article-id");
            location.href = "./addArticle.html?id=" + id + "&action=edit";
        })
    });
}



