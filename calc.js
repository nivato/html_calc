function Calculator(id){
	this.calculator = jQuery('<div/>', {class: 'calculator'});
    this.screen = jQuery('<div/>', {class: 'screen'});
    this.pad = jQuery('<div/>', {class: 'pad'});
    this.buttons = [];
    var button_values = [	7, 8, 9, 'C',
    						4, 5, 6, '/',
    						1, 2, 3, 'x',
    						0, '.', '-', '+',
    						'='];
	for (var i = 0; i < button_values.length; i++) {
		var button = jQuery('<div/>', {class: 'button'});
		button.text(button_values[i]);
		this.buttons.push(button);
		this.pad.append(button);
	}
    this.calculator.append(this.screen, this.pad);
}

Calculator.prototype.draw = function(){
	$('body').html(this.calculator);
};

function start(jQuery){
    var calc = new Calculator();
    calc.draw();
}

$(document).ready(start);