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

let salesTargetsState: object;

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

    // salesTargetsState: object;

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {

        this.store.select("chart").subscribe((chartState: State) => {
            // console.log("chartState", chartState);
            this.chartService.getSalesChart(chartState)
            this.targetSeriesData = this.chartService.getTargetChart(chartState)
            // console.log("this.targetSeriesData", this.targetSeriesData);
            salesTargetsState = cloneDeep(chartState.chartTargetSeries)
            console.log("salesTargetsState", salesTargetsState)
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
export class DialogContentUpdateTarget implements OnInit {
    formFieldHelpers: string[] = [''];

    salesTargetsForm: FormGroup = new FormGroup({
            january : new FormControl('', [Validators.required]),
            february : new FormControl('', [Validators.required]),
            march : new FormControl('', [Validators.required]),
            april : new FormControl('', [Validators.required]),
            may : new FormControl('', [Validators.required]),
            june : new FormControl('', [Validators.required]),
            july : new FormControl('', [Validators.required]),
            august : new FormControl('', [Validators.required]),
            september : new FormControl('', [Validators.required]),
            october : new FormControl('', [Validators.required]),
            november : new FormControl('', [Validators.required]),
            december : new FormControl('', [Validators.required]),
        });

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialogRef: MatDialogRef<DialogContentUpdateTarget>,
        // @Inject(MAT_DIALOG_DATA) public data: DialogData,
        @Inject(MAT_DIALOG_DATA) public data: object[],
    ) {

        console.log("DialogContentUpdateTarget data", data);
    }

    ngOnInit() {
        console.log("DialogContentUpdateTarget data", this.data);
        this.salesTargetsForm.patchValue({
            january: this.data[0]["target"],
            february: this.data[1]["target"],
            march: this.data[2]["target"],
            april: this.data[3]["target"],
            may: this.data[4]["target"],
            june: this.data[5]["target"],
            july: this.data[6]["target"],
            august: this.data[7]["target"],
            september: this.data[8]["target"],
            october: this.data[9]["target"],
            november: this.data[10]["target"],
            december: this.data[11]["target"],
        })
        // console.log("this.salesTargetsForm", this.salesTargetsForm)

    }


    onSubmit() {
        console.log("this.salesTargetsForm.value", this.salesTargetsForm.value);

        const salesTargetsUpdateForm = {
            "id": salesTargetsState["branch_id"],
            "form": {
                "id" : salesTargetsState["id"],
                "branch_id" : salesTargetsState["branch_id"],
                "january": this.salesTargetsForm.value.january,
                "february": this.salesTargetsForm.value.february,
                "march": this.salesTargetsForm.value.march,
                "april": this.salesTargetsForm.value.april,
                "may": this.salesTargetsForm.value.may,
                "june": this.salesTargetsForm.value.june,
                "july": this.salesTargetsForm.value.july,
                "august": this.salesTargetsForm.value.august,
                "september": this.salesTargetsForm.value.september,
                "october": this.salesTargetsForm.value.october,
                "november": this.salesTargetsForm.value.november,
                "december": this.salesTargetsForm.value.december,
                "date":  salesTargetsState["date"],
                "created_at": salesTargetsState["created_at"],
                "updated_at": salesTargetsState["updated_at"],
            },

        }
        console.log("salesTargetsUpdateForm", salesTargetsUpdateForm)

        this.store.dispatch(ChartActions.updateTargetChartRequestedAction({ payload: salesTargetsUpdateForm }));

        this.dialogRef.close("test");


    }
}
