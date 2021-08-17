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
            0: { pointSize: .5, pointShape: 'square', lineWidth: 0.0 },  // price line
            1: { lineWidth: 0.5 },  // no lag
            2: { lineWidth: 0.5},
            //2: { pointSize: .5, pointShape: 'square', lineWidth: 0.0 },
            3: { lineWidth: 0.5, lineDashStyle: [1,1] },
        },

    colors: ["black", "red", "black", "blue","green"],

    chartArea:{left:'5%',top:'10%',width:'85%',height:'65%'},
  };
/////////////////////////////////////////////////////////////////////

  var options_Sto = {
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
            0: { lineWidth: 0.5 },  // Sto 5
            1: { lineWidth: 0.5 },  // Sto14
            2: { lineWidth: 0.5},   // Sto Up Band
            3: { lineWidth: 0.5},   // Sto Low Band
            //2: { pointSize: .5, pointShape: 'square', lineWidth: 0.0 },
            //3: { lineWidth: 0.5, lineDashStyle: [1,1] },
        },

    colors: ["black", "#7800FF", "red", "blue"],

    chartArea:{left:'5%',top:'10%',width:'85%',height:'65%'},
  };
