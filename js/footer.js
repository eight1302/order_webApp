$(function(){
	//自动2秒播放
	$('#myCarousel').carousel({
		interval : 2000,
	});

	//公告列表显示
	Cement()

	//公告详情展示
	$(".bulletin_new").on('click','.showdepartmentview',function(){
        $(".overlay_home").show();
        $(".corporate_actions").show();
        $(".corporate_news").empty();
        var id= $(this).attr("chuang_id"),
        	chuang_news = $(this).find(".chuang_news").html(),
        	chuang_time = $(this).find(".chuang_time").html(),
        	content = $(this).attr("content"),
        	pub_name = $(this).attr("pub_name");

        var data={
        	"chuang_news" : chuang_news,
        	"chuang_time" : chuang_time,
        	"content" : content,
        	"pub_name" : pub_name,
        }

       drawCementInfo(data)

                    
        //退出弹出窗
        $(".corporate_actions").on('click','.col-btn',function(){
	        $(".overlay_home").hide();
	        $(".corporate_actions").hide();
	    });
    });
	
	renderOemOrderTable()

	/*订单状态分析echarts饼状图展示消费   支付*/
	$.getJSON({
    	url:"../../json/3.json",
    	cache:false,
    	success:function(result){
    			var myChart1 = echarts.init(document.getElementById('mychart1'));
				var trem1_option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'right',
				        data:['支付','未支付']
				    },
				    color : ['#38b9db','#e15172'],
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '60%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '10',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:result
				        }
				    ]
				};
				 myChart1.setOption(trem1_option);
    	},
    	error:function(){}
	});
	

	/*订单状态分析echarts饼状图展示消费  焊接状态*/
	$.getJSON({
    	url:"../../json/3.json",
    	cache:false,
    	success:function(result){
    			var myChart2 = echarts.init(document.getElementById('mychart2'));
				var trem2_option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'right',
				        data:['焊接','非焊接']
				    },
				    color : ['#6fbe44','#f6da37'],
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '60%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '10',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:result
				        }
				    ]
				};
				myChart2.setOption(trem2_option);
    	},
    	error:function(){}
	});

	
	/*订单状态分析echarts饼状图展示消费  完成状态*/
	$.getJSON({
    	url:"../../json/3.json",
    	cache:false,
    	success:function(result){
    			var myChart3 = echarts.init(document.getElementById('mychart3'));
				var trem3_option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'right',
				        data:['完成','未完成']
				    },
				    color : ['#cb4fe2','#f96244'],
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['40%', '60%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '10',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:result
				        }
				    ]
				};
				//加载echarts图形
				 myChart3.setOption(trem3_option);
    	},
    	error:function(){}
	});
	//订单完成状态
});			