var jsonAryPr;  // this is the JSON variable for price data
var dataAryPr;

// Load the Visualization API and the piechart package.
google.charts.load('current', { 'packages': ['corechart'] });
    
// Set a callback to run when the Google Visualization API is loaded.
// We have commented the line below because wa want the chart to appear on a click of button
//google.charts.setOnLoadCallback(drawChart_Final);

function drawChart_Final(s) {

    async function af()
    {
        var sym = s.toUpperCase()
        var winWidth = $( window ).width();  // width of the window
        //winWidth = Math.min(winWidth, 614);  // The max width of the chart can be 614 px
        ////////////////////////////////////////////////////////////////////
        var dataFromYahoo = await YahooData(sym); // get Yahoo data for a symbol
        /////////////////////////////////////////////////////////////////////////////
        // Do other CALCULATIONS here, like stocastics, Avg etc
        //console.log(jsonAryPr);
        //console.log(dataAryPr);
        console.log(1);
        var rnNoLag = [];
        var NoLag =  await fn_CalcNoLagEMA(jsonAryPr, 1,rnNoLag);  // we pass the jasonAry and the price type 1=daily, 2=weekly, 3=monthly
        //console.log("jsonAry len: ", NoLag);
        //console.log("rn: ", rnNoLag.value);
        console.log(2);
        var Pr10dAvg = await fn_CalcSMA(jsonAryPr, 1, 10); // 10 day moving average
        //console.log(Pr10dAvg);
        console.log(3);
        // COMBINE ALL CALCULATED DATA INTO ONE JSON ARRAY
        var PrPlusNoLag = await combineData(jsonAryPr, NoLag, "nolag");  // pass the array to which we need to combine the key and the key
        var PrPlusNoLag = await combineData(PrPlusNoLag, Pr10dAvg, "avg10d");  // pass the array to which we need to combine the key and the key
        //console.log(PrPlusNoLag);
        console.log(4);
        
        //////////////////////////////////////////////////////////////////////////////
        // put data in a MASTER DATA TABLE. This GOOGLE DATATABLE will have all the data we want for every chart.
        var masterDataTable = new google.visualization.DataTable();
        masterDataTable = await createGoogleDataTable(PrPlusNoLag);
        //console.log(masterDataTable);

        /////////////////////////////////////////////////////////////////////////////
        // Daily price chart. select the data we want from the master table for daily price chart
        var DlyData_CloPr = new google.visualization.DataView(masterDataTable);
        DlyData_CloPr.setColumns([0, 5, 7, 8]);  // date, AdjClo, nolag, avg10d 

        var chart_Dly_CloPr = new google.visualization.LineChart(document.getElementById('chart_id_Dly_CloPr'));
        options_Dly.title = 'Daily Close Price ' + sym;
        options_Dly.width = winWidth;
        chart_Dly_CloPr.draw(DlyData_CloPr, options_Dly);

        
    }

    af();

}

/////////////////////////////////////////////////////////
function YahooData(sym){

    console.log('reached YahooData ', sym);
      
    var csvdata;

    //console.log(JSON.stringify(csvdata));
    var d;
    var y_Data;
    var j_data;

    async function bb(sym)
    {
        d = await myFunHist(sym);

        csvdata = d.data;
        
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

        //console.log(JSON.stringify(jsonAry));
        jsonAryPr = jsonAry; //move the data to a global variable
        dataAryPr = dAry; // move data to global variables
/////////////////////////////////////////////////////////////////////////////////////////////////
        /*
        var dData = new google.visualization.DataTable();
        dData.addColumn('date', 'Date');           // 0
        dData.addColumn('number', 'open');      // 1
        dData.addColumn('number', 'high');      // 2
        dData.addColumn('number', 'low');      // 3
        dData.addColumn('number', 'close');      // 4
        dData.addColumn('number', 'AdjClo');      // 5
        dData.addColumn('number', 'vol');      // 5

        dData.addRows(dAry);  // use the raw data array. All columns in the data array will be used

        // Make a view so we can pick the columns we want
        var myView_dData = new google.visualization.DataView(dData);
        myView_dData.setColumns([0, 5]);  // date, AdjClo 

        return myView_dData;
        */
////////////////////////////////////////////////////////////////////////////////////
    }

    return bb(sym);
    

}
////////////////////////////////////////////////////////
async function createGoogleDataTable(finalJAry)
{
    ////////////////// create array from json data so Google DATATABLE can injest it ///////////
    var dAryFinal = [];
    for(var i=1;i<finalJAry.length;i++)
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

        dAryFinal.push(rowObjFinal);

    }

    //console.log(dAryFinal);

    ////////////////////// create google table /////////////////
    
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

        dData.addRows(dAryFinal);  // use the raw data array. All columns in the data array will be used

        // Make a view so we can pick the columns we want
        //var myView_dData = new google.visualization.DataView(dData);
        //myView_dData.setColumns([0, 5, 7, 8]);  // date, AdjClo 

        //return myView_dData;

        return dData; // return the google table
    


}


