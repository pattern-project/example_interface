let sliderSleeves = document.getElementById("sleeves");
let sliderLength = document.getElementById("length");
let length = 1;
let sleeves = 1;
let colors = {'color1EFC':'#1A237E','color1GNOS':'#0D47A1','color2GNOS':'#1B5E20','color3GNOS':'#FFD600','color4GNOS':'#F57C00','color5GNOS':'#000000','color6GNOS':'#EFEBE9'}


// Update the current slider value (each time you drag the slider handle)
sliderSleeves.oninput = function() {
	let values = ['None','Combined','Separate'];
	let text = values[this.value];
	sleeves = this.value;
  	$("#sleeveout").html(text);
  	calculatePrice();
  	updatePreview();
  	calculateDifficulty();
}

sliderLength.oninput = function() {
	let values = ['Short','Medium','Long'];
	let text = values[this.value];
	length = this.value;
  	$("#lengthout").html(text);
  	calculatePrice();
  	updatePreview();
  	calculateDifficulty();
}

function updatePreview(){

	let lengthValues = ['Short','Medium','Long'];
	let lengthText = lengthValues[length];

	if(sleeves==0 || sleeves ==2){
		$('.combined').hide();
		if(sleeves ==0) {
			$('#Sleeves').hide();
			$('#Sleeveless').show();
		} else {
			$('#Sleeveless').hide();
			$('#Sleeves').show();
		}
		lengthValues.forEach(function(length){
	  		$('#'+length+'_Length').hide();
	  	});
	  	$('#'+lengthText+'_Length').show();
	}
	if(sleeves==1){
		$('.separate').hide();
		lengthValues.forEach(function(length){
	  		$('#Sleeve_2_'+length).hide();
	  	});
	  	$('#Sleeve_2_'+lengthText).show();
	}
}


$('#clothproducer').on('change',function(){
	calculatePrice();
	let value = $('#clothproducer').val()
	$('.colorgroup').hide();
	$('#color'+value).show();
});

$('.colorchoice').on('click',function(){
	let colorKey = $(this).attr('data-value');
	let color = colors[colorKey];
	$('.combined').find('path').attr('fill',color);
	$('.separate').find('path').attr('fill',color);
});

function calculatePrice(){
	let price = 25
	let material = 0;
	//let volumeMult = [1,1.2,1.4];
	let lengthMult = [1,1.25,2.5];
	let fabricPrice = 5;

	if(sleeves>0){
		material = 0.5;
	}
	if($('#clothproducer').val()=='EFC'){
		fabricPrice = 12;
	}

	material += lengthMult[length];

	price+=fabricPrice*material;
	price = Math.round(price*2)/2
	$('#costout').html('£'+price);
}

function calculateDifficulty(){
	difficulty = 1;
	if(sleeves == 0 || sleeves == 2){
		difficulty++
	}
	$('#difficultyout').html(difficulty+'/5');
}

function initColor(){
	$('.colorchoice').each(function( index ) {
		let colorKey = $(this).attr('data-value');
		let color = colors[colorKey];
		$(this).css('background-color', color);
		$('.combined').find('polyline').attr('fill',color);
		$('.separate').find('polyline').attr('fill',color);
		$('.combined').find('path').attr('fill',colors['color1GNOS']);
		$('.separate').find('path').attr('fill',colors['color1GNOS']);
	});
}

$('#clothes_preview').html(garment1);
$('#colorEFC').hide();

initColor();
calculatePrice();
updatePreview();
calculateDifficulty();
