/**
 * Created by HZJS04-01 on 2016/8/19.
 */


$(document).ready(function () {
    //若是cookie中有数据直接从cookie中取
    var val = getCookieValueByName("username");
    if (val != "") {
        //location.href = "index.html";
        $('#login-username').val(val);
        $('.login-warning').css('visibility', 'hidden');

    }

    $('.login-btn').html('登录');

    //点击登录按钮时判断是否勾选保存用户名,
    // 已勾则保存到cookie中,下次到登录页面时输入框中已经有用户名
    $('.login-btn').click(function () {

        //点击登录按钮后,登录按钮状态改变
        $(this).css('background-position','-1px -2px');
        $(this).html('');

        var user = $('#login-username').val();
        var pw = $('#login-password').val();
        var rememberName = $('.remember-name')[0];
        setCookie('login', user, 20);
        if (rememberName.checked) {
            setCookie('username', user, 30);
        }
        //发请求判断用户名和密码是否正确
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: {
                user: user,
                password: pw
            },
            success: function (data) {
                if (data.ret) {
                    location.href = 'index.html';
                } else {
                    if (user === '') {
                        $('.login-warning').css({
                            visibility: 'visible',
                            color: '#f20266'
                        });
                    } else if (pw === '') {
                        $('.login-password-err').css('visibility', 'visible').html('请输入密码');
                    } else {
                        $('.login-password-err').css('visibility', 'visible').html('用户名或者密码错误');
                    }

                    $('.login-btn').css('background-position','-142px -1px');
                    $('.login-btn').html('登录');
                }
            },
            error: function () {

            }
        })
    });

    $('#login-username,#login-password').focus(function () {
        $('.login-warning').css('visibility', 'hidden');
        $('.login-password-err').css('visibility', 'hidden');
    })


})


































