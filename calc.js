// Calculator class definition
function Calculator(){
    this.digits_limit = 12;
    this.previous_operation = undefined;
    this.result = undefined;
    this.enter_new_value = false;
    $('body').html(this.draw());
}

Calculator.prototype.draw = function(){
	frame = jQuery('<div/>', {class: 'calculator'});
    this.screen = jQuery('<div/>', {class: 'screen'});
    this.screen.text('0');
    var pad = jQuery('<div/>', {class: 'pad'});
    var button_values = [
        7, 8, 9, 'C',
        4, 5, 6, '/',
        1, 2, 3, '*',
        0, '.', '-', '+',
        '+-', '='];
    for (var i = 0; i < button_values.length; i++) {
        var button = jQuery('<div/>', {class: 'button'});
        button.text(button_values[i]);
        button.click({calculator: this}, this.button_clicked);
        pad.append(button);
    }
    frame.append(this.screen, pad);
    return frame;
};

Calculator.prototype.button_clicked = function(event){
    var calculator = event.data.calculator;
    calculator.entered_value($(event.target).text());
};

Calculator.prototype.entered_value = function(value){
    if (!isNaN(value)){
        if (this.screen.text().length + 1 <= this.digits_limit){
            if ((this.screen.text() === '0') || this.enter_new_value){
                this.screen.text(value);
                this.enter_new_value = false;
            } else {
                this.screen.text(this.screen.text() + value);
            }
        }
    } else if (value === '.'){
        if (this.screen.text().length + 2 <= this.digits_limit){
            if (this.screen.text().indexOf('.') === -1){
                this.screen.text(this.screen.text() + value);
            }
        }
    } else {
        this.operation(value);
    }
};

Calculator.prototype.operation = function(operation){
    if (operation === 'C'){
        if (this.previous_operation === 'C'){
            this.result = undefined;
        }
        this.screen.text('0');
    } else if (operation === '='){
        this.perform_previous_operation();
    } else {
        if (!this.enter_new_value){
            this.perform_previous_operation();
        }
    }
    this.previous_operation = operation;
};

Calculator.prototype.perform_previous_operation = function(){
    if (this.result != undefined){
        var current_value = parseFloat(this.screen.text());
        if (this.previous_operation === '+'){
            this.result = this.result + current_value;
        } else if (this.previous_operation === '-'){
            this.result = this.result - current_value;
        } else if (this.previous_operation === '/'){
            this.result = this.result / current_value;
        } else if (this.previous_operation === '*'){
            this.result = this.result * current_value;
        }
    } else {
        this.result = parseFloat(this.screen.text());
    }
    this.screen.text(this.result);
    this.enter_new_value = true;
};

//Starting point
function start(jQuery){
    new Calculator();
}

$(document).ready(start);
