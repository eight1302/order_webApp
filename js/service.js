 /*自助下单功能逻辑开始*/
$(function(){
    $(".data1").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    $(".data2").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    
    renderOemTable();
    
    //查看详情
    $(".page_list_oem").on('click','.product_details_oem',function(){
        var id= $(this).attr("product_id");
        console.log(id);
        var id_data={
            "id":id
        };
        //加载弹出遮盖层
        $(".overlay2_tow").show();
        $(".oem_details").show();
        $(".cental_pro").on('click',function(){
            $(".oem_details").hide();
            $(".overlay2_tow").hide();
            window.location.reload();
        });
        //获取产品信息
        $.getJSON({
            url:"/product/detail?id="+id,
            cache:false,
            success:function(result,data){
                    //oem订单信息
                    //产品型号
                    var html_product;
                    html_product = '<div class="col-md-4 col-sm-4 col-xs-4 product_list">'+result.product_id+'</div>'+
                                    '<div class="col-md-4 col-sm-4 col-xs-4 product_list">'+result.product_name+'</div>'+
                                    '<div class="col-md-4 col-sm-4 col-xs-4 product_list">'+result.product_type+'</div>';
                    $(".list_product").append(html_product);

                    //产品pcb信息
                    var html_pcb;
                    html_pcb = '<div class="col-md-3 col-sm-3 col-xs-3 product_list">'+result.oem_pcb_cmstart+'*'+result.oem_pcb_cmstop+'</div>'+
                                '<div class="col-md-2 col-sm-2 col-xs-2 product_list">'+result.oem_pcb_layer+'</div>'+
                                '<div class="col-md-2 col-sm-2 col-xs-2 product_list">'+result.oem_pcb_thickness+'</div>'+
                                '<div class="col-md-2 col-sm-3 col-xs-3 product_list">'+result.oem_pcb_spray+'</div>'+
                                '<div class="col-md-3 col-sm-3 col-xs-3 product_list">'+result.oem_pcb_solder+'</div>';
                    $(".list_pcb").append(html_pcb);

                    //下载按钮
                     var html_downlod;
                   html_downlod = '<a class="col-md-5 col-sm-5 col-xs-5 product_list" href="/product/down?path='+encodeURI(result.pcb_file)+'" title="PCB下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;">PCB</a>'+
                                '<a class="col-md-5 col-sm-5 col-xs-5 product_list" href="/product/down?path='+encodeURI(result.coordinate_file)+'" title="坐标文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;">坐标</a>'+
                                '<a class="col-md-5 col-sm-5 col-xs-5 product_list" href="/product/down?path='+encodeURI(result.process_file)+'" title="工艺文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;margin-top: 10px;">工艺</a>'+
                                '<a class="col-md-5 col-sm-5 col-xs-5 product_list" href="/product/down?path='+encodeURI(result.bom_shopfile)+'" title="BOM文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;margin-top: 10px;">BOM</a>';   
                    $(".list_downlod").append(html_downlod);

                    //产品pcba清单
                    var html_pcba;
                    html_pcba = '<div class="col-md-2 col-sm-2 col-xs-2 product_list">'+result.pcba_process+'</div>'+
                                '<div class="col-md-1 col-sm-1 col-xs-1 product_list">'+result.pcba_smt_type+'</div></div></div></div>'+
                                '<div class="col-md-2 col-sm-2 col-xs-2 product_list">'+result.pcba_smt_joints+'</div>'+
                                '<div class="col-md-1 col-sm-1 col-xs-1 product_list">'+result.pcba_dip_type+'</div>'+
                                '<div class="col-md-2 col-sm-2 col-xs-2 product_list">'+result.pcba_dip_joints+'</div>'+
                                '<div class="col-md-2 col-sm-2 col-xs-2 product_list">'+result.pcba_stencil+'</div>'+
                                '<div class="col-md-2 col-sm-2 col-xs-2 product_list">'+result.pcba_stencil_num+'</div>';
                    $(".list_pcba").append(html_pcba);

                    //测试组装
                    var html_text;

                    html_text = '<div class="col-md-4 col-sm-4 col-xs-4 product_list">'+result.oem_test_time+'</div>'+
                                '<div class="col-md-4 col-sm-2 col-xs-2 product_list">'+result.oem_prevent_cm2+'</div>'+
                                '<div class="col-md-4 col-sm-2 col-xs-2 product_list" id="product_smark" title="'+result.oem_remark+'">'+
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
            }
        });

        //获取bom表头以及bom信息
        $.getJSON({
            url:"../../json/product.json",
            cache:false,
            data:id_data,
            success:function(result,data){
                if(result.state==200){
                    //获取bom表头
                    //bom清单
                    $.each(result.bom_tital, function(idx,obj){
                        var bom_tital;
                        bom_tital ='<div class="col-md-1 col-sm-1 col-xs-1">'+obj.numbering+'</div>'+
                                    '<div class="col-md-2 col-sm-2 col-xs-2">'+obj.name+'</div>'+
                                    '<div class="col-md-1 col-sm-1 col-xs-1">'+obj.type+'</div>'+
                                    '<div class="col-md-1 col-sm-1 col-xs-1">'+obj.encapsulation+'</div>'+
                                    '<div class="col-md-2 col-sm-2 col-xs-2">'+obj.bit_number+'</div>'+
                                    '<div class="col-md-1 col-sm-1 col-xs-1">'+obj.accuracy+'</div>'+
                                    '<div class="col-md-2 col-sm-2 col-xs-2">'+obj.brands+'</div>'+
                                    '<div class="col-md-1 col-sm-1 col-xs-1">'+obj.quantity+'</div>'+
                                    '<div class="col-md-1 col-sm-1 col-xs-1">备注</div>';
                        $(".product_tr_oem").append(bom_tital);
                    });

                    //bom清单
                    $.each(result.bom, function(idx,obj){
                        var html_bom;
                        html_bom ='<div class="bom_list_oem">'+ 
                                '<span class="col-md-1 col-md-1 col-sm-1 col-xs-1">'+obj.number+'</span>'+
                                '<span class="col-md-2 col-md-2 col-sm-2 col-xs-2">'+obj.name+'</span>'+
                                '<span class="col-md-1 col-md-1 col-sm-1 col-xs-1">'+obj.model_number+'</span>'+
                                '<span class="col-md-1 col-md-1 col-sm-1 col-xs-1">'+obj.encapsulation+'</span>'+
                                '<span class="col-md-2 col-md-2 col-sm-2 col-xs-2">'+obj.accuracy+'</span>'+
                                '<span class="col-md-1 col-md-1 col-sm-1 col-xs-1">'+obj.brands+'</span>'+
                                '<span class="col-md-2 col-md-2 col-sm-2 col-xs-2">'+obj.bit_number+'</span>'+
                                '<span class="col-md-1 col-md-1 col-sm-1 col-xs-1">'+obj.quantity+'</span>'+
                                '<span class="col-md-1 col-md-1 col-sm-1 col-xs-1 remark" title="'+obj.remark+'">'+obj.remark+'</span>'+
                            '</div>';   
                        $(".product_bom").append(html_bom);
                        $(".accuracy").each(function(){
                            var maxwidth=2;
                            if($(this).text().length>maxwidth){
                                $(this).text($(this).text().substring(0,maxwidth));
                                $(this).html($(this).html()+'…');
                            }
                        });
                        $(".remark").each(function(){
                            var maxwidth=2;
                            if($(this).text().length>maxwidth){
                                $(this).text($(this).text().substring(0,maxwidth));
                                $(this).html($(this).html()+'…');
                            }
                        });
                    });
                }
            }
        });
    });
    
    
    $(".page_list_oem").on('click','.product_btn',function(){
    	 var id= $(this).attr("id"),
         product_stat = Number($(this).attr("product_stat"));
         if(product_stat == 0){
             var id_data={
                 "id":id
             };
             $(".bom_procurement").show();
             $(".bom_div").show();
             $(".cental_pro").on('click',function(){
                 $(".bom_div").hide();
                 $(".bom_procurement").hide();
                 window.location.reload();
             });

             //获取BOM标题
             $.getJSON({  
                 type: "get",  
                 url:"../../json/bom_tital.json",  
                 async: false, 
                 cache:false,
                 dataType:"json", 
                 success: function(status) {
                     console.log(status); 
                     if(status.state==200){
                         /*加载预付款流程信息*/
                         $.each(status.orderlist, function(idx,obj){
                             var bom_tital;
                             bom_tital='<div class="col-md-1 col-sm-1 col-xs-1 numbering" style="padding:0;">'+obj.numbering+'</div>'+
                                     '<div class="col-md-2 col-sm-2 col-xs-2 bom_name pad_tow" style="padding:0;">'+obj.name+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 type pad_tow" style="padding:0;">'+obj.type+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 encapsulation pad_tow" style="padding:0;">'+obj.encapsulation+'</div>'+
                                     '<div class="col-md-2 col-sm-2 col-xs-2 bit_number pad_tow" style="padding:0;">'+obj.bit_number+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 accuracy pad_tow" style="padding:0;">'+obj.accuracy+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 brands pad_tow" style="padding:0;">'+obj.brands+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 quantity pad_tow" style="padding:0;">'+obj.quantity+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 remark pad_tow" style="padding:0;">备注</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 pad_tow" style="padding:0;">购买方</div>'
                             $(".product_tr_one").append(bom_tital);
                         }); 
                     }
                 }  
             });

              //获取BOM信息
             $.getJSON({  
                 type: "get",  
                 url:"../../json/bom_tital.json",  
                 async: false, 
                 cache:false,
                 dataType:"json", 
                 success: function(status) {
                     console.log(status); 
                     if(status.state==200){
                         /*加载预付款流程信息*/
                         $.each(status.oem_info, function(idx,obj){
                             var bom_des;
                             bom_des='<div class="product_tr_hree">'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 numbering pad_tow" style="padding:0;">'+obj.numbering+'</div>'+
                                     '<div class="col-md-2 col-sm-2 col-xs-2 bom_name pad_tow" style="padding:0;">'+obj.name+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 type pad_tow" style="padding:0;">'+obj.type+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 encapsulation pad_tow" style="padding:0;">'+obj.encapsulation+'</div>'+
                                     '<div class="col-md-2 col-sm-2 col-xs-2 bit_number pad_tow" style="padding:0;">'+obj.bit_number+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 accuracy pad_tow" style="padding:0;">'+obj.accuracy+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 brands pad_tow" style="padding:0;">'+obj.brands+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 quantity pad_tow" style="padding:0;">'+obj.quantity+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 remark pad_tow" style="padding:0;">'+obj.remark+'</div>'+
                                     '<div class="col-md-1 col-sm-1 col-xs-1 pad_tow" style="padding:0;">'+
                                         '<select name="bom_purchaser" id="bom_purchaser">'+
                                             '<option value="创元采购">创元采购</option>'+
                                             '<option value="乙方提供">乙方提供</option>'+
                                         '</select>'+
                                         '<input name="bom_ids" value="'+obj.id+'" style="display:none">'+
                                     '</div>'+
                                 '</div>';
                             $(".product_tr_tow").append(bom_des);
                         }); 
                     }
                 }  
             });

             //提交bom采购方
             $(".bom_updata").on('click',function(){
                 //id数组
                 var id_arr = [];
                 var bom_ids = $("input[name='bom_ids']");
                 $.each(bom_ids,function(key,obj){
                     var bom_id = Number(obj.value);
                     id_arr.push(bom_id);
                 });

                 //购买方数组
                 var purchasers_arr = [];
                 var bom_purchasers = $("select[name='bom_purchaser']");
                 $.each(bom_purchasers,function(key,obj){
                     var purchaser = obj.value;
                     purchasers_arr.push(purchaser);
                 });

                 //合并数组
                 var purchasers_data = [];
                 var a = id_arr.length,
                     b = purchasers_arr.length;
                 if(a == b){
                     for(var i=0;i<a;i++){
                         var json = {
                             "id" : id_arr[i],
                             "purchasers" : purchasers_arr[i]
                         };
                         purchasers_data.push(json);    
                     }
                 }
                 
                 //bom购买数据交互
                 $.getJSON({
                     type: "get",  
                     url:"../../json/bom_tital.json",  
                     async: false, 
                     cache:false,
                     dataType:"json",
                     data:  purchasers_data,
                     success:function(result){
                         swal({ 
                           title: "提交成功！", 
                           timer: 2000, 
                           showConfirmButton: false 
                         },function(){
                             window.location.reload();
                         });
                        
                     }
                 });
             });
         }
    });
   
    
    //展示oem信息
    $.getJSON({
        url:"../../json/data.json1",
        cache:false,
        success:function(result,data){
            if(result.orderlist.state==200){
                $.each(result.orderlist.oem, function(idx,obj){
                var html;
                html = '<div class="product_all">'+
                        '<div class="col-md-1 product_list">'+'<input type="checkbox" name="sign" style="width: 15px;height: 15px;" value="'+obj.id+'" />'+'</div>'+
                        '<div class="col-md-2 product_list">'+obj.product_id+'</div>'+
                        '<div class="col-md-2 product_list">'+obj.product_time+'</div>'+
                        '<div class="col-md-2 product_list">'+obj.product_name+'</div>'+
                        '<div class="col-md-2 product_list">'+obj.product_number+'</div>'+
                        '<div class="col-md-1 product_list" name="sign" id="product_type" value="'+obj.product_type+'">'+obj.product_type+'</div>'+
                        '<div class="col-md-1 product_list">'+
                            '<div class="product_btn" product_stat="'+obj.product_stat+'" id="'+obj.id+'">选择</div>'+
                        '</div>'+
                        '<div class="col-md-1 product_details_oem" product_id="'+obj.id+'">查看详情</div>';
                    $(".page_list_oem").append(html);         
                 }); 
                var content=result.orderlist.content;       //总数
                var pagesize=14;                            //每页显示数据14条
                var pageTotal=Math.ceil(content/pagesize);  //分页数量
                var html;
                html='<ul class="pagination" id="page2"></ul>';
                $(".page-left").append(html);
                Page({
                    num:pageTotal,             //页码数
                    startnum:1,
                    pagesize:1,             //每页显示的数量
                    elem:$('#page2'),       //指定的元素
                    callback:function(n){   //回调函数 
                        console.log(n);     
                    }
                });

                //判断选择状态
                $(".product_btn").each(function(){
                    var product_stat = $(this).attr("product_stat");
                    if(product_stat == "1"){
                        $(this).attr({"disabled":"disabled"});
                        $(this).css("background","#bfbfbf");
                    }
                });

                 //选择bom采购方
                $(".product_btn").on('click',function(){
                    
                });

               

            }else{
                swal("暂无数据ff！");
            }
        },
        error:function(result,sweetalert){
           // swal("暂无数据3！");
        }
    });


    
    //查询时间段的信息
    $(".oem_search_btn").on('click',function(){
    	renderOemTable();
    });
   
    /*下单按钮以及图层业务逻辑展示*/
    $(".product_menu_oem_add").on('click',function(){
        $(".overlay_one").show();
        $(".add_products").show();
        $(".oem").show();
        $(".weld").hide();
        $(".cental_pro").on('click',function(){
            $(".overlay_one").hide();
            $(".add_products").hide();
             window.location.reload();;
        });
        $(".oem_product").on('click',function(){
           $(".oem_product").css("border-bottom","2px solid #fff");
            $(".weld_product").css("border-bottom","none");
            $(".oem").show();
            $(".weld").hide();
            $(".cental_pro").on('click',function(){
                $(".overlay_one").hide();
                $(".add_products").hide();
                  window.location.reload();
            });
        });
    });

    /*自助下单获取信息业务逻辑编写结束*/

    /*删除OEM单个产品开始*/
    $(".product_menu_oem_dele").on('click',function(){
        var productIds = '';
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var productId = Number(obj.value);
                productIds+=productId+",";
            }
        });
        if(productIds.length>0){
           swal({
            title: "您确定要删除选中的产品吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7B69B3",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
            },function(isConfirm){
                if(isConfirm){
                    $.getJSON({
                        url:"/product/del?ids="+productIds,
                        cache:false,
                        success:function(result){
                            swal("删除成功!");
                            window.location.reload();
                        }
                    });
                }
            })
        }else{
            swal("请选择删除的数据!");
        }
    });
     /*删除OEM单个产品结束*/


     //点击图片上传pcb文件
    $(".uplod_pcb").on('click',function(sweetalert){
        document.getElementById("oem_pcb_file").click();
    });

    //点击图片上传坐标文件
    $(".uplod_coordinate").on('click',function(sweetalert){
        document.getElementById("oem_coordinate_file").click();
    });

     //点击图片工艺文件
    $(".uplod_process").on('click',function(sweetalert){
        document.getElementById("oem_process_file").click();
    });

     //点击图片BOM文件
    $(".uplod_bom").on('click',function(sweetalert){
        document.getElementById("oem_bom_shopfile").click();
    });

    /*OEM产品信息填写业务逻辑编写*/
    $(".product_menu_oem_add").on('click',function(){
        $(".overlay_one").show();
        $(".product_oem_add").show();
        $(".cental_pro").on('click',function(){
            $(".overlay_one").hide();
            $(".product_oem_add").hide();
            window.location.reload();
        });
        $(".oem_tital").html("OEM产品信息填写");
        $(".add_oem_pro").on('click',function(sweetalert){
            swal({
                    title: "",
                    text: "您确定添加此产品到产品列表吗？",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#7B69B3",
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: false
            },function(isConfirm){
                if(isConfirm){
                	addOrUpdOem();
                }
            });
        });
    });
    /*OEM产品信息填写业务逻辑编写*/

    /*修改OEM产品信息开始*/
    $(".product_menu_oem_update").on('click',function(){
        var productIds = [];
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var productId = Number(obj.value);
                productIds.push(productId);
            }
        });
        if(productIds.length == 1){
            $.getJSON({
            url:"/product/detail?id="+productIds[0],
            cache:false,
            success:function(result){
                //修改oem订单
                $(".overlay_one").show();
                $(".product_oem_add").show();
                $(".cental_pro").on('click',function(){
                    $(".overlay_one").hide();
                    $(".product_oem_add").hide();
                     window.location.reload();
                });
                $(".oem_tital").html("OEM产品信息修改");
                //oem信息
                $("#oem_product_name").val(result.oem_product_name);
                $("#oem_product_type").val(result.oem_product_type);
                $("#oem_pcb_cmstart").val(result.oem_pcb_cmstart);
                $("#oem_pcb_cmstop").val(result.oem_pcb_cmstop);
                $("#oem_pcb_layer").val(result.oem_pcb_layer);
                $("#oem_pcb_thickness").val(result.oem_pcb_thickness);
                $("#oem_pcb_spray").val(result.oem_pcb_spray);
                $("#oem_pcb_solder").val(result.oem_pcb_solder);
                $("#oem_pcba_process").val(result.oem_pcba_process);
                $("#oem_pcba_smt_type").val(result.oem_pcba_smt_type);
                $("#oem_pcba_smt_joints").val(result.oem_pcba_smt_joints);
                $("#oem_pcba_dip_type").val(result.oem_pcba_dip_type);
                $("#oem_pcba_dip_joints").val(result.oem_pcba_dip_joints);
                $("#oem_pcba_stencil").val(result.oem_pcba_stencil);
                $("#oem_pcba_stencil_num").val(result.oem_pcba_stencil_num);
                $("#oem_test_time").val(result.oem_test_time);
                $("#oem_prevent_cm2").val(result.oem_prevent_cm2);
                $("#oem_remark").val(result.oem_remark);
            
                $(".add_oem_pro").on('click',function(sweetalert){
                    swal({
                            title: "",
                            text: "您确定添加此产品到产品列表吗？",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#7B69B3",
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                    },function(isConfirm){
                        if(isConfirm){
                        	addOrUpdOem(result.id);
                        }
                    });
                });      
            }
        });
    }else{
        swal("请选择一个产品进行修改!");
    } 
    });
    /*修改产品信息结束*/
    
  //生成订单
    $(".sales_review").on('click',function(sweetalert){
   	 genOrder('OEM')
    });   

    /*下单业务逻辑编写开始*/
    $(".product_menu_oem_order").on('click',function(sweetalert){
        var productIds = '';
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var product_Id = Number(obj.value);
                productIds+=product_Id+",";
            }
        });

        if(productIds.length>0){
        	orderPro(productIds)
         }else{
            swal("请选择产品!");
         }
    });
    /*下单业务逻辑编写结束*/
})
/*自助下单功能逻辑开始*/