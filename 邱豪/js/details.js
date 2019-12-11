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
            $(".lastmenu").css({display:"none"})
        })
    }
    list2();


})(jQuery)