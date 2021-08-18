var options_Mtum = {
    width: 614, //winWidth,
    title: 'Daily Relative Strenght Line',

    legend: {
              position: 'in',
              //maxLines: 2,
          },
    crosshair: { trigger: 'both' }, // Display crosshairs on focus and selection.

    hAxis: {showTextEvery: 100000,  // this spaces out the test every 100000, effectively stopping it from showing on the chart.
        
           gridlines: {count: 50, lineWidth: 0.25},
           textPosition: 'in',
           },

    vAxes: {0: {  //viewWindowMode:'explicit',
                  //viewWindow:{
                  //           max:DlyMaxVal,
                  //           min:DlyMinVal,
                  //           },
                gridlines: {count: 10},
                //ticks : [0, {v:300, f:'TT'}, 180],
                baselineColor : 'grey',
                title: 'Index',
                textColor: 'grey',
                textPosition: 'in'   // hides the gridline values
                },
          /*  1: {viewWindowMode: {min:80},
                gridlines: {color: 'blue', count: 4},
                format:"#",
                viewWindow:{
                //            max:410,
                            min:80
                            },
                gridlines: {count: 10},
                //ticks : [-100,{v:-50, color:'red'},0,50,100],
                title: 'Osc',
                textPosition : 'out',
                textColor : 'green',
                },*/
            },

    series: {
            0: { pointSize: .5, pointShape: 'square', lineWidth: 0.5 },  // MtmRawStr
            1: { lineWidth: 0.5 },  // MtmAvgStr
        },

    colors: ["black", "blue"],

    chartArea:{left:'5%',top:'10%',width:'85%',height:'65%'},
  };
