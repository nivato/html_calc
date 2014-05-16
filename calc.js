function Calculator(id){
    this.screen_text = '';
    this.calculator = jQuery('<div/>', {class: 'calculator'});
    var screen = jQuery('<div/>', {class: 'screen'});
    var pad = jQuery('<div/>', {class: 'pad'});
    var button_values = [
        7, 8, 9, 'C',
        4, 5, 6, '/',
        1, 2, 3, 'x',
        0, '.', '-', '+',
        '='];
    for (var i = 0; i < button_values.length; i++) {
        var button = jQuery('<div/>', {class: 'button'});
        button.text(button_values[i]);
        button.click({calculator: this}, this.button_click);
        pad.append(button);
    }
    this.calculator.append(screen, pad);
}

Calculator.prototype.draw = function(){
	$('body').html(this.calculator);
};

Calculator.prototype.button_click = function(event){
    var calculator = event.data.calculator;
    calculator.screen_text = calculator.screen_text + $(event.target).text();
    $('.screen').text(calculator.screen_text);
};

function start(jQuery){
    var calc = new Calculator();
    calc.draw();
}

$(document).ready(start);
