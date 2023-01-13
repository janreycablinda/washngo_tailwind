import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as ChartActions from './store/chart/chart.actions';
import { ChartOptions } from 'app/models/chart-options';
import { ChartService } from './store/chart/chart.service';
import { MatDialog, } from '@angular/material/dialog';
import { Observable, Subject, map, switchMap, take } from 'rxjs';
import { membersCountsData, salesCountsData, salesSeriesData, salesTargetSeriesData } from './store/chart/chart.selectors';
import { ChartComponent } from 'ng-apexcharts';
import { DialogContentUpdateTargetComponent } from './dialog-content-update-target.component';
import { FuseLoadingService } from '@fuse/services/loading';
import { userData } from 'app/store/auth/auth.selectors';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @ViewChild("chart", { static: false }) chart: ChartComponent;

    isLoading$: Observable<boolean> = this._fuseLoadingService.show$;
    private userData: object;

    months: string[] = this.chartService.months;
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

    salesCounts$: Observable<object> = this.store.pipe(
        select(salesCountsData));
    salesCountSelected: string = "Today";

    membersCounts$: Observable<object> = this.store.pipe(
        select(membersCountsData));
    membersCountSelected: string = "All";

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialog: MatDialog,
        private _fuseLoadingService: FuseLoadingService,
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
            switchMap(() =>
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

        this.store.pipe(
            select(userData),
            take(1),
        ).subscribe(userData => {
            this.userData = userData;
        });

    }

    onYearSelected(year: number) {
        this.yearSelected = year;
        this.store.dispatch(ChartActions.loadSalesSeriesRequestedtAction({ year: this.yearSelected }));
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogContentUpdateTargetComponent, {
        });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        // });
    }

    onSalesCountSelect(duration: string) {
        console.log("onSalesCountSelected duration", duration);
        this.salesCountSelected = duration;
        this.store.dispatch(ChartActions.loadSalesRequestedtAction({
            payload: { data: duration }
        }));
    }

    onMembersCountSelect(duration: string) {
        console.log("onMembersCountSelect duration", duration);
        this.membersCountSelected = duration;
        this.store.dispatch(ChartActions.loadMembersRequestedtAction({
            payload: {
                data: duration ,
                branch_id: this.userData['branch_id'],
            }
        }));
    }

}

