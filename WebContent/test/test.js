/**
 * TDD
 */

console.log("test start");

var assert = chai.assert;
//To calculate new percentage usage value of progress bar
function calculateProgress(curPct, incrVal, limit){
	//var limit = Number(document.getElementById("limit").value);
	//console.log(""+);
	var newPct = curPct + ( Math.round( ( incrVal/limit ) * 100 )  );
	
	console.log("New pct = "+newPct);
	return newPct;
	
}

//Test new bar percentage value range
describe('Bar percentage value', function() {
	  it('should be greater than 0 if increment is positive', function() {
	    var curVal=0;
	    var incrVal=25;
	    var limit = 120;
	    var newPct = calculateProgress(curVal, incrVal, limit)
	    assert(newPct>0);
	  });
	  
	  it('should be less than current pct if increment is negative', function() {
		    var curVal=0;
		    var incrVal=-25;
		    var limit = 120;
		    var newPct = calculateProgress(curVal, incrVal, limit)
		    assert(newPct<curVal);
		  });
	});

//Function to add/update class of element
function addClass(ele, newClass, oldClass) {
	if(!ele.classList.contains(newClass)) {
		if(ele.classList.contains(oldClass)){
			ele.classList.remove(oldClass);
		}
		ele.classList.add(newClass);
	}
}
//Test the behaviour of addClass function to swap between bar colors
describe('Add new class', function() {
	  it('should add class into element', function() {
	    var element = document.createElement("DIV");
	    
	    addClass(element, 'test-class','old');

	    assert.equal(element.className, 'test-class');
	  });  
	  
	  it('should not add a class which already exists in element', function() {
		  var element = document.createElement("DIV");
		  element.classList.add('exists');
		  addClass(element, 'exists','');

	    var numClasses = element.className.split(' ').length;
	    //console.log(element.classList);
	    assert.equal(numClasses, 1);
	  });
	  
	  it('should remove old class before adding new class', function() {
		  var element = document.createElement("DIV");
		  element.classList.add('exists');
		  addClass(element, 'new','exists');

	    var newClass = element.className.split(' ')[0];
	    //console.log(element.classList);
	    assert.equal(newClass, 'new');
	  });
});

//Function to animate progress bar usage value with max limit
function animateProgress(curVal, newVal){
	var width=0;
	if(curVal<100 && newVal>100){
		
		for(var i=curVal; i<=100;i++){
			width = i;
		}
	}
	return width;
}
//Test Progress bar usage range
describe('Bar usage ', function() {
	  it('should limit to max 100%', function() {
	    var width = animateProgress(25, 120);
	    console.log("width - "+width);
	    assert.equal(width, 100);
	  });
	  
});

