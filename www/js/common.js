/**
 * Created by HZJS04-01 on 2016/8/18.
 */





$(document).ready(function () {
    //bodyright
    $(window).scroll(function(){
        if(window.scrollY>0){
            $('.bodyright').show();
        }else{
            $('.bodyright').hide();
        }
    });

    $('.top').click(function () {
        $(window).scrollTop(0);
    });


    //index 底部友情链接滚动
    $('.link-index ul').css({
        width: $('.link-index ul').width() * 2
    })
    console.log($('.link-index ul').width() * 2);
    $('.link-index ul')[0].innerHTML += $('.link-index ul').html();

    var timer = setInterval(linkIndex, 100);
    var speed = -2;
    $('.link-index').on('mouseenter', 'ul li a', function () {
        clearInterval(timer);
    });
    $('.link-index').on('mouseleave', 'ul li a', function () {
        timer = setInterval(linkIndex, 100);
    });

    //底部滚动函数
    function linkIndex() {
        //console.log($('.link-index ul').position().left);
        $('.link-index ul').css({
            left: $('.link-index ul').position().left + speed
        })
        if (Math.abs($('.link-index ul').position().left) >= $('.link-index ul').width() / 2) {
            $('.link-index ul').css({
                left: 0
            })
        }

    }


})





















