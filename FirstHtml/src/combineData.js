

async function combineData(ary1, ary2, keyToCombine)
{
    var rtnJsonAry = [];  // json array to return

    for(var i=0;i<ary1.length;i++)
    {

        var obj = {};  // to create the json object

        obj = ary1[i];
        if (keyToCombine === "nolag")
            obj["nolag"] = ary2[i].emaNoLag;
        else if (keyToCombine === "avg10d")
            obj["avg10d"] = ary2[i].avg10d;

        //console.log(obj);
        rtnJsonAry.push(obj);
    }


    return rtnJsonAry;
}