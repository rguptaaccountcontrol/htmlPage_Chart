var options_Dly_Pr = {
    width: 614, //winWidth,
    title: 'Daily Relative Strenght Line',

    legend: {
              position: 'in',
              //maxLines: 2,
          },
    crosshair: { trigger: 'both' }, // Display crosshairs on focus and selection.

    hAxis: {showTextEvery: 1,
           gridlines: {count: 50, lineWidth: 0.25},
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
            //0: { targetAxisIndex: 0, lineWidth: 0.75 },  // price line
            0: { pointSize: .5, pointShape: 'square', lineWidth: 0.5 },  // price line
            1: { lineWidth: 0.5 },  // no lag
            2: { lineWidth: 0.5},   // avg10d
            3: { pointSize: .5, pointShape: 'square', lineWidth: 0.0 },
            //4: { lineWidth: 0.5, lineDashStyle: [1,1] },
        },

    colors: ["black", "red", "black", "green","green"],

    chartArea:{left:'5%',top:'10%',width:'85%',height:'65%'},
  };
/////////////////////////////////////////////////////////////////////

  var options_Sto = {
    width: 614, //winWidth,
    title: 'Daily Relative Strenght Line',
    titleTextStyle: {
      color: "rgb(136, 196, 255)",
      fontSize: 10,
    },

    legend: {
              position: 'in',
              textStyle: {fontSize: 10},
          },
    crosshair: { trigger: 'both' }, // Display crosshairs on focus and selection.

    hAxis: {showTextEvery: 100000,  // this spaces out the test every 100000, effectively stopping it from showing on the chart.
           gridlines: {count: 50, lineWidth: 0.25},
           textPosition: 'in',
           },

    vAxes: {0: {  viewWindowMode:'explicit',
                  viewWindow:{
                             max:110,
                             min:-10,
                             },
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
            //0: { targetAxisIndex: 0, lineWidth: 0.75 },  // price line
            0: { lineWidth: 0.5, labelInLegend: "Sto" },  // Sto 5
            1: { lineWidth: 0.5 },  // Sto14
            2: { lineWidth: 0.5, visibleInLegend: false},   // Sto Up Band
            3: { lineWidth: 0.5, visibleInLegend: false},   // Sto Low Band
            //2: { pointSize: .5, pointShape: 'square', lineWidth: 0.0 },
            //3: { lineWidth: 0.5, lineDashStyle: [1,1] },
        },

    colors: ["black", "#7800FF", "red", "blue"],

    chartArea:{left:'5%',top:'10%',width:'85%',height:'65%'},
  };

  /////////////////////////////////////////////////////////////////////
  
  