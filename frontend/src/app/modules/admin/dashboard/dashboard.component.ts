import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions } from 'app/models/chart-options';
import { State } from './store/chart/chart.reducer';
import { ChartService } from './store/chart/chart.service';
import * as ChartActions from './store/chart/chart.actions';
import { cloneDeep } from 'lodash';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';


export interface DialogData {
  "data": any,
}

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
    targetSeriesData: object[] = [];

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {

        this.store.select("chart").subscribe((chartState: State) => {
            console.log("chartState", chartState);
            this.chartService.getSalesChart(chartState)
            this.targetSeriesData = this.chartService.getTargetChart(chartState)
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

    openDialog() {
        const dialogRef = this.dialog.open(DialogContentUpdateTarget, {
            "data": this.targetSeriesData
        });

        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
    }
}

@Component({
  selector: 'dialog-content-update-target',
  templateUrl: './dialog-content-update-target.html',
})
export class DialogContentUpdateTarget {
    formFieldHelpers: string[] = [''];

    salesTargetsForm : FormGroup = new FormGroup({
        "january": new FormControl(''),
        "february": new FormControl(''),
        "march": new FormControl(''),
        "april": new FormControl(''),
        "may": new FormControl(''),
        "june": new FormControl(''),
        "july": new FormControl(''),
        "august": new FormControl(''),
        "september": new FormControl(''),
        "october": new FormControl(''),
        "november": new FormControl(''),
        "december": new FormControl(''),
    });

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialogRef: MatDialogRef<DialogContentUpdateTarget>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {

        console.log("DialogContentUpdateTarget data", data);
    }

    onSubmit() {
        console.log("this.salesTargetsForm.value", this.salesTargetsForm.value);
        this.dialogRef.close();
    }
}
