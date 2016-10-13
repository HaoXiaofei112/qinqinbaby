/**
 * Created by HZJS04-01 on 2016/8/18.
 */

$(document).ready(function () {



    //登录后顶部导航状态
    var val = getCookieValueByName("login");
    if (val != "") {
        $('.commonhead .shortcut .fr .fl').html("您好，<a href='#'>" + val + "</a>欢迎来到亲亲宝贝！");
        $('.commonhead .shortcut .fr .btn_login').css('visibility', 'hidden');
        $('.commonhead .shortcut .fr li b').css('display', 'none');
        $('.commonhead .shortcut .fr .btn_reg').html("[退出]");
        $('.commonhead .shortcut .fr a').css({
            color: '#f00180'
        })
    }

    //点击退出,清除cookie,返回登录页
    $('.commonhead .fr .btn_reg').click(function () {
        delCookieByName('login');
        if ($(this).html() === '[退出]') {
            location.href = "index.html";
        } else {
            location.href = "register.html";
        }


    })

    //点击用户名跳转到购物车
    $('.commonhead .shortcut .fr a').click(function () {
        if ($(this).html() === val) {
            location.href = "cart.html";
        }
    })


    //右部百度
    $('.baidu-main-fold').click(function(){
        $('.baidu-float').animate({
            width:'38px',
            height:'37px'
        }, function () {
            $('.baidu-main').hide();
            $('.baidu-unfold').show();
        });


    })


    $('.baidu-unfold').click(function(){
        $('.baidu-unfold').hide();
        $('.baidu-main').show();
        $('.baidu-float').animate({
            width:'220px',
            height:'250px'
        });
    })


    $('.baidu-unfold').hover(function(){
        $('.baidu-unfold').css({
            backgroundPosition:0+' -112px'
        });
    },function(){
        $('.baidu-unfold').css({
            backgroundPosition:0+' -75px'
        });
    })




});



































