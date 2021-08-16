// Javascript doesn't directly support passing a out param, so need to build something that is close to C#'s out parameters.
// The out parameter is rtn, and because JavaScript doesn't provide an out keyword, 
// use .value inside the function to pass the value outside the function 

// Note that rtn needs to be initialized as empty array [] in the calling function. (it can also be an object{} depending on your needs)
// This is required because inside the function we "inject" the .value property.

// jAryPr is the json array with price data
// prType 1= daily, 2=weekly,3=monthly
//rtn is a "out" array.

async function fn_CalcNoLagEMA(jAryPr,prType,rtn)   // jAryPr is the json array with price data
{
    // This is a Non Linear Kalman Filter. It give a no lag EMA, so we can use it as a smoothed price, especially where the prices are volatile.
    var bFirstTime = true;
    var ema, emaFact, errorDelta, EMAerrorDelta=0, emaNoLag;
    var rtnJsonAry = [];  // json array to return

    switch(prType) {
                case 1:  // daily
                    emaFact = 0.15;
                break;
                case 2:  // weekly
                    emaFact = 0.15;
                break;
                case 3:  // monthly
                    emaFact = 0.175;
                break;
                default:
                    emaFact = 0.15;
            }
    

    for(var i=0;i<jAryPr.length;i++)
    {
        var obj = {};  // to create the json object
        //console.log(jAryPr[i]);
        var dt = jAryPr[i].Date;
        var hi = Number(jAryPr[i].High);
        var lo = Number(jAryPr[i].Low);
        var clo = Number(jAryPr[i].Close);

        
        if (clo > 0)
        {

            var pr = (hi+lo+clo)/3.0;
            if (bFirstTime)
            {
                bFirstTime = false;
                //console.log("firsttime");
                ema = pr;
            }

            ema = emaFact*pr + (1.0 - emaFact)*ema;
            errorDelta = pr - ema;
            EMAerrorDelta = emaFact*errorDelta + (1.0 - emaFact)*EMAerrorDelta;
            emaNoLag = ema + EMAerrorDelta;

            //console.log(i,dt,hi,lo,clo,emaNoLag);
        }

        obj["Date"] = dt;
        obj["High"] = hi.toFixed(2);
        obj["Low"] = lo.toFixed(2);
        obj["Close"] = clo.toFixed(2);
        obj["emaNoLag"] = emaNoLag.toFixed(2);

        rtnJsonAry.push(obj);

    }


    //console.log(rtnJsonAry);
    rtn.value = rtnJsonAry;  // use .value inside the function to pass the value outside the function
    return rtnJsonAry;

}