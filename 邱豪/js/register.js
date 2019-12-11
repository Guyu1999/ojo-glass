;(function(){
    "use strict"
//登录注册功能
    class Register{
        constructor(){
            this.user = document.getElementById("reg-user");
            this.pass = document.getElementById("reg-pass1");
            this.reg = document.getElementById("reg");
            this.span = document.getElementById("name1");

            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.reg.onclick = function(){
                that.u = that.user.value;
                that.p = that.pass.value;
                that.setMsg();
            }
        }
        setMsg(){
            this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : [];
            if(this.msg.length<1){
                this.msg.push({
                    user:this.u,
                    pass:this.p,
                    onoff:0
                })
                this.success();
            }else{
                var type = this.msg.some((val,idx)=>{
                    return val.user === this.u;
                });
                if(type){
                    this.span.innerHTML = "用户名重复";
                }else{
                    this.msg.push({
                        user:this.u,
                        pass:this.p,
                        onoff:0
                    });
                    this.success();
                }
            }
            setCookie("userMsg",JSON.stringify(this.msg),{
                
            });
        }
        success(){
            this.span.innerHTML = `注册成功，3秒后跳转到<a href="login.html">登录页面>></a>`;
            setTimeout(function(){
                location.href = "login.html";
            },3000)
        }
    }
    new Register;
    //验证码
    function regCode(){
        let vcode = document.querySelector(".vcode");
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
})();