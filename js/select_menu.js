/*
*time 2017.12.5
*auth xiaominzhang
*返修订单选择
*/
$(function(){

	//加载返修流程信息
	$.getJSON({  
        type: "get",  
        url:"../../json/select_menu.json",  
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(status) {
            console.log(status); 
            if(status.data.state==200){
            	/*加载预付款流程信息*/
               	$.each(status.data.timeline_red, function(idx,obj){
                    var timeline_red;
                    timeline_red='<div class="tow">'+
                        			'<div class="round_red">'+
                        				'<span style="margin-left: 4px;">'+obj.num+'</span>'+
                        			'</div>'+
                        			'<span class="one">'+obj.title+'</span>'+
                        		'</div>';
                    $(".red_detail").append(timeline_red);
                }); 
            }
        }  
    }); 

    //展示返修产品列表
    $.getJSON({  
        type: "get",  
        url:"../../json/select_menu_product.json",  
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(status) {
            console.log(status); 
            if(status.data.state==200){
            	/*加载预付款流程信息*/
               	$.each(status.data.select_menu_product, function(idx,obj){
                    var select_menu_product;
                   	select_menu_product = '<div class="contract_product">'+
                   							'<div class="contract_no">'+obj.contract_no+'</div>'+
                   							'<div class="pooduct_name">'+obj.pooduct_name+'</div>'+
                   							'<div class="product_data">'+obj.product_data+'</div>'+
                   							'<div class="product_type">'+obj.product_type+'</div>'+
                   							'<div class="contract_state">'+obj.contract_state+'</div>'+
                   							'<div class="product_quantity">'+obj.product_question+'</div>'+
                   							'<div class="selcet_btn" select_menu_product="'+obj.id+'">选择返修产品</div>'+
                   						'</div>';
                    $(".contracts").append(select_menu_product);
                }); 
            }
        }  
    });

    //判断产品名称、型号
     $(".pooduct_name").each(function(){
        var news_maxwidth=4;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
   	});
    $(".product_type").each(function(){
        var news_maxwidth=4;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
   	});

   	//选择返修产品
   	$(".selcet_btn").on('click',function(){
   		var select_menu_product = $(this).attr("select_menu_product");
   		$(".overlay_repair").show();
   		$(".overlay_product").show();

   		//取消按钮操作
   		$(".cental_pro").on('click',function(){
   			window.location.reload();
   			$(".overlay_repair").hide();
   			$(".overlay_product").hide();
   		});
   		 //展示返修产品列表
	    $.getJSON({  
	        type: "get",  
	        url:"../../json/select_menu_product.json",  
	        async: false, 
	        cache:false,
	        dataType:"json", 
	        success: function(status) {
	            console.log(status); 
	            if(status.data.state==200){
	            	/*加载预付款流程信息*/
	               	$.each(status.data.product, function(idx,obj){
	                    var product;
	                   	product = '<div class="products_destrion">'+
	                   							'<div class="no"><input type="checkbox" name="signs" id='+obj.id+'></div>'+
	                   							'<div class="number">'+obj.number+'</div>'+
	                   							'<div class="name1">'+obj.pooduct_name+'</div>'+
	                   							'<div class="type">'+obj.product_type+'</div>'+
	                   							'<div class="quantity">'+obj.product_question+'</div>'+
	                   							'<div class="re_quantity"><input type="text" id="repair_question" style="height: 28px;width: 30%;border-radius: 10px;"></div>'+
	                   							'<div class="up">'+
	                   								'<div class="up_btn" product_id="'+obj.id+'">上传</div>'+
	                   							'</div>'+
	                   						'</div>';
	                    $(".products_info").append(product);
	                }); 
	            }
	        }  
	    });

	    //上传质量问题
	    $(".up_btn").on('click',function(){
	    	var product_id = $(this).attr("product_id");
	    	$(".product_repair").show();
	    	$(".product_question").show();
	    	$(".cental_pro").on('click',function(){
	    		$(".product_question").hide();
	    		$(".product_repair").hide();
	    		window.location.reload();
	    	})
			
			$(".file").on('click',function(){
	            $(".file").empty();
	            $("#file").change(function(){
	            	var objUrl = getObjectURL(this.files[0]) ;
	              	console.log("objUrl = "+objUrl) ;
	                if (objUrl){
	                    $(".img").attr("src", objUrl);
	                    $(".imgs").show();
	                }
	                //建立一個可存取到該file的url
	                function getObjectURL(file) {
	                    var url = null ;
	                    if (window.createObjectURL!=undefined){ // basic
	                        url = window.createObjectURL(file) ;
	                    }
	                    else if (window.URL!=undefined){
	                        // mozilla(firefox)
	                        url = window.URL.createObjectURL(file) ;
	                    } 
	                    else if (window.webkitURL!=undefined) {
	                        // webkit or chrome
	                        url = window.webkitURL.createObjectURL(file) ;
	                    }
	                    return url ;
	                }
	            }) ; 
            });

            //点击提交质量问题,将数据放到数组中

            $(".product_repair_btn").on('click',function(){

            });


	    });
   	});
});