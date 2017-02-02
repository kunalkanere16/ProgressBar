/**
 * 
 */
//Ready function
(function() {
   // your page initialization code here
   // the DOM will be available here
//	console.log("Ready");
	getProgressBarDetails();
	
})();

function getProgressBarDetails(){
//	console.log("call start");
	
	var url = "../resources/data.txt";
	var url2 = "http://pb-api.herokuapp.com/bars";
	
	
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Response received
        	document.getElementById("demo").innerHTML = this.responseText;
        	var jsonData = JSON.parse(this.responseText);
        	
        	//Save Limit
        	document.getElementById("limit").value = jsonData.limit;
        	var limit = jsonData.limit;
        	//Create progress bars
        	for (var i = 0; i < jsonData.bars.length; i++) {
        		
        		//calculate bar percentage value
        		var barVal = jsonData.bars[i];
        		var pct = Math.round( (barVal/limit)*100);
        //		console.log("init bar "+i+" = "+pct);
        		
        		//Add HTML for progress bar
        		document.getElementById("bars").innerHTML+='<div id = "bar_'+i+'" class="initialBar">';
        		document.getElementById("bar_"+i).innerHTML+='<label id = "progressValue_'+i+'" class="progressValue">'+pct+"%"+'</label>';
        		document.getElementById("bar_"+i).innerHTML+='<div id = "progressBar_'+i+'" class="initialProgressBar" style="width:'+pct+'%">';
        		
        		
        		
        		document.getElementById("bars").innerHTML+='</div></div>'	
        		
        	    //create select option for each progress bar
        	    var opt = document.createElement('option');
        	    opt.appendChild( document.createTextNode('#progress'+(i+1)) );
        	    opt.value = "bar_"+i;
        	    opt.id = "sel_"+i;
        	    
        	    var sel = document.getElementById('selectBar');
        	    sel.appendChild(opt);
        	    
        	    //Create hidden input to save actual percentage for each bar
        	    var hid = document.createElement("INPUT");
        	    hid.setAttribute("type", "hidden");
        	    hid.id="hid_"+i;
        	    hid.value=pct;
        	    document.getElementById("bars").appendChild(hid);
        	    document.getElementById("bars").innerHTML+='<br><br>';
        	}
        	
        	//default
        	document.getElementById("currBar").value="bar_0";
        	
        	//Create buttons
        	for (var i = 0; i < jsonData.buttons.length; i++) {
        	//    console.log(" button val = "+jsonData.buttons[i]);
        	    //Create buttons
        	    document.getElementById("buttons").innerHTML+='<button id="but_'+i+'" value="'+jsonData.buttons[i]+'" onclick="updateBarVal(this)">'+jsonData.buttons[i]+'</button>';
        	    document.getElementById("buttons").innerHTML+='&nbsp;';
        	}
        	
        	
       }
    };
    xhttp.open("GET", url2, true);
    xhttp.send();
	
	
//	console.log("call end");
}

function updateBarVal(obj){
	
	//Progress bar to be controlled
	var barId = document.getElementById("currBar").value;
	
	var index = barId.split('_')[1];
	
	//Current bar % value
	//var curPct = Number(document.getElementById(barId+"").value);
	var curPct = Number(document.getElementById("hid_"+index).value);
	
	//Clicked button value
	var incrVal = Number(obj.value);
	
//	console.log("bar = "+curPct+" incr = "+incrVal);
//	console.log("index = "+index);
	
	var newVal = calculateProgress(curPct, incrVal);
	
//	console.log("new value = "+newVal);
	
	var barObj = document.getElementById(barId);
	var progressBarObj= document.getElementById("progressBar_"+index);

	if( newVal < 0){
		//barObj.value=0;
		document.getElementById("hid_"+index).value=0;
		document.getElementById("progressValue_"+index).innerText="0%";
		animateProgress(curPct, newVal, progressBarObj);

	}
	else if(newVal >100){
		//here the display value will be newVal and color change to RED
		document.getElementById("hid_"+index).value=newVal;
		progressBarObj.classList.remove("initialProgressBarColour");
		progressBarObj.classList.add("exceededMaxValue");
		document.getElementById("progressValue_"+index).innerText=newVal+"%";
		animateProgress(curPct, newVal, progressBarObj);
		
		
	}
	else{//0-100 range

		document.getElementById("hid_"+index).value=newVal;
		if(progressBarObj.classList.contains("exceededMaxValue")){
			progressBarObj.classList.remove("exceededMaxValue");
			progressBarObj.classList.add("initialProgressBarColour");
		}
		document.getElementById("progressValue_"+index).innerText=newVal+"%";
		animateProgress(curPct, newVal, progressBarObj);
		
	}
	
}

function animateProgress(curVal, newVal, obj){
	

	
	if(newVal<=0){
		/*for(var i=curVal;i>=0;i--){
		//	obj.value=i;
			obj.style.width=i+"%";
		}*/
		
		//animate
		var width = curVal;
	    var id = setInterval(frame, 10);
	    function frame() {
	        if (width <= 0) {
	            clearInterval(id);
	        } else {
	            width--; 
	            obj.style.width = width + '%'; 
	        }
	    }
	}else if(newVal<curVal && newVal > 0 && newVal<100){
		/*for(var i=curVal-1;i>=newVal;i--){
		//	obj.value=i;
			obj.style.width=i+"%";
		}*/
		//animate
		var width = curVal;
	    var id = setInterval(frame, 10);
	    function frame() {
	        if (width <= newVal) {
	            clearInterval(id);
	        } else {
	            width--;
	            if(width<=100){
	            	obj.style.width = width + '%';
	            }
	             
	        }
	    }
	}
	else if(newVal<curVal  && newVal>100){
		//no change in width
		
	}
	else if(newVal>curVal && newVal<100){
		/*for(var i=curVal+1;i<=newVal;i++){
			//obj.value=i;
			obj.style.width=i+"%";
		}*/
		
		//animate
		var width = curVal+1;
	    var id = setInterval(frame, 10);
	    function frame() {
	        if (width >= newVal) {
	            clearInterval(id);
	        } else {
	            width++; 
	            obj.style.width = width + '%'; 
	        }
	    }
		
	}else{
//		console.log("else.............");
		/*for(var i=curVal+1;i<=100;i++){
		//	obj.value=i;
			obj.style.width=i+"%";
		}*/
		
		//animate
		var width = curVal;
	    var id = setInterval(frame, 10);
	    function frame() {
	        if (width >= 100) {
	            clearInterval(id);
	        } else {
	            width++; 
	            obj.style.width = width + '%'; 
	        }
	    }
	}
}

function changeBar(obj){
	document.getElementById("currBar").value = obj.value;
}

function calculateProgress(curPct, incrVal){
	var limit = Number(document.getElementById("limit").value);
	//console.log(""+);
	var newPct = curPct + ( Math.round( ( incrVal/limit ) * 100 )  );
	
//	console.log("New pct = "+newPct);
	return newPct;
	
}