import { Injectable } from '@angular/core';

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

    remapSalesSeriesData(salesSeriesData): number[] {
        // console.log("remapSalesSeriesData salesSeriesData", salesSeriesData)
        const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        newData.forEach((_month, i) => {
            salesSeriesData.forEach((item) => {
                if (parseInt(item['month']) - 1 === i) {
                    newData[i] = parseInt(item['data']);
                }
            });
        });

        return newData;

    }

    remapSalesTargetSeriesData(salesTargetSeriesData): number[] {
        // console.log("salesTargetSeriesData", salesTargetSeriesData);

        let targetSeriesData: object[] = [];
        const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // convert chartState.chartTargetSeries object to array
        // let targetSeries = Object.keys(chartState.chartTargetSeries).map((key) => {
        Object.keys(salesTargetSeriesData).map((key) => {
            // console.log("key", key);

            // filter throught each this.months
            this.months.forEach((month, i) => {
                if (month.toLowerCase() === key) {
                    // console.log("month", month);

                    targetSeriesData = [...targetSeriesData, {
                        // "name" : month.toLowerCase(),
                        "name": month,
                        "target": parseInt(salesTargetSeriesData[key]),
                    }];

                    newData[i] = parseInt(salesTargetSeriesData[key]);
                    // console.log("this.salesChart.series[0]", this.salesChart.series[0])
                }
            });

            // return salesTargetSeriesData[key];

        });
        // console.log("newData", newData);
        // console.log("targetSeriesData", targetSeriesData);
        return newData;
    }
}
