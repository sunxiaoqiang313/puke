$(function(){
    // 梅花   C  clubs
    // 方块   D  diamonds
    // 红桃   H  hearts
    // 黑桃   S  spades
	let puke=[];
	let biao={};
	let color=['h','c','s','d']

    // 创建52张纸牌
	for(let i=0;i<52;i++){
        let huase=color[Math.floor(Math.random()*4)];
        let shuzi=Math.floor(Math.random()*13+1);
        while(biao[huase+'_'+shuzi]){
        	huase=color[Math.floor(Math.random()*4)];
            shuzi=Math.floor(Math.random()*13+1);
        }
        biao[huase+'_'+shuzi]=true;
        puke.push({huase,shuzi});
        // $('.pai')[i].append(`${huase}_${shuzi}`);
	}   

    //金字塔牌
    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            index++;
            let poke1=puke[index];
            let src=`url(img/${poke1.huase}_${poke1.shuzi}.jpg)`
            $('<div>').addClass('pai')
            .css({backgroundImage:src})
            .data('num',poke1.shuzi)
            .prop('id',`${i}_${j}`)
            .delay(10*index)
            .animate({top:50*i+20,left:305-50*i+100*j,opacity:1})
            .appendTo('.table');
        }
    }
    
    //剩余牌堆
    let lefts=100,tops=480;
    for(;index<puke.length;index++){
		let poke1=puke[index];
        let src=`url(img/${poke1.huase}_${poke1.shuzi}.jpg)`
        $('<div>').addClass('pai zuo')
        .css({backgroundImage:src})
        .data('num',poke1.shuzi)
        .delay(10*index)
        .animate({top:tops+=0.3,left:lefts+=0.2,opacity:1})
        .appendTo('.table');
    }

    let first=false;
    $('.pai').click(function(){
        let a=$(this).prop('id').split('_');
        let b=$(`#${parseInt(a[0])+1}_${parseInt(a[1])}`);
        let c=$(`#${parseInt(a[0])+1}_${parseInt(a[1])+1}`);
        if(b.length==1 || c.length==1){
            return ;
        }
        //点击时上移下移
        $(this).toggleClass('active');
        if($(this).is('.active')){
            $(this).animate({top:'-=20'})
        }else{
            $(this).animate({top:'+=20'})
        }

        //够了13消失
        if(first==false){
            first=this;
            let num=$(first).data('num');
            if(num==13){
                $(this).animate({left:580,top:0},function(){
                    $(this).remove();
                })
                first=false;
            }
        }else {
            let num=$(first).data('num')+$(this).data('num');
            if(num==13){
                $('.active').animate({left:580,top:0},function(){
                    $(this).remove();
                });
            }else{
                $('.active').animate({top:'+=20'})
            }
            first=false;
        }
    })
    
    //点击左右按钮
    $('button').delay(1000).animate({'opacity':1});
    let z=0;
    $('button:eq(0)').on('click',function(){
        z++;
        let zuo=$('.zuo')
        zuo.last().removeClass('zuo')
        .addClass('you')
        .css('zIndex',z)
        .animate({left:'+=400'})
    })
    $('button:eq(1)').click(function(){
        let you=$('.you');
        for(let i=you.length-1;i>=0;i--){
            $(you[i]).addClass('zuo')
            .removeClass('you')
            .delay(100*i)
            .animate({left:'-=400'},function(){
                $(this).css('zIndex',z)
            })
            
        }

    })

})