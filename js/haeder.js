/*首页功能逻辑开始*/
var pagesize=15; 

$(document).ready(function(){
	//登出操作
	$(".logout").click(function(){
		swal({
		  title: "你确定要退出吗？",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  cancelButtonText: "取消",
		  confirmButtonText: "退出",
		  closeOnConfirm: false
		},
		function(){
			  $.getJSON({  
		            url:"/logout",  
		            async: false, 
		            cache:false,
		            dataType:"json", 
		            success: function(status) {
		            	window.location.href = "../login.html";
		            }  
		        }); 
		});
	});

	/*
	*鼠标点击，背景变色
	*/
	var urlstr = location.href;
    var urlstatus=false;
    $("#menu li").each(function () {  
        if ((urlstr + '/').indexOf($(this).attr('href')) > -1&&$(this).attr('href')!='') {
          $(this).addClass('navdown');
        } else {
          $(this).removeClass('navdown');
        }
    });

    /*
    *鼠标移入移出
    */
    $(".pcb_oec").hide();
    $(".order_li").mouseover(function (){
     	$(".pcb_oec").show();
	    $(".pcb_oec").mouseover(function (){
	        $(".pcb_oec").show();
	}).mouseout(function (){
	    $(".pcb_oec").hide();
	});
    }).mouseout(function (){
        $(".pcb_oec").hide();
    });

    /*全局的底部弹出消息框操作逻辑*/
    $(".cancel_new").click(function(){
    	$(".toast_news").toggle(10);
    });
   
    /*获取头像*/
    $.getJSON({
      url:"/user/info",
      cache:false,
      success:function(result,data){
          if(result.code==1){
              $(".head").append('<img src="'+result.data.head_img+'" class="hade" />');
              $("#user").text(result.data.user);
          }
      },
      error:function(){}
  });

    /*menu菜单信息*/
    $.getJSON({
        url:"../../json/menu.json",
        cache:false,
        success:function(result,data){
            if(result.menu.state==200){
                $(".menu_ul").find(".home_des").html(result.menu.home);
                $(".menu_ul").find(".service_des").html(result.menu.service);
                $(".menu_ul").find(".order_des").html(result.menu.order);
                $(".menu_ul").find(".person_des").html(result.menu.person);
                $(".menu_ul").find(".sale_des").html(result.menu.sale);

                //自助二级下单菜单
                $(".server_order_menu").find(".oem_server_des").html(result.menu.oem_service);
                $(".server_order_menu").find(".weld_server_des").html(result.menu.weld_service);

               //合同管理二级菜单
                $(".order_contract_menu").find(".oem_contract_des").html(result.menu.oem_order);
                $(".order_contract_menu").find(".weld_contract_des").html(result.menu.weld_order);

                //售后二级菜单
                $(".sale_ul").find(".select_des").html(result.menu.select_menu);
                $(".sale_ul").find(".oem_des").html(result.menu.oem_menu);
                $(".sale_ul").find(".weld_des").html(result.menu.weld_menu);
            }
        }
    });
});
/*首页功能逻辑结束*/