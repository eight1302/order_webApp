/**
*Time 2017/12/19/10
*autor ZHANGXIAOMIN
*/

function renderOemOrderTable(){
	var data1 = $("#data1").val(),
    	data2 = $("#data2").val();
    var data_time ={};
    
    if(data1!=null && data1.length>0){
		data_time = {
			"data1" : data1,
			"data2" : data2
		}
	}

	//判断展示的合同类型
	data_time['type']="OEM"
	$(".data_detail_oem").html('');
	$.ajax({
       	url:"/order/list",
        cache:false,
        type: "post",  
        contentType: 'application/json',
        dataType:"json", 
        data:JSON.stringify(data_time),
        success:function(e){
        	if(e.data.length==0){
        		swal("暂无数据4！");
        		return;
        	}
           $.each(e.data, function(idx,obj){
    		   if(idx<pagesize){
    			   drawTableOemOrder(obj)
        		}
            }); 
        	var content=e.data.length;       //总数
            var pageTotal=Math.ceil(content/pagesize);  //分页数量
            var html='<ul class="pagination" id="page2"></ul>';
            $(".page-left").append(html);
            Page({
                num:pageTotal,             //页码数
                startnum:1,
                pagesize:pagesize,             //每页显示的数量
                elem:$('#page2'),       //指定的元素
                callback:function(n){   //回调函数 
                    paginationOem(n,e.data);     
                }
            });
        },
        error:function(result,sweetalert){
            swal("暂无数据2！");
        }
	});
}

//表单数据
function drawTableOemOrder(obj){
	 var html = '<div class="oem_data_detail">'+
        '<div class="contract_no">'+obj.contract_no+'</div>'+
        '<div class="data_order">'+obj.data_order+'</div>'+
        '<div class="data_play">'+obj.data_play+'</div>'+
        '<div class="product_quantity">'+obj.product_quantity+'</div>'+
        '<div class="tax">'+obj.tax+'</div>'+
        '<div class="clients_confirmation">'+
            '<div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0;">'+
                '<div class="col-md-6 col-sm-6 col-xs-6 user_determine" id="user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                    '<span class="icon-ok-circle" style="font-size:18px;line-height: 22px;" title="确认"></span>'+
                '</div>'+
                '<div class="col-md-6 col-sm-6 col-xs-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'">'+
                    '<span class="icon-remove" style="font-size:18px;line-height: 22px;" title="取消"></span>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="order_status">'+obj.order_status+'</div>'+
        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
        '<div class="down_payment">'+obj.down_payment+'</div>'+
        '<div class="payment_status">'+obj.payment_status+'</div>'+
        '<div class="upload_payment">'+
            '<div class="payment_oem" pay_type="'+obj.pay_type+'" payment_seq="'+obj.payment_seq+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" oem_contract_id="'+obj.id+'"><span class=" icon-money" style="font-size:20px;line-height: 20px;" title="上传支付凭证"</span></div>'+
        '</div>'+
        '<div class="contract_details" product_id="'+obj.id+'">'+
            '<div class="conteact_oem" oem_contract_id="'+obj.id+'">合同详情</div>'+
        '</div>'+
    '</div>';
    $(".data_detail_oem").append(html);
    OrderPalyData();  
}

//页数控制
function paginationOem(num,list){
	$(".data_detail_oem").html('');
	$.each(list, function(idx,obj){
		if(idx>=((num-1)*pagesize) && idx<(num*pagesize)){
			drawTableOemOrder(obj);
		}
    });
}

//判断预计交付日期以及按钮状态判断
function OrderPalyData(){

	//日期为空时---表示
	$(".data_play").each(function(){
      	var play = $(this).html();
        if(play == "undefined"){
           	$(this).html("---");
        }
    });

    //总数为空
    $(".product_quantity").each(function(){
        var quantity = $(this).html();
        if(quantity == "null"){
            $(this).html("---");
        }
    });

	//总价为空时---表示
    $(".full_payment_rate").each(function(){
    	var rate = $(this).html();
        if(rate == "null"){
           	$(this).html("---");
        }
    });

    //代付金额为空时---表示
    $(".down_payment").each(function(){
    	var payment = $(this).html();
        if(payment == "null"){
           	$(this).html("---");
        }
    });

    //确认按钮判断状态
	$(".user_determine").each(function(){
		var determine = $(this).attr("user_determine_start");
		if(determine == "1"){
		    $(this).attr({"disabled":"disabled"});
		    $(this).css("background","#bfbfbf");
		}
	});

	//取消按钮判断状态
	$(".user_cancel").each(function(){
	    var determine = $(this).attr("user_determine_start");
	    if(determine == "1"){
	        $(this).attr({"disabled":"disabled"});
	        $(this).css("background","#bfbfbf");
	        $(this).attr('disabled',"true");
	    }
	});

	//上传支付凭证判断状态
	$(".payment_oem").each(function(){
	    var payment_seq = $(this).attr("payment_seq");
	    var determine = $(this).attr("user_determine_start");
	    if(determine == "0" || payment_seq == "2"){
	        $(this).attr({"disabled":"disabled"});
	        $(this).css("background","#bfbfbf");
	    }
	});

    //上传支付凭证判断状态
    $(".payment_weld").each(function(){
        var payment_seq = $(this).attr("payment_seq");
        var determine = $(this).attr("user_determine_start");
        if(determine == "0" || payment_seq == "2"){
            $(this).attr({"disabled":"disabled"});
            $(this).css("background","#bfbfbf");
        }
    });


	$(".product_name").each(function(){
		var news_maxwidth=5;
		if($(this).text().length>news_maxwidth){
		    $(this).text($(this).text().substring(0,news_maxwidth));
		     $(this).html($(this).html()+'…');
		}
	});

	$(".product_model").each(function(){
		var news_maxwidth=5;
		if($(this).text().length>news_maxwidth){
		    $(this).text($(this).text().substring(0,news_maxwidth));
		    $(this).html($(this).html()+'…');
		}
	});
}


function OrderConfirmation(Id){
	$.getJSON({  
        type: "get",  
        url:"/order/determine?id="+Id+"+&dete=1",
        async: false, 
        cache:false,
        success: function(status) {
            console.log(status); 
            if(status.code==1){
            /*加载OEM合同信息*/
                swal({ 
                    title: "点击确认,将执行产品生产", 
                    text: "请尽快上传支付凭证或联系客服!", 
                    timer: 1500, 
                    showConfirmButton: false 
                });
            }
            setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                window.location.reload();//页面刷新
            },1500);
        }  
    });
}

function OrderCancel(Id){
	$.getJSON({  
        type: "get",  
         url:"/order/determine?id="+Id+"&dete=0",
        async: false, 
        cache:false,
        success: function(status) {
          console.log(status); 
            if(status.code==1){
            /*加载OEM合同信息*/
               swal({ 
                    title: "合同已取消!", 
                    text: "本合将任务作废，删除!", 
                    timer: 3000, 
                    showConfirmButton: false 
                });
            }
            
        }  
    });
}

//选择支付方式
function PayMothod(){
    var pay=$('input:radio[name="pay"]:checked').val();
    //支付方式判断
    var Mode_payment;
    if(pay == ""){
        swal("请选择付款方式");
    }

    if(pay == 1){
        Mode_payment = 1;
    }

    if(pay == 2){
        Mode_payment = 2;
    }

    if(pay == 3){
        Mode_payment = 3;
    }

    return Mode_payment;
}

//稍后上传支付凭证
function UploadPaymentLater(Id,Mode_payment){
	$.getJSON({  
   		type: "get",  
        url:"/order/mode?id="+Id+"&mode=1&pay_type="+Mode_payment,
        async: false, 
        cache:false,
        success: function(status) {
	        console.log(status); 
	        if(status.code==1){
            	//加载OEM合同信息
                setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();//页面刷新
                },100);
            } 
        }  
    });	
}

//立即上传支付凭证
function UploadPaymentNow(Id,Mode_payment){
	$.getJSON({  
        type: "get",  
        url:"/order/mode?id="+Id+"&mode=1&pay_type="+Mode_payment,
        async: false, 
        cache:false,
        success: function(status) {
          	console.log(status); 
           if(status.code==1){
                //加载OEM合同信息
               $(".credentials").show();
               $(".file").on('click',function(){
                    $(".file").empty();
                    $("#file").change(function(){
                        var objUrl = getObjectURL(this.files[0]) ;
                        console.log("objUrl = "+objUrl) ;
                        if (objUrl) 
                        {
                            $(".img").attr("src", objUrl);
                            $(".img").removeClass("hide");
                            $(".up_img").show();
                            $(".text_info").hide();
                        }
                        //建立一個可存取到該file的url
                        //getObjectURL(file);
                    }) ; 
               });
               //取消上传凭证
                $(".cancal_btn").on('click',function(){
                    $(".credentials").hide();
                    $(".overlay_num1").hide();
                    window.location.reload();//页面刷新
                });
                //上传支付凭证
                $(".up_btn").on('click',function(){
					//types 文件类型
                    UploadPayment(Id,"file","支付凭证","png,jpg,jpeg,jpe,gif")
      			}); 
            } 
        }  
    });
}

//上传操作
function UploadPayment(Id,fileId,ftype,types){
	var PaymentVoucher = $("#"+fileId).val();
     if(PaymentVoucher == ""){
        $(".text_info").show();
        return false;
    }
    var fileTypes = types.split(",");
	//定义可支持的文件类型数组
    var PayVoucher="0";
    var newFileName = PaymentVoucher.split('.');
    newFileName = newFileName[newFileName.length-1];
    for(var i=0;i<fileTypes.length;i++){
        if(fileTypes[i] == newFileName){
            PayVoucher = "1";
        }
    }
    if(PayVoucher == "0"){
        swal(ftype+"文件必须是"+types);
        return false;
    }
    var fd = new FormData();
    fd.append("file", $("#"+fileId).get(0).files[0]);
	$.getJSON({  
        type:"post",  
        url:"/order/upload?id="+Id,
        async: false, 
        cache:false,
        data : fd,
        processData: false,
        contentType: false, 
        success: function(status) {
            console.log(status); 
            if(status.code==1){
                 //加载OEM合同信息
                window.location.reload();//页面刷新
            }
            if(status.code!=1){
            	swal("上传失败！");
            	return false;
            }
        }  
    });
}

function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined){ // basic
        url = window.createObjectURL(file) ;
    }
    else if (window.URL!=undefined){
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } 
    else if (window.webkitURL!=undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

//取消上传
function CancalPayment(){
	$(".cancal_btn").on('click',function(){
        $(".credentials").hide();
        $(".overlay_num1").hide();
        window.location.reload();//页面刷新
   });
}


//展示oem表单信息
function OemProduct(Id){
	$.getJSON({  
        type: "get",  
        url:" /order/detail?id="+Id,
        async: false, 
        cache:false,
        success: function(e) {
            console.log(e);
            if(e.code!=1){
                swal("暂无数据");
            }
            //加载OEM合同信息
            if(e.code==1){
                $.each(e.data, function(idx,obj){
                    drawProductTable(obj)
                });
            }  
        }  
    });
}


function drawProductTable(obj){
	var html;
    //判断产品总价
    html = '<div class="oem_detail_info">'+
        '<div class="col-md-2 col-sm-2 col-xs-2 product_no_info" style="padding:0;">'+obj.product_num+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 product_name_info" title="'+obj.product_name+'" style="padding:0;">'+obj.product_name+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 product_model_info" title="'+obj.product_type+'" style="padding:0;">'+obj.product_type+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 product_quantity_info" style="padding:0;">'+obj.product_quantity+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 product_sale" style="padding:0;">'+obj.sale+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 product_details_info" style="padding:0;">'+
            '<div class="product_oem" oem_product_id="'+obj.product_id+'" style="margin-top: 2px;">产品详情</div>'+
        '</div>'+
    '</div>';
    $(".oem_detail").append(html);
    Contract()
}

//合同详情的条件判断
function Contract(){
    $(".product_name_info").each(function(){
        var news_maxwidth=6;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });
    $(".product_model_info").each(function(){
        var news_maxwidth=6;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });

    //产品总价为空---表示
    $(".product_sale").each(function(){
        var sale = $(this).html();
        if(sale == "null"){
            $(this).html("---");
        }
    });
}

//OEM合同产品详情
function OemContractTable(ID){
	$.getJSON({
        type:"get",
        url:"/product/detail?id="+ID,
        success:function(result){
            //产品型号
           var html_product;
            html_product = '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_id+'</div>'+
                '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_name+'</div>'+
                '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_type+'</div>';
            $(".list_product").append(html_product);

            //产品pcb信息
            var html_pcb;
            html_pcb = '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_cmstart+'*'+result.oem_pcb_cmstop+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_layer+'</div></div></div></div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_thickness+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_spray+'</div>'+
                '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_pcb_solder+'</div>';
            $(".list_pcb").append(html_pcb);

            //下载按钮
            var html_downlod;
            html_downlod = '<a class="col-md-5 product_list" data-field="product_id" target="_blank" data-align="center" href="/product/down?path='+result.pcb_file+'" title="PCB下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;">PCB</a>'+
                '<a class="col-md-5 product_list" data-field="product_id" data-align="center" title="坐标文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;">坐标</a>'+
                '<a class="col-md-5 product_list" data-field="product_id" data-align="center" title="工艺文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;margin-top: 10px;">工艺</a>'+
                '<a class="col-md-5 product_list" data-field="product_id" data-align="center" href="/product/down?path='+result.bom_shopfile+'" title="BOM文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;margin-top: 10px;">BOM</a>';   
            $(".list_downlod").append(html_downlod);

            //产品pcba清单
           var html_pcba;
            html_pcba = '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_process+'</div>'+
                '<div class="col-md-1 product_list" data-field="product_id" data-align="center">'+result.pcba_smt_type+'</div></div></div></div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_smt_joints+'</div>'+
                '<div class="col-md-1 product_list" data-field="product_id" data-align="center">'+result.pcba_dip_type+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_dip_joints+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_stencil+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_stencil_num+'</div>';
            $(".list_pcba").append(html_pcba);

            //测试组装
            var html_text;

            html_text = '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.oem_test_time+'</div>'+
                '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.oem_prevent_cm2+'</div>'+
                '<div class="col-md-4 product_list" id="product_smark" data-field="product_id" data-align="center" title="'+result.oem_remark+'">'+
                    '<span class="remark" id="chuang_news">'+result.oem_remark+'</span>'+
                '</div>';
            $(".list_testing").append(html_text);
            $(".remark").each(function(){
                var maxwidth=2;
                if($(this).text().length>maxwidth){
                    $(this).text($(this).text().substring(0,maxwidth));
                    $(this).html($(this).html()+'…');
                }
            });

            //bom清单
            $.each(result.bom, function(idx,obj){
                var html_bom;
                html_bom ='<div class="bom_list_oem">'+ 
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.number+'</div>'+
                '<div class="col-md-2" data-field="product_id" data-align="center">'+obj.name+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.model_number+'</div>'+
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.encapsulation+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.accuracy+'</div>'+
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.brands+'</div>'+
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.bit_number+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.quantity+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.price+'</div>'+
                '<div class="col-md-2 oem_bom" data-field="product_id" data-align="center" title="'+obj.remark+'">'+obj.remark+'</div>'+
                '</div>';   
                $(".product_oem_bom").append(html_bom);
                $(".oem_bom").each(function(){
                    var maxwidth=2;
                    if($(this).text().length>maxwidth){
                        $(this).text($(this).text().substring(0,maxwidth));
                        $(this).html($(this).html()+'…');
                    }
                });
            });

            OemContractNull()
    	}
    });
}

//焊接合同的产品详情
function WeldProduct(ID){
    $.getJSON({
        type:"get",
        url:"/product/detail?id="+ID,
        success:function(result){
            //产品型号
           var html_product;
            html_product = '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_id+'</div>'+
                '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_name+'</div>'+
                '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_type+'</div>';
            $(".list_product").append(html_product);


            //下载按钮
            var html_downlod;
            html_downlod = '<a class="col-md-5 product_list" data-field="product_id" target="_blank"  data-align="center" href="/product/down?path='+result.pcb_file+'" title="PCB下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;">PCB</a>'+
                '<a class="col-md-5 product_list" data-field="product_id" data-align="center" title="坐标文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;">坐标</a>'+
                '<a class="col-md-5 product_list" data-field="product_id" data-align="center" title="工艺文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;margin-top: 10px;">工艺</a>'+
                '<a class="col-md-5 product_list" data-field="product_id" data-align="center" href="/product/down?path='+result.bom_shopfile+'" title="BOM文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;margin-top: 10px;">BOM</a>';   
            $(".list_downlod").append(html_downlod);

            //产品pcba清单
           var html_pcba;
            html_pcba = '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_process+'</div>'+
                '<div class="col-md-1 product_list" data-field="product_id" data-align="center">'+result.pcba_smt_type+'</div></div></div></div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_smt_joints+'</div>'+
                '<div class="col-md-1 product_list" data-field="product_id" data-align="center">'+result.pcba_dip_type+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_dip_joints+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_stencil+'</div>'+
                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+result.pcba_stencil_num+'</div>';
            $(".list_pcba").append(html_pcba);

            //测试组装
            var html_text;

            html_text = '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.oem_test_time+'</div>'+
                '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.oem_prevent_cm2+'</div>'+
                '<div class="col-md-4 product_list" id="product_smark" data-field="product_id" data-align="center" title="'+result.oem_remark+'">'+
                    '<span class="remark" id="chuang_news">'+result.oem_remark+'</span>'+
                '</div>';
            $(".list_testing").append(html_text);
            $(".remark").each(function(){
                var maxwidth=2;
                if($(this).text().length>maxwidth){
                    $(this).text($(this).text().substring(0,maxwidth));
                    $(this).html($(this).html()+'…');
                }
            });

            //bom清单
            $.each(result.bom, function(idx,obj){
                var html_bom;
                html_bom ='<div class="bom_list_oem">'+ 
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.number+'</div>'+
                '<div class="col-md-2" data-field="product_id" data-align="center">'+obj.name+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.model_number+'</div>'+
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.encapsulation+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.accuracy+'</div>'+
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.brands+'</div>'+
                '<div class="col-md-1" data-field="product_id" data-align="center">'+obj.bit_number+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.quantity+'</div>'+
                '<div class="col-md-1" data-field="product_time" data-align="center">'+obj.price+'</div>'+
                '<div class="col-md-2 oem_bom" data-field="product_id" data-align="center" title="'+obj.remark+'">'+obj.remark+'</div>'+
                '</div>';   
                $(".product_oem_bom").append(html_bom);
                $(".oem_bom").each(function(){
                    var maxwidth=2;
                    if($(this).text().length>maxwidth){
                        $(this).text($(this).text().substring(0,maxwidth));
                        $(this).html($(this).html()+'…');
                    }
                });
            });

            OemContractNull()
        }
    });
}



//总数为空
function OemContractNull(){
    $(".product_list").each(function(){
        var product_list = $(this).html();
        if(product_list == "null"){
            $(this).html("---");
        }
    });
}
