;(function($){
    "user strict"
    //轮播图
    $(".imgbox1").banner({
        items:$(".imgbox1").find("img"),
        left:$(".imgbox1").find("#left"),
        right:$(".imgbox1").find("#right"),
        list:true,
        index:0,
        autoPlay:true,
        delayTime:4000,
        moveTime:400
    })
    //轮播图2
    $(".imgbox").banner({
        items:$(".imgbox").find("img"),
        // left:$(".imgbox").find("#left"),
        // right:$(".imgbox").find("#right"),
        list:true,
        index:0,
        autoPlay:true,
        delayTime:4000,
        moveTime:400
    })
    //轮播图3
    $(".imgbox2").banner({
        items:$(".imgbox2").find("img"),
        // left:$(".imgbox").find("#left"),
        // right:$(".imgbox").find("#right"),
        list:true,
        index:0,
        autoPlay:true,
        delayTime:4000,
        moveTime:400
    })
    //advert功能
    function advert(){
        var myspan = document.querySelector(".typeon");
        var box = document.querySelector(".typeon1");
        var myspan1 = document.querySelector(".ding");
        var box1 = document.querySelector(".ding1");
        myspan1.onmouseover = function(){
            box.style.display="none";
            box1.style.display="block";
            myspan1.style.cssText = "background:none;font-weight: 700;color: #000;border: none;border-top: 2px solid #f00;";
            myspan.style.cssText = "border:none;background: #f6f6f6;border: 1px solid #ddd;";
        }
        myspan.onmouseover = function(){
            box.style.display="block";
            box1.style.display="none";
            myspan.style.cssText = "background:none;font-weight: 700;color: #000;border: none;border-top: 2px solid #f00;";
            myspan1.style.cssText = "border:none;background: #f6f6f6;border: 1px solid #ddd;";
        }
    }
    advert();
//设置时间倒计时218行
    function interval(){
        setInterval(changTime, 500);
        function changTime(){
            document.getElementById("intime").innerHTML=getTime();
        }
        function gR(){
            return Math.floor(Math.random()*16);
        }
        function getTime(){
            var now=new Date().getTime();
            var end=new Date("2019/12/19").getTime();
            var temp=end-now;
            if(temp<=0)
            {
            document.getElementById("endinner").innerHTML="抢购活动已结束！！！！！";
            return "";}else{
            var temp2=new Date();
            temp2.setTime(temp);
            var sec=Math.floor((temp)/1000%60);
            var min=Math.floor(temp/(60*1000)%60);
            var hou=Math.floor(temp/(60*60*1000)%24);
            var day=Math.floor(temp/(24*60*60*1000));
            if(hou<10){
                hou = "0"+hou;
            }
            if(min<10){
                min = "0"+min;
            }
            if(sec<10){
                sec = "0"+sec;
            }
            return hou+" : "+min+" : "+sec+"";
            }
        }
    }
    interval();
//楼层效果
    function floor1(){
        $("#floor").find("li").click(function(){
            var i = $(this).index();
            var t = $(".vip").eq(i).offset().top;
            $("html").animate({scrollTop:t})
        })
    }
    floor1()
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
			.hide(300);
		},function(){
            $(".lastmenu").stop().hide(300);
        })
    }
    list2();
    //商品数据引入
    class List{
        constructor(){
            this.url = "http://localhost/git/ojo-glass/邱豪/json/goods.json";
            this.cont = document.querySelector(".advertbox");
            this.hotgoods = document.querySelector(".hotgoods");
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
                str += `<div class="advertgoods1" index="${this.res[i].goodsId}">
                            <div class="img">
                                <img src="${this.res[i].img}" alt="" class="details">
                            </div>
                            <p>
                                <a href="details.html" class="details">${this.res[i].name}</a>
                                <br>
                                <span>本站价：</span><span class="pr-red">￥${this.res[i].price}</span>
                            </p>
                        </div>`;
                    }
                    this.cont.innerHTML = str;
                    
                    var str1 = "";
                    for(var j = 0;j<this.res.length;j++){
                        str1 += `<li index="${this.res[j].goodsId}">
                        <div class="hotimgs">
                        <img src="${this.res[j].img}" alt="" class="details1">
                        <span>直降6%</span>
                        </div>
                        <div><p class="details1">${this.res[j].name}</p></div>
                        <div class="hotprice">
                        <div class="hotprice1">
                        <span>￥${this.res[j].oprice}</span>
                        <span class="tep">￥${this.res[j].price}</span>
                        </div>
                        <span id="goshop" class="details1">去抢购</span>
                        </div>
                        </li>`;
            }
            this.hotgoods.innerHTML = str1;
        }
        addEvent(){
            var that = this;
            this.cont.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "details"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.setCookie();
                    window.location.href = "details.html";
                }
            })
            this.hotgoods.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "details1"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.setCookie();
                    window.location.href = "details.html";
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
            
            if(this.goods.length>1){
                this.goods.splice(0,1);
                setCookie("goodsCookie",JSON.stringify(this.goods))
            }
            setCookie("goodsCookie",JSON.stringify(this.goods))
        }
    }
    new List;
})(jQuery)