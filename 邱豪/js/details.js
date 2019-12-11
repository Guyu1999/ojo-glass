;(function($){
    "use strict"

    class Index{
        constructor(){
            this.login = document.querySelector(".login");
            this.welcome = document.querySelector(".welcome");
            this.user = this.welcome.querySelector("strong");
            this.exit = this.welcome.querySelector("em");
            
            this.addEvent();
            this.getMsg();
        }
        addEvent(){
            var that = this;
            this.exit.onclick =function(){
                that.msg[that.i].onoff = "0";
                setCookie("userMsg",JSON.stringify(that.msg));
                location.reload();
            }
        }
        getMsg(){
            this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : [];
            this.i = null;
            var type = this.msg.some((val,idx)=>{
                this.i = idx;
                return val.onoff === 1;
            })
            if(type){
                this.login.style.display = "none";
                this.welcome.style.display = "block";
                this.user.innerHTML = this.msg[this.i].user;
            }
        }
    }
    new Index();
    //二级菜单
    function list2(){
        $(".listnav").children("li").hover(function(){
			$(this)
			.children(".lastmenu")
			.stop()
			.show(200)
			.parent()
			.siblings()
			.children(".lastmenu")
			.stop()
			.hide(200);
		},function(){
            $(".lastmenu").stop().hide(300);
        })
    }
    list2();
//放大镜效果
    class Magnifier{
        constructor(){
            this.sBox = document.querySelector(".sBox");
            this.sImg = document.querySelector(".sBox img");
            this.sSpan = document.querySelector(".sBox span");
            this.bBox = document.querySelector(".bBox");
            this.bImg = document.querySelector(".bBox img");
            
            this.init()
        }
        init(){
            var that = this;
            this.sBox.onmouseover = function(){
                that.over()
            }
            this.sBox.onmousemove = function(eve){
                var e = eve || window.event;
                that.move(e)
            }
            this.sBox.onmouseout = function(){
                that.out()
            }
        }
        over(){
            this.sImg.style.opacity = "0.6";
            this.sSpan.style.display = "block";
            this.bBox.style.display = "block";
            
            this.sSpanW = (this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth);
            this.sSpanH = (this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight);
            
            this.sSpan.style.width = this.sSpanW + "px";
            this.sSpan.style.height = this.sSpanH + "px";
            
            this.sW = this.sBox.offsetWidth;
            this.sH = this.sBox.offsetHeight;
    
            this.bW = this.bBox.offsetWidth;
            this.bH = this.bBox.offsetHeight;
    
            this.bImgW = this.bImg.offsetWidth;
            this.bImgH = this.bImg.offsetHeight;
        }
        move(e){
            var l = e.clientX - this.sBox.offsetLeft - this.sSpan.offsetWidth/2;
            var t = e.pageY - this.sBox.offsetTop - this.sSpan.offsetHeight/2;
            if(l<0) l=0;
            if(t<0) t=0;
            if(l>this.sW - this.sSpanW){
                l = this.sW - this.sSpanW;
            }
            if(t>this.sH - this.sSpanH){
                t = this.sH - this.sSpanH;
            }
            this.sSpan.style.left = l + "px";
            this.sSpan.style.top = t + "px";
            this.bImg.style.left = l / (this.sW - this.sSpanW) * (this.bW - this.bImgW) + "px";
            this.bImg.style.top = t / (this.sH - this.sSpanH) * (this.bH - this.bImgH) + "px";
            
            this.sSpan.style.backgroundPositionX = -l + "px";
            this.sSpan.style.backgroundPositionY = -t + "px";
    
        }
        out(){
            this.sImg.style.opacity = "1";
            
            this.sSpan.style.display = "none";
            this.bBox.style.display = "none";
        }
    }
    new Magnifier();

    //轮播图
    $(".imgbox").banner({
        items:$(".imgbox").find("img"),
        left:$(".imgbox").find("#left"),
        right:$(".imgbox").find("#right"),
        list:false,
        index:0,
        autoPlay:false,
        delayTime:4000,
        moveTime:400
    })
})(jQuery)