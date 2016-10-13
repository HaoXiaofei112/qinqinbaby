/**
 * Created by HZJS04-01 on 2016/8/19.
 */

$(window).ready(function () {
    $('.login-btn').click(function () {
        var user = $('#register-username').val();
        var pw = $('#register-password').val();
        var pwc = $('#password-again').val();
        var code = $('.register-input-code-num').val();
        var len = $('.checkbox-active').length;
        if (user === '' || pw === '' || pwc === '' || code === '' || len === 0) {
            return;
        }


        $.ajax({
            type: 'post',
            url: '/api/register',
            data: {
                user: user,
                password: pw
            },
            success: function (data) {
                if (data.ret) {
                    location.href = 'login.html';
                }
            },
            error: function () {
                console.log('error occurred');
            }
        })

    });

    //var result = true;

    $('#register-username').blur(function () {
        if (checkUserReg()) {
            checkUserExsited()
        }

    });

    $('#register-username').focus(function () {
        $('.user-error-info').css({
            visibility: 'hidden'
        });
    });


    $('#register-password').blur(function () {
        checkPasswordReg();
    });

    $('#password-again').blur(function () {
        checkPasswordConfirm();
    });

    $('#register-password').focus(function () {
        $('.pw-error-info').css({
            visibility: 'hidden'
        });
    });

    $('#password-again').focus(function () {
        $('.pwc-error-info').css({
            visibility: 'hidden'
        });
    });


    function checkUserReg() {
        var regExp = /^[A-Za-z_]\w{5,19}$/;
        if (regExp.test($('#register-username').val())) {
            //$('#register')[0].removeAttribute('disabled');
            return true;
        }

        $('.user-error-info').html('请输入合法用户名').css({
            visibility: 'visible'
        });
        $('#register-username').val('');

//                $('#register').attr('disabled','');
//        result = false;
        return false;

    }

    function checkUserExsited() {
        $.ajax({
            type: 'get',
            url: '/api/checkuser',
            data: {
                user: $('#register-username').val()
            },
            success: function (data) {
                if (!data.ret) {
                    $('.user-error-info').html('用户名已经存在').css({
                        visibility: 'visible'
                    });
                    $('#register-username').val('');
                    //result = false;
                } else {
                    $('.user-error-info').css({
                        visibility: 'hidden'
                    });
                }
            },
            error: function () {

            }
        })
    }

    function checkPasswordReg() {
        var level = 0;
        var value = $('#register-password').val();
        if (value.length >= 6) {
            if (null !== value.match(/\d/)) {
                level++;
            }

            if (null !== value.match(/[a-zA-Z]/)) {
                level++;
            }

            if (null !== value.match(/[^a-zA-Z0-9]/)) {
                level++;
            }
        }
        console.log(level);
        var levelArr = ['请输入6位以上密码', '密码强度:弱', '密码强度:中', '密码强度:强'];

        $('.pw-error-info').html(levelArr[level]).css({
            visibility: 'visible'
        });

        if (level === 0) {
            $('#register-password').val('');
        }


    }

    function checkPasswordConfirm() {
        var confirmV = $('#password-again').val();
        var pwV = $('#register-password').val();
        if (pwV !== confirmV) {
            $('.pwc-error-info').html('两次密码不一致').css({
                visibility: 'visible'
            });
            //result = false;
            $('#password-again').val('');
        }
    }


    //点击选择性别
    $('.register-sex').on('click', '.radio', function () {
        $('.register-sex').find('.radio-active').removeClass('radio-active');
        $(this).find('i').addClass('radio-active');
    });

    //验证码
    var str = '';
    var code = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (var i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 4);
    }
    $('.code-number').html(str);

    $('.register-identifying').on('click', '.change', function () {
        var code = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        str = '';
        for (var i = 0; i < 4; i++) {
            str += Math.floor(Math.random() * 4);
        }

        $('.code-number').html(str);
    });

    $('.register-input-code-num').blur(function () {
        if ($(this).val() !== str) {
            $('.confirm-code').css({
                visibility: 'visible'
            });
            $(this).val('');
        }
    });

    $('.register-input-code-num').focus(function () {
        $('.confirm-code').css({
            visibility: 'hidden'
        });

    });

    //是否选中服务条款
    $('.checkbox i').click(function () {
        $(this).toggleClass('checkbox-active');
    })


});



































