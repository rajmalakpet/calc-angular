import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

//Raj: unit test cases: 
//1. assert clearError() method which clears the globlaError
//2. onload display should have default value as '0'
//3. assert handleNumeric('6') method
//4. assert Addition Math operation
//5. assert Subtraction Math operation
//6. assert Multiplication Math operation
//7. assert Division Math operation
//8. assert AC functionality: resetAC() method which resets the values
//9. assert CE functionality: undoCE() method removes the last value in string
//10: assert CE functionality: undeCE() resets when the value is Infinity or NaN

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should clear/empty the value of globalError when running clearError()`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.clearError();
    expect(app.globalError).toEqual('');
  }));
  it(`should have as default value of displayResult as '0'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.displayResult).toEqual('0');
  }));
  it(`should have as value of displayResult as '6' when running handleNumeric('6')`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('6');
    expect(app.displayResult).toEqual('6');
  }));
  it(`assert addition math operation using handleOperation('+')`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('2');
    app.handleOperation('+');
    app.handleNumeric('5');
    app.handleOperation('=');
    expect(app.displayResult).toEqual('7');
  }));
  it(`assert substraction math operation using handleOperation('-')`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('2');
    app.handleOperation('-');
    app.handleNumeric('5');
    app.handleOperation('=');
    expect(app.displayResult).toEqual('-3');
  }));
  it(`assert multiplication math operation using handleOperation('x')`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('2');
    app.handleOperation('x');
    app.handleNumeric('5');
    app.handleOperation('=');
    expect(app.displayResult).toEqual('10');
  }));
  it(`assert division math operation using handleOperation('/')`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('2');
    app.handleOperation('/');
    app.handleNumeric('5');
    app.handleOperation('=');
    expect(app.displayResult).toEqual('0.4');
  }));
  it(`should reset the values when hit AC - resetAC()`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('5');
    app.handleOperation('x');
    app.handleNumeric('8');
    app.handleOperation('=');
    app.resetAC();
    expect(app.displayResult).toEqual('0');
    expect(app.displayInfo).toEqual('Ans.');
  }));
  it(`should undo/remove the values when hit CE - undoCE()`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('5');
    app.handleOperation('x');
    app.handleNumeric('8');
    app.handleOperation('=');
    app.undoCE();
    expect(app.displayResult).toEqual('4');
  }));
  it(`should reset for Infinity or NaN values when hit CE - undoCE()`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.handleNumeric('1');
    app.handleOperation('/');
    app.handleNumeric('0');
    app.handleOperation('=');
    app.undoCE();
    expect(app.displayResult).toEqual('0');
  }));
});
