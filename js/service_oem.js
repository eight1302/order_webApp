 //订单管理路由跳转结束
     //获取当前时间
    var myDate = new Date();
    var year=myDate.getFullYear();   //获取当前年
    var month=myDate.getMonth()+1;   //获取当前月
    var date=myDate.getDate();       //获取当前日
    var now_time=year+'.'+month+"."+date;

//展示选择地址
function showAddr(){
	$(".user_ares").html('')
	 $.ajax({  
         type: "get",  
         url:"/user/info",
         contentType: 'application/json',
         async: false, 
         cache:false,
         error: function(status) { 
                 swal({
                     title: "暂务数据!",
                     type: "error",
                     timer: 5000,
                     showConfirmButton: false,
                     sleep : 20000
                 });  
         },  
         success: function(status) {
            console.log(status);
            $(".user_ares").empty();
             if(status.code==1){
                $.each(status.data.person_address, function(idx,obj){
                     var html;
                     html = '<div class="delivery_all">'+
                             '<div class="col-md-1 product_list" data-field="state" data-checkbox="true" style="margin: 0;padding: 0;">'+
                                 '<input type="radio" name="delivery"  value="'+obj.id+'" />'+
                             '</div>' +
                             '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+obj.name+'</div>'+
                             '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+obj.phone+'</div>'+
                             '<div class="col-md-7 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;" style="overflow: hidden;">'+obj.encapsulation+'</div>'+
                         '</div>'
                     $(".user_ares").append(html);
                 }); 

             }
         }  
     }); 
}

function renderOemTable(){
	var data1 = $("#data1").val(),
    data2 = $("#data2").val();
	var data_time ={}
	if(data1!=null && data1.length>0){
		data_time = {
			    "data1" : data1,
			    "data2" : data2
			}
	}
	data_time['product_class_type']="OEM"
	 $(".page_list_oem").html('');
	$.ajax({
        url:"/product/list",
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
        			   drawTableOem(obj)
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
               
               $(".product_btn").each(function(){
                   var product_stat = $(this).attr("product_stat");
                   if(product_stat == "1"){
                       $(this).attr({"disabled":"disabled"});
                       $(this).css("background","#bfbfbf");
                   }
               });
        },
        error:function(result,sweetalert){
            swal("暂无数据2！");
         }
	})
}

function drawTableOem(obj){
	 var html = '<div class="product_all">'+
        '<div class="product_num pad_one">'+'<input type="checkbox" name="sign" style="width: 15px;height: 15px;" value="'+obj.id+'" />'+'</div>'+
        '<div class=" product_id pad_one">'+obj.product_id+'</div>'+
        '<div class="product_time pad_one">'+obj.product_time+'</div>'+
        '<div class="product_name pad_one">'+obj.product_name+'</div>'+
        '<div class="product_type pad_one">'+obj.product_type+'</div>'+
        '<div class="product_list pad_one" name="sign" id="product_type" value="'+obj.product_class_type+'">'+obj.product_class_type+'</div>'+
        '<div class="product_list pad_one">'+
            '<div class="product_btn" product_stat="'+obj.product_stat+'" id="'+obj.id+'">选择</div>'+
        '</div>'+
        '<div class="product_details_oem pad_one" product_id="'+obj.id+'">查看详情</div>';
    $(".page_list_oem").append(html);
    DataTime()
}

//产品下单日期
function DataTime(){
    $(".product_time").each(function(){
         var dataTime = $(this).html();
        $(this).html(dataTime.substr(0,10));
    });
}


function paginationOem(num,list){
	 $(".page_list_oem").html('');
	 $.each(list, function(idx,obj){
		 if(idx>=((num-1)*pagesize) && idx<(num*pagesize)){
			 drawTableOem(obj)
		  }
  });
}

function addOrUpdOem(oriId){
	   var  oem_product_name = $("#oem_product_name").val(),
       oem_product_type = $("#oem_product_type").val(),
       oem_pcb_cmstart = $("#oem_pcb_cmstart").val(),
       oem_pcb_cmstop = $("#oem_pcb_cmstop").val(),
       oem_pcb_layer = $("#oem_pcb_layer").children('option:selected').val(),
       oem_pcb_thickness = $("#oem_pcb_thickness").children('option:selected').val(),
       oem_pcb_spray = $("#oem_pcb_spray").children('option:selected').val(),
       oem_pcb_solder = $("#oem_pcb_solder").children('option:selected').val(),
       oem_pcba_process = $("#oem_pcba_process").val(),
       oem_pcba_smt_type = $("#oem_pcba_smt_type").val(),
       oem_pcba_smt_joints = $("#oem_pcba_smt_joints").val(),
       oem_pcba_dip_type = $("#oem_pcba_dip_type").val(),
       oem_pcba_dip_joints = $("#oem_pcba_dip_joints").val(),
       oem_pcba_stencil = $("#oem_pcba_stencil").children('option:selected').val(),
       oem_pcba_stencil_num = $("#oem_pcba_stencil_num").val(),
       oem_test_time = $("#oem_test_time").val(),
       oem_prevent_cm2 = $("#oem_prevent_cm2").val(),
       oem_remark = $("#oem_remark").val(),
       product_class_type = $("#product_class_type").val();
	   
	   //判断OEM信息不能为空的选项信息
       if(oem_product_name=='' || oem_pcba_process=='' || oem_pcba_smt_type=='' || oem_pcba_dip_type==''){
           swal("信息不能为空!");
           return false;
       }
       //判断产品编号以及钢网编号
       if(oem_product_type=='' || (/[\u4e00-\u9fa5]/.test(oem_product_type))){
           swal("产品型号不能为空、汉字或全角符号！");
           return false;
       }
       if(oem_pcba_stencil_num!=''){
           if((/[\u4e00-\u9fa5]/.test(oem_pcba_stencil_num))){
               swal("钢网编号不能为汉字或全角符号！");
               return false;
           }
       }
       //oem产品尺寸判断
        if(!(/[0-9]/.test(oem_pcb_cmstart)) || !(/[0-9]/.test(oem_pcb_cmstop))){
           swal("PCB尺寸必须是数字!");
           return false;
       }
       //判断焊接点数、种类、组装时间
       if(!(/[0-9]/.test(oem_pcba_smt_joints)) || !(/[0-9]/.test(oem_pcba_dip_joints)) || !(/[0-9]/.test(oem_pcba_smt_type)) || !(/[0-9]/.test(oem_pcba_dip_type))){
            swal("SMT和DIP的种类、焊接点数必须是数字!");
           return false;
       }
        if(oem_test_time!=''){
           if(!(/[0-9]/.test(oem_test_time))){
               swal("测试组装时间必须是数字!");
               return false;
          }
       }
        if(oem_prevent_cm2!=''){
           if(!(/[0-9]/.test(oem_prevent_cm2))){
               swal("喷涂三防必须是数字!");
               return false;
           }
       }
           //数据库json格式
       var oem_data = {
           "oem_product_name" : oem_product_name,
           "oem_product_type" : oem_product_type,
           "oem_pcb_cmstart" : oem_pcb_cmstart,
           "oem_pcb_cmstop" : oem_pcb_cmstop,
           "oem_pcb_layer" : oem_pcb_layer,
           "oem_pcb_thickness" : oem_pcb_thickness,
           "oem_pcb_spray" : oem_pcb_spray,
           "oem_pcb_solder" : oem_pcb_solder,
           "oem_pcba_process" : oem_pcba_process,
           "oem_pcba_smt_type" : oem_pcba_smt_type,
           "oem_pcba_smt_joints" : oem_pcba_smt_joints,
           "oem_pcba_dip_type" : oem_pcba_dip_type,
           "oem_pcba_dip_joints" : oem_pcba_dip_joints,
           "oem_pcba_stencil" : oem_pcba_stencil,
           "oem_pcba_stencil_num" : oem_pcba_stencil_num,
           "oem_test_time" : oem_test_time,
           "oem_prevent_cm2" : oem_prevent_cm2,
           "oem_remark" : oem_remark,
          "product_class_type" : product_class_type,
           "now_time":now_time
       };
       if(oriId){
    	   oem_data['id']=oriId;
       }
       //数据库交互
       $.ajax({  
           type: "post",  
           contentType: 'application/json',
           data:JSON.stringify(oem_data),// 序列化表单值  
           url:"/product/save",  
           async: false, 
           cache:false,
           dataType:"json", 
           error: function(status) { 
               console.log(status); 
               if(status.code==0){
                   swal({
                       title: "添加失败!",
                   });  
               }
           },  
           success: function(status) {
               console.log(status); 
               if(status.code==1){
                   swal({
                       title: "添加成功",
                       text:"点击OK，进行下一步上传文件操作"
                   },function(){
                       $(".overlay_uplod").show();
                       $(".file_uplod").show();
                       var id = status.data;
                       console.log(id);
                       //上传pcb文件
                       $(".add_pcb").on('click',function(sweetalert){
                       	uploadFile(id,"oem_pcb_file","PCB",'pcb_file',"progress_pcb","time1","prog","rar,zip,tar,gzip,jar")
                       });

                       //上传BOM的excel文件
                       $(".add_bom").on('click',function(){
                       	uploadFile(id,"oem_bom_shopfile","BOM",'bom_shopfile',"progress_bom","time2","prog_bom","xlsx,xls")
                       });

                       //上传工艺文件
                       $(".add_process").on('click',function(){
                       	uploadFile(id,"oem_process_file","工艺",'coordinate_file',"progress_process","time3","prog_process","rar,zip,tar,gzip,jar")
                       });

                       //上传坐标文件
                       $(".add_coordinate").on('click',function(){
                       	uploadFile(id,"oem_coordinate_file","坐标",'process_file',"progress_coordinate","time4","prog_coordinate","rar,zip,tar,gzip,jar")
                       });

                       //点击完成按钮
                       $(".complete").on('click',function(){
                           window.location.reload();
                       });
                   });  
               }
           }  
       }); 
}

// 上传文件
function uploadFile(id,fileId,ftype,stype,processclass,time,prog,types){
	  var oem_pcb_file = $("#"+fileId).val();
      if(oem_pcb_file==''){
          swal(ftype+"文件不能为空!");
          return false;
      }else{
    	  var fileTypes = types.split(",");
         // var fileTypes = new Array("rar","zip","tar","gzip","jar");
			// //定义可支持的文件类型数组
          var oem_pcb="0";
          var newFileName = oem_pcb_file.split('.');
          newFileName = newFileName[newFileName.length-1];
          for(var i=0;i<fileTypes.length;i++){
              if(fileTypes[i] == newFileName){
              　									　oem_pcb = "1";
              }
          }
          if(oem_pcb == "0"){
              swal(ftype+"文件必须是"+types);
              return false;
          }
      }   
  	var fd = new FormData();
      fd.append("file", $("#"+fileId).get(0).files[0]);

      $.getJSON({  
          type:"post",
    	    data:fd,// 序列化表单值
          url:"/product/upload?id="+id+"&type="+stype,  
          async: false, 
          cache:false,
          processData: false,
          contentType: false, 
          success: function(status) { 
              console.log(status);
              if(status.code==1){
                  $("."+processclass).show();
                  var timer=5;
                  var countdown = setInterval(CountDown,1000);
                  function CountDown(){
                      $("."+time).html("正在上传，请稍等,倒计时"+timer+"s");
                      if(timer==0){
                          $("."+time).html("上传"+ftype+"文件成功").css({"font-size":"18px","color":"#00ff45"});
                          $("."+prog).hide();
                          clearInterval(countdown);
                      }
                      timer--;
                  }    
              }
              if(status.code!=1){
            	  $("."+processclass).show();
                  var timer=5;
                  var countdown = setInterval(CountDown,1000);
                  function CountDown(){
                      $(".time1").html("正在上传，请稍等,倒计时"+timer+"s");
                      if(timer==0){
                          swal("上传"+ftype+"文件失败，请重新上传");
                          $("."+processclass).hide();
                          clearInterval(countdown);
                      }
                      timer--;
                  }    
              }
          },
      });
}


//弹出快递
$(function(){
//弹出快递
$(".add_delivery").on('click',function(){
    $(".overlay_tow").show();
    $(".delivery").show();
    $(".insert_delivery").on('click',function(){
        var delivery=$("#delivery").val();
        $(".overlay_tow").hide();
        $(".delivery").hide();
         //清除数据
        $(".express_y").empty();
        $(".express_way").append('<span class="express_y">'+delivery+'</span>');
    });
});

$(".add_button").on('click',function(){
    $(".adress_information").toggle(10);
});
var userId;
$(".user_ares").on('click',"input[name='delivery']",function(){
  userId=$(this).val();
})
//弹出地址
$(".add_adres").on('click',function(){
    $(".overlay_tow").show();
    $(".addres").show();
    //获取地址信息
    showAddr();
     //添加地址到下单也页面中
   $(".insert_address").on('click',function(sweetalert){
        //隐藏弹出层
        $(".overlay_tow").hide();
        $(".addres").hide();
        //添加用户数据
        if(userId){
            $.getJSON({  
                 type: "get",  
                 url:"/user/editAddr?id="+userId,  
                 async: false, 
                 cache:false,
                 success: function(status) {
                    console.log(status);
                    $(".user_ares").empty();
                     if(status.code==1){
                         $(".express_n").empty();
                         $(".express_p").empty();
                         $(".express_a").empty();
                         $(".express_s").find("p").empty();
                         $(".express_name").append('<span class="express_n">'+status.data.name+'</span>');
                         $(".express_phone").append('<span class="express_p">'+status.data.phone+'</span>');
                         $(".express_address").append('<span class="express_a">'+status.data.encapsulation+'</span>');
                         $(".express_s").find("p").append('<input type="text" id="express_s" value="'+status.data.id+'" style="display:none;">');
                     }
                 }  
             }); 
        }
    });
});

//添加新地址
$(".appent_address").on('click',function(){
     var province = $("#province").val(),
         city = $("#city").val(),
         district =$("#district").val(),
         name = $("#name").val(),
         contact = $("#contact").val(),
         text_detail  = $("#text_detail").val(),
         address=province+" "+city+" "+district+" "+text_detail,
         address1=province+" "+city+" "+district;

         var data1 = {
          "name" : name,
          "phone" : contact,
          "province" : province,
          "city" : city,
          "district" : district,
          "encapsulation" : text_detail
        }

     if(name==""){
         swal("联系人不能为空!");
         return false;
     }
     if(contact=="" || !(/^1[34578]\d{9}$/.test(contact))){
         swal("请填写手机号且注意格式！");
     }    
     if(text_detail.length<=2){
          swal("详细地址不能小于2字!");
         return false;
     }
     var randId=Math.round(Math.random()*100000);
     var html;
     html = '<div class="delivery_all" style="overflow: hidden;">'+
         '<div class="col-md-1 product_list" data-field="state" data-checkbox="true" style="margin: 0;padding: 0;">'+
             '<input type="radio" name="delivery" id="'+randId+'" value="" />'+
         '</div>' +
         '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+name+'</div>'+
         '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+contact+'</div>'+
         '<div class="col-md-7 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;" style="overflow: hidden;">'+address+'</div>'+
     '</div>'
     $(".user_ares").append(html);

     //将信息添加到相应的页面中
     $.getJSON({  
         type: "post",  
         url:"/user/address",
         contentType: 'application/json',
        data:JSON.stringify(data1),// 序列化表单值  
         async: false, 
         cache:false,
         dataType:"json", 
         success: function(status) {
             if(status.code==1){
              $('#'+randId).val(status.data.id)
                 //$(".addres").hide();
                // $(".overlay_tow").hide(); 
             } 
         }  
     }); 
 });
});


function genOrder(typess){


    //需下单种类的数数组
    var product_order_ids = [];
    var productList=[];
    var order={};
    var product = $("input[name='product_order_id']");
    order["product_quantity"]=0;
    order["type"]=typess;
    $.each(product,function(key,obj){
        if(obj){
            var id = Number(obj.value);
            //product_order_ids.push(id);
            var pro={};
            pro["product_id"]=id;
            pro["product_quantity"]= $(this).parent().parent().find('.production_num').val();
            pro["remark"]= $(this).parent().parent().find('.text_info').val();
            productList.push(pro)
            order["product_quantity"]+= Number(pro["product_quantity"]);
        }
    });
    order['productList']=productList;

    //拼成json数据 需下单种类的数数组
    var product_order_id = {
        "product_order_ids" : product_order_ids
    };

    //产品下单发货地址
    var delivery_ids=$("#express_s").val();
    if(delivery_ids==""){
        swal("请选择发货地址");
        return false;
    }

    //拼成json数据 产品下单发货地址
    var delivery_id = {
        "delivery_ids" : delivery_ids
    };

    //下单个产品生产总数
    var production_nums = [];
    var num = $("input[name='production_num']");
     $.each(num,function(key,obj){
        if(obj){
            var production_num = Number(obj.value);
            production_nums.push(production_num); 
        }
    });

    //获取是否含税信息
    var order_tax = $("#order_tax").val();
    if(order_tax == "" || order_tax == "-1"){
        swal("请选择是否含税");
        return false;
    }
    order['tax']=order_tax;

    for(var i=0;i<production_nums.length;i++){
        if(production_nums[i]=="" || !(/[0-9]/.test(production_nums[i]))){
            swal("生产总数不能为零且必须是数字！");
            return false;
        }
    }
    //拼成json数据 下单个产品生产总数
    var production_num = {
        "production_nums" : production_nums
    };

    //快递方式
    var  express_address = $(".express_y").text();
    if(express_address==""){
        swal("快递不能为空");
        return false;
    }
    
    order['delivery_id']=$("#express_s").val();
    order['express_type']= $(".express_y").text();

    //拼成json数据 快递方式
    var express_addres = {
        "express_address" : express_address
    };

    //获取产品备注信息
    var text_infos = [];
    var express_info = $("textarea[name='text_info']");
     $.each(express_info,function(key,obj){
        if(obj){
            var express_address_info = obj.value;
            text_infos.push(express_address_info);
        }
    });

    //拼成json数据 快获取产品备注信息
    var text_info = {
        "text_infos" : text_infos
    };

    
    //销售审核接口
   $.ajax({  
        type: "post",  
        async: false, 
        url:"/product/order",
        contentType: 'application/json',
        data:JSON.stringify(order),// 序列化表单值  
        cache:false,
        dataType:"json", 
        success: function(status) {
            if(status.code==1){
                $(".shop_orders").hide();
                $(".overflow_three1").hide();
                 window.location.reload();
            }else{
                swal("下单失败");
            } 
        }  
    }); 
}

 
 function orderPro(productIds){
  //加载弹出遮盖层
     swal.close();
     $(".overflow_three1").show();
     $(".shop_orders").show();
     $(".cental_pro").on('click',function(){
         window.location.reload();
     });

     //展示产品信息列表开始
     $.getJSON({  
             type: "get",  
             url:"/product/order?ids="+productIds,  
             async: false, 
             cache:false,
             error: function(status) { 
                 console.log(status); 
                     swal({
                         title: "暂务数据!",
                         type: "error",
                         timer: 5000,
                         showConfirmButton: false,
                         sleep : 20000
                     });  
             },  
             success: function(status) {
                console.log(status);
                $(".user_ares").empty();
                    $.each(status.data, function(idx,obj){
                         var order_info_html;
                         order_info_html='<div class="order_info" style="margin-top: 15px;background: #fff;">'+
                             '<div class="order_shop" style="height: 50px;"><!--weld bom信息TUDO-->'+
                                 ' <div class="depart_info">'+
                                    '<div class="pro_da" style="margin-left: 20px;margin-top:5px;width:6%;float:left;margin-top: 12px;">'+
                                      '<span class="whpro_name" style="line-height: 25px;margin-top:5px;">产品：'+obj.product_name+'</span>'+
                                      '<input type="text" name="product_order_id"  value="'+obj.id+'" style="display:none;">'+
                                     '</div>'+
                                     '<span class="" style="margin: 0;padding: 0;line-height: 50px;width:10%;float:left;">产品编号：'+obj.product_id+'</span>'+
                                     '<span class="" style="margin: 0;padding: 0;line-height: 50px;width:10%;float:left;">产品名称：'+obj.product_name+'</span>'+
                                     '<span class="" style="margin: 0;padding: 0;line-height: 50px;width:10%;float:left;">产品型号：'+obj.product_type+'</span>'+
                                     '<span class="" style="margin: 0;padding: 0;line-height: 50px;width:10%;float:left;">'+
                                         '<span  style="color: red;">*</span>生产总数：'+
                                         '<input type="text" class="production_num" name="production_num" style="width: 80px;height: 25px;">'+
                                     '</span>'+
                                     '<div class="" style="margin: 0;padding: 0;width:52%;float:left;">'+
                                         '<span style="color:red;line-height: 49px;width:35%;">备注：</span>'+
                                         '<input class="text text_info" name="text_info" id="text" value="" style="    width: 94%;height: 25px;resize: none;margin: 0;padding: 0;margin-top: 13px; margin-left: -35px; overflow-y: visible;float: right;" placeholder="如果此产品发送地址不同，填写详细的联系人、电话、公司地址、发货数量、发货方式，用分号隔开">'+
                                     '</div>'+
                                 '</div>'+
                             '</div>'+
                         '</div>';
                        $(".order_list").append(order_info_html);
                     }); 
             }  
         }); 
     //展示产品信息列表结束
 }