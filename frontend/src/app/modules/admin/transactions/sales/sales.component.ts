import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import * as fromApp from 'app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as SalesActions from './store/sales/sales.actions';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(SalesActions.loadSalesRequestedAction());
  }

  addTransaction(){
    this.dialog.open(TransactionDialogComponent, {
      disableClose: true,
      width: '800px'
    });
    console.log('test');
  }

}
