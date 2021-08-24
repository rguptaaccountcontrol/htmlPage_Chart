async function createGoogleDataTable(finalJAry)
{
    ////////////////// create array from json data so Google DATATABLE can injest it ///////////
    var StartPoint = finalJAry.length - 150; // Take last 150 days from the current date
    if (StartPoint < 0 )
        StartPoint = 1;

    var dAryFinal = [];
    for(var i=StartPoint;i<finalJAry.length;i++) // load only date after 6 months to current. We have 1 yr data for calculation by we display only 6 months
    {
        var rowObjFinal = [];

        rowObjFinal[0] = new Date(finalJAry[i].Date);  // Date 0
        rowObjFinal[1] = Number(finalJAry[i].Open);    // open 1
        rowObjFinal[2] = Number(finalJAry[i].High);    // high 2
        rowObjFinal[3] = Number(finalJAry[i].Low);    // low 3
        rowObjFinal[4] = Number(finalJAry[i].Close);    //close 4
        rowObjFinal[5] = Number(finalJAry[i]["Adj Close"]);    // AdjClo 5
        rowObjFinal[6] = Number(finalJAry[i].Volume);    // vol 6 
        rowObjFinal[7] = Number(finalJAry[i].nolag);    // nolag 7
        rowObjFinal[8] = Number(finalJAry[i].avg10d);    // avg10d 8
        rowObjFinal[9] = Number(finalJAry[i].StoK5B);    // StoK5 9
        rowObjFinal[10] = Number(finalJAry[i].StoK14B);    // StoK14 10
        rowObjFinal[11] = 80.0;                             // StoK14 Upper Band 11
        rowObjFinal[12] = 25.0;                            // StoK14 Lower Band 12
        rowObjFinal[13] = Number(finalJAry[i].AMAStopLoss);        // AMAStopLoss 13

        rowObjFinal[14] = Number(finalJAry[i].MtmRawStr);        // MtmRawStr 14
        rowObjFinal[15] = Number(finalJAry[i].MtmAvgStr);        // MtmAvgStr 15

        dAryFinal.push(rowObjFinal);

    }

    //console.log(dAryFinal);

    ////////////////////// create google table /////////////////
    // The name should not have a number at the end. It can have a number in it.
    
    var dData = new google.visualization.DataTable();
        dData.addColumn('date', 'Date');        // 0
        dData.addColumn('number', 'open');      // 1
        dData.addColumn('number', 'high');      // 2
        dData.addColumn('number', 'low');       // 3
        dData.addColumn('number', 'close');     // 4
        dData.addColumn('number', 'AdjClo');    // 5
        dData.addColumn('number', 'vol');       // 6
        dData.addColumn('number', 'nolag');     // 7
        dData.addColumn('number', 'avg10d');    // 8
        dData.addColumn('number', 'StoK5B');    // 9
        dData.addColumn('number', 'StoK14B');   // 10
        dData.addColumn('number', 'StoKUp');   // 11
        dData.addColumn('number', 'StoKDn');   // 12
        dData.addColumn('number', 'AMAStopLoss');   // 13
        dData.addColumn('number', 'MtmRawStr');   // 14
        dData.addColumn('number', 'MtmAvgStr');   // 15

        dData.addRows(dAryFinal);  // use the raw data array. All columns in the data array will be used

        // Make a view so we can pick the columns we want
        //var myView_dData = new google.visualization.DataView(dData);
        //myView_dData.setColumns([0, 5, 7, 8]);  // date, AdjClo 

        //return myView_dData;

        return dData; // return the google table
    


}