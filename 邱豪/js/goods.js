;(function($){
    "use strict"
//登录状态
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
    //商品数据引入
    class List{
        constructor(){
            this.url = "http://localhost/git/ojo-glass/邱豪/json/goods.json";
            this.cont = document.getElementById("cont");
            this.addEvent();
            this.load();
        }
        load(){
            var that = this;
            ajaxGet(this.url,function(res){
                that.res = JSON.parse(res);
                that.display();
            });
        }
        display(){
            var str = "";
            for(var i = 0;i<this.res.length;i++){
                str += `<li class="box" index="${this.res[i].goodsId}">
                            <a href="#"><img src="${this.res[i].img}" alt="" /></a>
                            <div class="goods-price">
                                <span>￥${this.res[i].oprice}</span>
                                <span class="teprice">￥${this.res[i].price}</span>
                                <span class="sell">已售313件</span>
                            </div>
                            <p><a href="#">${this.res[i].name}</a><em class="addcart">加入购物车</em></p>
                        </li>`;
            }
            this.cont.innerHTML = str;
        }
        addEvent(){
            var that = this;
            this.cont.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "addcart"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.setCookie();
                }
            })
        }
        setCookie(){
            this.goods = getCookie("goodsCookie") ? JSON.parse(getCookie("goodsCookie")) : [];
            if(this.goods.length < 1){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                var i = 0;
                var onoff = this.goods.some((val,idx)=>{
                    i = idx;
                    return val.id === this.id;
                })
                if(!onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }else{
                    this.goods[i].num++;
                }
            }
            console.log(this.id)
            setCookie("goodsCookie",JSON.stringify(this.goods))
        }
    }
    new List;

})(jQuery)