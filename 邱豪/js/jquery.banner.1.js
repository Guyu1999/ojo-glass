;(function($){
    "user strict";
    $.fn.banner = function(options){
    this._obj = {
        list:options.list===false ? false :true,
        index:options.index || 0,
        autoPlay:options.autoPlay===false ? false : true,
        delayTime:options.delayTime || 2000,
        moveTime:options.moveTime || 200,
        iPrive:options.items.length-1
    };
    var that = this;
    this._obj.display = function(){
        that.css({overflow:"hidden"})
        options.items.css({
            position:"absolute",
            left:options.items.eq(0).width()
        }).eq(this.index).css({
            left:0
        })
    }
    this._obj.display();

    function btnRight(){
        if(that._obj.index == options.items.length-1){
            that._obj.index = 0;
            that._obj.iPrive = options.items.length-1
        }else{
            that._obj.index++;
            that._obj.iPrive = that._obj.index-1;
        }
        that._obj.btnMove(-1)
    }

    function btnLeft(){
        if(that._obj.index == 0){
            that._obj.index = options.items.length-1;
            that._obj.iPrive = 0
        }else{
            that._obj.index--;
            that._obj.iPrive = that._obj.index+1
        }
        that._obj.btnMove(1)
    }

    this._obj.btnMove = function(type){
        options.items.eq(this.iPrive).css(
        {
            left:0
        }).stop().animate({
            left:options.items.eq(0).width()*type
        },this.moveTime).end().eq(this.index).css({
            left:-options.items.eq(0).width()*type
        }).stop().animate({
            left:0
        },this.moveTime)

        if(!that._obj.list)return;
        that.find(".list").children().css({
            background:"rgba(200,200,200,0.6)"
        }).eq(that._obj.index).css({
            background:"red",
            pacity:0.8
        })
    }
    
    if(options.left !=undefined && options.left.length>0 && options.right !=undefined && options.right.length>0){
        options.left.click(btnLeft)
        options.right.click(btnRight)
    }

    if(this._obj.list){
        var str = "";
        for(var i=0;i<options.items.length;i++){
            str += `<li></li>`;
        }

        $("<ul class='list'>").html(str).appendTo(this).css({
            left:900,bottom:30,
            position:"absolute",width:1000,
            listStyle:"none",margin:0,
            padding:0,height:30,lineHeight:"30px",textAlign:"center",
        }).children().css({
            background:"rgba(200,200,200,0.6)",
            float:"left",
            width:13,height:13,borderRadius:"50%",
            borderLeft:"1px solid #000",
            borderReft:"1px solid #000",margin:10,
        }).eq(this._obj.index).css({
            background:"red",
            opacity:0.8
        })
        this.find(".list").children("li").mouseenter(function(){
            if($(this).index()>that._obj.index){
                that._obj.listMove($(this).index(),1);
            }
            if($(this).index()<that._obj.index){
                that._obj.listMove($(this).index(),-1);
            }            
                
            $(this).css({
                background:"red",
                pacity:0.8
            }).siblings().css({background:"rgba(200,200,200,0.6)"})
            that._obj.index = $(this).index();
        })
        this._obj.listMove = function(i,type){
            options.items.eq(that._obj.index).css({left:0}).stop().animate({
                left:-options.items.eq(0).width() * type
            },this.moveTime)
            options.items.eq(i).css({left:options.items.eq(0).width() * type}).stop().animate({left:0},this.moveTime)
        }
    }
    if(this._obj.autoPlay){
        this._obj.t = setInterval(()=>{
            btnRight();
        },this._obj.delayTime)
        this.hover(function(){
            clearInterval(that._obj.t)
        },function(){
            that._obj.t = setInterval(()=>{
                btnRight()
            },that._obj.delayTime)
        })
    }

    }
})(jQuery);

