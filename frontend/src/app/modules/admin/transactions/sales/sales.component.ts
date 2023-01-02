import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addTransaction(){
    this.dialog.open(TransactionDialogComponent, {
      disableClose: true,
      width: '800px'
    });
    console.log('test');
  }

}
