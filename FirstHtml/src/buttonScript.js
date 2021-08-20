function GetTicker(i) {
    //alert('reached function')
    var ticker = document.getElementById("tickerid").value; // get the ticker
  
    if (ticker === '')
    { 
      //alert('no ticker');
      ticker = document.getElementById("LabelTicker").innerText; // get the ticker in label
      //alert(ticker);
      if (ticker === '')
      {
        document.getElementById("messages").innerHTML = 'Enter a ticker in the above box';
        return;
      }
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
                  myFunYahooQuotes(ticker);
                  drawChart_Final(ticker, 1);
                  break;
               case 2:
                  document.getElementById("weekly").style.color = "red";
                  myFunYahooQuotes(ticker);
                  drawChart_Final(ticker, 2);
                 break;
                case 3:
                    document.getElementById("monthly").style.color = "red";
                    myFunYahooQuotes(ticker);
                    drawChart_Final(ticker, 3);
                 break;
               default:
                 // code block
             }

    // We have th ticker value so we can make the input box blank
    const inputBox = document.getElementById('tickerid');
    inputBox.value = "";
  } // end GetTicker(i)
  
  function myFunction() {
    //var x = document.getElementById("myDIV").innerHTML;
    document.getElementById("messages").innerHTML = "function works";
  } // myFunction()

  function runScript(e){
    
    //console.log(e.keyCode);

    const inputBox = document.getElementById('tickerid');
    //console.log("cb", cb.checked, "clicked ", cb.click, "focus ", cb.focus);

    // checking if the element is clicked, if so, blank out th box
    inputBox.addEventListener("click", () => {
	    //console.log('click');
        inputBox.value = "";
    });


    if (e.keyCode == 13)   // return key
    {
        //console.log(e.keyCode);

        // Based on the color decide which button is active. That will give us which price type we want
        var buttonActive;
        
        if (document.getElementById("daily").style.color == "red")
             buttonActive = 1;  // daily
        else if (document.getElementById("weekly").style.color == "red")
            buttonActive = 2;   // weekly
        else if (document.getElementById("monthly").style.color == "red")
            buttonActive = 3;   // monthly
        else
            buttonActive = 1; // default is daily
 
            
        // Here we call the get ticker function based on the return key being pressed instead of a button being clicked    
        GetTicker(buttonActive);  // will pick daily, weekly or monthly based on the button which is active
    }

    //console.log(e.keyCode);

  }

  //function runInputBoxScript(e)
  //{
  //  console.log(e.keyCode);

  //}