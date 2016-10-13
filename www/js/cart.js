//从cookie中取出用户名
var user = getCookieValueByName("login");
$('.cart-head .vip-left .user').html(user);

$('.weixin a').mouseenter(function () {
    $('.weixin-list').show();
});
$('.weixin a').mouseleave(function () {
    $('.weixin-list').hide();
});


//更多商品slider
$.get('/api/getproduct', function (data) {
    console.log(data);

    console.log(data.products.length);
    var len = data.products.length;
    for (var i = 0; i < len; i++) {
        createProduct(data.products[i]);
    }

    //使更多商品滚动
    otherProducts();

    //每次加载页面时从服务器获取当前用户的购物车数据
    getProductsFromServer();

    //点击添加进购物车
    $('.sliderbox .product .addScan').click(function () {
        var that = this;

        //把商品添加进服务器cart.json 文件中
        $.ajax({
            type: 'POST',
            url: '/api/addcart',
            data: {
                user: user,
                products: {
                    src: $(that).parent().children('.proimg').children('a').children().prop('src'),
                    descp: $(that).parent().children('.descp').html(),
                    type: $(that).parent().children('.type').html(),
                    price: $(that).parent().children('h4').html(),
                    num: 1,
                    count_money: $(that).parent().children('h4').html()
                }
            },
            success: function (data) {

                countMoney();
                clickOne();
                clickAll();

            },
            error: function (err) {

            }
        })

        //把商品append到购物车列表
        var lenTr = $('tbody tr').length;
        var i = 0;
        for (var i = 0; i < lenTr; i++) {
            console.log($(this).parent().children('.type').html());
            console.log($('tbody tr').eq(i).children('.td3').children('p').eq(1)[0].innerHTML.substring(3));
            if ($(this).parent().children('.type').html() === $('tbody tr').eq(i).children('.td3').children('p').eq(1)[0].innerHTML.substring(3)) {
                $('tr').eq(i).children('.td5').children('.buy-num').val(parseInt($('tr').eq(i).children('.td5').children('.buy-num').val()) + 1);
                break;
            }
        }

        if (i >= lenTr) {
            var tpl = $('#template-cart').html();
            var $parent = $(this).parent();
            var htmlStr = tpl.replace('{{src-cart}}', $parent.children('.proimg').children('a').children().prop('src'))
                .replace('{{descript}}', $parent.children('.descp').html())
                .replace('{{type}}', $parent.children('.type').html())
                .replace('{{price}}', $parent.children('h4').html())
                .replace('{{num}}', 1)
                .replace('{{count-money}}', $parent.children('h4').html());
            $('.cartlist .body tbody').append($(htmlStr));
        }


        countMoney();

        //var tpl = $('#template-cart').html();
        //var $parent = $(this).parent();
        //var htmlStr = tpl.replace('{{src-cart}}', $parent.children('.proimg').children('a').children().prop('src'))
        //    .replace('{{descript}}', $parent.children('.descp').html())
        //    .replace('{{type}}', $parent.children('.type').html())
        //    .replace('{{price}}', $parent.children('h4').html())
        //    .replace('{{num}}', 1)
        //    .replace('{{count-money}}', $parent.children('h4').html());
        //$('.cartlist .body tbody').append($(htmlStr));


        //判断tbody中是否有数据
        isProduct();

        //点击删除
        removeProduct();

    })


});


isProduct();


//从购物车中删除商品
function removeProduct() {
    $('tbody .last').click(function () {
        var index = $('.last').index(this);
        console.log(index);
        $.ajax({
            type: 'post',
            url: '/api/removegoodsfromcart',
            data: {
                user: user,
                goodsIndex: index
            },
            success: function (data) {
                countMoney();
            },
            error: function (err) {

            }
        })

        console.log('删除商品');
        $($(this).parent()).remove();
        isProduct();
    })
}

//创建商品
function createProduct(data) {
    var tpl = $('#template-product').html();
    var htmlStr = tpl.replace('{{src-product}}', data.src)
        .replace('{{miaoshu}}', data.descp)
        .replace('{{type}}', data.type)
        .replace('{{price}}', data.price);
    var $product = $(htmlStr);
    $('.slider').append($product);
}

//判断tbody中是否有数据
function isProduct() {
    //判断tbody中是否有数据
    var str = $('.cartlist .body tbody').html();
//alert(str);
    if (str === '') {
        $('.cartlist').hide();
        $('.cartmsg').hide();
        $('.cart-noprod').show();
    } else {
        $('.cartlist').show();
        $('.cartmsg').show();
        $('.cart-noprod').hide();

    }

}

//从服务器获取数据
function getProductsFromServer() {
    $.ajax({
        type: 'get',
        url: '/api/getcart',
        data: {
            user: user
        },
        success: function (data) {
            console.log(data);
            console.log(data.goods[0]);
            for (var i = 0; i < data.goods.length; i++) {
                var tpl = $('#template-cart').html();
                var $parent = $(this).parent();
                var htmlStr = tpl.replace('{{src-cart}}', data.goods[i].src)
                    .replace('{{descript}}', data.goods[i].descp)
                    .replace('{{price}}', data.goods[i].price)
                    .replace('{{num}}', data.goods[i].num)
                    .replace('{{type}}', data.goods[i].type)
                    .replace('{{count-money}}', data.goods[i].count_money);
                $('.cartlist .body tbody').append($(htmlStr));
            }
            removeProduct();
            isProduct();
            countMoney();
            clickAll();
            clickOne();

        },
        error: function (err) {

        }
    });


}

//全选
function clickAll() {
    $('.all-select').click(function () {
        if ($('.all-select').prop('checked')) {
            $('.selone').prop('checked', true);
        } else {
            $('.selone').prop('checked', false);
        }
        countMoney();
    })
}

//选择单个商品时
function clickOne() {
    $('.selone').click(function () {
        var len = $('.selone').length;
        console.log(len);
        var i;
        for (i = 0; i < len; i++) {
            if ($('.selone').eq(i).prop('checked') === false) {
                break;
            }
        }
        if (i === len) {
            $('.all-select').prop('checked', true);
        } else {
            $('.all-select').prop('checked', false);
        }

        countMoney();

    })
}

//计算购物车选中商品总价格
function countMoney() {
    var count = 0;
    var len = $('.selone').length;
    for (var i = 0; i < len; i++) {
        if ($('.selone').eq(i).prop('checked')) {
            //console.log(parseFloat($('tr').eq(i).children('.td4').children('div')[0].innerHTML.substring(1)));
            // console.log(parseInt($('tr').eq(i).children('.td5').children('.buy-num').val()));
            var xj = parseFloat($('tr').eq(i).children('.td4').children('div')[0].innerHTML.substring(1)) * parseInt($('tr').eq(i).children('.td5').children('.buy-num').val());
            xj = xj.toFixed(2);
            $('tr').eq(i).children('td').eq(5)[0].innerHTML = '¥' + xj;
            count += parseFloat($('tr').eq(i).children('td').eq(5)[0].innerHTML.substring(1));

        }
    }
    //console.log(count);
    //console.log(typeof count);
    count = count.toFixed(2);
    //console.log(count);
    $('.fee').html("¥" + count);
    $('.total').html("¥" + count);
    $('.totalfee').html("¥" + count);
    $('.endfee').html("¥" + count);
}


//点击商品图片 跳转到详情页
//function clickToProDec(){
//    var len=$('tr').length;
//    for(var i=0;i<len;i++){
//        $('tr').eq(i).children('td').eq(1).children('div').click(function(){
//            location.href='detail.html';
//        });
//
//    }
//
//    $('.proimg a').click(function(){
//        $(this).attr('href','detail.html')
//        //location.href='detail.html';
//    })
//}

//相关商品移动
function otherProducts() {
    //index 底部友情链接滚动
    $('.slider').css({
        width: $('.slider').width() * 4
    });
    console.log($('.slider').width() * 2);
    $('.slider')[0].innerHTML += $('.slider').html();

    var speed = -6;
    $('.btn-left').click(function () {
        speed = -6;
    });

    $('.btn-right').click(function () {
        speed = 6;
    });

    var timer = setInterval(linkIndex, 100);

    $('.slider-box').on('mouseenter', '.product', function () {
        clearInterval(timer);
    });
    $('.slider-box').on('mouseleave', '.product', function () {
        timer = setInterval(linkIndex, 100);
    });

    //底部滚动函数
    function linkIndex() {
        //console.log($('.link-index ul').position().left);
        $('.slider').css({
            left: $('.slider').position().left + speed
        })
        if (Math.abs($('.slider').position().left) >= $('.slider').width() / 2) {
            $('.slider').css({
                left: 0
            })
        }

    }
}



























