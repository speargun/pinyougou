document.addEventListener('DOMContentLoaded', function () {
    // 显示隐藏箭头
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseover', function () {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseout', function () {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        timer = setInterval(function () {
            arrowR.click();
        }, 5000);
    });

    // 动态生成圆圈
    var ol = document.querySelector('.focus ol');
    var ul = document.querySelector('.focus ul');
    var num = 0;
    var circle = 0;
    var flag = true;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);

        //圆圈排他
        li.addEventListener('click', function () {
            if (flag) {
                flag = false;
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                this.className = 'current';

                //移动图片
                var index = this.getAttribute('index');
                num = index;
                circle = index;
                var focusWidth = focus.offsetWidth;
                animate(ul, -index * focusWidth, raiseFlag);
            }
        });
    }
    ol.children[0].className = 'current';

    //举旗
    function raiseFlag() {
        flag = true;
    }

    //克隆图片
    ul.appendChild(ul.children[0].cloneNode(true));
    // ul.insertBefore(ul.children[0], ul.children[ul.children.length].cloneNode(true));

    //箭头翻页

    arrowR.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            e.preventDefault();
            //小圆圈同步翻页
            circle++;
            circle = circle % ol.children.length;
            circleChange();
            animate(ul, -num * focus.offsetWidth, raiseFlag);
        }
    });

    arrowL.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left = num * focus.offsetWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            e.preventDefault();
            //小圆圈同步翻页
            circle--;
            circle == -1 ? circle = ol.children.length - 1 : circle;
            circleChange();
            animate(ul, -num * focus.offsetWidth, raiseFlag);
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    //自动轮播
    var timer = setInterval(function () {
        arrowR.click();
    }, 5000);
});
