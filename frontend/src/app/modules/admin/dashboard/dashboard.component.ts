import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions } from 'app/models/chart-options';
import { State } from './store/chart/chart.reducer';
import { ChartService } from './store/chart/chart.service';
import * as ChartActions from './store/chart/chart.actions';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @ViewChild("chart", { static: false }) chart: ChartComponent;

    salesChart: Partial<ChartOptions>;
    yearsList: number[] = [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
    ];
    yearSelected: number = new Date().getFullYear();

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
    ) {
    }

    ngOnInit(): void {

        this.store.select("chart").subscribe((chartState: State) => {
            console.log("chartState", chartState);
            this.chartService.getSalesChart(chartState)
            this.chartService.getTargetChart(chartState)
        });

        this.chartService.salesChart$.subscribe((salesChart: Partial<ChartOptions>) => {
            this.salesChart = cloneDeep(salesChart);
            console.log("this.salesChart", this.salesChart);
        });

    }

    onYearSelected(year: number) {
        this.yearSelected = year;
        this.store.dispatch(ChartActions.loadChartRequestedAction({ year: this.yearSelected }));
    }
}
