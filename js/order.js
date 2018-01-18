/*
*time 2017.10.28
*auth xiaominzhang
*订单管理
*/
$(function(){

  $(".data_oem_1").cxCalendar({
    baseClass: 'cxcalendar_holyday'
  });
  $(".data_oem_2").cxCalendar({
    baseClass: 'cxcalendar_holyday'
  });

	/*显示支付流程*/
	$(".order_flow").mouseover(function (){
		$(".order_flow").css("background","#03a9f4");
        $(".flow").show(); 
        $(".flow").mouseover(function(){
        	$(".flow").show();
        	$(".order_flow").css("background","#03a9f4"); 
        }).mouseout(function(){
        	$(".flow").hide();
        	$(".order_flow").css("background","#c7d1d4");
        });
    }).mouseout(function (){  
        $(".flow").hide();
        $(".order_flow").css("background","#c7d1d4");
   	}); 

   	//主页面展示
   	//默认显示OEM订单管理
   	$(".order_oem_menu").css("background","#03a9f4");
    //OEM订单信息展示

    //合同管理函数调用
    renderOemOrderTable()

    //获取OEM合同时间段查询
    $(".search_ome_btn").on('click',function(){
        renderOemOrderTable()
    });

    //确认订单
    $(".data_detail_oem").on('click','.user_determine',function(sweetalert){
        var oem_id= Number($(this).attr("oem_contract_id"));
        var determine = $(this).attr("user_determine_start");
        console.log(oem_id);

        if(determine == "0"){
            //数据交互
            OrderConfirmation(oem_id)
        }
    });

    //取消订单
    $(".data_detail_oem").on('click','.user_cancel',function(sweetalert){
        var oem_id= Number($(this).attr("oem_contract_id"));
        var determine = $(this).attr("user_determine_start");
        $(this).css("background","#bfbfbf");
        console.log(oem_id);
        if(determine == "0"){
          $(this).parent().parent().parent().remove();
            //数据交互
            OrderCancel(oem_id)
        }
    });

    //上传支付凭证
    $(".data_detail_oem").on('click','.payment_oem',function(sweetalert){
        //判断状态
        var determine = $(this).attr("user_determine_start");
        var oem_id= Number($(this).attr("oem_contract_id"));
        var payment_seq =$(this).attr("payment_seq");
        if(determine == "1"){
            var mode = $(this).attr("mode");
            var pay_type = $(this).attr("pay_type");
            if(payment_seq == 0){
              //未付款
                $(".overlay_num1").show();
                if(mode == 0){
                    //没有选择方式
                    $(".method").show();
                    var mode1 = 1;
                    //默认选择状态
                   $("#all_pay").prop("checked",true);
                    //之后上传支付凭证
                    $(".after").on('click',function(){
                        Mode_payment = PayMothod()
                        UploadPaymentLater(oem_id,Mode_payment)
                        window.location.reload();
                    });

                    //立即上传支付凭证
                    $(".now").on('click',function(){
                        $(".method").hide();
                        $(".up_img").hide();
                        Mode_payment = PayMothod()
                        UploadPaymentNow(oem_id,Mode_payment)
                        $(".credentials").show();
                    });
                }
                if(mode == 1){
                    //以选择方式
                    $(".up_img").hide();
                    $(".credentials").show();
                    $(".file").on('click',function(){
                        $(".file").empty();
                        $("#file").change(function(){
                            var objUrl = getObjectURL(this.files[0]) ;
                            console.log("objUrl = "+objUrl) ;
                            if (objUrl){
                                $(".img").attr("src", objUrl);
                                $(".img").removeClass("hide");
                                $(".up_img").show();
                                $(".text_info").hide();
                            }
                        }) ; 
                    });
                    
                    //取消上传凭证
                    CancalPayment()
                    
                    //上传支付凭证
                    $(".up_btn").on('click',function(){
                       UploadPayment(oem_id,"file","支付凭证","png,jpg,jpeg,jpe,gif")
                    }); 

                }
            }
            if(pay_type == 0 && mode == 1){
                //部分付款
                $(".overlay_num1").show();
                //以选择方式
                $(".up_img").hide();
                $(".credentials").show();
                $(".file").on('click',function(){
                    $(".file").empty();
                    $("#file").change(function(){
                        var objUrl = getObjectURL(this.files[0]) ;
                        console.log("objUrl = "+objUrl) ;
                        if (objUrl) {
                            $(".img").attr("src", objUrl);
                            $(".img").removeClass("hide");
                            $(".up_img").show();
                            $(".text_info").hide();
                        }
                        //建立一個可存取到該file的url
                      //  getObjectURL2(file);
                    }) ; 
                });

                //取消上传凭证
                CancalPayment()
               
                //上传支付凭证
                $(".up_btn").on('click',function(){
                    var file = $("#file").val();
                    console.log(file);
                    if(file == ""){
                        $(".text_info").show();
                        return false;
                    }
                    UploadPayment(oem_id,"file","支付凭证","png,jpg,jpeg,jpe,gif");
                }); 
            }
        }else{
            $(this).attr({"disabled":"disabled"});
        }
    });

    //查看OEM合同下的产品信息
    $(".data_detail_oem").on('click','.conteact_oem',function(){
        var oem_id= $(this).attr("oem_contract_id");
        console.log(oem_id);

        $(".overlay_num1").show();
        $(".oem_contract_all_praduct").show();
        $(".cental_pro").on('click',function(){
            $(".overlay_num1").hide();
            $(".oem_contract_all_praduct").hide();
             window.location.reload();
        });
        //展示OEM合同产品详情
        OemProduct(oem_id)
    });

    //查看合同下产品的详细信息
    $(".oem_detail").on('click','.product_oem',function(){
        //清空数据
        $(".list_product").empty();
        $(".list_pcb").empty();
        $(".list_pcba").empty();
        $(".list_testing").empty();
        $(".product_oem_bom").empty();
        //展示弹出信息
        $(".overlay_tow").show();
        $(".orders_details_oem").show();
        $(".cental_oem").on('click',function(){
            $(".list_product").empty();
            $(".list_pcb").empty();
            $(".list_pcba").empty();
            $(".list_testing").empty();
            $(".product_oem_bom").empty();
            $(".overlay_tow").hide();
            $(".orders_details_oem").hide();
        });
        var product_id= $(this).attr("oem_product_id");
        console.log(product_id);
        OemContractTable(product_id)
    });
    //OEM合同模块结束
});
