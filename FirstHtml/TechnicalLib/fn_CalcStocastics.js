async function fn_CalcStocastics(jAryPr, lookBackDays, iSmoothingKdays, iSmoothingDdays) // jAryPr is the json array with price data
{
    var sto = 0.0;
    var stoAry = [];
    var rtnJsonAry = [];  // json array to return
    var hi = 0.0, lo = 0.0, clo = 0.0, hh= -9999.0, ll = 9999.0;

    for(var i=0;i<jAryPr.length;i++)
    {
        if (Number(i) > Number(lookBackDays))
        {
            hh = Number(-999999.0);  // initialize highest high
            ll = Number(999999.0);  // initialize lowest low
            clo = Number(jAryPr[i].Close).toFixed(2);

            for(var j=(i-lookBackDays+1); j<=i; j++)  // find the highest high and the lowest low in the last lookbackdays
            {
                hi = Number(jAryPr[j].High).toFixed(2);
                lo = Number(jAryPr[j].Low).toFixed(2);

                if (Number(hi) > Number(hh))    // highest high in lookBackDays
                    hh = hi;

                if (Number(lo) < Number(ll))    // lowest low in lookBackDays
                    ll = lo;
            }

            if (Number(hh) === 1)
                sto = 0.0;
            else
                sto = ((clo-ll)/(hh-ll)*100).toFixed(2)   // stocastics for lookBackPeriod
        }
        else
        {
            sto = 0.0;
        }

        stoAry.push(sto);

        //console.log(jAryPr[i].Date, i, Number(jAryPr[i].High).toFixed(2), Number(jAryPr[i].Low).toFixed(2), clo, hh, ll, sto);

    }

    //console.log(stoAry);

    var StoKAry = SMAforAry(stoAry, iSmoothingKdays); // stocastics K
    var SroDAry = SMAforAry(StoKAry, iSmoothingDdays); // stocastics D
    
    //////////////////////////////////////////////////
    // create return array
    var sStoK = "StoK"+lookBackDays+"B";
    var sStoD = "StoD"+lookBackDays+"B";

    for(var i=0;i<jAryPr.length;i++)
    {
        var obj = {};  // to create the json object

        obj["Date"] = jAryPr[i].Date;
        obj["High"] = Number(jAryPr[i].High);
        obj["Low"] = Number(jAryPr[i].Low);
        obj["Close"] = Number(jAryPr[i].Close);
        obj[sStoK] = Number(StoKAry[i]).toFixed(0);
        obj[sStoD] = Number(SroDAry[i]).toFixed(0);

        rtnJsonAry.push(obj);
    }

    return rtnJsonAry;

}

/////////////////////////////////////////////////////

function SMAforAry(aaAry, bars)
{
    var tot = 0, OutAvg = 0;
    var OutAvgAry = [];

    for(var i=0;i<aaAry.length;i++)
    {
        var v = Number(aaAry[i]);

        if (Number(i) < Number(bars))
        {
            tot = tot + v;
            OutAvg = v;  // we pass the same value back as average
        }
        else
        {
            tot = tot + v - Number(aaAry[i-bars]);
            OutAvg = tot/bars;
            
            //console.log("else",i,dt,OutAvg,tot);
        }

        OutAvgAry.push(OutAvg);
    }

    return OutAvgAry;

}