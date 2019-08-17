import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  displayResult: any = 0;
  displayInfo: any = "Ans.";
  globalError: string;

  clearError(){
    console.log('clear error initiated');
    this.globalError = "";
  }

  handleNumeric(_number: any){
    console.log('user entered number: ', _number);
    this.clearError();
    if (this.displayResult === 0) {
      this.displayResult = _number;
    } else {
      this.displayResult += _number;
    }
    if (this.displayResult.toString().length > 15) {
      this.globalError = 'Too Many numbers!';
      this.displayResult = 0;
    }
  }

  handleOperation(_operator: any){
    console.log('user entered operator: ', _operator);
    this.clearError();
    if (_operator === '+') {
      this.displayResult === 0 ? this.displayResult = _operator : this.displayResult += _operator;
    } else if (_operator === '-' ) {
      this.displayResult === 0 ? this.displayResult = _operator : this.displayResult += _operator;
    } else if (_operator === 'x') {
      this.displayResult === 0 ? this.displayResult : this.displayResult += '*';                 //raj:cannot compute with times at the beginning
    } else if (_operator === '/') {
      this.displayResult === 0 ? this.displayResult : this.displayResult += '/';                 //raj:cannot compute with divide at the beginning
    }

    if (this.displayResult.toString().length > 15) {
      this.globalError = 'Too Many numbers!';
      this.displayResult = 0;
    }
  }

  handleDecimal(_decimal: string){
    console.log('user clicked decimal: '+_decimal);
    this.clearError();
    if (this.displayResult === 0) {
      this.displayResult += '.'
    } else if (!this.displayResult.includes('.')) {  
      this.displayResult += _decimal;
    } 
  }

  resetAC(){
    console.log('user clicked AC');
    this.clearError();
    this.displayResult = 0;
    this.displayInfo = 'Ans.';
  }

  undoCE(){
    console.log('user clicked CE');
    this.clearError();
    if (this.displayResult.toString().length === 1) {
      this.displayResult = 0;
    } else if (this.displayResult.toString().length > 1) {
      this.displayResult = this.displayResult.toString().slice(0,-1);
    }
    console.log('displayResult after slice: ', this.displayResult);
  }

  computeTotal(){
    this.clearError();
    console.log('<=== computeTotal clicked ===>');
    try {
      let _copy = this.displayResult;
      let _total = eval(this.displayResult);
      console.log('<=== _total: ', _total);
      this.displayResult = _total;
      this.displayInfo = _copy+'=';
      if (typeof(this.displayResult) === "undefined") {
        this.globalError = "Error";
      } else {

      }
    } catch (ex) {
      console.log('<=== error processing computation: ', ex);
      this.globalError = ex.message;
    }
  }

}
