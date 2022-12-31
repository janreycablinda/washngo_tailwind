import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const dashboardRoutes: Route[] = [
  {
      path     : '',
      component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatIconModule,
    MatButtonModule,
    FuseCardModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
