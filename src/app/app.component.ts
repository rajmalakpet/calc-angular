import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  displayInfo: string = "Ans.";
  globalError: string = "";
  displayResult: string = '0';
  operationsArray: Array<string> = ['+','-','x','/','.','*'];
  production: boolean = environment.production;

  clearError(){
    console.log('<=== clear error triggered ===>');
    this.globalError = "";
  }

  handleNumeric(_number: string){
    console.log('user entered number: ', _number);

    this.clearError();
    if (this.displayResult.length > 25) {
      this.globalError = 'Too Many numbers!';
      this.displayResult = '0';
      return;
    }

    if (this.displayResult === '0') {
      this.displayResult = _number;
    } else {
      this.displayResult += _number;
    }

  }

  handleOperation(_operator: string){
    console.log('<=== user entered operator: ', _operator);

    this.clearError();
    if (this.displayResult.length > 25) {
      this.globalError = 'Too Many numbers!';
      this.displayResult = '0';
      return;
    }

    switch(_operator) {
      case '+' :  this.displayResult === '0' ? this.displayResult = _operator : (this.checkConsecutiveOperators(this.displayResult.slice(-1)) ? this.displayResult : this.displayResult += _operator);
                  break;
      case '-' :  this.displayResult === '0' ? this.displayResult = _operator : (this.checkConsecutiveOperators(this.displayResult.slice(-1)) ? this.displayResult : this.displayResult += _operator);
                  break;
      case 'x' :  this.displayResult === '0' ? this.displayResult += '*' : (this.checkConsecutiveOperators(this.displayResult.slice(-1)) ? this.displayResult : this.displayResult += '*');
                  break;
      case '/' :  this.displayResult === '0' ? this.displayResult += _operator : (this.checkConsecutiveOperators(this.displayResult.slice(-1)) ? this.displayResult : this.displayResult += _operator);
                  break;
      case '.' :  this.displayResult === '0' ? this.displayResult += _operator : (this.checkConsecutiveOperators(this.displayResult.slice(-1)) ? this.displayResult : this.displayResult += _operator);     
                  break;
      case '=' :  try {
                    let _copy = this.displayResult;
                    let _total = eval(this.displayResult);
                    console.log('<=== check: _total after eval: '+_total+', typeof: '+typeof(_total));
                    this.displayResult = parseFloat(_total).toString();
                    this.displayInfo = _copy+'=';
                  } catch (ex) {
                    console.log('<=== error processing computation: ', ex);
                    this.globalError = "Math Operation Error: "+ex.message;
                  }
                  break;
    }

  }

  checkConsecutiveOperators(_lastItem: string){
    console.log('<=== checkConsecutiveOperators: ', _lastItem);
    return this.operationsArray.indexOf(_lastItem) === -1 ? false : true;
  }

  resetAC(){
    console.log('<=== user clicked AC');
    this.clearError();
    this.displayResult = '0';
    this.displayInfo = 'Ans.';
  }

  undoCE(){
    console.log('<=== user clicked CE');
    this.clearError();
    if (this.displayResult.length === 1) {
      this.displayResult = '0';
    } else if (this.displayResult === 'Infinity' || this.displayResult === "NaN") {
      this.displayResult = '0';
      this.displayInfo = 'Ans.';
    } else if (this.displayResult.length > 1) {
      this.displayResult = this.displayResult.slice(0,-1);
    }
    console.log('<=== displayResult after slice: ', this.displayResult);
  }

}