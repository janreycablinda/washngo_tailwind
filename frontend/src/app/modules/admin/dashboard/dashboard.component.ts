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
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

    salesTargetsForm: FormGroup;

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialogRef: MatDialogRef<DialogContentUpdateTarget>,
        // @Inject(MAT_DIALOG_DATA) public data: DialogData,
        @Inject(MAT_DIALOG_DATA) public data: object[],
    ) {

        console.log("DialogContentUpdateTarget data", data);
        this.initForm();
    }

    private initForm() {

        let salesTargets: FormArray = new FormArray([]);
        console.log("this.data", this.data)


        if (this.data.length > 0) {
            this.data.forEach((item) => {
                salesTargets.push(
                    new FormGroup({
                        'month': new FormControl(item['name']),
                        'target': new FormControl(item['target'], [Validators.required])
                    })
                );
            });
        }

        console.log("salesTargets", salesTargets)

        this.salesTargetsForm = new FormGroup({
            'salesTargets': salesTargets
        });

        console.log("salesTargetsControls", this.salesTargetsControls)

        // this.salesTargetssForm = new FormGroup({
        //     january: new FormControl(this.data[0]['target']),
        //     february: new FormControl(this.data[1]['target']),
        //     march: new FormControl(this.data[2]['target']),
        //     april: new FormControl(this.data[3]['target']),
        //     may: new FormControl(this.data[4]['target']),
        //     june: new FormControl(this.data[5]['target']),
        //     july: new FormControl(this.data[6]['target']),
        //     august: new FormControl(this.data[7]['target']),
        //     september: new FormControl(this.data[8]['target']),
        //     october: new FormControl(this.data[9]['target']),
        //     november: new FormControl(this.data[10]['target']),
        //     december: new FormControl(this.data[11]['target']),
        // });
        // console.log("initForm salesTargetsForm", this.salesTargetsForm)

        //
    }

    onSubmit() {
        console.log("this.salesTargetsForm.value", this.salesTargetsForm.value);
        this.dialogRef.close();
    }

    get salesTargetsControls() {
        // console.log("salesTargetsControls", (this.salesTargetsForm.get("salesTargets") as FormArray).controls)
        return (this.salesTargetsForm.get("salesTargets") as FormArray).controls;
    }
}
