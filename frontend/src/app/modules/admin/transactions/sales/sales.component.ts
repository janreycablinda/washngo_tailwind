import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import * as fromApp from 'app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import * as SalesActions from './store/sales/sales.actions';
import * as DiscountActions from './store/discounts/discounts.actions';
import { Observable, Subscription } from 'rxjs';
import { salesData } from './store/sales/sales.selectors';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales$: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) { 
    this.sales$ = store.pipe(select(salesData));
  }
  


  ngOnInit(): void {
    this.store.dispatch(SalesActions.loadSalesRequestedAction());
    this.sales$.subscribe(sales => {
      console.log(sales);
      // do something with items
    });
    // this.sales$ = this.store.select('sales').subscribe(sales => {
    //   console.log(sales);
    // })
  }

  addTransaction(){
    this.store.dispatch(DiscountActions.loadDiscountRequestedAction());
    this.store.dispatch(SalesActions.loadWorkOrderRequestedAction());
    this.dialog.open(TransactionDialogComponent, {
      disableClose: true,
      width: '800px'
    });
    console.log('test');
  }

}
