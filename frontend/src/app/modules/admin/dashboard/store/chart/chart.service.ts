import { Injectable } from '@angular/core';
import { ChartOptions } from 'app/models/chart-options';
import { State } from './chart.reducer';
import { BehaviorSubject } from 'rxjs';
// import * as fromApp from 'app/store/app.reducer';
// import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class ChartService {

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
    ]

    salesChart: Partial<ChartOptions> = {
        series: [
            {
                name: "Target",
                color: '#7f7f7f',
                // data: [200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000]
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
    };
    salesChart$: BehaviorSubject<Partial<ChartOptions>> = new BehaviorSubject(undefined);

    getSalesChart(chartState: State): void {
        this.salesChart.series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.salesChart.series[1].data.forEach((_month, i) => {
            chartState.chartSalesSeries.forEach((item) => {

                if (parseInt(item['month']) - 1 === i) {
                    this.salesChart.series[1].data[i] = parseInt(item['data']);
                }
            });
        });



        this.salesChart$.next(this.salesChart)
    }

    constructor(
    ) {
    }
}
