

async function cleanData(jAryPr) 
{
    var rtnJsonAry = [];  // json array to return

    for(var i=0;i<jAryPr.length;i++)
    {
        dt = jAryPr[i].Date;
        hi = Number(jAryPr[i].High).toFixed(2);
        lo = Number(jAryPr[i].Low).toFixed(2);
        clo = Number(jAryPr[i].Close).toFixed(2);

        if (isNaN(new Date(dt)) || isNaN(hi) || isNaN(lo) || isNaN(clo))
        {   
            // do nothing. Bad data
            //console.log(i,dt,isNaN(new Date(dt)), hi, isNaN(hi));
        }
        else
        {
            // insert the row. We want to use this good data
           rtnJsonAry.push(jAryPr[i]);
            
        } 
             
        //console.log(i, dt, hi, lo, clo);

    }

    return  rtnJsonAry;   


}