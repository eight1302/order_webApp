/*
*time 2017.10.28
*auth xiaominzhang
*订单管理
*/


  //展示表单信息
function renderweldOrderTable(){
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
    data_time['type']="焊接"
    $(".data_detail_weld").html('');
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
                    drawTableWeldOrder(obj)
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
                    paginationWeld(n,e.data);     
                }
            });
        },
        error:function(result,sweetalert){
            swal("暂无数据2！");
        }
    });
}

//表单数据
function drawTableWeldOrder(obj){
   var html = '<div class="weld_data_detail">'+
    '<div class="contract_no">'+obj.contract_no+'</div>'+
    '<div class="data_order">'+obj.data_order+'</div>'+
    '<div class="data_play">'+obj.data_play+'</div>'+
    '<div class="product_quantity">'+obj.product_quantity+'</div>'+
    '<div class="tax">'+obj.tax+'</div>'+
    '<div class="clients_confirmation">'+
    '<div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0;">'+
        '<div class="col-md-6 col-sm-6 col-xs-6 user_determine" style="padding: 0;" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'">'+
            '<span class="icon-ok-circle" style="font-size:18px;line-height: 25px;" title="确认"></span>'+
        '</div>'+
        '<div class="col-md-6 col-sm-6 col-xs-6 user_cancel" style="padding: 0;" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'">'+
            '<span class="icon-remove" style="font-size:18px;line-height: 25px;" title="取消"></span>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="order_status">'+obj.order_status+'</div>'+
        '<div class="full_payment_rate">'+obj.full_payment_rate+'</div>'+
        '<div class="down_payment">'+obj.down_payment+'</div>'+
        '<div class="payment_status">'+obj.payment_status+'</div>'+
        '<div class="upload_payment">'+
            '<div class="payment_weld" pay_type="'+obj.pay_type+'" payment_seq="'+obj.payment_seq+'" mode="'+obj.mode+'" user_determine_start="'+obj.determine+'" weld_contract_id="'+obj.id+'"> <span class=" icon-money" style="font-size:20px;line-height: 20px;" title="上传支付凭证"</span></div>'+
       '</div>'+
    '<div class="contract_details" product_id="'+obj.id+'">'+
            '<div class="contract_weld" weld_contract_id="'+obj.id+'">合同详情</div>'+
        '</div>'+
    '</div>';
    $(".data_detail_weld").append(html);
    OrderPalyData();  
}

//页数控制
function paginationWeld(num,list){
    $(".data_detail_weld").html('');
    $.each(list, function(idx,obj){
        if(idx>=((num-1)*pagesize) && idx<(num*pagesize)){
            drawTableWeldOrder(obj);
        }
    });
}



$(function(){
    $(".data_weld_1").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    $(".data_weld_2").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    //加载支付流程信息
    $.getJSON({  
        type: "get",  
        url:"../../json/flow.json",  
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(status) {
            console.log(status); 
            if(status.data.state==200){
              /*加载预付款流程信息*/
                //焊接流程提示
                $.each(status.data.timeline_red_weld, function(idx,obj){
                    var timeline_red_weld;
                    timeline_red_weld='<div class="tow">'+
                              '<div class="round_red">'+
                                '<span>'+obj.num+'</span>'+
                              '</div>'+
                              '<span>'+obj.title+'</span>'+
                            '</div>';
                    $(".red_detail_weld").append(timeline_red_weld);
                }); 
                /*加载定金尾款流程信息*/
                $.each(status.data.timeline_green_weld, function(idx,obj){
                    var timeline_green_weld;
                    timeline_green_weld='<div class="tow">'+
                              '<div class="round_green">'+
                                '<span>'+obj.num+'</span>'+
                              '</div>'+
                              '<span>'+obj.title+'</span>'+
                            '</div>';
                    $(".green_detail_weld").append(timeline_green_weld);
                }); 
            }
        }  
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

    //默认显示OEM订单管理
    $(".order_weld_menu").css("background","#03a9f4");

    //加载焊接订单信息
    renderweldOrderTable()

   //获取焊接订单时间段查询
    $(".search_weld_btn").on('click',function(){
        renderweldOrderTable()
    });
 
    //确认订单
    $(".data_detail_weld").on('click','.user_determine',function(sweetalert){
        var weld_id= $(this).attr("weld_contract_id");
        var determine = $(this).attr("user_determine_start");
        console.log(weld_id);
        if(determine == "0"){
            //数据交互
            OrderConfirmation(weld_id)
        }
    });

    //取消订单
    $(".data_detail_weld").on('click','.user_cancel',function(sweetalert){
        var weld_id= $(this).attr("weld_contract_id");
        var determine = $(this).attr("user_determine_start");
        $(this).css("background","#bfbfbf");
        console.log(weld_id);
        if(determine == "0"){
           $(this).parent().parent().parent().remove();
            //数据交互
            OrderCancel(weld_id)
        }
    });
       //上传支付凭证
    $(".data_detail_weld").on('click','.payment_weld',function(){
        //判断状态
        var determine = $(this).attr("user_determine_start");
        var weld_id= $(this).attr("weld_contract_id");
        var payment_seq =$(this).attr("payment_seq");
        if(determine == "1"){
            var mode = $(this).attr("mode");
            var pay_type = $(this).attr("pay_type");
            if(payment_seq == 0){
              //未付款
                $(".overlay_num1").show();
                if(mode == 0){
                    //没有选择方式
                    $(".method_weld").show();
                    var method = 1;
                     //默认选择状态
                    $("#all_pay").prop("checked",true);
                    //之后上传支付凭证
                    $(".after_weld").on('click',function(){
                        //支付方式判断
                        Mode_payment = PayMothod()
                        UploadPaymentLater(weld_id,Mode_payment)
                        window.location.reload();

                    });

                    //立即上传支付凭证
                    $(".now_weld").on('click',function(){
                        $(".method_weld").hide();
                        $(".up_img").hide();
                        Mode_payment = PayMothod()
                        UploadPaymentNow(weld_id,Mode_payment)
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
                        UploadPayment(weld_id,"file","支付凭证","png,jpg,jpeg,jpe,gif")
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
                    UploadPayment(weld_id,"file","支付凭证","png,jpg,jpeg,jpe,gif");
                }); 
            }
        }else{
            $(this).attr({"disabled":"disabled"});
        }
    });


    //查看焊接合同下的产品信息
    $(".data_detail_weld").on('click','.contract_weld',function(){
        var Id= $(this).attr("weld_contract_id");
        $(".overlay_num1").show();
        $(".weld_contract_all_praduct").show();
        $(".cental_pro").on('click',function(){
            $(".overlay_num1").hide();
            $(".weld_contract_all_praduct").hide();
             window.location.reload();
        });
        //展示焊接合同产品详情
        OemProduct(Id)
    });

    //查看本合同下本产品的详细信息
    $(".oem_detail").on('click','.product_oem',function(){
        $(".list_product").empty();
        $(".list_pcb").empty();
        $(".list_pcba").empty();
        $(".list_testing").empty();
        $(".product_bom").empty();
        $(".overlay_tow_one").show();
        $(".orders_details_weld").show();
        $(".cental_oem").on('click',function(){
            $(".list_product").empty();
            $(".list_pcb").empty();
            $(".list_pcba").empty();
            $(".list_testing").empty();
            $(".product_bom").empty();
            $(".overlay_tow_one").hide();
            $(".orders_details_weld").hide();
        });
        var product_id= $(this).attr("oem_product_id");
        WeldProduct(product_id)
        //获取产品信息
    });
    //焊接模块结束
});
