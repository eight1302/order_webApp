//页面路由跳转
$(function(){
	//nav导航页路由跳转开始
	//首页路由切换
	$("ul .home_li").on('click',function(){
		window.location = "../home/home.html";
	});
	//自助下单路由切换
	$("ul .service_li").on('click',function(){
		window.location = "../service/home.html";
	});
	//下单管理路由切换
	$("ul .order_li").on('click',function(){
		window.location = "../order/home.html";
	});
	//个人中心路由切换
	$("ul .person_li").on('click',function(){
		window.location = "../person/home.html";
	});
	//系统设置路由切换
	$("ul .system_li").on('click',function(){
		window.location = "../system/home.html";
	});
	//售后设置路由切换
	$(".sale_menu").hide();
	$("#sale_li").mouseover(function (){  
        $(".sale_menu").show();
        $(".sale_menu").mouseover(function (){  
	        $(".sale_menu").show(); 
	    }).mouseout(function (){
			$(".sale_menu").hide();
		});
    }).mouseout(function (){
		$(".sale_menu").hide();
	});
	//选择返修产品
	$("ul .select_menu").on('click',function(){
		window.location ="../select_menu/home.html";
	});
	//oem产品
	$("ul .oem-menu").on('click',function(){
		window.location ="../oem_menu/home.html";
	});
	//选择焊接产品
	$("ul .weld-menu").on('click',function(){
		window.location ="../weld_menu/home.html";
	});
});