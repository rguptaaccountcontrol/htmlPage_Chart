// convert Daily price data to weekly price data

async function Daily2Weekly(jDailyPr)
{

    var rtnJWklyAry = [];  // weekly json array to return
    var WkDt, WkHi=-99999, WkLo=99999, WkClo=0, WkVol=0, oldDow;
    var dt, hi=0, lo=0, clo=0, vol=0, dow;
    var obj = {};  // to create the json object

    for(var i=0;i<jDailyPr.length;i++)
    {
        dt = jDailyPr[i].Date;
        d = new Date(dt);
        dow = d.getDay();  // get the day of week
        hi = Number(jDailyPr[i].High).toFixed(2);
        lo = Number(jDailyPr[i].Low).toFixed(2);
        clo = Number(jDailyPr[i].Close).toFixed(2);
        vol = Number(jDailyPr[i].Volume);

        if (dow < oldDow)  // new week has started
        {
            // create the obj and push it
            obj["Date"] = WkDt;
            obj["High"] = WkHi;
            obj["Low"] = WkLo;
            obj["Close"] = WkClo;
            obj["Volume"] = WkVol;
            rtnJWklyAry.push(obj);

            // initialize WkHi, WkLo, WkClo WkVol, obj
            obj = {};  // initialize object
            WkDt = dt;
            WkHi = hi;
            WkLo = lo;
            WkClo = clo;
            WkVol = vol;

        }
        else
        {
            // find the weekly WkHi, WkLo, WkClo WkVol, WkDt 
            WkDt = dt;
            
            if (Number(hi) > Number(WkHi))  // Make the WkHi higher, if we find a higher value
                WkHi = hi;

            if (Number(lo) < Number(WkLo))  // Make the WkLo lower, if we find a lower value
                WkLo = lo;
            
            WkClo = clo;    // WkClo is the close price on the last day of the week
            WkVol = WkVol + vol; // Sum up the volume for the week

        }

        //console.log(dow, dt, hi, lo, clo, vol, WkDt, WkHi, WkLo, WkClo, WkVol);

        oldDow = dow;
    }
    
    // Take care of the condition when the loop ends
    obj["Date"] = WkDt;
    obj["High"] = WkHi;
    obj["Low"] = WkLo;
    obj["Close"] = WkClo;
    obj["Volume"] = WkVol;
    rtnJWklyAry.push(obj);

    return rtnJWklyAry;
}