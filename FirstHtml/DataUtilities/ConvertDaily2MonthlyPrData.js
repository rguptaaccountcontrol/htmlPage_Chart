// convert daily price data to monthly price data

async function Daily2Monthly(jDailyPr)
{

    var rtnJMthAry = [];  // weekly json array to return
    var MthDt, MthHi=-99999, MthLo=99999, MthClo=0;
    var MthVol=0, oldMth=0;
    var dt, hi=0, lo=0, clo=0, vol=0, Mth;
    var obj = {};  // to create the json object

    ///////////////////////////////////////////////
    // Initialize the variables
    dt = jDailyPr[0].Date;
    d = new Date(dt);
    Mth = d.getMonth() + 1;  // get the month
    MthDt = dt;
    MthHi = Number(jDailyPr[0].High).toFixed(2);
    MthLo = Number(jDailyPr[0].Low).toFixed(2);
    MthClo = Number(jDailyPr[0].Close).toFixed(2);
    MthVol = 0; //Number(jDailyPr[0].Volume);

    oldMth = Mth;
    
    ////////////////////////////////////////////////

    for(var i=0;i<jDailyPr.length;i++)
    {
        dt = jDailyPr[i].Date;
        d = new Date(dt);
        Mth = d.getMonth() + 1;  // get the month
        hi = Number(jDailyPr[i].High).toFixed(2);
        lo = Number(jDailyPr[i].Low).toFixed(2);
        clo = Number(jDailyPr[i].Close).toFixed(2);
        vol = Number(jDailyPr[i].Volume);

        if (Mth != oldMth)  // new week has started
        {
            // create the obj and push it
            obj["Date"] = MthDt;
            obj["High"] = MthHi;
            obj["Low"] = MthLo;
            obj["Close"] = MthClo;
            obj["Volume"] = MthVol;
            rtnJMthAry.push(obj);

            // initialize MthHi, MthLo, MthClo MthVol, obj
            obj = {};  // initialize object
            MthDt = dt;
            MthHi = hi;
            MthLo = lo;
            MthClo = clo;
            MthVol = vol;

        }
        else
        {
            // find the weekly MthHi, MthLo, MthClo MthVol, MthDt 
            MthDt = dt;
            
            if (Number(hi) > Number(MthHi))  // Make the MthHi higher, if we find a higher value
                MthHi = hi;

            if (Number(lo) < Number(MthLo))  // Make the MthLo lower, if we find a lower value
                MthLo = lo;
            
            MthClo = clo;    // MthClo is the close price on the last day of the week
            MthVol = MthVol + vol; // Sum up the volume for the week

        }

        console.log(Mth, dt, hi, lo, clo, vol, MthDt, MthHi, MthLo, MthClo, MthVol);

        oldMth = Mth;
    }
    
    // Take care of the condition when the loop ends
    obj["Date"] = MthDt;
    obj["High"] = MthHi;
    obj["Low"] = MthLo;
    obj["Close"] = MthClo;
    obj["Volume"] = MthVol;
    rtnJMthAry.push(obj);

    return rtnJMthAry;
}