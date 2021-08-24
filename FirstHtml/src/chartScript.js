var jsonAryPr;  // this is the JSON variable for price data
var dataAryPr;  // this is a array for price data

// Load the Visualization API and the piechart package.
google.charts.load('current', { 'packages': ['corechart'] });
    
// Set a callback to run when the Google Visualization API is loaded.
// We have commented the line below because wa want the chart to appear on a click of button
//google.charts.setOnLoadCallback(drawChart_Final);

function drawChart_Final(s, prType) {

    
    async function af()
    {
        var sym = s.toUpperCase()
        var winWidth = $( window ).width();  // width of the window
        //winWidth = Math.min(winWidth, 614);  // The max width of the chart can be 614 px
        ////////////////////////////////////////////////////////////////////
        //console.log(sym,prType); // prType=1 daily, 2 weekly, 3 monthly
        var NumberOfDays;
        switch (prType)
        {
            case 1:  // for daily chart
                NumberOfDays = 365; // should increase it to 600 later
                break;
            case 2: // for weekly chart
                NumberOfDays = 1460;
                break;
            case 3: // for monthly chart
                NumberOfDays = 365; // should increase it to 7220 later
                break;
        }

        var dataFromYahoo = await YahooData(sym, NumberOfDays); // get Yahoo data for a symbol YahooData(sym, noOfDays)
        //console.log(dataFromYahoo);
        /////////////////////////////////////////////////////////////////////////////
        // Do other CALCULATIONS here, like stocastics, Avg etc
        var jAryPrClean = await cleanData(dataFromYahoo);
        //console.log(jAryPrClean);
        jsonAryPr = jAryPrClean;  // assign the ceaned up array
        jWk = await Daily2Weekly(jsonAryPr); // create weekly data in JSON format
       
        // initialize the html page for weekly chart
        // should move the initialize to a function
        document.getElementById("chart_id_Wk_CloPr").innerHTML = "";
        document.getElementById("chart_id_Wk_Sto").innerHTML = "";
        document.getElementById("chart_id_Wk_Mtm").innerHTML = "";

        switch (prType)
        {
            case 1:  // for daily chart
                prType = 1; // we set it to 1, daily till we have the logic in place for weekly and monthly
                DailyChart = await DrawDailyChart(sym, jsonAryPr);  // draw daily chart
                break;
            case 2: // for weekly chart
                prType = 1; // we set it to 1, daily till we have the logic in place for weekly and monthly
                DailyChart = await DrawDailyChart(sym, jsonAryPr);  // draw daily chart
                WeeklyChart = await DrawWeeklyChart(sym, jWk);  // draw daily chart
                break;
            case 3: // for monthly chart
                prType = 1; // we set it to 1, daily till we have the logic in place for weekly and monthly
                DailyChart = await DrawDailyChart(sym, jsonAryPr);  // draw daily chart
                break;     
        }

        //prType = 1; // we set it to 1, daily till we have the logic in place for weekly and monthly
        //DailyChart = await DrawDailyChart(sym, jsonAryPr);  // draw daily chart
        ////////////////////////////////////////////////////////////
        
    }

    af();

}

/////////////////////////////////////////////////////////
function YahooData(sym, numOfDays){  // get Yahoo historical data and move it to a JSON array

    console.log('reached YahooData ', sym);
      
    var csvdata;

    //console.log(JSON.stringify(csvdata));
    var d;
    var y_Data;
    var j_data;

    async function bb(sym, numOfDays)
    {
        d = await myFunYahooHist(sym, numOfDays);  // get yahoo historical data

        csvdata = d.data;   // the data in CVS for is in the .data field
        
        var lines=csvdata.split("\n");

        var jsonAry = [];
        var dAry = [];
       
        //console.log(dAry);
        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers=lines[0].split(",");
        //console.log(headers);

        for(var i=1;i<lines.length;i++){

            var obj = {};
            var currentline=lines[i].split(",");

            for(var j=0;j<headers.length;j++){
                if (headers[j] === "Date") // We change the date format to work with Safari
                    currentline[j] = currentline[j].replace('-','/').replace('-','/'); //Date yyyy/mm/dd

                obj[headers[j]] = currentline[j];

                //console.log(j,headers[j], currentline[j]);
            }

            jsonAry.push(obj);
            ///////////// my work for creating array for google /////////////////
            var rowObjL = [];
            // Need to replace "-" by "/" for date to work properly. One replace only replaces one occrunce.
            currentline[0] = currentline[0].replace('-','/').replace('-','/'); // date is require in yyyy/mm/dd format for the chart to work on Safai
            rowObjL[0] = new Date(currentline[0]);  // Date
            //let dtTemp = new Date(currentline[0]);
            //let noTime = new Date(dtTemp.getFullYear(), dtTemp.getMonth(), dtTemp.getDate());
            //rowObjL[0] = dtTemp; //noTime; //currentline[0];
            
            rowObjL[1] = Number(currentline[1]);    // open
            rowObjL[2] = Number(currentline[2]);    // high
            rowObjL[3] = Number(currentline[3]);    // low
            rowObjL[4] = Number(currentline[4]);    //close
            rowObjL[5] = Number(currentline[5]);    // AdjClo
            rowObjL[6] = Number(currentline[6]);    // vol

            dAry.push(rowObjL);
        }

        //console.log(dAry);
        jsonAryPr = jsonAry; //move the data to a global variable
        dataAryPr = dAry; // move data to global variables

        return jsonAry;  // return the JSON array
/////////////////////////////////////////////////////////////////////////////////////////////////
    }

    return bb(sym, numOfDays);
    

}
////////////////////////////////////////////////////////
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


