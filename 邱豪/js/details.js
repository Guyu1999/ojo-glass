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
    //数据渲染
    class Rundata{
        constructor(){
            this.url = "http://localhost/git/ojo-glass/邱豪/json/goods.json";
            this.goodsinfo = document.getElementById("goodsinfo");
            this.load();
            this.addinfo();
        }
        load(){
            ajaxGet(this.url,(res)=>{
                this.res = JSON.parse(res);
                this.getCookie();
            });
        }
        getCookie(){
            this.goods =getCookie("goodsCookie") ? JSON.parse(getCookie("goodsCookie")) : [];
            this.display();
        }
        display(){
            var str = "";
            // console.log(this.goodsinfo)
            for(var i =0;i<this.res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[i].goodsId === this.goods[j].id){
                        str += `<div class="info-l" index="${this.res[i].goodsId}">
                        <div class="sBox">
                        <img src="${this.res[i].img}"/>
                        <span style="background: url(${this.res[i].img});"></span>
                        <div class="bBox">
                        <img src="${this.res[i].img}"/>
                        </div>
                        </div>
                        <div class="imgbox">
                        <div class="imgbox1">
                        <img src="${this.res[i].img}" alt="">
                        </div>
                        <div class="btns">
                        <input type="button" id="left" value="<<<">
                        <input type="button" id="right" value=">>>">
                        </div>
                        </div>
                        </div>
                        <div class="info-m">
                        <h2>${this.res[i].name}</h2>
                        
                        <div class="price">
                        <p>本店价<span>￥${this.res[i].price}</span></p>
                        <p>市场价<i>￥${this.res[i].oprice}</i></p>
                        </div>
                        
                        <div class="starts">
                        <ul>
                        <li>
                        <h3>242</h3>
                        <span>销量</span>
                        </li>
                        <li>
                        <h3>24</h3>
                        <span>销量累计</span>
                        <img src="imgs/start.png" alt="">
                        </li>
                        <li class="green">
                        <h3>365</h3>
                        <span>销量</span>
                        </li>
                        </ul>
                        </div>
                        <div class="color">
                        <dl>
                        <dt>颜&nbsp;&nbsp;色</dt>
                        <dd class="selection"><img src="imgs/color-black.png" alt=""></dd>
                        <dd><img src="imgs/color-white.png" alt=""></dd>
                        <dd><img src="imgs/color-c.png" alt=""></dd>
                        </dl>
                        </div>
                        <div class="num1">
                        <dl>
                        <dt>数&nbsp;&nbsp;量</dt>
                        <dd>
                        <input type="number" min="1" value="1">&nbsp;件
                        </dd>
                        <dd><span>库存997件</span></dd>
                        </dl>
                        </div>
                        <div class="buy">
                        <a href="cart.html" class="buynow">立即购买</a>
                        <a class="incart">加入购物车</a>
                        </div>
                        <div class="promise">
                        <dl>
                        <dt>服务承诺</dt>
                        <dd><img src="imgs/t4.png" alt=""><span>按时发货</span></dd>
                        <dd><img src="imgs/t4.png" alt=""><span>按时发货</span></dd>
                        <dd><img src="imgs/t4.png" alt=""><span>按时发货</span></dd>
                        <dd><img src="imgs/t4.png" alt=""><span>按时发货</span></dd>
                        <dd><img src="imgs/t4.png" alt=""><span>按时发货</span></dd>
                        </dl>
                        </div>
                        </div>
                        <div class="info-r">
                        <ul>
                        <li>
                        <img src="imgs/details-img.png" alt="">
                        <span>￥568</span>
                        </li>
                        <li>
                        <img src="imgs/details-img.png" alt="">
                        <span>￥568</span>
                        </li>
                        <li>
                        <img src="imgs/details-img.png" alt="">
                                            <span>￥568</span>
                                            </li>
                                            </ul>
                                            </div>`
                        }
                    }
                }
                this.goodsinfo.innerHTML = str;
                console.log(window.location.href)
            }
            addinfo(){
                this.goodsinfo.addEventListener("click",function(eve){
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    if(target.className == "incart"){
                        alert("加入购物车成功！")
                    }
                })
            }
    }
    new Rundata();
    //放大镜效果
    window.onload = function(){
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
    }
})(jQuery)