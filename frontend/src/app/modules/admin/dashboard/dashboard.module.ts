import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FuseCardModule } from '@fuse/components/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { chartFeatureKey, chartReducer } from './store/chart/chart.reducer';
import { UpdateTargetDialogComponent } from './update-target-dialog/update-target-dialog.component';
import { notesFeatureKey, notesReducer } from './store/notes/notes.reducer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        UpdateTargetDialogComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgApexchartsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        FuseCardModule,
        RouterModule.forChild(dashboardRoutes),
        StoreModule.forFeature(chartFeatureKey, chartReducer),
        StoreModule.forFeature(notesFeatureKey, notesReducer),
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,

    ]
})
export class DashboardModule { }
