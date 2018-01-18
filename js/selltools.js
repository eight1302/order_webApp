
function renderOemOrderTable(){
    //判断展示的合同类型
    $(".contracts").html('');
    $.ajax({
        type: "get",  
        url:"../../json/oem_menu.json",  
        cache:false, 
        contentType: 'application/json',
        dataType:"json",
        data:JSON.stringify({}),
        success:function(e){
            if(e.data.length==0){
                swal("暂无数据4！");
                return;
            }
           $.each(e.data, function(idx,obj){
               if(idx<pagesize){
                   drawTableSaleOrder(obj)
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

//页数控制
function paginationOem(num,list){
    $(".contracts").html('');
    $.each(list, function(idx,obj){
        if(idx>=((num-1)*pagesize) && idx<(num*pagesize)){
            drawTableSaleOrder(obj);
        }
    });
}

//返修合同中的产品列表
function ProductList(data){
    $.getJSON({  
        type: "get",  
        url:"../../json/oem_menu_data.json",
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(e) {
            console.log(e); 
            if(e.code==1){
                /*加载预付款流程信息*/
                $.each(e.data, function(idx,obj){
                    RepairList(obj)
                }); 
            }
        }  
    });
}

//产品列表数据
function RepairList(obj){
    var product;
        product = '<div class="products_destrion">'+
        '<div class="no"><input type="checkbox" id="no" name="signs" value='+obj.id+'></div>'+
        '<div class="number">'+obj.product_num+'</div>'+
        '<div class="name1">'+obj.product_name+'</div>'+
        '<div class="type">'+obj.product_type+'</div>'+
        '<div class="quantity">'+obj.product_quantity+'</div>'+
        '<div class="re_quantity"><input type="text" name="repair" id="repair_question" value="" style="height: 24px;width: 30%;border-radius: 10px;"></div>'+
        '<div class="up">'+
            '<div class="up_btn" product_id="'+obj.id+'" style="width: 80%;height: 20px;background: #3296ec;margin-top: 6px;line-height: 20px;border-radius: 15px;color: #fff;cursor: pointer;">上传</div>'+
        '</div>'+
    '</div>';
    $(".products_info").append(product);
}


//oem返修信息
function renderOemSaleTable(data){
     $(".contracts").html('');
    $.ajax({
        type: "post",  
        url:"/repair/items?type="+data, 
        async: false, 
        cache:false,
        dataType:"json",
        data:JSON.stringify({}),
        success:function(e){
            if(e.data.length==0){
                swal("暂无数据4！");
                return;
            }
           $.each(e.data, function(idx,obj){
               if(idx<pagesize){
                   drawTableSeal(obj)
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
                    paginationSeal(n,e.data);     
                }
            });
        },
        error:function(result,sweetalert){
            swal("暂无数据2！");
        }
    });
}

//合同号查询
function renderOemSaleNumTable(data,Num){
     $(".oem_contracts").html('');
    $.ajax({
        type: "post",  
        url:"/repair/items?type="+data+"&conno="+Num, 
        async: false, 
        cache:false,
        dataType:"json",
        data:JSON.stringify({}),
        success:function(e){
            if(e.data.length==0){
                swal("暂无数据4！");
                return;
            }
           $.each(e.data, function(idx,obj){
               if(idx<pagesize){
                   drawTableSeal(obj)
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
                    paginationSeal(n,e.data);     
                }
            });
        },
        error:function(result,sweetalert){
            swal("暂无数据2！");
        }
    });
}

function drawTableSeal(obj){
    var html;
    html = '<div class="contract_product">'+
        '<div class="col-md-2 col-sm-2 col-xs-2 contract_no pad_one">'+obj.contract_no+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 contract_data pad_one">'+obj.contract_data+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 product_quantity pad_one">'+obj.product_quantity+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 contract_state pad_one">'+obj.repair_state+'</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 logistics pad_one">'+
            '<div class="log_info" product_id="'+obj.id+'">填写</div>'+
        '</div>'+
        '<div class="col-md-2 col-sm-2 col-xs-2 selcet_pro pad_one">'+
            '<div class="selcet_detail" product_id="'+obj.id+'">查看详情</div>'+
        '</div>'+
    '</div>';
    $(".oem_contracts").append(html);
}

//页数控制
function paginationSeal(num,list){
    $(".oem_contracts").html('');
    $.each(list, function(idx,obj){
        if(idx>=((num-1)*pagesize) && idx<(num*pagesize)){
            drawTableSeal(obj);
        }
    });
}

//产品信息
function SealProduct(data){
    $.getJSON({  
        type: "get",  
        url:"/order/detail?id="+data,
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(e) {
            console.log(e); 
            if(e.code==1){
                /*加载预付款流程信息*/
                $(".product").empty();
                $.each(e.data, function(idx,obj){
                    SealTable(obj)
                }); 
            }
        }  
    });
}

//数据渲染
function SealTable(obj){
    var html;
    html = '<div class="contract_product">'+
    '<div class="col-md-2 col-sm-2 col-xs-2 product_no pad_one">'+obj.product_num+'</div>'+
    '<div class="col-md-2 col-sm-2 col-xs-2 product_name pad_one">'+obj.product_name+'</div>'+
    '<div class="col-md-2 col-sm-2 col-xs-2 product_model pad_one">'+obj.product_type+'</div>'+
    '<div class="col-md-2 col-sm-2 col-xs-2 product_type pad_one">OEM</div>'+
    '<div class="col-md-2 col-sm-2 col-xs-2product_quantity pad_one">'+obj.product_quantity+'</div>'+
    '<div class="col-md-2 col-sm-2 col-xs-2 product_pro pad_one">'+
        '<div class="question_detail" product_id="'+obj.id+'">问题描述</div>'+
    '</div>'+
    '</div>';
    $(".product").append(html);
}

//问题信息
function SealQuestion(data){
    $.getJSON({  
        type: "get",  
        url:"/repair/problem?id="+data,
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(e) {
            console.log(e); 
            if(e.code==1){
                /*加载预付款流程信息*/
                    $("#img_oem").attr("src", e.data.repair_url);
                    $("#textare_oem").html(e.data.product_question);
            }
        }  
    });
}

//判断快递选项
function Express(){
    $("#distribution").change(function(sweetalert){
        var distribution = $("#distribution").val();
        switch(distribution){
            case "0" :
            if(distribution = "0"){
                $("#delivery").val("");
                $("#delivery").attr("disabled",false);
                $("#con_on").val("");
                $("#con_on").attr("disabled",false); 
            }
        break;
        case "甲方配送" :
            if(distribution = "甲方配送"){
                $("#delivery").val("甲方配送");
                $("#delivery").attr("disabled","disabled"); 
                $("#con_on").val("甲方配送");
                $("#con_on").attr("disabled","disabled"); 
            }
        break;
        default :
            if(distribution = "0"){
                $("#delivery").val("");
                $("#delivery").attr("disabled",false);
                $(".sel_opt").attr("disabled","disabled");
                $("#con_on").val("");
                $("#con_on").attr("disabled",false);
            }
        }
    });
}

//提交快递数据信息
function ExpressData(data){
    $.getJSON({  
        type: "post",  
        url: "/repair/delivery",
        contentType: 'application/json',
        data:JSON.stringify(data),
        async: false, 
        cache:false,
        dataType:"json",
        
        success: function(e) {
            console.log(status); 
            if(e.code==1){
                swal({
                    title: "提交成功", 
                    timer: 1500, 
                    showConfirmButton: false 
                },function(){
                    window.location.reload();
                    $(".product_repair").hide();
                    $(".logis_product").hide();
                }); 
            }
            else{
                swal("提交失败");
            }
        }
    });
}

function DataTime(){
    $(".product_data").each(function(){
        var dataTime = $(this).html();
        $(this).html(dataTime.substr(0,10));
    });
}