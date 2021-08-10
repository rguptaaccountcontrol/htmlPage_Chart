

var dData;

function GetTicker(i){
  //alert('reached function')
  var ticker = document.getElementById("tickerid").value; // get the ticker

  if (ticker === '')
  { 
    //alert('no ticker');
    document.getElementById("messages").innerHTML = 'Enter a ticker in the above box';
    return;
  }
  //alert(ticker);
  // color all buttons black
  document.getElementById("daily").style.color = "black";
  document.getElementById("weekly").style.color = "black";
  document.getElementById("monthly").style.color = "black";
  
  // Take action based on the button clicked
  switch(i) {
             case 1:
                document.getElementById("daily").style.color = "red";
                myFunHist(ticker);
                break;
             case 2:
                document.getElementById("weekly").style.color = "red";
                myFunHist(ticker);
               break;
              case 3:
                  document.getElementById("monthly").style.color = "red";
                  myFunctionYahoo(ticker);
               break;
             default:
               // code block
           }
} // end GetTicker(i)

function myFunction() {
  //var x = document.getElementById("myDIV").innerHTML;
  document.getElementById("messages").innerHTML = "function works";
} // myFunction()


function myFunctionYahoo(t) {

  
  //alert(parseInt(t.length));

  var url;

  if (t !== undefined)
  {
    url = `http://192.168.0.171:3000/yahoo?sym=${t}`;
    document.getElementById("messages1").innerHTML = t;
  }
  else
  {
    document.getElementById("messages1").innerHTML = 'undefined';
     //t='aapl';
     url = `http://192.168.0.171:3000/yahoo?sym=aapl`;
     //alert(t.length);
     return;
  }
  

  document.getElementById("messages").innerHTML = url;
  //alert(url);

  const header = {
      'Content-Type': 'application/json'
     
    }
  
  //axios.get('http://localhost:3000/yahoo?sym=AAPL', {headers: header})
  axios.get(url, {headers: header})
                .then((response) => {
                           //alert("Hello! I am an alert box!!");
                            //document.getElementById("demo3").innerHTML = "<h1>axios</h1>";
                            document.getElementById("demo").innerHTML = JSON.stringify(response);
                            dData = response;
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



function myFunHist(sym)
{
    var url;
    url = 'http://localhost:3000/yahooH?sym=ibm&d1=8/6/2021&d2=12/12/2022';

    document.getElementById("messages").innerHTML = url;

    //'Content-Type': 'text/plain;charset=utf-8',

    const header = {
      
      'Content-Type': 'application/json'
     
    }

    axios.get(url, {headers: header})
    //axios.get(url)
                .then((response) => {
                           //alert("Hello! I am an alert box!!");
                            document.getElementById("demo").innerHTML = JSON.stringify(response);
                            
                            dData = response;
                            //console.log(response);
                            HistData4Chart();
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
                //document.getElementById("messages").innerHTML = JSON.stringify(dData);
              });

}

function HistData4Chart()
{
    document.getElementById("messages").innerHTML = dData.data;
    console.log(dData);
}

function QuoteData4Chart()
{
    document.getElementById("messages").innerHTML = JSON.stringify(dData.data);
    console.log(dData);
}


//console.log("aa");

