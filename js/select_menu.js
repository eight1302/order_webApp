/*
*time 2017.12.5
*auth xiaominzhang
*返修订单选择
*/
//表单数据

function uploadFile(fileId,ftype,types){
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

      var picUrl;
      $.getJSON({  
          type:"post",
    	    data:fd,// 序列化表单值
          url:"/repair/upload",  
          async: false, 
          cache:false,
          processData: false,
          contentType: false, 
          success: function(status) { 
        	  picUrl= status.msg;
          }
      });
      return picUrl;
}

function drawTableSaleOrder(obj){
    var html ='<div class="contract_product">'+
        '<div class="col-md-2 col-xs-2 col-sm-2 contract_no">'+obj.contract_no+'</div>'+
        '<div class="col-md-2 col-xs-2 col-sm-2 product_data">'+obj.data_order+'</div>'+
		    '<div class="col-md-2 col-xs-2 col-sm-2 product_type">'+obj.type+'</div>'+
        '<div class="col-md-2 col-xs-2 col-sm-2 contract_state">'+obj.order_status+'</div>'+
        '<div class="col-md-2 col-xs-2 col-sm-2 product_quantity">'+obj.product_quantity+'</div>'+
        '<div class="col-md-2 col-xs-2 col-sm-2 selcet_pro">'+
            '<div class="selcet_btn" select_menu_product="'+obj.id+'">选择产品</div>'+
        '</div>'+
    '</div>';
    $(".contracts").append(html);
    DataTime()
}

$(function(){

	

    //展示返修产品列表
    renderOemOrderTable()

    //查询合同信息
    $(".con_btn").on('click',function(){
    	var contract_no = $("#contract_no").val();
    	if(contract_no == "" || !(/[A-Z][0-9]{5}/.test(contract_no))){
    		return false;
    	}
    	var type = $("#type").val();
    	if(type == ""){
    		return false;
    	}
    	//展示返修产品列表
    	renderOemSaleNumTable(type,contract_no)
    });

   	//选择返修产品
   	$(".contracts").on('click','.selcet_btn',function(){
   		var Id = Number($(this).attr("select_menu_product"));
   		$(".overlay_repair").show();
   		$(".overlay_product").show();

   		//取消按钮操作
   		$(".cental_pro").on('click',function(){
   			window.location.reload();
   			$(".overlay_repair").hide();
   			$(".overlay_product").hide();
   		});
   		 //展示返修产品列表
   		 ProductList(Id)
	   //返修产品的全局数据
		var porducts=[];

	    //上传质量问题
	    $(".up_btn").on('click',function(){
	    	var product_id = $(this).attr("product_id");
	    	$(".product_repair").show();
	    	$(".product_question").show();
	    	$(".cental_pro_one").on('click',function(){
	    		$(".product_question").hide();
            	$(".product_repair").hide();
	    	});
			
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
            $(".product_repair_btn").on('click',function(sweetalert){
            	var id=product_id;
            	if(id){
            		var textare = $("#textare").val(),
            		file = $("#file").val();
	            	if(textare == '' && file == ''){
	            		swal("产品质量描述以及图片不能为空!");
	            		return false;
	            	}
            	}
            	var product = {
	            		"product_id" : id,
	            		"product_question" : textare
	            	};
            	product['repair_url']=uploadFile("file","问题图片","png,jpg,jpeg,jpe,gif")
            		porducts.push(product);
	            $(".product_question").hide();
	            $(".product_repair").hide();
            });
	    });



		//提交数据到返修列表
		$(".add_repair").on('click',function(sweetalert){
			var pro_num = [];
			
			var repari={};
			var quantity=0;
			console.log(porducts)
			 //返修产品个数
	        var pro_quantity = []
	        var signs = $("input[name='signs']");
	        $.each(signs,function(key,obj){
	            if(obj.checked && $(this).parent().parent().find("input[name='repair']").val()>0){
	            	 var mpro={"product_id":Number(obj.value),
	            			 "product_quantity":$(this).parent().parent().find("input[name='repair']").val()}
	            	 quantity+=Number(mpro.product_quantity);
	            	 $.each(porducts,function(k,v){
	            		 if(v.product_id==mpro['product_id']){
	            			 mpro['repair_url']=v.repair_url
	            			 mpro['product_question']=v.product_question
	            		 }
	            	 });
	            	 pro_num.push(mpro)
	            }
	        });
	        repari['product_quantity']=quantity;
	        repari['contract_id']=Id;
	        repari['product_list']=pro_num;
	     
	       console.log(repari);
	        $.ajax({  
                type: "post",  
                url:"/repair/save",
                async: false, 
                cache:false,
                contentType: 'application/json',
                data:JSON.stringify(repari),
                dataType:"json", 
                success: function(status) {
                    console.log(status);
                    if(status.code==1){
                        /*加载焊接合同信息*/
                        window.location.reload();//页面刷新
                    } 
                }  
            });
		});
   	});
});