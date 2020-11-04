// -------------- 生成元素 --------------
function createClockDot(){
  // 大的點共12個 12/2=6
  let addObj="";
  let dotCount1=-1;
  let dotCount2=29;
  for(let i=0;i<=5;i++){

    addObj=addObj+`
      <div class="barB barB${i+1}">
        <div class="dotBig dot${++dotCount1}"></div>
        <div class="dotBig dotReverse dot${++dotCount2}"></div>
      </div>
    `;
    // 大的點後面接四個小點
    for(let j=1;j<=4;j++){
      addObj=addObj+`
        <div class="barS barS${i+1}${j}">
          <div class="dotSmall dot${++dotCount1}"></div>
          <div class="dotSmall dotReverse dot${++dotCount2}"></div>
        </div>
      `;
    }
  }   
  $(".clockBox").prepend(addObj);   
  /*
    設定CSS
    barB1 ~ barB6  
    transform: translate(-50%,-50%) rotate( deg); 起點為0度 每個點間隔30度 
    barS11 ~ barS14  ... barS61 ~ barS64
    transform: translate(-50%,-50%) rotate( deg); 起點為6度 每個點間隔6度 每4個點 間格為12(跳過大點)
  */
  // 大點
  for(let i=0;i<=5;i++){
    let degSet=30*i;
    $(".barB"+(i+1)).css({'transform':'translate(-50%,-50%) rotate('+degSet+'deg)'});
  }
  // 小點
  for(let i=0;i<=5;i++){
    let degSet=0;
    for(let j=1;j<=4;j++){
      let obj=".barS"+(i+1)+j;
      degSet=6*(j+(i*4))+i*6;   //
      // console.log(obj,degSet);
      $(obj).css({'transform':'translate(-50%,-50%) rotate('+degSet+'deg)'});
    }
  }
}


// -------------- 計算時間 --------------

function getTime(){
  let time=new Date();
  let pos_s=time.getSeconds();
  let pos_m=time.getMinutes();
  let pos_h=time.getHours();
  let x=pos_s*6;
  let y=(pos_m*60+pos_s)*0.1;
  let z=(pos_h*60+pos_m)*0.5;

  $(".pointerS").css({'transform':'rotate('+x+'deg)'});
  $(".pointerM").css({'transform':'rotate('+y+'deg)'});
  $(".pointerH").css({'transform':'rotate('+z+'deg)'});


  let num_h=(pos_h/10<1)?"0"+pos_h:pos_h;
  let num_m=(pos_m/10<1)?"0"+pos_m:pos_m;
  let num_s=(pos_s/10<1)?"0"+pos_s:pos_s;
  $("#timeN1").html(num_h);
  $("#timeN2").html(num_m);
  $("#timeN3").html(num_s);


  if(pos_s%5==0){
    $(".dot"+pos_s).addClass("dotBigAni");
    $(".dot"+pos_s).removeClass("dotBig");

    setTimeout(() => {
      $(".dot"+pos_s).addClass("dotBig");
      $(".dot"+pos_s).removeClass("dotBigAni");
    }, 10000);
  }else{
    $(".dot"+pos_s).addClass("dotSmallAni");
    $(".dot"+pos_s).removeClass("dotSmall");

    setTimeout(() => {
      $(".dot"+pos_s).addClass("dotSmall");
      $(".dot"+pos_s).removeClass("dotSmallAni");
    }, 10000);
  }
}
