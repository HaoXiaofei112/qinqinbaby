function Magnifying(small, float, big, times) {
    this.small = small;
    this.float = float;
    this.big = big;
    this.times = times;
    this.init();
}

Magnifying.prototype.init = function () {
    this.smallHover();
}

Magnifying.prototype.smallHover = function () {
    var that = this;
    $(this.small).hover(function () {
        $(that.float).show();
        $(that.big).show();
    }, function () {
        $(that.float).hide();
        $(that.big).hide();
    })
    this.mouseMove();
}
Magnifying.prototype.mouseMove = function () {
    var that = this;
    $(this.small).mousemove(function (evt) {
        //设置float的位置
        var left = evt.pageX - $(that.float).width() / 2;
        var top = evt.pageY - $(that.float).height() / 2;
        if (left <= $(that.small).offset().left) {
            left = $(that.small).offset().left;
        }
        if (left >= $(that.small).offset().left + $(that.small).width() - $(that.float).width()) {
            left = $(that.small).offset().left + $(that.small).width() - $(that.float).width();
        }
        if (top <= $(that.small).offset().top + 0) {
            top = $(that.small).offset().top + 0;
        }
        if (top >= $(that.small).offset().top + $(that.small).height() - $(that.float).height()) {
            top = $(that.small).offset().top + $(that.small).height() - $(that.float).height();
        }
        $(that.float).offset({
            left: left,
            top: top
        })

        var bigLeft = (-1) * (left - $(that.small).offset().left) * that.times;
        var bigTop = (-1) * (top - $(that.small).offset().top) * that.times;
        console.log(that.times);
        $(that.big).css('background-position', bigLeft + 'px ' + bigTop + 'px');
    });
}