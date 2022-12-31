import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import * as fromApp from 'app/store/app.reducer';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  notification$: Observable<any>;
  panelClass = '';

  constructor(
    private store: Store<fromApp.AppState>, private _snackBar: MatSnackBar
  ) { }

  openSnackBar(type: string, message:string) {
    if(type == 'success'){
      this.panelClass = 'notification-success';
      this.horizontalPosition = 'right';
      this.verticalPosition = 'top';
    } else if(type == 'authError') {
      this.panelClass = 'notification-danger';
      this.horizontalPosition = 'center';
      this.verticalPosition = 'top';
    }else{
      this.panelClass = 'notification-danger';
      this.horizontalPosition = 'right';
      this.verticalPosition = 'top';
    }
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: this.panelClass,
      duration: 2000
    });
  }


  ngOnInit(): void {
    this.notification$ = this.store.select('notification');
    
    this.notification$.subscribe(res => {
      if(res.type){
        this.openSnackBar(res.type, res.message);
      }
    })
  }

}
