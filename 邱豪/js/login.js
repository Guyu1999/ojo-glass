;(function(){
    "use strict"

    class Login{
        constructor(){
            this.user = document.getElementById("user");
            this.pass = document.getElementById("pass");
            this.log = document.getElementById("loginnow");

            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.log.onclick = function(){
                that.u = that.user.value;
                that.p = that.pass.value;
                that.getMsg();
            }
        }
        getMsg(){
            this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : [];
            var type = 0;
            for(var i =0;i<this.msg.length;i++){
                if(this.msg[i].user == this.u && this.msg[i].pass == this.p){
                    location.href = "index.html";
                    this.msg[i].onoff = 1;
                    setCookie("userMsg",JSON.stringify(this.msg));
                    type = 1;
                }else if(this.msg[i].user == this.u && this.msg[i].pass != this.p){
                    alert("用户名或密码错误");
                    type = 2;
                }
            }
            if(type == 0){
                alert("用户名不存在，请去注册");
            }
        }  
    }
    new Login;
    //验证码
    function regCode(){
        let vcode = document.querySelector("#vcode");
        var str = "";
        for(var i=0;i<40;i++){
            str += random(0,9);
            str += String.fromCharCode(random(97,122));
            str += String.fromCharCode(random(65,90));
        }

        // 从库中再随机取四个
        var s = "";
        for(var i=0;i<4;i++){
            s += str[random(0,str.length-1)]
        }
        vcode.innerHTML = s;

        function random(a,b){
            return Math.round(Math.random()*(a-b))+b;
        }
    }
    regCode();
})()