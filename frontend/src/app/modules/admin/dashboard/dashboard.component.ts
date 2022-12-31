import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import { Subscription } from 'rxjs';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  wedgit$: Subscription;
  public chartOptions: Partial<ChartOptions>;
  constructor(private store:Store<fromApp.AppState>) {
    this.chartOptions = {
      series: [
        {
          name: "Sales",
          color: '#DB520B',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Expenses",
          color: '#DB2777',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 660]
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      yaxis: {
        title: {
          text: "Yearly Sales"
        }
      },
      fill: {
        opacity: 1,
        colors: ['#DB520B', '#DB2777']
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "₱ " + val;
          }
        }
      }
    };
   }

  ngOnInit(): void {
    this.wedgit$ = this.store.select('chart').subscribe((data) => {
      const chartData:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0];
      data.chart.forEach((item) => {
        const getIndexByMonth = item['month']-1;
        chartData[getIndexByMonth] = parseInt(item['data']);
      })
      console.log(chartData);
      console.log(this.chartOptions.series[0].data);
      this.chartOptions.series[0].data = chartData;

      console.log(this.chartOptions);
      this.chart.render();
    });
  }

}
