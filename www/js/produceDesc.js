/**
 * Created by HZJS04-01 on 2016/8/23.
 */


//商品图片放大

$('.content-main-left-mask .detail ul').on('mouseenter', 'li', function () {
    var index = $(this).index();
    console.log(index);
    $('.small img').attr('src', 'resource/imgs/' + (index + 1) + '-mid.jpg');
    $('.big').css('background-image', 'url("resource/imgs/' + (index + 1) + '-big.jpg")');
    //$('.big').css('backgroundSize', '903px 903px');

})

$('.small').mouseenter(function () {
    magnify();
})


magnify();

function magnify() {
    var small = $('.magnify .small')[0];
    var float = $('.magnify .float')[0];
    var big = $('.magnify .big')[0];
    new Magnifying(small, float, big, 2.45);
}


//商品详情滚动
$('.content-introduce-nav ul').on('click', 'li', function () {

    $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
    $(this).children().addClass('prod-intro');
    var index = $(this).index();

    var h1 = 678 + $('.content-introduce-product-jieshao').outerHeight();
    var h2 = h1 + $('.content-introduce-canshu').outerHeight();
    var h3 = h2 + $('.content-introduce-xiangqing').outerHeight();
    var h4 = h3 + $('.content-introduce-jieshao').outerHeight();
    var h5 = h4 + $('.content-introduce-method').outerHeight();
    var h6 = h5 + $('.content-introduce-remark').outerHeight();

    if (index === 0) {
        $(this).parents(document).animate({
            scrollTop: 718
        }, 'slow')
    } else if (index === 1) {
        $(this).parents(document).animate({
            scrollTop: h1
        }, 'slow')
    } else if (index === 2) {
        $(this).parents(document).animate({
            scrollTop: h2
        }, 'slow')
    } else if (index === 3) {
        $(this).parents(document).animate({
            scrollTop: h3
        }, 'slow')
    } else if (index === 4) {
        $(this).parents(document).animate({
            scrollTop: h4
        }, 'slow')
    } else if (index === 5) {
        $(this).parents(document).animate({
            scrollTop: h5
        }, 'slow')
    } else {
        $(this).parents(document).animate({
            scrollTop: h6
        }, 'slow')
    }


    $('.content-introduce-nav').css({
        position: 'fixed',
        top: 0
    });

})


$(window).scroll(function () {

    var h1 = 678 + $('.content-introduce-product-jieshao').outerHeight();
    var h2 = h1 + $('.content-introduce-canshu').outerHeight();
    var h3 = h2 + $('.content-introduce-xiangqing').outerHeight();
    var h4 = h3 + $('.content-introduce-jieshao').outerHeight();
    var h5 = h4 + $('.content-introduce-method').outerHeight();
    var h6 = h5 + $('.content-introduce-remark').outerHeight();

    if ($(window).scrollTop() <= 718) {
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(0).children().addClass('prod-intro');
    }

    if ($(window).scrollTop() >= 718) {
        $('.content-introduce-nav').css({
            position: 'fixed',
            top: 0
        })
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(0).children().addClass('prod-intro');
    } else {
        $('.content-introduce-nav').css({
            position: ''
        })
    }

    if ($(window).scrollTop() >= h1) {
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(1).children().addClass('prod-intro');
    }

    if ($(window).scrollTop() >= h2) {
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(2).children().addClass('prod-intro');
    }

    if ($(window).scrollTop() >= h3) {
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(3).children().addClass('prod-intro');
    }

    if ($(window).scrollTop() >= h4) {
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(4).children().addClass('prod-intro');
    }

    if ($(window).scrollTop() >= h5) {
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(5).children().addClass('prod-intro');
    }

    if ($(window).scrollTop() >= h6) {
        $('.content-introduce-nav ul li .prod-intro').removeClass('prod-intro');
        $('.content-introduce-nav ul li').eq(6).children().addClass('prod-intro');
    }

})


//选择商品型号
$('.stage').click(function () {
    $('.stage-bg').removeClass('stage-bg');
    $(this).children('i').addClass('stage-bg');
});

$('.up').click(function () {
    $('.buynum')[0].value = parseInt($('.buynum')[0].value) + 1;
    if(parseInt($('.buynum')[0].value)>=12){
        $('.buynum')[0].value=12;
    }
});

$('.cut').click(function () {
    $('.buynum')[0].value = parseInt($('.buynum')[0].value) - 1;
    if(parseInt($('.buynum')[0].value)<=1){
        $('.buynum')[0].value=1;
    }
});


//点击添加购物车
$('.input-cart').click(function () {
    var user = getCookieValueByName("login");
    console.log($('.content-main-right-price-1 span').html());
    $.ajax({
        type:'post',
        url: '/api/addcart',
        data: {
            user: user,
            products: {
                src:$('.small-pic').prop('src') ,
                descp:$('.detail-desc').html(),
                price:$('.content-main-right-price-1').children('span').html()+$('.content-main-right-price-1 i').html(),
                num: $('.buynum')[0].value,
                type:$('.stage-bg').parent().children('b').html(),
                count_money:$('.content-main-right-price-1').children('span').html()+parseInt($('.buynum')[0].value)*parseInt($('.content-main-right-price-1').children('i').html())
            }
        },
        success: function (data) {
            if(data.ret){
                alert('商品添加进购物车成功');
            }
        },
        error: function (err) {

        }
    })
})








