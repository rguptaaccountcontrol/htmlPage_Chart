
async function fn_CalcBounds_AMA(jAryPr,prType)
{
    var NAma, iBarsAgo4StopLoss;
    var dc, vc, cc, PrExp=0.0;
    var diff=0.0, diffsqr=0.0, avgdiff=0.0, expsd=0.0;
    var UpBnd=0.0, DnBnd=0.0, ZValue=0.0;
    var CloNAma=0.0;
    var AMAStopLossPr = 0.0;
    var rtnJsonAry = [];  // json array to return

    switch(prType) {
        case 1:  // daily
            NAma = 20;
            iBarsAgo4StopLoss = 10;
        break;
        case 2:  // weekly
            NAma = 20;
            iBarsAgo4StopLoss = 13;
        break;
        case 3:  // monthly
            NAma = 20;
            iBarsAgo4StopLoss = 13;
        break;
        default:
            NAma = 20;
            iBarsAgo4StopLoss = 10;
    }


    for(var i=0;i<jAryPr.length;i++)
    {
        var dt = jAryPr[i].Date;
        //var hi = Number(jAryPr[i].High);
        //var lo = Number(jAryPr[i].Low);
        var clo = Number(jAryPr[i].Close);

        var obj = {};  // to create the json object
        //console.log(jAryPr[i]);
        if (Number(i) > Number(NAma))
        {
            

            CloNAma = Number(jAryPr[i-NAma].Close); // clo price NAma days ago

            dc = (clo - CloNAma);  // direction value for NAma bars
            vc=0;

            for(var j=(i-NAma+1);j<=i;j++)
            {
                var CloPr = Number(jAryPr[j].Close);
                var PriorClo = Number(jAryPr[j-1].Close);
                
                vc = vc + Math.abs((CloPr - PriorClo));  // volatility value on which smoothing constant is determined
            }

            cc = 0;
            if (Number(vc) > 0 )
                cc = (dc/vc)*(dc/vc);   // smoothing constant

            PrExp = PrExp*(1-cc) + (cc*clo);

            ///////////////////////////////////////////////////////////////////////////
            // now we start calculating bounds
            diff = clo - PrExp;                         // find the difference in price and price average
            diffsqr = diff*diff;                        // square the difference to remove the sign
            avgdiff = avgdiff*0.95 + 0.05*diffsqr;      // average the square of diff
            expsd = Math.sqrt(avgdiff);                 // get the square root of the avg diff to get the S.D.

            UpBnd = PrExp + expsd*1.64;                 // upper band
            DnBnd = PrExp - expsd*1.64;                 // lower band

            if (Number(expsd) > 0)
                ZValue = (clo - PrExp)/expsd;
            else
                ZValue = 0.0; 
        }
        else
        {
            // the default values will be here.
            var cloP = Number(jAryPr[i].Close);
            PrExp = UpBnd = DnBnd = AMAStopLossPr = cloP; //same as the close PromiseRejectionEvent, since we can't calculate
            ZValue = 0;

        }

        // AMAStopLoss is defined as a value of AMA iBarsAgo4StopLoss
        if (i > iBarsAgo4StopLoss)
            AMAStopLossPr = Number(rtnJsonAry[i-iBarsAgo4StopLoss].AMA);  // We need to make it a number because the JSON array keeps a string
        else
            AMAStopLossPr = Number(jAryPr[i].Close);
        //console.log(dt,i,clo,PrExp,UpBnd,DnBnd,ZValue,"..",diff,diffsqr,avgdiff,expsd);
        //console.log(dt,i,clo,PrExp,AMAStopLossPr);

        obj["Date"] = dt;
        //obj["High"] = hi.toFixed(2);
        //obj["Low"] = lo.toFixed(2);
        obj["Close"] = clo.toFixed(2);
        obj["AMA"] = PrExp.toFixed(2);
        obj["UpBnd"] = UpBnd.toFixed(2);
        obj["DnBnd"] = DnBnd.toFixed(2);
        obj["ZValue"] = ZValue.toFixed(2);
        obj["AMAStopLoss"] = AMAStopLossPr.toFixed(2);

        rtnJsonAry.push(obj);
    }

    return rtnJsonAry;
}