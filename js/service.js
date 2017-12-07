 /*自助下单功能逻辑开始*/
$(function(){

    //订单管理路由跳转结束
    $(".data1").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    $(".data2").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
     //获取当前时间
    var myDate = new Date();
    var year=myDate.getFullYear();   //获取当前年
    var month=myDate.getMonth()+1;   //获取当前月
    var date=myDate.getDate();       //获取当前日
    var now_time=year+'.'+month+"."+date;
    //页面默认展示OEM下单信息，焊接下单隐藏
    //展示oem信息
    $(".product_weld").css("background","#cccaca");
    $(".product_oem").css("background","#03a9f4");
    $(".product_oem").on('click',function(){
         /*自助下单获取信息业务逻辑编写开始*/
        $(".oem").show();
        $(".weld").hide();
        $(".product_weld").css("background","#cccaca");
        $(".product_oem").css("background","#03a9f4");
    });

    $.getJSON({
            url:"../../json/data.json",
            cache:false,
            success:function(result,data){
                if(result.orderlist.state==200){
                    $.each(result.orderlist.oem, function(idx,obj){
                        var html;
                        html = '<div class="product_all">'+
                                '<div class="col-md-1 product_list" data-field="state" data-checkbox="true">'+'<input type="checkbox" name="sign" style="width: 15px;height: 15px;" value="'+obj.id+'" />'+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_id+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_time+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_name+'</div>'+
                                '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_number+'</div>'+
                                '<div class="col-md-1 product_list" name="sign" data-field="product_id" data-align="center" id="product_type" value="'+obj.product_type+'">'+obj.product_type+'</div>'+
                                '<div class="col-md-1 product_details_oem" data-field="product_id" data-align="center" product_id="'+obj.id+'">'+obj.product_details+'</div>'+
                                '<div class="col-md-1" data-field="product_type" data-align="center">BOM匹配</div>';
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

                    //查看详情
                    $(".product_details_oem").click(function(){
                         //加载弹出遮盖层
                        $(".overlay2_tow").show();
                        $(".oem_details").show();
                        $(".cental_pro").click(function(){
                            $(".oem_details").hide();
                            $(".overlay2_tow").hide();
                             window.location.reload();
                        });

                        var id= $(this).attr("product_id");
                        console.log(id);
                        var id={
                            "id":id
                        };
                        //获取产品信息
                        $.getJSON({
                            url:"../../json/product.json",
                            cache:false,
                            data:id,
                            success:function(result,data){
                                if(result.state==200){
                                    //oem订单信息
                                    //产品型号
                                    var html_product;
                                    html_product = '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_number+'</div>'+
                                                    '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_name+'</div>'+
                                                    '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_type_number+'</div>';
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
                                    html_downlod = '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="PCB下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;">PCB</div>'+
                                                '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="坐标文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;">坐标</div>'+
                                                '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="工艺文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;margin-top: 10px;">工艺</div>'+
                                                '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="BOM文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;margin-top: 10px;">BOM</div>';   
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

                                    html_text = '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_test_time+'</div>'+
                                                '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_assembly_time+'</div>'+
                                                '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_prevent_cm2+'</div>'+
                                                '<div class="col-md-3 product_list" id="product_smark" data-field="product_id" data-align="center" title="'+result.oem_remark+'">'+
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
                                                '<span class="col-md-1">'+obj.number+'</span>'+
                                                '<span class="col-md-2">'+obj.name+'</span>'+
                                                '<span class="col-md-1">'+obj.model_number+'</span>'+
                                                '<span class="col-md-1">'+obj.encapsulation+'</span>'+
                                                '<span class="col-md-1">'+obj.accuracy+'</span>'+
                                                '<span class="col-md-1">'+obj.brands+'</span>'+
                                                '<span class="col-md-1">'+obj.bit_number+'</span>'+
                                                '<span class="col-md-1">'+obj.quantity+'</span>'+
                                                '<span class="col-md-1">'+obj.price+'</span>'+
                                                '<span class="col-md-2 title="'+obj.remark+'">'+obj.remark+'</span>'+
                                            '</div>';   
                                        $(".product_bom").append(html_bom);
                                        $(".oem_bom").each(function(){
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
                }else{
                     swal("暂无数据！");
                }
            },
            error:function(result,sweetalert){
               swal("暂无数据！");
            }
    });

    //查询时间段的信息
    $(".oem_search_btn").on('click',function(){
            var data1 = $("#data1").val(),
                data2 = $("#data2").val();
            if(data1 == "" || data2 == ""){
                return false;
            }
            var data_time = {
                "data1" : data1,
                "data2" : data2
            };
           
            //数据交互
             $(".page-list").empty();
            $.getJSON({
                type: "post",  
                url:"../../json/data1.json",
                data:data_time,// 序列化表单值  
                async: false, 
                cache:false,
                dataType:"json", 
                success:function(result,data){
                    if(result.orderlist.state==200){
                        $.each(result.orderlist.list, function(idx,obj){
                            var html;
                            html = '<div class="product_all">'+
                                    '<div class="col-md-1 product_list" data-field="state" data-checkbox="true">'+'<input type="checkbox" name="sign" style="width: 15px;height: 15px;" value="'+obj.id+'" />'+'</div>'+
                                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_id+'</div>'+
                                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_time+'</div>'+
                                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_name+'</div>'+
                                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center">'+obj.product_number+'</div>'+
                                    '<div class="col-md-1 product_list" name="sign" data-field="product_id" data-align="center" id="product_type" value="'+obj.product_type+'">'+obj.product_type+'</div>'+
                                    '<div class="col-md-1 product_details_oem" data-field="product_id" data-align="center" product_id="'+obj.id+'">'+obj.product_details+'</div>'+
                                    '<div class="col-md-1" data-field="product_type" data-align="center">BOM匹配</div>';
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

                        //查看详情
                        $(".product_details_oem").click(function(){
                             //加载弹出遮盖层
                            $(".overlay").show();
                            $(".orders_details").show();
                            $(".cental_pro").click(function(){
                                $(".overlay").hide();
                                $(".add_products").hide();
                                 window.location.href="../../view/service/home.html";
                            });

                            var id= $(this).attr("product_id");
                            console.log(id);
                            var id={
                                "id":id
                            };
                            //获取产品信息
                            $.getJSON({
                                url:"../../json/product.json",
                                cache:false,
                                data:id,
                                success:function(result,data){
                                    if(result.state==200){
                                         //oem订单信息
                                        $(".oem_datials").show();
                                        $(".oem_product").show();
                                        $(".weld").hide();
                                        $(".weld_product").hide();
                                         //产品型号
                                        var html_product;
                                        html_product = '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_number+'</div>'+
                                                       '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_name+'</div>'+
                                                       '<div class="col-md-4 product_list" data-field="product_id" data-align="center">'+result.product_type_number+'</div>';
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
                                        html_downlod = '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="PCB下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;">PCB</div>'+
                                                    '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="坐标文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;">坐标</div>'+
                                                    '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="工艺文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;margin-top: 10px;">工艺</div>'+
                                                    '<div class="col-md-5 product_list" data-field="product_id" data-align="center" title="BOM文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;margin-top: 10px;">BOM</div>';   
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

                                        html_text = '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_test_time+'</div>'+
                                                    '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_assembly_time+'</div>'+
                                                    '<div class="col-md-3 product_list" data-field="product_id" data-align="center">'+result.oem_prevent_cm2+'</div>'+
                                                    '<div class="col-md-3 product_list" id="product_smark" data-field="product_id" data-align="center" title="'+result.oem_remark+'">'+
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
                                            $(".product_bom").append(html_bom);
                                            $(".oem_bom").each(function(){
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
                    }else{
                         swal("暂无数据！");
                    }
                },
                error:function(result,sweetalert){
                   swal("暂无数据！");
                }
            });            
    });

    //展示焊接信息
    $(".product_weld").on('click',function(){
        $(".oem").hide();
        $(".weld").show();
        $(".product_oem").css("background","#cccaca");
        $(".product_weld").css("background","#2196f3");
    });
   
    /*下单按钮以及图层业务逻辑展示*/
    $(".product_menu_oem_add").click(function(){
        $(".overlay_one").show();
        $(".add_products").show();
        $(".oem").show();
        $(".weld").hide();
        $(".cental_pro").click(function(){
            $(".overlay_one").hide();
            $(".add_products").hide();
            window.location.href="../../view/service/home.html";
        });
        $(".oem_product").click(function(){
           $(".oem_product").css("border-bottom","2px solid #fff");
            $(".weld_product").css("border-bottom","none");
            $(".oem").show();
            $(".weld").hide();
            $(".cental_pro").click(function(){
                $(".overlay_one").hide();
                $(".add_products").hide();
                 window.location.href="../../view/service/home.html";
            });
        });
    });

    /*自助下单获取信息业务逻辑编写结束*/

    /*删除OEM单个产品开始*/
    $(".product_menu_oem_dele").click(function(){
        var productIds = [];
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var productId = Number(obj.value);
                productIds.push(productId);
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
                    var dataID={
                        "productIds":productIds
                    }
                    $.getJSON({
                        url:"../../json/data.json",
                        cache:false,
                        data:dataID,
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
    $(".add_oem_pro").click(function(sweetalert){
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
                   var  oem_product_name = $("#oem_product_name").val(),
                        oem_product_type = $("#oem_product_type").val(),
                        oem_pcb_file = $("#oem_pcb_file").val(),
                        oem_coordinate_file = $("#oem_coordinate_file").val(),
                        oem_process_file = $("#oem_process_file").val(),
                        oem_pcb_cmstart = $("#oem_pcb_cmstart").val(),
                        oem_pcb_cmstop = $("#oem_pcb_cmstop").val(),
                        oem_pcb_layer = $("#oem_pcb_layer").children('option:selected').val(),
                        oem_pcb_thickness = $("#oem_pcb_thickness").children('option:selected').val(),
                        oem_pcb_spray = $("#oem_pcb_spray").children('option:selected').val(),
                        oem_pcb_solder = $("#oem_pcb_solder").children('option:selected').val(),
                        oem_bom_shopfile = $("#oem_bom_shopfile").val(),
                        oem_pcba_process = $("#oem_pcba_process").val(),
                        oem_pcba_smt_type = $("#oem_pcba_smt_type").val(),
                        oem_pcba_smt_joints = $("#oem_pcba_smt_joints").val(),
                        oem_pcba_dip_type = $("#oem_pcba_dip_type").val(),
                        oem_pcba_dip_joints = $("#oem_pcba_dip_joints").val(),
                        oem_pcba_stencil = $("#oem_pcba_stencil").children('option:selected').val(),
                        oem_pcba_stencil_num = $("#oem_pcba_stencil_num").val(),
                        oem_test_time = $("#oem_test_time").val(),
                        oem_assembly_time = $("#oem_assembly_time").val(),
                        oem_prevent_cm2 = $("#oem_prevent_cm2").val(),
                        oem_remark = $("#oem_remark").val(),
                        product_class_type = $("#product_class_type").val();

                    //判断OEM信息不能为空的选项信息
                    
                    if(oem_product_name=='' || oem_pcba_process=='' || oem_pcba_smt_type=='' || oem_pcba_dip_type==''){
                        swal("信息不能为空!");
                        return false;
                    }
                    if(oem_pcb_file==''){
                        swal("PCB文件不能为空!");
                        return false;
                    }else{
                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                        var oem_pcb="0";
                        var newFileName = oem_pcb_file.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                            　　oem_pcb = "1";
                            　}
                        }
                        if(oem_pcb == "0"){
                           swal("PCB文件必须是rar,zip,tar,gzip,jar压缩文件！");
                            return false;
                        }
                    }
                    //ome判定
                    if(oem_bom_shopfile==''){
                        swal("BOM不能为空!");
                        return false;
                    }else{
                        var fileTypes = new Array("xlsx","xlsm","xlsb","xls","xlt","xltx","xla");  //定义可支持的文件类型数组
                        var ome_bomfile = "0";
                        var newFileName = oem_bom_shopfile.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                                ome_bomfile = "1";
                            }
                        }
                        if(ome_bomfile == "0"){
                            swal("BOM文件必须是xlsx,xlsm,xlsb,xls,xlt,xltx,xla！");
                            return false;
                        }
                    }

                    //判断坐标文件
                    if(oem_coordinate_file != ''){
                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                        var oem_coordinate = "0";
                        var newFileName = oem_coordinate_file.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                                oem_coordinate = "1";
                            }
                        }
                        if(oem_coordinate == "0"){
                            swal("坐标文件必须是rar,zip,tar,gzip,jar压缩文件！");
                            return false;
                        }
                    }

                    //工艺文件
                    if(oem_process_file != ''){
                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                        var oem_process = "0";
                        var newFileName = oem_process_file.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                                oem_process = "1";
                            }
                        }
                        if(oem_process == "0"){
                            swal("工艺文件必须是rar,zip,tar,gzip,jar压缩文件！");
                            return false;
                        }
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
                            swal("测试时间必须是数字!");
                            return false;
                       }
                    }
                    if(oem_assembly_time!=''){
                        if(!(/[0-9]/.test(oem_assembly_time))){
                            swal("组装时间必须是数字!");
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
                        "oem_pcb_file" : oem_pcb_file,
                        "oem_coordinate_file" : oem_coordinate_file,
                        "oem_process_file" : oem_process_file,
                        "oem_pcb_cmstart" : oem_pcb_cmstart,
                        "oem_pcb_cmstop" : oem_pcb_cmstop,
                        "oem_pcb_layer" : oem_pcb_layer,
                        "oem_pcb_thickness" : oem_pcb_thickness,
                        "oem_pcb_spray" : oem_pcb_spray,
                        "oem_pcb_solder" : oem_pcb_solder,
                        "oem_bom_shopfile" : oem_bom_shopfile,
                        "oem_pcba_process" : oem_pcba_process,
                        "oem_pcba_smt_type" : oem_pcba_smt_type,
                        "oem_pcba_smt_joints" : oem_pcba_smt_joints,
                        "oem_pcba_dip_type" : oem_pcba_dip_type,
                        "oem_pcba_dip_joints" : oem_pcba_dip_joints,
                        "oem_pcba_stencil" : oem_pcba_stencil,
                        "oem_pcba_stencil_num" : oem_pcba_stencil_num,
                        "oem_test_time" : oem_test_time,
                        "oem_assembly_time" : oem_assembly_time,
                        "oem_prevent_cm2" : oem_prevent_cm2,
                        "oem_remark" : oem_remark,
                        "product_class_type" : product_class_type,
                        "now_time":now_time
                    };

                   //数据库交互
                   $.getJSON({  
                        type: "post",  
                        url:"../../json/1.json",  
                        data:oem_data,// 序列化表单值  
                        async: false, 
                         cache:false,
                        dataType:"json", 
                        error: function(status) { 
                            console.log(status); 
                            if(status.oemproduct.state==0){
                                swal({
                                title: "添加失败!",
                                type: "error",
                                timer: 5000,
                                showConfirmButton: false,
                                sleep : 20000
                            });  
                            window.location.href="../../view/service/home.html";
                            }
                        },  
                        success: function(status) {
                            console.log(status); 
                            if(status.oemproduct.state==200){
                                swal({
                                title: status.oemproduct.info,
                                type: "success",
                                timer: 3000,
                                showConfirmButton: false
                            });  
                            window.location.href="../../view/service/home.html";  
                            }
                        }  
                    }); 
                }
            });
    });
    /*OEM产品信息填写业务逻辑编写*/

    /*修改OEM产品信息开始*/
    $(".product_menu_oem_update").click(function(){
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
            url:"../../json/text.json",
            cache:false,
            data:productIds,
            success:function(result){
            //修改oem订单
                $(".overlay_one").show();
                $(".product_oem_add").show();
                $(".cental_pro").click(function(){
                    $(".overlay_one").hide();
                $(".product_oem_add").hide();
                    window.location.href="../../view/service/home.html";
                });
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
                $("#oem_test_time").val(result.oem_assembly_time);
                $("#oem_assembly_time").val(result.oem_assembly_time);
                $("#oem_prevent_cm2").val(result.oem_prevent_cm2);
                $("#oem_remark").val(result.oem_remark);
            
                $(".add_oem_pro").click(function(sweetalert){
                    swal({
                        title: "",
                        text: "您确定修改此产品吗？",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#7B69B3",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        closeOnConfirm: false
                    },function(isConfirm){
                        if(isConfirm){
                            var  oem_product_name = $("#oem_product_name").val(),
                                oem_product_type = $("#oem_product_type").val(),
                                oem_pcb_file = $("#oem_pcb_file").val(),
                                oem_coordinate_file = $("#oem_coordinate_file").val(),
                                oem_process_file = $("#oem_process_file").val(),
                                oem_pcb_cmstart = $("#oem_pcb_cmstart").val(),
                                oem_pcb_cmstop = $("#oem_pcb_cmstop").val(),
                                oem_pcb_layer = $("#oem_pcb_layer").children('option:selected').val(),
                                oem_pcb_thickness = $("#oem_pcb_thickness").children('option:selected').val(),
                                oem_pcb_spray = $("#oem_pcb_spray").children('option:selected').val(),
                                oem_pcb_solder = $("#oem_pcb_solder").children('option:selected').val(),
                                oem_bom_shopfile = $("#oem_bom_shopfile").val(),
                                oem_pcba_process = $("#oem_pcba_process").val(),
                                oem_pcba_smt_type = $("#oem_pcba_smt_type").val(),
                                oem_pcba_smt_joints = $("#oem_pcba_smt_joints").val(),
                                oem_pcba_dip_type = $("#oem_pcba_dip_type").val(),
                                oem_pcba_dip_joints = $("#oem_pcba_dip_joints").val(),
                                oem_pcba_stencil = $("#oem_pcba_stencil").children('option:selected').val(),
                                oem_pcba_stencil_num = $("#oem_pcba_stencil_num").val(),
                                oem_test_time = $("#oem_test_time").val(),
                                oem_assembly_time = $("#oem_assembly_time").val(),
                                oem_prevent_cm2 = $("#oem_prevent_cm2").val(),
                                oem_remark = $("#oem_remark").val(),
                                product_class_type = $("#product_class_type").val();
                            //判断OEM信息不能为空的选项信息
                                
                            if(oem_product_name=='' || oem_pcba_process=='' || oem_pcba_smt_type=='' || oem_pcba_dip_type==''){
                                 swal("信息不能为空!");
                                return false;
                            }
                           if(oem_pcb_file==''){
                        swal("PCB文件不能为空!");
                        return false;
                    }else{
                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                        var oem_pcb="0";
                        var newFileName = oem_pcb_file.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                            　　oem_pcb = "1";
                            　}
                        }
                        if(oem_pcb == "0"){
                           swal("PCB文件必须是rar,zip,tar,gzip,jar压缩文件！");
                            return false;
                        }
                    }
                    //ome判定
                    if(oem_bom_shopfile==''){
                        swal("BOM不能为空!");
                        return false;
                    }else{
                        var fileTypes = new Array("xlsx","xlsm","xlsb","xls","xlt","xltx","xla");  //定义可支持的文件类型数组
                        var ome_bomfile = "0";
                        var newFileName = oem_bom_shopfile.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                                ome_bomfile = "1";
                            }
                        }
                        if(ome_bomfile == "0"){
                            swal("BOM文件必须是xlsx,xlsm,xlsb,xls,xlt,xltx,xla！");
                            return false;
                        }
                    }

                    //判断坐标文件
                    if(oem_coordinate_file != ''){
                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                        var oem_coordinate = "0";
                        var newFileName = oem_coordinate_file.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                                oem_coordinate = "1";
                            }
                        }
                        if(oem_coordinate == "0"){
                            swal("坐标文件必须是rar,zip,tar,gzip,jar压缩文件！");
                            return false;
                        }
                    }

                    //工艺文件
                    if(oem_process_file != ''){
                        var fileTypes = new Array("rar","zip","tar","gzip","jar");  //定义可支持的文件类型数组
                        var oem_process = "0";
                        var newFileName = oem_process_file.split('.');
                        newFileName = newFileName[newFileName.length-1];
                        for(var i=0;i<fileTypes.length;i++){
                            if(fileTypes[i] == newFileName){
                                oem_process = "1";
                            }
                        }
                        if(oem_process == "0"){
                            swal("工艺文件必须是rar,zip,tar,gzip,jar压缩文件！");
                            return false;
                        }
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

                            //判断焊接点数、组装时间
                                                    
                            //判断焊接点数、种类、组装时间
                                    
                            if(!(/[0-9]/.test(oem_pcba_smt_joints)) || !(/[0-9]/.test(oem_pcba_dip_joints)) || !(/[0-9]/.test(oem_pcba_smt_type)) || !(/[0-9]/.test(oem_pcba_dip_type))){
                                swal("SMT和DIP的种类、焊接点数必须是数字!");
                                return false;
                             }
                            if(oem_test_time!=''){
                                if(!(/[0-9]/.test(oem_test_time))){
                                    swal("测试时间必须是数字!");
                                    return false;
                                }
                            }
                            if(oem_assembly_time!=''){
                                if(!(/[0-9]/.test(oem_assembly_time))){
                                    swal("组装时间必须是数字!");
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
                                "id" : productIds,
                                "oem_product_name" : oem_product_name,
                                "oem_product_type" : oem_product_type,
                                "oem_pcb_file" : oem_pcb_file,
                                "oem_coordinate_file" : oem_coordinate_file,
                                "oem_process_file" : oem_process_file,
                                "oem_pcb_cmstart" : oem_pcb_cmstart,
                                "oem_pcb_cmstop" : oem_pcb_cmstop,
                                "oem_pcb_layer" : oem_pcb_layer,
                                "oem_pcb_thickness" : oem_pcb_thickness,
                                "oem_pcb_spray" : oem_pcb_spray,
                                "oem_pcb_solder" : oem_pcb_solder,
                                "oem_bom_shopfile" : oem_bom_shopfile,
                                "oem_pcba_process" : oem_pcba_process,
                                "oem_pcba_smt_type" : oem_pcba_smt_type,
                                "oem_pcba_smt_joints" : oem_pcba_smt_joints,
                                "oem_pcba_dip_type" : oem_pcba_dip_type,
                                "oem_pcba_dip_joints" : oem_pcba_dip_joints,
                                "oem_pcba_stencil" : oem_pcba_stencil,
                                "oem_pcba_stencil_num" : oem_pcba_stencil_num,
                                "oem_test_time" : oem_test_time,
                                "oem_assembly_time" : oem_assembly_time,
                                "oem_prevent_cm2" : oem_prevent_cm2,
                                "oem_remark" : oem_remark,
                                "product_class_type" : product_class_type
                            };

                            //数据库交互
                            $.getJSON({  
                                type: "post",  
                                url:"../../json/1.json",  
                                data:oem_data,// 序列化表单值  
                                async: false, 
                                cache:false,
                                dataType:"json", 
                                error: function(status) { 
                                    console.log(status); 
                                    if(status.oemproduct.state==0){
                                        swal({
                                            title: "修改失败!",
                                            type: "error",
                                            timer: 5000,
                                            showConfirmButton: false,
                                            sleep : 20000
                                        });  
                                    window.location.href="../../view/service/home.html";
                                    }
                                },  
                                success: function(status) {
                                    console.log(status); 
                                    if(status.oemproduct.state==200){
                                        swal({
                                            title: "修改成功",
                                            type: "success",
                                            timer: 3000,
                                            showConfirmButton: false
                                        });  
                                        window.location.href="../../view/service/home.html";  
                                    }
                                }  
                            }); 
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

    /*下单业务逻辑编写开始*/
    $(".product_menu_oem_order").click(function(sweetalert){
        var productIds = [];
        var signs = $("input[name='sign']");
        $.each(signs,function(key,obj){
            if(obj.checked){
                var product_Id = Number(obj.value);
                productIds.push(product_Id);
            }
        });

        if(productIds.length>0){
            //加载弹出遮盖层
            swal.close();
            $(".overflow_three1").show();
            $(".shop_orders").show();
            $(".cental_pro").click(function(){
                window.location.href="../../view/service/home.html";
            });

            //展示产品信息列表开始
            $.getJSON({  
                    type: "get",  
                    url:"../../json/order.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    error: function(status) { 
                        console.log(status); 
                        if(status.data.state==0){
                            swal({
                                title: "暂务数据!",
                                type: "error",
                                timer: 5000,
                                showConfirmButton: false,
                                sleep : 20000
                            });  
                        }
                    },  
                    success: function(status) {
                       console.log(status);
                       $(".user_ares").empty();
                        if(status.data.state==200){
                           $.each(status.data.data, function(idx,obj){
                                var order_info_html;
                                order_info_html='<div class="order_info" style="margin-top: 15px;background: #fff;">'+
                                    ' <div class="pro_da" style="margin-left: 20px;margin-top:5px;">'+
                                        '<div class="whpro" style="height: 18px;margin-top:5px;"></div>'+
                                        '<span class="whpro_name" style="line-height: 25px;margin-top:5px;">产品：'+obj.order_name+'</span>'+
                                        '<input type="text" name="product_order_id"  value="'+obj.id+'" style="display:none;">'+
                                    '</div>'+
                                    '<div class="order_shop" style="height: 75px;"><!--weld bom信息TUDO-->'+
                                        ' <div class="depart_info">'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">产品编号：'+obj.order_num+'</span>'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">产品名称：'+obj.order_name+'</span>'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">产品型号：'+obj.order_type+'</span>'+
                                            '<span class="col-md-2" style="margin: 0;padding: 0;line-height: 50px;">'+
                                                '<span  style="color: red;">*</span>生产总数：'+
                                                '<input type="text" name="production_num" style="width: 80px;height: 25px;">'+
                                            '</span>'+
                                            '<div class="col-md-4" style="margin: 0;padding: 0;">'+
                                                '<span class="col-md-2" style="color:red;line-height:20px;">备注：</span>'+
                                                '<textarea class="col-md-10 text" name="text_info" id="text" value="" style="height: 65px;resize:none;margin: 0;padding: 0;overflow-y:visible " placeholder="如果此产品发送地址不同，填写详细的联系人、电话、公司地址、发货数量、发货方式，用分号隔开"></textarea>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                               $(".order_list").append(order_info_html);
                            }); 

                        }
                    }  
                }); 

            //展示产品信息列表结束

            //弹出快递
            $(".add_delivery").click(function(){
                $(".overlay_tow").show();
                $(".delivery").show();
                $(".insert_delivery").click(function(){
                    var delivery=$("#delivery").val();
                    $(".overlay_tow").hide();
                    $(".delivery").hide();
                     //清除数据
                    $(".express_y").empty();
                    $(".express_way").append('<span class="express_y">'+delivery+'</span>');
                });
            });

            $(".add_button").click(function(){
                $(".adress_information").toggle(10);
            });
            //弹出地址
            $(".add_adres").click(function(){
                $(".overlay_tow").show();
                $(".addres").show();
                //获取地址信息
                $.getJSON({  
                    type: "get",  
                    url:"../../json/address.json",  
                    async: false, 
                    cache:false,
                    dataType:"json", 
                    error: function(status) { 
                        console.log(status); 
                        if(status.data.state==0){
                            swal({
                                title: "暂务数据!",
                                type: "error",
                                timer: 5000,
                                showConfirmButton: false,
                                sleep : 20000
                            });  
                        }
                    },  
                    success: function(status) {
                       console.log(status);
                       $(".user_ares").empty();
                        if(status.data.state==200){
                           $.each(status.data.ul_list, function(idx,obj){
                                var html;
                                html = '<div class="delivery_all">'+
                                        '<div class="col-md-1 product_list" data-field="state" data-checkbox="true" style="margin: 0;padding: 0;">'+
                                            '<input type="radio" name="delivery" id="id" value="'+obj.id+'" />'+
                                        '</div>' +
                                        '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+obj.name+'</div>'+
                                        '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+obj.contact+'</div>'+
                                        '<div class="col-md-7 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;" style="overflow: hidden;">'+obj.address+'</div>'+
                                    '</div>'
                                $(".user_ares").append(html);
                            }); 

                        }
                    }  
                }); 
                 //添加地址到下单也页面中
               $(".insert_address").click(function(sweetalert){
                    //隐藏弹出层
                    $(".overlay_tow").hide();
                    $(".addres").hide();

                    //添加用户数据
                     var userId;
                    var delivery = $("input[name='delivery']");
                    $.each(delivery,function(key,obj){
                        if(obj.checked){
                            var user_Id = Number(obj.value);
                            userId=user_Id;
                        }
                    });
                   $.getJSON({  
                        type: "get",  
                        url:"../../json/address.json",  
                        async: false, 
                        cache:false,
                        dataType:"json", 
                        success: function(status) {
                           console.log(status);
                           $(".user_ares").empty();
                            if(status.data1.state==200){
                                $(".express_n").empty();
                                $(".express_p").empty();
                                $(".express_a").empty();
                                $(".express_s").find("p").empty();
                                $(".express_name").append('<span class="express_n">'+status.data1.data2.name+'</span>');
                                $(".express_phone").append('<span class="express_p">'+status.data1.data2.contact+'</span>');
                                $(".express_address").append('<span class="express_a">'+status.data1.data2.address+'</span>');
                                $(".express_s").find("p").append('<input type="text" id="express_s" value="'+status.data1.data2.id+'" style="display:none;">');
                            }
                        }  
                    }); 
                });
            });

            //添加新地址
           $(".appent_address").click(function(){
                var province = $("#province").val(),
                    city = $("#city").val(),
                    district =$("#district").val(),
                    name = $("#name").val(),
                    contact = $("#contact").val(),
                    text_detail  = $("#text_detail").val(),
                    address=province+" "+city+" "+district+" "+text,
                    address1=province+" "+city+" "+district;
                    var data={
                        "name" : name,
                        "contact" : contact,
                        "address" : address
                    };

                    var data1={
                        "name" : name,
                        "contact" : contact,
                        "address1" : address1,
                        "text_detail" : text_detail
                    };

                if(name==""){
                    swal("联系人不能为空!");
                    return false;
                }
                if(contact=="" || !(/^1[34578]\d{9}$/.test(contact))){
                    swal("请填写手机号且注意格式！");
                }    
                if(text.length<=2){
                     swal("详细地址不能小于2字!");
                    return false;
                }
                var html;
                html = '<div class="delivery_all" style="overflow: hidden;">'+
                    '<div class="col-md-1 product_list" data-field="state" data-checkbox="true" style="margin: 0;padding: 0;">'+
                        '<input type="radio" name="delivery" id="id" value="-1" />'+
                    '</div>' +
                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+name+'</div>'+
                    '<div class="col-md-2 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;">'+contact+'</div>'+
                    '<div class="col-md-7 product_list" data-field="product_id" data-align="center" style="margin: 0;padding: 0;" style="overflow: hidden;">'+address+'</div>'+
                '</div>'
                $(".user_ares").append(html);

                //将信息添加到相应的页面中
                $.getJSON({  
                    type: "post",  
                    url:"../../json/address.json",  
                    async: false, 
                    data:data1,// 序列化表单值  
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                        if(status.data.state==200){
                            $(".addres").hide();
                            $(".overlay_tow").hide(); 
                        } 
                    }  
                }); 
            });

            //生成订单
            $(".sales_review").click(function(sweetalert){

                //需下单种类的数数组
                var product_order_ids = [];
                var product = $("input[name='product_order_id']");
                $.each(product,function(key,obj){
                    if(obj){
                        var id = Number(obj.value);
                        product_order_ids.push(id);
                    }
                });

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

                //销售审核中数据json
                var contact_data = {
                    "product_order_id" : product_order_id,
                    "delivery_id" : delivery_id,
                    "production_num" : production_num,
                    "express_addres" : express_addres,
                    "text_info" : text_info,
                    "order_tax" : order_tax
                };
                
                //销售审核接口
               $.getJSON({  
                    type: "post",  
                    url:"../../json/6.json",  
                    async: false, 
                    data:contact_data,// 序列化表单值  
                    cache:false,
                    dataType:"json", 
                    success: function(status) {
                        if(status.contact.state==200){
                            $(".shop_orders").hide();
                            $(".overflow_three1").hide();
                            window.location.href="../../view/service/home.html";

                        }else{
                            swal("c");
                        } 
                    }  
                }); 
            });   

         }else{
            swal("请选择产品!");
         }
    });
    /*下单业务逻辑编写结束*/
})
/*自助下单功能逻辑开始*/