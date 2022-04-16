import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styles: [
  ]
})
export class PessoasGridComponent {

  @Input() pessoas:any = [];

}
