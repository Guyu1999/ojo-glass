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
            var end=new Date("2019/12/13").getTime();
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
    


})(jQuery)