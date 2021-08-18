
async function fn_CalcPriceMomentum(jAryPr,prType)
{
    var MvAvg = 0, NoLagEMA = 0, iBnd=0;
    var EmaNoLagVolatility = 0, offAvgClose = 0, offAvgNoLag = 0, offStopLossNoLag = 0;
    var NoLagOsc = 0;   //black line
    var NoLagOscAvg = 0;  //blue line

    var rtnJsonAry = [];  // json array to return

    switch(prType) {
        case 1:  // daily
            MvAvg = 10;
            NoLagEMA = 0.15;
            iBnd = 20;
        break;
        case 2:  // weekly
            MvAvg = 10;
            NoLagEMA = 0.15;
            iBnd = 15;
        break;
        case 3:  // monthly
            MvAvg = 10;
            NoLagEMA = 0.15;
            iBnd = 20;
        break;
        default:
            MvAvg = 10;
            NoLagEMA = 0.15;
            iBnd = 20;
    }

    var AvgLine = await fn_CalcSMA(jAryPr, MvAvg); // 10 day moving average of close price

    var rtnNoLag = [];
    var NoLagLine =  await fn_CalcNoLagEMA(jAryPr, prType,rtnNoLag);  // No Lag EMA line

    var AMAStopLossLine = await fn_CalcBounds_AMA(jAryPr,prType);  // calculate bounds and AMA and AMAStopLossPrice


    for(var i=0;i<jAryPr.length;i++)
    {
        var obj = {};  // to create the json object

        var dt = jAryPr[i].Date;
        var clo = Number(jAryPr[i].Close);
        var AMAStopLossPr = Number(AMAStopLossLine[i].AMAStopLoss);
        var nolag = Number(NoLagLine[i].emaNoLag);
        var avg = Number(AvgLine[i].avg10d);

        if (nolag > 0 && avg > 0 && AMAStopLossPr > 0)
        {
            EmaNoLagVolatility = (clo/nolag - 1)*100;
            offAvgClose = (clo/avg - 1)*100;
            offAvgNoLag = (nolag/avg - 1)*100;
            offStopLossNoLag = (nolag/AMAStopLossPr - 1)*100;

            NoLagOsc = Number((0.25*EmaNoLagVolatility + 0.25*offAvgClose + 0.25*offAvgNoLag + 0.25*offStopLossNoLag));
        }
        else
            NoLagOsc = 0; 

        NoLagOscAvg = Number(0.1*NoLagOsc + 0.9*NoLagOscAvg);

        //console.log(dt,i,clo,avg,nolag,AMAStopLossPr, NoLagOsc.toFixed(2), NoLagOscAvg.toFixed(2));

        obj["Date"] = dt;
        //obj["High"] = hi.toFixed(2);
        //obj["Low"] = lo.toFixed(2);
        obj["Close"] = clo.toFixed(2);
        obj["MtmRawStr"] = NoLagOsc.toFixed(2);     // black line
        obj["MtmAvgStr"] = NoLagOscAvg.toFixed(2);  // blue line
        
        rtnJsonAry.push(obj);
    }

    return rtnJsonAry;

}