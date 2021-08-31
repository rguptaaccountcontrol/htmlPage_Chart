

var dData;
// Base url defines if we are using through IIS server or local 3000 port
//const baseUrl = 'http://192.168.0.171/YahooProxy/';
//const baseUrl = `http://192.168.0.171:3000/`;
const baseUrl = 'http://192.168.0.182/YahooProxy/'; // laptop

function myFunYahooQuotes(t) {

  
  //alert(parseInt(t.length));

  var url;

  if (t !== undefined)
  {
    url = baseUrl + `yahoo?sym=${t}`;
    document.getElementById("messages1").innerHTML = t;
  }
  else
  {
    document.getElementById("messages1").innerHTML = 'undefined';
     //t='aapl';
     url = baseUrl + `yahoo?sym=aapl`;
     //alert(t.length);
     return;
  }
  

  document.getElementById("messages").innerHTML = url;
  //alert(url);

  const header = {
      'Content-Type': 'application/json'
     
    }
  
  axios.get(url, {headers: header})
  //axios({
  //  method: 'get',
  //  url: url + '?nocache=' + new Date().getTime(), // Safari fix
   // withCredentials: true
//})
                .then((response) => {
                           //alert("Hello! I am an alert box!!");
                            //console.log(response);
                            document.getElementById("demo").innerHTML = JSON.stringify(response);
                            dData = response;
                            //alert(response);
                            QuoteData4Chart();
                            }
                )
                .catch(function (error) {
                  alert("Hello! error " + JSON.stringify(error));
                  alert("response " + JSON.stringify(error.response));
                  alert("request " + JSON.stringify(error.request));
                           }
              )
              .then((response) => {
                dData = response;
                //document.getElementById("messages").innerHTML = JSON.stringify(response);
              });


  //var x = document.getElementById("myDIV").innerHTML;
  //document.getElementById("demo").innerHTML = x;
}



function myFunYahooHist(sym, numOfDays)
{
    const d = new Date();
    d.setDate(d.getDate() + 1);  // increase the date by 1
    var dd2 = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    
    var d1 = d; //
    //d1.setDate(d1.getDate() - 365); // get 1 year of data for daily for calculations
    d1.setDate(d1.getDate() - numOfDays); // get 1 year of data for daily for calculations
    var dd1 = (d1.getMonth()+1) + "/" + d1.getDate() + "/" + d1.getFullYear();

    var url;
    //url = baseUrl + `yahooH?sym=${sym}&d1=8/6/2021&d2=12/12/2022`;
    url = baseUrl + `yahooH?sym=${sym}&d1=${dd1}&d2=${dd2}`;

    document.getElementById("messages1").innerHTML = url;
    //document.getElementById("messages1").innerHTML = url2;

    //'Content-Type': 'text/plain;charset=utf-8',

    const header = {
      
      'Content-Type': 'application/json'
     
    }

    return axios.get(url, {headers: header})
    //axios.get(url)
                .then((response) => {
                           //alert("Hello! I am an alert box!!");
                            //document.getElementById("demo").innerHTML = JSON.stringify(response);
                            
                            dData = response;
                            //console.log(response);
                            //HistData4Chart();
                            return response;
                            }
                )
                .catch(function (error) {
                  alert("Hello! error " + JSON.stringify(error));
                  alert("response " + JSON.stringify(error.response));
                  alert("request " + JSON.stringify(error.request));
                           }
              )
              .then((response) => {
                dData = response;
                return response;
                //document.getElementById("messages").innerHTML = JSON.stringify(dData);
              });

}

/*function HistData4Chart()
{
    //document.getElementById("messages").innerHTML = dData.data;
    //console.log(dData);
}*/

function QuoteData4Chart()
{
    fChg = Number(dData.data.chg.replace('%',''));  // change as a number

    var objData = { "ytdReturn": dData.data.ytdReturn, "Hi": dData.data.Hi,"Low":dData.data.Low, "vol":dData.data.vol,"symbol":dData.data.symbol,"bid":dData.data.bid,"ask":dData.data.ask,}
    var offHi;
    if (Number(dData.data.Clo) > 0)
      offHi = (((dData.data.Clo - dData.data.fiftyTwoWeekHigh)/dData.data.Clo)*100).toFixed(2);
    else
      offHi = "na";
    // get date time
    const unixTimestamp = dData.data.regularMarketTime; 
    const milliseconds = unixTimestamp * 1000 // convert unix time to milliseconds
    const dateObject = new Date(milliseconds) 
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    
    var stopblock = "<b>" + dData.data.shortName + "</b>" + "  (" + humanDateFormat +") ";
    stopblock = stopblock + " off52wkHi: " + offHi + "%,";
    if (fChg > 0)
      stopblock = stopblock + " Chg: " + "<b style=color:blue;>" + dData.data.chg + "</b>,";
    else
      stopblock = stopblock + " Chg: " + "<b style=color:red;>" + dData.data.chg + "</b>,";

    stopblock = stopblock + " Close: " + dData.data.Clo + ",";

    if (Number(dData.data.limit) > Number(dData.data.Clo))
      stopblock = stopblock + " Limit: " + "<b style=color:blue;>" + dData.data.limit + "</b>";
    else
      stopblock = stopblock + " Limit: " + "<b style=color:red;>" + dData.data.limit + "</b>";
    //var stopblock = stopblock + " <br/> " ;
    stopblock = stopblock + "<p>" + JSON.stringify(objData) + "</p>";

    document.getElementById("quoteprice").innerHTML = stopblock;
    document.getElementById("LabelTicker").innerHTML = dData.data.symbol;

    document.getElementById("bottomblock").innerHTML = JSON.stringify(dData.data);
}




function aaaa()
{ // example to show how we can use async and await verbs
  /*async function bb()
  {
  var d = await myFunYahooHist('aapl');

  document.getElementById("messages1").innerHTML = JSON.stringify(d);

  console.log(d.data);
  }

  bb();
  */

  async function getUsers() {
    let url = baseUrl + `yahoo?sym=aapl`;
    try {
        let res = await fetch(url);
        //console.log(JSON.stringify(res));
        let k = await res.json();
        console.log(JSON.stringify(k));
        //document.getElementById("messages1").innerHTML = JSON.stringify(k);
        return JSON.stringify(k);
    } catch (error) {
        console.log(error);
    }
  }

  getUsers();

}


