import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import * as fromApp from 'app/store/app.reducer';
import * as SalesActions from '../../store/sales/sales.actions';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent implements OnInit {
  @Input() dataType: any;
  @Input() Index: number;
  @Input() TransactionData: any;
  timePast = '';
  id: any;
  timer = new ReplaySubject<any>();
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    console.log(this.TransactionData.status + " " + this.Index);
    if(this.TransactionData){
      this.id = setInterval((created_at) => {this.setTimer(created_at)}, 1000, this.TransactionData.created_at);
    }
  }

  deleteTrans(id){
    this.store.dispatch(SalesActions.deleteSaleRequestedAction({id: id}));
  }

  setTimer(created_at){
    if(created_at){
      let dateCreated = new Date(created_at);
      let now = new Date();
      let difference = now.getTime() - dateCreated.getTime();
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);
      if(days > 0){
        this.timer.next(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
      }else if(hours > 0){
        this.timer.next(hours + "h " + minutes + "m " + seconds + "s");
      }else if(minutes > 0){
        this.timer.next(minutes + "m " + seconds + "s");
      }else{
        this.timer.next(seconds + "s");
      }
      
    }
    
  }

  timerFormat(timer) {
        return timer > 9 ? timer : '0' + timer;
  }

}
