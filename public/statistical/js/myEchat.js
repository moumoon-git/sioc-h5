
//小区折线图
function initTimePeriodChart(x,y) {
    //折线图
    var line = document.getElementById("myLineChat","macarons");
    var myLine = echarts.init(line);
    window.onresize = myLine.resize;  // 适应屏幕放大缩小
    var option;

    option = {
        backgroundColor: '#FFF',
        grid: {
            top: '9%',
            bottom: '19%',
            left: '15%',
            right: '8%'
        },
        tooltip: {
            trigger: 'axis',
            label: {
                show: true
            }
        },
        xAxis: {
            boundaryGap: true, //默认，坐标轴留白策略
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            // axisLabel:{
            //     interval: 0,
            //     rotate:25,
            //     textStyle: {
            //         color:'#2e2f31',
            //     }
            // },
            data: x
        },
        yAxis: {
            axisLine: {
                show: false
            },
            //这个是底部线条的颜色
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(33,148,246,0.2)'
                }
            },
            axisTick: {
                show: false
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: 'rgb(245,250,254)'
                }
            }
        },
        series: [{
            type: 'line',
            symbol: 'circle',
            symbolSize: 7,
            lineStyle: {
                normal: {
                    width: 2,
                    color: {
                        type: 'linear',
                        colorStops: [{
                            offset: 0,
                            color: '#3c91ff' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#5bc6ff' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(72,216,191, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffffff',
                    borderWidth: 3,
                    borderColor: "#5bc6ff"
                }
            },
            smooth: true,
            label: {
                show: false,
                distance: 1,
                emphasis: {
                    show: true,
                    offset: [25, -2],
                    color: '#3c91ff',
                    padding: [8, 20, 8, 6],
                    height: 36,
                    formatter: function(params) {
                        var name = params.name;
                        var value = params.data;
                        var str = name + '\n上报数量：' + value;
                        return str;
                    },
                    rich: {
                        bg: {
                            width: 78,
                            color: '#3c91ff',
                            padding: [20, 0, 20, 10]
                        },
                        br: {
                            width: '100%',
                            height: '100%'
                        }

                    }
                }
            },
            data: y
        }]
    };

    //设置
    if (option && typeof option === "object") {
        myLine.setOption(option);
    }

}

//学校折线图
function initSchoolTimePeriodChart(x,y) {
    // if(!x){
    //     x = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
    //     y = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
    // }

    //折线图
    var line = document.getElementById("mySchoolLineChat","macarons");
    var myLine = echarts.init(line);
    window.onresize = myLine.resize;  // 适应屏幕放大缩小
    var option;

    option = {
        backgroundColor: '#FFF',
        grid: {
            top: '9%',
            bottom: '19%',
            left: '15%',
            right: '8%'
        },
        tooltip: {
            trigger: 'axis',
            label: {
                show: true
            }
        },
        xAxis: {
            boundaryGap: true, //默认，坐标轴留白策略
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            // axisLabel:{
            //     interval: 0,
            //     rotate:25,
            //     textStyle: {
            //         color:'#2e2f31',
            //     }
            // },
            data: x
        },
        yAxis: {
            axisLine: {
                show: false
            },
            //这个是底部线条的颜色
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(33,148,246,0.2)'
                }
            },
            axisTick: {
                show: false
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: 'rgb(245,250,254)'
                }
            }
        },
        series: [{
            type: 'line',
            symbol: 'circle',
            symbolSize: 7,
            lineStyle: {
                normal: {
                    width: 2,
                    color: {
                        type: 'linear',
                        colorStops: [{
                            offset: 0,
                            color: '#3c91ff' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#5bc6ff' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(72,216,191, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffffff',
                    borderWidth: 3,
                    borderColor: "#5bc6ff"
                }
            },
            smooth: true,
            label: {
                show: false,
                distance: 1,
                emphasis: {
                    show: true,
                    offset: [25, -2],
                    color: '#3c91ff',
                    padding: [8, 20, 8, 6],
                    height: 36,
                    formatter: function(params) {
                        var name = params.name;
                        var value = params.data;
                        var str = name + '\n上报数量：' + value;
                        return str;
                    },
                    rich: {
                        bg: {
                            width: 78,
                            color: '#3c91ff',
                            padding: [20, 0, 20, 10]
                        },
                        br: {
                            width: '100%',
                            height: '100%'
                        }

                    }
                }
            },
            data: y
        }]
    };

    //设置
    if (option && typeof option === "object") {
        myLine.setOption(option);
    }

}


