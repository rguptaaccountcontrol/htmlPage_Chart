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
                NumberOfDays = 1460*2; //7220; // should increase it to 7220 later
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
        var jMth = await Daily2Monthly(jsonAryPr); // create monthly data in JSON format
       
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
                WeeklyChart = await DrawWeeklyChart(sym, jWk);  // draw weekly chart
                break;
            case 3: // for monthly chart
                prType = 1; // we set it to 1, daily till we have the logic in place for weekly and monthly
                DailyChart = await DrawDailyChart(sym, jsonAryPr);  // draw daily chart
                WeeklyChart = await DrawWeeklyChart(sym, jWk);  // draw weekly chart
                MthlyChart = await DrawMonthlyChart(sym, jMth);  // draw monthly chart
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


