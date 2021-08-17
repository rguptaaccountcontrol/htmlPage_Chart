async function fn_CalcSMA(jAryPr,prType,NoOfBars)   // jAryPr is the json array with price data
{
    var rtnJsonAry = [];  // json array to return
    var tot = 0, OutAvg = 0;

    var sAvg = 'avg'+NoOfBars+'d';
    console.log(sAvg);

    for(var i=0;i<jAryPr.length;i++)
    {
        var obj = {};  // to create the json object
        //console.log(jAryPr[i]);
        var dt = jAryPr[i].Date;
        //var hi = Number(jAryPr[i].High);
        //var lo = Number(jAryPr[i].Low);
        var clo = Number(jAryPr[i].Close);

        if (Number(i) < Number(NoOfBars))
        {
            tot = tot + clo;
            OutAvg = clo;  // we pass the same value as the close price
        }
        else
        {
            tot = tot + clo - Number(jAryPr[i-NoOfBars].Close);
            OutAvg = tot/NoOfBars;
            
            //console.log("else",i,dt,OutAvg,tot);
        }

        obj["Date"] = dt;
        obj["Close"] = clo.toFixed(2);
        obj[sAvg] = OutAvg.toFixed(2);

        //console.log(i,dt,clo,tot,OutAvg,NoOfBars);
        rtnJsonAry.push(obj);


    }

    return rtnJsonAry;

}