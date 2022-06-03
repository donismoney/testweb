/*
 * motion.js
 * 
 */

var count = 0;
var ag    = setInterval("autoGallery()",6000);
function autoGallery(){ 
    var iN = $(".intro li:last").index(); 
    count += 1; 
    if( count <= iN ){
        $(".intro ul").stop().animate({marginLeft:-100 * count+"%"}); 
        $(".intro_btn button:not(:last)").css({background:"url(images/intro_btn.png)no-repeat center top"});
        $(".intro_btn button:eq("+count+")").css({background:"url(images/intro_btn_now.png)no-repeat center top"});
    }else{
        $(".intro li:first").appendTo(".intro ul");
        $(".intro ul").css({marginLeft:-100*(iN-1)+"%"});
        $(".intro ul").stop().animate({marginLeft:-100*iN+"%"},function(){
            $(".intro li:last").prependTo(".intro ul");
            $(".intro ul").css({marginLeft:0});
            count=0; 
            $(".intro_btn button:not(:last)").css({background:"url(images/intro_btn.png)no-repeat center top"});
            $(".intro_btn button:eq("+count+")").css({background:"url(images/intro_btn_now.png)no-repeat center top"});
        });
    } 
}

function eduMotion(){
    $(".edu_wrap table tr:eq(0)").fadeIn(300,function(){
        $(".edu_wrap table tr:eq(1)").fadeIn(300,function(){
            $(".edu_wrap table tr:eq(2)").fadeIn(300,function(){
                $(".edu_wrap table tr:eq(3)").fadeIn(300,function(){
                    $(".edu_wrap table tr:eq(4)").fadeIn(300,function(){
                        $(".edu_wrap table tr:eq(5)").fadeIn(300,function(){
                            $(".edu_wrap table tr:eq(6)").fadeIn(300);            
                        });            
                    });            
                });            
            });            
        });
    });    
}

function jobMotion(){
        $(".job_chart li:eq(0) p").animate({width:"80%"},800);
        $(".job_chart li:eq(1) p").animate({width:"90%"},600);
        $(".job_chart li:eq(2) p").animate({width:"95%"},1200);
        $(".job_chart li:eq(3) p").animate({width:"85%"},1000);
        $(".job_chart li:eq(4) p").animate({width:"80%"},700);
}

function AddTyping(){
    $(".typing").text("");  
    typingIdx     = 0;   
    var typingTxt = $(".typing-txt").text();  // 타이핑될 텍스트를 가져온다    
    typingTxt     = typingTxt.split("");      // 한글자씩 자른다.    
    var tyInt     = setInterval(function () 
    {  
      if(typingIdx < typingTxt.length)      // 타이핑될 텍스트 길이만큼 반복  
      {  
          $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다.  
          typingIdx++; 
      } else{  
          clearInterval(tyInt); //끝나면 반복종료 
      }  
    }, 100);  
} 

$(document).ready(function(){   
    var check = 0;
    
    $(window).scroll(function()
    {    
      var sn = $("html,body").scrollTop(); // 실시간으로 변경될 수 있는 스크롤바의 위치값  
      if(sn > 500){
          $(".footer_wrap p:eq(0)").fadeIn("slow");
      }else{
          $(".footer_wrap p:eq(0)").fadeOut("slow");
      }

      if(sn > 1100){
        eduMotion();
      }
      
      if(sn > 2100){
          jobMotion();
      }
       
      if(sn > 375 && check == 0){
        check = 1;
        AddTyping();
      }

    });  

    // 전역메뉴 좌우 슬라이드 조작&애니메이션
    $(".nav_btn button").click(function(){
        $("nav").stop().animate({marginLeft:0});
    });
    $(".nav_close_btn button").click(function(){
        $("nav").stop().animate({marginLeft:"-100%"});
    }); 
    
    // 전역메뉴 클릭시 스크롤의 위치에 적용되는 이동값에
    // 데스크탑과, 모바일(태블릿)에 차등된 연산이 필요 
    var minusNum = 80; 
    var bw       = $(window).width();   //(b)rowser (w)idth : 브라우저 너비값 기록변수
    var dh       = $(window).height();  
    if(bw>=1200){ // 데스크탑 환경
        minusNum = 80;
        $('.intro').css('height', dh-80);   
        $('.intro ul').css('height', dh-387);
    }else{ // 모바일&태블릿환경
        minusNum = 0;
        $('.intro').css('height', dh-80);   
        $('.intro ul').css('height', dh-150); 
        if(bw<500){
          $('#email_text').html('궁금한점이 있으시면<br>언제든지 연락주세요!');
          $('#data_list').css('font-size','14px'); 
        }  
    } 
    
    $(window).resize(function(){ 
      bw = $(window).width();
      dh = $(window).height();  
      if(bw>=1200){ // 데스크탑 환경
          minusNum = 80;   
          $('.intro').css('height', dh-80);   
          $('.intro ul').css('height', dh-387);
      }else{ // 모바일&태블릿환경
          minusNum = 0;  
          $('.intro').css('height', dh-80);   
          $('.intro ul').css('height', dh-150); 
      } 
    });   

    // 전역메뉴와 대메뉴 클릭시 해당위치의 섹션으로 부드럽게 이동. 
    $(".gnb>li").click(function(){ 
      if(minusNum == 0){
          $("nav").css({marginLeft:"-100%"});
          if( $(this).index() > 1 ){
              $("html,body").stop().animate({scrollTop:(1000 * $(this).index()-(1000-dh)) -minusNum });
          }else if($(this).index() == 1){
              $("html,body").stop().animate({scrollTop:dh -minusNum });
          }else{
              $("html,body").stop().animate({scrollTop:0});
          }; 
      }else{
          $("nav").css({marginLeft:"-100%"});
          if( $(this).index() > 1 ){
              $("html,body").stop().animate({scrollTop:(1000 * $(this).index()-(1000-dh)) -minusNum });
          }else if($(this).index() == 1){
              $("html,body").stop().animate({scrollTop:dh -minusNum });
          }else{
              $("html,body").stop().animate({scrollTop:0});
          };
      } 
    });
    
    // 인트로 좌우 슬라이드 조작[바형식의 네비게이션 버튼]&애니메이션
    $(".intro_btn button:last").hide(); 
    $(".intro_btn").css({marginLeft:"-60px"});
    $(".intro_btn button:eq(0)").css({background:"url(images/intro_btn_now.png)no-repeat center top"});
    $(".intro_btn button:eq(1)").css({background:"url(images/intro_btn.png)no-repeat center top"});
    $(".intro_btn button:eq(2)").css({background:"url(images/intro_btn.png)no-repeat center top"});
     
    // 1,2,3 인트로 버튼
    $(".intro_btn button:not(:last)").click(function(){
      clearInterval(ag);
      $(".intro_btn button:last").fadeIn("fast");
      $(".intro_btn").stop().animate({marginLeft:"-85px"});
      
      count = $(this).index();
      $(".intro ul").stop().animate({marginLeft: -100 * count +"%" });
      
      $(".intro_btn button:not(:last)").css({background:"url(images/intro_btn.png)no-repeat center top"});
      $(".intro_btn button:eq("+count+")").css({background:"url(images/intro_btn_now.png)no-repeat center top"});
    });

    //play 인트로 버튼
    $(".intro_btn button:last").click(function(){
      ag = setInterval("autoGallery()",3000);
      $(".intro_btn").stop().animate({marginLeft:"-60px"});
      $(this).fadeOut("fast");
    });
     
    // profile 
    $(".profile_wrap dd:not(:first)").hide(); 
    $(".profile_wrap dt").click(function(){
      $(".profile_wrap dd").stop().slideUp();
      $(this).next().stop().slideDown();
    });
    
    // edu 
    $(".edu_wrap table tr").css({ display:"none" });
    
    // work  
    $(".job_chart li p").css({ width:0 });
      
    //6. portfolio 
    $(".port_btn button:eq(0)").css({background:"#04111a", color:"#fff"}); 
    $(".port_wrap>ul>li:not(:first)").hide();    
    $(".port_btn button").click(function(){ 
      $(".port_btn button").css({background:"none",color:"#fff"});
      $(this).css({background:"#04111a", color:"#fff"}); 
      $(".port_wrap>ul>li").hide();
      $(".port_wrap>ul>li:eq("+$(this).index()+")").show();
    });
     
    $(".more_btn1").click(function(){
      $(".check_li_img1").show();
      $(".check_li_img2").hide();
    });
    $(".more_btn2").click(function(){
      $(".check_li_img1").hide();
      $(".check_li_img2").show();
    }); 
   
    $(".wd_more_btn1").click(function(){
      $(".check_li_img3").show();
      $(".check_li_img4").hide();
    });
    $(".wd_more_btn2").click(function(){
      $(".check_li_img3").hide();
      $(".check_li_img4").show();
    });

    // footer
    $(".footer_wrap p:eq(0)").hide(); 
    $(".footer_wrap button").click(function(){
       $("html,body").stop().animate({scrollTop:0});
    });  
    $('#submitBtn').click(function(){ 
      var subject = $('#subject').val();
      var email   = $('#email').val();
      var contents= $('#contents').val(); 
      var mailto ="mailto:cheoluk96@hanmail.net,jelee9138@daum.net?subject="+subject+"&body=메일 답변 받으실 주소:"+email+"%0D%0A%0D%0A내용:"+contents;
      $("#submitAlink").attr('href',mailto); 
      $('#submitAlink').get(0).click();
      location.reload(true);
    });  
});    
