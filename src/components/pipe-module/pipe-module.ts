import { Component } from '@angular/core';

/**
 * Generated class for the PipeModuleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pipe-module',
  templateUrl: 'pipe-module.html'
})
export class PipeModuleComponent {

  text: string;

  constructor() {
    console.log('Hello PipeModuleComponent Component');
    this.text = 'Hello World';
  }

}
