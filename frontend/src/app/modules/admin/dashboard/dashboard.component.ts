import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions } from 'app/models/chart-options';
import { State } from './store/chart/chart.reducer';
import { ChartService } from './store/chart/chart.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @ViewChild("chart", { static: false }) chart: ChartComponent;

    salesChart: Partial<ChartOptions>;

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService
    ) {
    }

    ngOnInit(): void {
        // this.wedgit$ = this.store.select('chart').subscribe((data) => {
        //   const chartData:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0];
        //   data.chart.forEach((item) => {
        //     const getIndexByMonth = item['month']-1;
        //     chartData[getIndexByMonth] = parseInt(item['data']);
        //   })
        //   console.log(chartData);
        //   console.log(this.chartOptions.series[0].data);
        //   this.chartOptions.series[0].data = chartData;

        //   console.log(this.chartOptions);
        //   this.chart.render();
        // });

        this.store.select("chart").subscribe((chartState: State) => {
            this.chartService.getSalesChart(chartState)
        });

        this.chartService.salesChart$.subscribe((salesChart: Partial<ChartOptions>) => {
            this.salesChart = salesChart;
            console.log("this.salesChart", this.salesChart);
        });









    }

}
