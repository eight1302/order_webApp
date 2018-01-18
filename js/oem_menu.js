$(function(){

    //加载数据
    var data = "OEM";
    renderOemSaleTable(data)
        //查询合同信息
    $(".con_btn").on('click',function(){
        var contract_no = $("#contract_no").val();
        if(contract_no == "" || !(/[A-Z][0-9]{5}/.test(contract_no))){
            return false;
        }
         renderOemSaleNumTable(data,contract_no)
    });

    //判断产品名称、型号
     $(".pooduct_name").each(function(){
        var news_maxwidth=4;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });
    $(".product_type").each(function(){
        var news_maxwidth=4;
        if($(this).text().length>news_maxwidth){
            $(this).text($(this).text().substring(0,news_maxwidth));
            $(this).html($(this).html()+'…');
        }
    });

    //展示返修产品信息
    $(".oem_contracts").on('click','.selcet_detail',function(){
       $(".product_repair").show();
       $(".product_all").show();

        //取消按钮操作
        $(".cental_pro_one").on('click',function(){
            window.location.reload();
        });

        //获取ID
         var Id= Number($(this).attr("product_id"));

         //展示返修产品列表
         SealProduct(Id)

        //展示质量问题
        $(".product").on('click','.question_detail',function(){
            $(".question_product").show();
            $(".product_question").show();
            var Id= Number($(this).attr("product_id"));

            //取消按钮操作
            $(".cental_pro").on('click',function(){
                $(".question_product").hide();
                $(".product_question").hide();
            });
            //展示返修产品列表
            SealQuestion(Id)
        });
    });

    //填写物流信息
    $(".oem_contracts").on('click','.log_info',function(){
        $(".product_repair").show();
        $(".logis_product").show();

        //取消按钮操作
        $(".cental_pro_one").on('click',function(){
            window.location.reload();
            $(".product_repair").hide();
            $(".logis_product").hide();
        });

        //获取返修产品ID
        var Id= Number($(this).attr("product_id"));

        //判断快递选项
        Express()
        

        //提交信息
        $(".oem_repair_btn").on("click",function(){
            var distribution = $("#distribution").val(),
                delivery = $("#delivery").val(),
                con_on = $("#con_on").val();
            
            if(distribution == "0" ){
                swal("配送方式不能为空");
                return false;
            }
            if(!delivery){
                swal("快递方式不能为空");
                return false;
            }

            //数据格式转换为json对象
            var data_distr = {
                "Id" : Id,
                "distribution" : distribution,
                "delivery" : delivery,
                "con_on" : con_on
            };
            ExpressData(data_distr)
        });
    });
});