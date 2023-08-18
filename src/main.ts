import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['main.scss'],
  templateUrl: 'main.html',
})
export class App {
  operationalBtns: any = [];
  deleteBtn: any = null;
  clearAllBtn: any = null;
  equationValue: any = null;
  resultValue: any = null;
  operation: any = null;

  ngAfterViewInit(): void {
    this.operationalBtns = Array.from(
      document.querySelectorAll('[data-operator]')
    );
    this.deleteBtn = document.querySelector('[data-delete]');
    this.clearAllBtn = document.querySelector('[data-clear-all]');
    this.equationValue = document.querySelector('[data-equation-value]');
    this.resultValue = document.querySelector('[data-result-value]');
  }

  clear() {
    this.equationValue.innerText = '';
    this.resultValue.innerText = '';
  }

  selectOperation(value: any) {
    this.operation = this.operationalBtns[value].innerText;
    if (this.resultValue.innerText === '') return;
    this.equationValue.innerText = this.resultValue.innerText;
    this.resultValue.innerText = '';
    this.toggleButtons();
  }

  toggleButtons() {
    for (var i = 0; i < this.operationalBtns.length; i++) {
      this.operationalBtns[i].classList.toggle('disable-btn');
    }
  }

  addValues() {
    if (this.operation === '÷')
      this.resultValue.innerText =
        Number(this.equationValue.innerText) /
        Number(this.resultValue.innerText);
    if (this.operation === '*')
      this.resultValue.innerText =
        Number(this.equationValue.innerText) *
        Number(this.resultValue.innerText);
    if (this.operation === '+')
      this.resultValue.innerText =
        Number(this.equationValue.innerText) +
        Number(this.resultValue.innerText);
    if (this.operation === '-')
      this.resultValue.innerText =
        Number(this.equationValue.innerText) -
        Number(this.resultValue.innerText);
    this.equationValue.innerText = '';
    this.toggleButtons();
  }

  updateResult(value: any) {
    if (value === '.' && this.resultValue.innerText.includes('.')) return;
    this.resultValue.innerText += value;
  }

  addNumber(evnt: any) {
    this.updateResult(evnt.target.innerText);
  }
}

bootstrapApplication(App);
