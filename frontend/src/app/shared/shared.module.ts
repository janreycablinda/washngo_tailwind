import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableComponent } from './datatable/datatable.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {MatDialogModule} from '@angular/material/dialog';
import {DialogModule} from '@angular/cdk/dialog';

@NgModule({
    declarations: [
        DatatableComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        DialogModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        DatatableComponent,
        MatInputModule,
        SnackbarComponent,
        MatDialogModule,
        DialogModule
    ]

})
export class SharedModule
{
}
