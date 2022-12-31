import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as ChartActions from './chart.actions';

@Injectable({
  providedIn: 'root'
})
export class ChartResolverService {

  constructor(private store: Store<fromApp.AppState>) { }

  resolve() {
    return this.store.select('chart').subscribe(res => {
      if(res.chart.length === 0){
        this.store.dispatch(ChartActions.loadChartRequestedAction({year: 2022}));
      }else{
        return res.chart;
      }
    });
  }
}
