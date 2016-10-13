/**
 * Created by HZJS04-01 on 2016/8/18.
 */

function Slider(iphone, text) {
    this.iphone = iphone;
    this.len = $(this.iphone).width();
    this.ul = $(this.iphone).children('ul')[0];
    this.liLength = $(this.ul).children('li').length;
    this.text = text;
    this.currentIndex = 1;
    this.textIndex = 0;
    this.isstop = false;
    this.init();
}


Slider.prototype.init = function () {
    var that = this;
    $(this.ul).css({
        left: -that.len
    });
    var lis = $(that.text).children('li');
    $($(lis[0]).children('div')).css({
        backgroundColor: '#fff'
    });
    $($(lis[0]).children('h2')).css({
        color: '#fff'
    });
    $($(lis[0]).children('p')).css({
        color: '#fff'
    });

    this.timer = setTimeout(that.slideNext.bind(that), 2000);

    //$(this.iphone).mouseenter( function () {
    //    that.isstop = true;
    //    clearTimeout(that.timer);
    //});
    //
    //$(this.iphone).mouseleave( function () {
    //    that.isstop = false;
    //    this.timer = setTimeout(that.slideNext.bind(that), 2000);
    //});


    $(this.text).on('mouseenter', '.fl', function () {
        that.isstop = true;
        clearTimeout(that.timer);
        var textIndex = $(this).index();
        that.currentIndex = textIndex + 1;
        $(that.ul).stop(true).animate({
            left: -that.currentIndex * that.len
        });
        that.slideTo(that.currentIndex);
    });

    $(this.text).on('mouseleave', '.fl', function () {
        that.isstop = false;
        that.timer = setTimeout(that.slideNext.bind(that), 2000);

    })

}


Slider.prototype.slideNext = function () {
    var that = this;
    this.currentIndex++;
    this.textIndex++;
    console.log(that.currentIndex);
    this.slideTo(that.currentIndex);
}


Slider.prototype.slideTo = function (index) {
    var that = this;
    clearTimeout(that.timer);

    if (index === 0) {
        that.currentIndex = that.liLength - 2;
    }
    if (index === that.liLength - 1) {
        that.currentIndex = 1;
    }

    //将所有文字描述的属性设置为初始值
    var lis = $(that.text).children('li');
    //console.log($(lis[0]).children('div'));
    for(var i=0;i<lis.length;i++){
        $($(lis[i]).children('div')).css({
            backgroundColor: '#2997b7'
        });
        $($(lis[i]).children('h2')).css({
            color: '#108db1'
        });
        $($(lis[i]).children('p')).css({
            color: '#108db1'
        });
    }
    //将当前对应的文字描述属性设置为白色
    $($(lis[that.currentIndex-1]).children('div')).css({
        backgroundColor: '#fff'
    });
    $($(lis[that.currentIndex-1]).children('h2')).css({
        color: '#fff'
    });
    $($(lis[that.currentIndex-1]).children('p')).css({
        color: '#fff'
    });

    //判断是否停止动画
    if(this.isstop){
        return;
    }

    $(this.ul).stop(true).animate({
        left: -index * that.len
    }, function () {
        if (index === 0) {
            that.currentIndex = that.liLength - 2;
            $(that.ul).css({
                left: -that.currentIndex * that.len
            })
        }
        if (index === that.liLength - 1) {
            that.currentIndex = 1;
            $(that.ul).css({
                left: -that.len
            })
        }
        that.timer = setTimeout(that.slideNext.bind(that), 2000);
    })
}


















