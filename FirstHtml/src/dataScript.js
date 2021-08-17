

var dData;
// Base url defines if we are using through IIS server or local 3000 port
const baseUrl = 'http://192.168.0.171/YahooProxy/';
//const baseUrl = `http://192.168.0.171:3000/`;

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
                drawChart_Final(ticker);
                break;
             case 2:
                document.getElementById("weekly").style.color = "red";
                myFunHist(ticker);
               break;
              case 3:
                  document.getElementById("monthly").style.color = "red";
                  myFunctionYahoo(ticker);
                  drawChart_Final(ticker);
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



function myFunHist(sym)
{
    const d = new Date();
    d.setDate(d.getDate() + 1);  // increase the date by 1
    var dd2 = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    
    var d1 = d; //
    d1.setDate(d1.getDate() - 365); // get 1 year of data for daily for calculations
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
    document.getElementById("quoteprice").innerHTML = JSON.stringify(dData.data);
    //console.log(dData);
}


//console.log("aa");

function aaaa()
{
  /*async function bb()
  {
  var d = await myFunHist('aapl');

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


//let r = getUsers();

async function renderUsers() {
  let users = await getUsers();
  //let html = '';
  //users.forEach(user => {
  //    let htmlSegment = `<div class="user">
  //                        <img src="${user.profileURL}" >
   //                       <h2>${user.firstName} ${user.lastName}</h2>
    //                      <div class="email"><a href="email:${user.email}">${user.email}</a></div>
   //                   </div>`;

    //  html += htmlSegment;
  //});

  //let container = document.querySelector('.container');
  //container.innerHTML = html;
  document.getElementById("messages1").innerHTML = users;
  //https://www.javascripttutorial.net/javascript-fetch-api/
}

renderUsers();

}

