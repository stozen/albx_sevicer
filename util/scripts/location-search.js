/*
 * @Author: Jack Lu 
 * @Date: 2018-03-03 20:55:12 
 * @Last Modified by: Jack Lu
 * @Last Modified time: 2018-03-07 23:04:00
 */
//location.search提取的封装
function getSearch() {
    // 提取?键=值&键=值....部分
    // console.log(1);
    var strSearch = location.search;
    // 切割数组并且将结果赋值非原本的值
    // console.log(strSearch);
    strSearch = strSearch.slice(1);
    // console.log(strSearch);
    // 按&提取出数组
    var arrSearch = strSearch.split("&");
    // console.log(arrSearch);
    // 用空对象接受分割的值
    var objSearch = {};

    for (var i = 0; i < arrSearch.length; i++) {
        var arrTemp = arrSearch[i].split("=");
        // console.log(arrTemp);
        objSearch[arrTemp[0]] = arrTemp[1];
    
    }
    // console.log(objSearch);
    return objSearch;

}