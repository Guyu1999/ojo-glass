;(function(){
    "use strict"
//登录效果
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

    // 购物车效果
    class Cart{
        constructor(){
            this.url = "http://localhost/git/ojo-glass/邱豪/json/goods.json";
            this.tbody = document.querySelector("tbody");
            this.total = document.getElementById("total");
            this.clearall = document.getElementById("clearall");
            this.load();
            this.addEvent();
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
            for(var i =0;i<this.res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[i].goodsId === this.goods[j].id){
                        str += `<tr class="goods" index="${this.res[i].goodsId}">
                                    <td><input type="checkbox" class="checked"></td>
                                    <td class="imgs">
                                        <img src="${this.res[i].img}">
                                        <span>${this.res[i].name}</span>
                                    </td>
                                    <td>${this.res[i].color}</td>
                                    <td>${this.res[i].price}</td>
                                    <td><input type="number" min=1 id="num" value="${this.goods[j].num}"></td>
                                    <td class="goodsnum">${this.res[i].price * this.goods[j].num}</td>
                                    <td class="delete">删除</td>
                                </tr>`
                    }
                }
            }
            this.tbody.innerHTML = str;
        }
        addEvent(){
            var that = this;
            this.tbody.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "delete"){
                    that.id = target.parentNode.getAttribute("index");
                    target.parentNode.remove();
                    that.changeCookie(function(i){
                        that.goods.splice(i,1);
                    });
                }
            })
            this.tbody.addEventListener("input",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.tagName == "INPUT"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.goods[i].num = target.value;
                    })
                }
            })
            // this.tbody.addEventListener("click",function(eve){
            //     var e = eve || window.event;
            //     var target = e.target || e.srcElement;
            //     if(target.className == "checked"){
            //         console.log(this.total);
            //     }
            // })
            this.clearall.onclick = function(){
                if(confirm("确定清空购物车吗？")){
                    removeCookie("goodsCookie");
                    location.reload();
                }
            }
        }
        changeCookie(cb){
            for(var i=0;i<this.goods.length;i++){
                if(this.id == this.goods[i].id){
                    cb(i);
                    break;
                }
            }
            setCookie("goodsCookie",JSON.stringify(this.goods))
        }
    }
    new Cart;
})()