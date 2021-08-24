async function DrawMonthlyChart(sym, jWklyArray)
    {
        //var sym = s.toUpperCase()
        var winWidth = $( window ).width();  // width of the window
        //winWidth = Math.min(winWidth, 614);  // The max width of the chart can be 614 px
        ////////////////////////////////////////////////////////////////////

        prType = 1; // we set it to 1, daily till we have the logic in place for weekly and monthly
        ////////////////////////////////////////////////////////////
        var rnNoLag = [];
        var NoLag =  await fn_CalcNoLagEMA(jWklyArray, 1,rnNoLag);  // we pass the jasonAry and the price type 1=daily, 2=weekly, 3=monthly
        var Pr10dAvg = await fn_CalcSMA(jWklyArray, 10); // 10 day moving average of close price
        var stocastics5 = await fn_CalcStocastics(jWklyArray,5,3,3); //5 days lookback, 3 days avg for %D, 3 days avg for %K 
        var stocastics14 = await fn_CalcStocastics(jWklyArray,14,3,3); //14 days lookback, 3 days avg for %D, 3 days avg for %K 
        var bounds = await fn_CalcBounds_AMA(jWklyArray,1);  // calculate bounds and AMA and AMAStopLossPrice
        var prMtm = await fn_CalcPriceMomentum(jWklyArray,1);
        
        // COMBINE ALL CALCULATED DATA INTO ONE JSON ARRAY
        var PrFinalAry = await combineData(jWklyArray, NoLag, "nolag");  // pass the array to which we need to combine the key and the key
        var PrFinalAry = await combineData(PrFinalAry, Pr10dAvg, "avg10d");  // pass the array to which we need to combine the key and the key
        var PrFinalAry = await combineData(PrFinalAry, stocastics5, "StoK5B");  // pass the array to which we need to combine the key and the key
        var PrFinalAry = await combineData(PrFinalAry, stocastics14, "StoK14B");  // pass the array to which we need to combine the key and the key
        var PrFinalAry = await combineData(PrFinalAry, bounds, "AMAStopLoss");  // pass the array to which we need to combine the key and the key
        var PrFinalAry = await combineData(PrFinalAry, prMtm, "MtmRawStr");  // pass the array to which we need to combine the key and the key
        var PrFinalAry = await combineData(PrFinalAry, prMtm, "MtmAvgStr");  // pass the array to which we need to combine the key and the key

        //////////////////////////////////////////////////////////////////////////////
        // put data in a MASTER DATA TABLE. This GOOGLE DATATABLE will have all the data we want for every chart.
        var masterDataTable = new google.visualization.DataTable();
        masterDataTable = await createGoogleDataTable(PrFinalAry);
        //console.log(masterDataTable);

        /////////////////////////////////////////////////////////////////////////////
        // Daily price chart. select the data we want from the master table for daily price chart
        var DlyData_CloPr = new google.visualization.DataView(masterDataTable);
        DlyData_CloPr.setColumns([0, 4, 7, 8, 13]);  // date, AdjClo, nolag, avg10d, AMA

        var chart_Dly_CloPr = new google.visualization.LineChart(document.getElementById('chart_id_Wk_CloPr'));
        options_Dly_Pr.title = 'Monthly Close Price (' + sym + ')';
        options_Dly_Pr.width = winWidth;
        chart_Dly_CloPr.draw(DlyData_CloPr, options_Dly_Pr);

        ////////////////////////////////////////////////////////////////////////////
        // STOCASTICS CHART
        var DlyData_Sto = new google.visualization.DataView(masterDataTable);
        DlyData_Sto.setColumns([0, 9, 10, 11, 12]);  // date, StoK5B, StoK14B, Sto Up Band, Sto Low Band
        
        var chart_Dly_Sto = new google.visualization.LineChart(document.getElementById('chart_id_Wk_Sto'));
        var l = stocastics5.length;
        console.log(l);
        options_Sto.title = 'Monthly Stocatics (' + sym + ')';
        options_Sto.width = winWidth;
        options_Sto.series[0].labelInLegend = 'StoK5 (' + stocastics5[l-1].StoK5B + ')';
        options_Sto.series[1].labelInLegend = 'StoK14 (' + stocastics14[l-1].StoK14B + ')';
        chart_Dly_Sto.draw(DlyData_Sto, options_Sto);

        ////////////////////////////////////////////////////////////////////////////
        // MOMENTUM CHART
        var DlyData_Mtm = new google.visualization.DataView(masterDataTable);
        DlyData_Mtm.setColumns([0, 14, 15]);  // date, MtmRawStr, MtmAvgStr
        
        var chart_Dly_Sto = new google.visualization.LineChart(document.getElementById('chart_id_Wk_Mtm'));
        options_Mtum.title = 'Monthly Momentum (' + sym + ')';
        options_Mtum.width = winWidth;
        chart_Dly_Sto.draw(DlyData_Mtm, options_Mtum);


        
    }

    //af();