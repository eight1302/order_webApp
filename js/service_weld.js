/* 自助下单功能逻辑开始*/

function addOrUpdWeld(oriId){
    //获取焊接订单新数据信息
    var weld_product_name = $("#weld_product_name").val(),
        weld_product_type = $("#weld_product_type").val(),
        weld_pcba_process = $("#weld_pcba_process").val(),
        weld_pcba_smt_type = $("#weld_pcba_smt_type").val(),
        weld_pcba_smt_joints = $("#weld_pcba_smt_joints").val(),
        weld_pcba_dip_type = $("#weld_pcba_dip_type").val(),
        weld_pcba_dip_joints = $("#weld_pcba_dip_joints").val(),
        weld_pcba_stencil = $("#weld_pcba_stencil").val(),
        weld_pcba_stencil_number = $("#weld_pcba_stencil_number").val(),
        weld_test_time = $("#weld_test_time").val(),
        weld_prevent_cm2 = $("#weld_prevent_cm2").val(),
        weld_remark = $("#weld_remark").val(),
        product_class_type = $("#product_class_type").val();

    //数据库json格式
    var weld_data={
        "weld_product_name" : weld_product_name,
        "weld_product_type" : weld_product_type,
        "weld_pcba_process" : weld_pcba_process,
        "weld_pcba_smt_type" : weld_pcba_smt_type,
        "weld_pcba_smt_joints" : weld_pcba_smt_joints,
        "weld_pcba_dip_type" : weld_pcba_dip_type,
        "weld_pcba_dip_joints" : weld_pcba_dip_joints,
        "weld_pcba_stencil" : weld_pcba_stencil,
        "weld_pcba_stencil_number" : weld_pcba_stencil_number,
        "weld_test_time" : weld_test_time,
        "weld_prevent_cm2" : weld_prevent_cm2,
        "weld_remark" : weld_remark,
        "product_class_type" : product_class_type,
        "now_time":now_time
    };

    if(oriId){
        weld_data['id']=oriId;
    }

    //判断weld信息不能为空的选项信息
        
    if(weld_product_name=="" || weld_pcba_process=="" || weld_pcba_smt_type=="" || weld_pcba_dip_type==""){
        swal("信息不能为空!");
        return false;
    }

    //判断焊接点数、组装时间
    if(!(/[0-9]/.test(weld_pcba_smt_joints)) || !(/[0-9]/.test(weld_pcba_dip_joints)) || !(/[0-9]/.test(weld_pcba_smt_type)) || !(/[0-9]/.test(weld_pcba_dip_type))){
        swal("SMT和DIP的种类、焊接点数必须是数字!");
        return false;
    }

    //判断产品编号以及钢网编号
    if(weld_product_type=="" || (/[\u4e00-\u9fa5]/.test(weld_product_type))){
        swal("产品型号不能为空、汉字或全角符号！");
        return false;
    }
    if(weld_pcba_stencil_number!=""){
        if((/[\u4e00-\u9fa5]/.test(weld_pcba_stencil_number))){
            swal("钢网编号不能为汉字或全角符号！");
            return false;
        }
    }

    //判断焊接点数、组装时间           
     if(weld_test_time!=""){
        if(!(/[0-9]/.test(weld_test_time))){
            swal("焊接产品测试时间必须是数字!");
            return false;
       }
    }
       
    if(weld_prevent_cm2!=""){
        if(!(/[0-9]/.test(weld_prevent_cm2))){
            swal("喷涂三防必须是数字!");
            return false;
        }
    }
    //数据库交互
    $.ajax({  
        type: "post",  
        contentType: 'application/json',
        data:JSON.stringify(weld_data),// 序列化表单值  
        url:"/product/save",  
        async: false, 
        cache:false,
        dataType:"json", 
        error: function(status) { 
            console.log(status); 
                swal({
                title: "添加失败!",
                type: "error",
                timer: 5000,
                showConfirmButton: false,
                sleep : 20000
            });  
            window.location.reload();
        },  
        success: function(status) {
            if(status.code==1){
               swal({
                    title: "添加成功",
                    text:"点击OK，进行下一步上传文件操作"
                },function(){
                    $(".overlay_uplod").show();
                    $(".file_uplod").show();

                    var id = status.data;
                    console.log(id);
                      $(".add_pcb").on('click',function(sweetalert){
                        uploadFile(id,"weld_pcb_file","PCB",'pcb_file',"progress_pcb","time1","prog","rar,zip,tar,gzip,jar")
                       });
                       //上传BOM的excel文件
                       $(".add_bom").on('click',function(){
                        uploadFile(id,"weld_bom_file","BOM",'bom_shopfile',"progress_bom","time2","prog_bom","xlsx,xls")
                       });

                       //上传工艺文件
                       $(".add_process").on('click',function(){
                        uploadFile(id,"weld_process_file","工艺",'coordinate_file',"progress_process","time3","prog_process","rar,zip,tar,gzip,jar")
                       });
                       //上传坐标文件
                       $(".add_coordinate").on('click',function(){
                        uploadFile(id,"weld_coordinate_file","坐标",'process_file',"progress_coordinate","time4","prog_coordinate","rar,zip,tar,gzip,jar")
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


function paginationWeld(num,list){
     $(".page_list_weld").html('');
     $.each(list, function(idx,obj){
         if(idx>=((num-1)*pagesize) && idx<(num*pagesize)){
             drawTableWeld(obj)
            }
          });
}

function drawTableWeld(obj){
     var html;
     html = '<div class="product_all">'+
             '<div class="pad_three product_num" >'+'<input type="checkbox" name="sign" style="width: 15px;height: 15px;" value="'+obj.id+'" />'+'</div>'+
             '<div class="pad_three product_id">'+obj.product_id+'</div>'+
             '<div class="pad_three product_time">'+obj.product_time+'</div>'+
             '<div class="pad_three product_name"">'+obj.product_name+'</div>'+
             '<div class="pad_three product_type">'+obj.product_type+'</div>'+
             '<div class="pad_three product_list" name="sign" id="product_type" value="'+obj.product_class_type+'">'+obj.product_class_type+'</div>'+
             '<div class="pad_three product_details_weld" product_id="'+obj.id+'">查看详情</div>';
     $(".page_list_weld").append(html);
     DataTime() 
}

function renderWeldTable(){
    var data1 = $("#data1").val(),
    data2 = $("#data2").val();
    var data_time ={}
    if(data1!=null && data1.length>0){
        data_time = {
                "data1" : data1,
                "data2" : data2
            }
    }
    data_time['product_class_type']="焊接"
     $(".page_list_weld").html('');
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
                       drawTableWeld(obj)
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
    })
}

$(function(){
    $(".data1").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    $(".data2").cxCalendar({
        baseClass: 'cxcalendar_holyday'
    });
    renderWeldTable()
    //展示焊接信息自助下单获取信息业务逻辑编写开始
    $(".page_list_weld").on('click','.product_details_weld',function(){
        //加载弹出遮盖层
        var id= $(this).attr("product_id");
        console.log(id);
        var id_data={
            "id":id
        };
        $(".overlay_weld_tow").show();
        $(".orders_weld_details").show();
                       
        $(".cental_pro").on('click',function(){
            $(".overlay_weld_tow").hide();
            $(".orders_weld_details").hide();
            window.location.reload();
        });

        //获取产品信息
        $.getJSON({
             url:"/product/detail?id="+id,
            cache:false,
            success:function(result,data){
                    //产品型号
                    var html_product;
                    html_product = '<div class="col-md-4">'+result.weld_product_id+'</div>'+
                                    '<div class="col-md-4">'+result.weld_product_name+'</div>'+
                                    '<div class="col-md-4">'+result.weld_product_type+'</div>';
                    $(".weld_list").append(html_product);

                    //下载按钮
                     var html_downlod;
                    html_downlod = '<a class="col-md-5 product_list" href="/product/down?path='+encodeURI(result.pcb_file)+'" title="PCB下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;">PCB</a>'+
                                '<a class="col-md-5 product_list" href="/product/down?path='+encodeURI(result.coordinate_file)+'" title="坐标文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;">坐标</a>'+
                                '<a class="col-md-5 product_list" href="/product/down?path='+encodeURI(result.process_file)+'" title="工艺文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: left;margin-top: 10px;">工艺</a>'+
                                '<a class="col-md-5 product_list" href="/product/down?path='+encodeURI(result.bom_shopfile)+'" title="BOM文件下载" style="height: 30px;line-height: 30px;background: #03A9F4;border-radius: 10px;color: #fff;float: right;margin-top: 10px;">BOM</a>';   
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
            }
        });
        
        //获取bom信息
        $.getJSON({
            url:"../../json/weld.json",
            cache:false,
            data:id_data,
            success:function(result,data){
                if(result.state==200){
                    //bom表头
                    $.each(result.bom_tital, function(idx,obj){
                        var bom_tital;
                        bom_tital ='<div class="col-md-1">'+obj.numbering+'</div>'+
                                    '<div class="col-md-2">'+obj.name+'</div>'+
                                    '<div class="col-md-1">'+obj.type+'</div>'+
                                    '<div class="col-md-1">'+obj.encapsulation+'</div>'+
                                    '<div class="col-md-2">'+obj.bit_number+'</div>'+
                                    '<div class="col-md-1">'+obj.accuracy+'</div>'+
                                    '<div class="col-md-2">'+obj.brands+'</div>'+
                                    '<div class="col-md-1">'+obj.quantity+'</div>'+
                                    '<div class="col-md-1">备注</div>';
                        $(".product_tr_weld").append(bom_tital);
                    });
                    //bom清单
                    $.each(result.bom, function(idx,obj){
                        var html_bom;
                        html_bom ='<div class="bom_list_oem">'+ 
                                '<div class="col-md-1">'+obj.number+'</div>'+
                                '<div class="col-md-2">'+obj.name+'</div>'+
                                '<div class="col-md-1">'+obj.model_number+'</div>'+
                                '<div class="col-md-1">'+obj.encapsulation+'</div>'+
                                '<div class="col-md-2">'+obj.accuracy+'</div>'+
                                '<div class="col-md-1">'+obj.brands+'</div>'+
                                '<div class="col-md-2">'+obj.bit_number+'</div>'+
                                '<div class="col-md-1">'+obj.quantity+'</div>'+
                                '<div class="col-md-1 weld_bom" title="'+obj.remark+'">'+obj.remark+'</div>'+
                            '</div>';   
                        $(".product_bom").append(html_bom);
                        $(".weld_bom").each(function(){
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


    //查询时间段的信息
    $(".search_btn").on('click',function(){
        renderWeldTable();
    });
   

    /*下单按钮以及图层业务逻辑展示*/
    $(".product_menu_weld_add").on('click',function(){
        $(".overflow_weld").show();
        $(".weld_details").show();
        //退出焊接下单页面
        $(".cental_pro").on('click',function(){
            $(".overflow_weld").hide();
            $(".weld_details").hide();
            window.location.reload();
        });
    });

     /*自助下单获取信息业务逻辑编写结束*/

    //删除焊接单个产品
    $(".product_menu_weld_dele").on('click',function(){
        var productIds ='';
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
                    var dataID={
                        "productIds":productIds
                    }
                    $.getJSON({
                         url:"/product/del?ids="+productIds,
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

      //点击图片上传pcb文件
    $(".uplod_weld_pcb").on('click',function(sweetalert){
        document.getElementById("weld_pcb_file").click();
    });

    //点击图片上传坐标文件
    $(".uplod_weld_coordinate").on('click',function(sweetalert){
        document.getElementById("weld_coordinate_file").click();
    });

     //点击图片工艺文件
    $(".uplod_weld_process").on('click',function(sweetalert){
        document.getElementById("weld_process_file").click();
    });

     //点击图片BOM文件
    $(".uplod_weld_bom").on('click',function(sweetalert){
        document.getElementById("weld_bom_file").click();
    });

    /*weld产品信息填写业务逻辑编写*/
    $(".add_weld_product").on('click',function(sweetalert){
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
                addOrUpdWeld();
            }
        });
    })
    /*weld产品信息填写业务逻辑编写*/

    /*修改焊接产品信息开始*/
    $(".product_menu_weld_update").on('click',function(){
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
                    $(".overflow_weld").show();
                    $(".weld_details").show();
                    $(".cental_pro").on('click',function(){
                        $(".overlay_one").hide();
                        $(".add_products").hide();
                        window.location.reload();
                    });
                    //修改焊接订单
                    //焊接信息
                    $("#weld_product_name").val(result.weld_product_name);
                    $("#weld_product_type").val(result.weld_product_type);
                    $("#weld_pcba_process").val(result.weld_pcba_process);
                    $("#weld_pcba_smt_type").val(result.weld_pcba_smt_type);
                    $("#weld_pcba_smt_joints").val(result.weld_pcba_smt_joints);
                    $("#weld_pcba_dip_type").val(result.weld_pcba_dip_type);
                    $("#weld_pcba_dip_joints").val(result.weld_pcba_dip_joints);
                    $("#weld_pcba_stencil").val(result.weld_pcba_stencil);
                    $("#weld_pcba_stencil_number").val(result.weld_pcba_stencil_number);
                    $("#weld_test_time").val(result.weld_test_time);
                    $("#weld_prevent_cm2").val(result.weld_prevent_cm2);
                    $("#weld_remark").val(result.weld_remark);
    
                    //修改信息
                    $(".add_weld_product").on('click',function(sweetalert){
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
                                addOrUpdWeld(result.id);
                            }
                        });
                    })
                    /*weld产品信息填写业务逻辑编写*/
                }       
            });
        }else{
            swal("请选择一个产品进行修改!");
        } 
    });
    /*修改产品信息结束*/
    
  //生成订单
    $(".sales_review").on('click',function(sweetalert){
     genOrder('焊接')
    });   

    /*下单业务逻辑编写开始*/
    $(".product_menu_weld_order").on('click',function(sweetalert){
        var productIds ='';
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
})
/*自助下单功能逻辑开始*/