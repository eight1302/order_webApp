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
	//data_time['type']="OEM"
	$(".order_ul").html('');
	$.ajax({
       	url:"../../json/3.json",
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
    			   drawTableOrder(obj)
        		}
            }); 
        	var content=e.data.length;       //总数
            var pageTotal=Math.ceil(content/pagesize);  //分页数量
            var html='<ul class="pagination" style="margin:0;" id="page2"></ul>';
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
function drawTableOrder(obj){
 	htm1='<div class="table_info">'+
	'<div class="order_statu1" id="contract_no">'+obj.contract_no+'</div>'+
	'<div class="order_statu1 order_statu2" id="data_order">'+obj.data_order+'</div>'+
	'<div class="order_statu1" id="type">'+obj.type+'</div>'+
	'<div class="order_statu1" id="payment_status">'+obj.payment_status+'</div>'+
	'<div class="order_statu1" id="order_status">'+obj.order_status+'</div>'+	
	'<div class="order_statu1" id="full_payment_rate">'+obj.full_payment_rate+'</div>'+	
	'</div>';
	$(".order_ul").append(htm1);
	DataTime()
}

//页数控制
function paginationOem(num,list){
	$(".order_ul").html('');
	$.each(list, function(idx,obj){
		if(idx>=((num-1)*pagesize) && idx<(num*pagesize)){
			drawTableOrder(obj);
		}
    });
}

//日期数据调整
function DataTime(){
    $(".order_statu2").each(function(){
        var dataTime = $(this).html();
        $(this).html(dataTime.substr(0,10));
    });

    //订单金额为空时
    $(".order_statu1").each(function(){
        var full_payment_rate = $(this).html();
        if(full_payment_rate == "null"){
            $(this).html("---");
        }
    }); 
}

//公告通知
function Cement(){
   $.ajax({
        url:"../../json/2.json",
        cache:false,
        type: "post",  
        contentType: 'application/json',
        dataType:"json", 
        success:function(e){
            if(e.data.state==200){
                //限制展示的个数
                $.each(e.data, function(idx,obj){
                    CementList(obj)
                });
            }else{
                $(".toast_news").hide();
            }
        },
        error:function(){
            $(".toast_news").hide();
        }
    });
}

//公告列表
function CementList(obj){
    var htm;
    htm='<li class="showdepartmentview" chuang_id="'+obj.id+'" content="'+obj.content+'" pub_name="'+obj.pub_name+'">'+
        '<span class="col-md-4 chuang_news" id="chuang_news" style="padding:0;text-align:center;">'+obj.title+'</span>'+
        '<span class="col-md-7 chuang_time" id="chuang_time" style="padding:0;text-align:left;">'+obj.create_time+'</span>'+
        '<span class="col-md-1 chuang_round" style="padding:0;text-align:center;">'+'<div class="round">'+'</div>'+'</span>'+
    '</li>';
    $(".bull_news").append(htm);
    ListConfine()
}

//公告限制
function ListConfine(){
    $(".chuang_news").each(function(){
        var news_maxwidth=10;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });
}


//详情展示
function drawCementInfo(obj){
    var htm;
    htm='<div class="corporate_news_tital_time">'+
        '<span>'+obj.chuang_time+'</span>'+
    '</div>'+
    '<div class="corporate_news_tital">'+
        '<div class="company_tital">'+
            '<span class="company_title">'+obj.chuang_news+'</span>'+
            '<span class="col-btn">'+'<img src="../../img/canel.png" class="company_tital_img">'+'</span>'+
        '</div>'+
        '<div class="conpany_img">'+
            '<img src="'+obj.img+'"class="conpany_img_products">'+
            '<p class="tital_p">'+obj.content+'</p>'+
        '</div>'+
    '</div>';
    $(".corporate_news").append(htm);
}