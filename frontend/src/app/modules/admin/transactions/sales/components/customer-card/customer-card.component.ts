import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent implements OnInit {
  @Input() dataType: any;
  constructor() { }

  ngOnInit(): void {
  }

}
