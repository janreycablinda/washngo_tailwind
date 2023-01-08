import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as ChartActions from './store/chart/chart.actions';
import { ChartOptions } from 'app/models/chart-options';
import { ChartService } from './store/chart/chart.service';
// import { cloneDeep } from 'lodash';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, switchMap, withLatestFrom } from 'rxjs';
import { salesSeriesData, salesTargetSeriesData } from './store/chart/chart.selectors';
import { ChartComponent } from 'ng-apexcharts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @ViewChild("chart", { static: false }) chart: ChartComponent;

    months: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    chartOptions: Partial<ChartOptions> = {
        series: [
            {
                name: "Target",
                color: '#7f7f7f',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Sales",
                color: '#DB520B',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },

        ],
        chart: {
            type: "bar",
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
        },
        xaxis: {
            categories: this.months,
        },
        yaxis: {
            title: {
                text: "Monthly Sales"
            }
        },
        fill: {
            opacity: 1,
            colors: ['#DB520B', '#DB2777']
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "₱ " + val;
                }
            }
        }
    }

    //
    yearsList: number[] = [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
    ];
    yearSelected: number = new Date().getFullYear();

    chartData$: Observable<any[]>;

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {

        // NEW CODE
        this.chartData$ = this.store.pipe(
            // this.store.pipe(
            select(salesSeriesData),
            map(salesSeriesData => [
                {
                    name: 'Sales',
                    color: '#DB520B',
                    data: this.chartService.remapSalesSeriesData(salesSeriesData)
                }]),
            switchMap(salesSeriesData =>
                this.store.pipe(select(salesTargetSeriesData)),
                (salesSeriesData, salesTargetSeriesData) => [
                    {
                        name: 'Target',
                        color: '#7f7f7f',
                        data: salesTargetSeriesData ? this.chartService.remapSalesTargetSeriesData(salesTargetSeriesData) : []
                    },
                    ...salesSeriesData
                ]
            )
        )
        // .subscribe(chartData => {
        //     console.log("chartData", chartData);
        // });


    }

    onYearSelected(year: number) {
        this.yearSelected = year;
        this.store.dispatch(ChartActions.loadSalesSeriesRequestedtAction({ year: this.yearSelected }));
    }

    openDialog() {
        // const dialogRef = this.dialog.open(DialogContentUpdateTarget, {
        //     "data": this.targetSeriesData
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        // });
    }
}

@Component({
    selector: 'dialog-content-update-target',
    templateUrl: './dialog-content-update-target.html',
})
export class DialogContentUpdateTarget implements OnInit {
    // formFieldHelpers: string[] = [''];

    // salesTargetsForm: FormGroup = new FormGroup({
    //     january: new FormControl('', [Validators.required]),
    //     february: new FormControl('', [Validators.required]),
    //     march: new FormControl('', [Validators.required]),
    //     april: new FormControl('', [Validators.required]),
    //     may: new FormControl('', [Validators.required]),
    //     june: new FormControl('', [Validators.required]),
    //     july: new FormControl('', [Validators.required]),
    //     august: new FormControl('', [Validators.required]),
    //     september: new FormControl('', [Validators.required]),
    //     october: new FormControl('', [Validators.required]),
    //     november: new FormControl('', [Validators.required]),
    //     december: new FormControl('', [Validators.required]),
    // });

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
        // this.salesTargetsForm.patchValue({
        //     january: this.data[0]["target"],
        //     february: this.data[1]["target"],
        //     march: this.data[2]["target"],
        //     april: this.data[3]["target"],
        //     may: this.data[4]["target"],
        //     june: this.data[5]["target"],
        //     july: this.data[6]["target"],
        //     august: this.data[7]["target"],
        //     september: this.data[8]["target"],
        //     october: this.data[9]["target"],
        //     november: this.data[10]["target"],
        //     december: this.data[11]["target"],
        // })
        // console.log("this.salesTargetsForm", this.salesTargetsForm)

    }


    onSubmit() {
        // console.log("this.salesTargetsForm.value", this.salesTargetsForm.value);

        // const salesTargetsUpdateForm = {
        //     "id": salesTargetsState["branch_id"],
        //     "form": {
        //         "id": salesTargetsState["id"],
        //         "branch_id": salesTargetsState["branch_id"],
        //         "january": String(this.salesTargetsForm.value.january),
        //         "february": String(this.salesTargetsForm.value.february),
        //         "march": String(this.salesTargetsForm.value.march),
        //         "april": String(this.salesTargetsForm.value.april),
        //         "may": String(this.salesTargetsForm.value.may),
        //         "june": String(this.salesTargetsForm.value.june),
        //         "july": String(this.salesTargetsForm.value.july),
        //         "august": String(this.salesTargetsForm.value.august),
        //         "september": String(this.salesTargetsForm.value.september),
        //         "october": String(this.salesTargetsForm.value.october),
        //         "november": String(this.salesTargetsForm.value.november),
        //         "december": String(this.salesTargetsForm.value.december),
        //         "date": salesTargetsState["date"],
        //         "created_at": salesTargetsState["created_at"],
        //         "updated_at": salesTargetsState["updated_at"],
        //     },
        // }
        // console.log("salesTargetsUpdateForm", salesTargetsUpdateForm)

        // this.store.dispatch(ChartActions.updateTargetChartRequestedAction({ payload: salesTargetsUpdateForm }));

        this.dialogRef.close("test");

    }
}
