import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent, DialogContentUpdateTarget } from './dashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { chartFeatureKey, chartReducer } from './store/chart/chart.reducer';

const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        DialogContentUpdateTarget
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgApexchartsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        FuseCardModule,
        RouterModule.forChild(dashboardRoutes),
        StoreModule.forFeature(chartFeatureKey, chartReducer),

    ]
})
export class DashboardModule { }
