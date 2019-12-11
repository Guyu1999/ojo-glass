;(function(){
    "use strict"

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
            this.span.innerHTML = `注册成功，5年后跳转到<a href="login.html">登录页面>></a>`;
            setTimeout(function(){
                location.href = "login.html";
            },3000)
        }
    }
    new Register;
})();