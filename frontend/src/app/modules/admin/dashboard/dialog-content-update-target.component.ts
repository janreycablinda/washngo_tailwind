import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from 'app/store/app.reducer';
import { ChartService } from "./store/chart/chart.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { salesTargetSeriesData } from "./store/chart/chart.selectors";
import * as ChartActions from './store/chart/chart.actions';

@Component({
    selector: 'app-dialog-content-update-target',
    templateUrl: './dialog-content-update-target.component.html',
})
export class DialogContentUpdateTargetComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    formFieldHelpers: string[] = [''];
    months: string[] = this.chartService.months;

    salesTargetSeriesData: object;

    salesTargetsForm: FormGroup = new FormGroup({
        january: new FormControl('', [Validators.required]),
        february: new FormControl('', [Validators.required]),
        march: new FormControl('', [Validators.required]),
        april: new FormControl('', [Validators.required]),
        may: new FormControl('', [Validators.required]),
        june: new FormControl('', [Validators.required]),
        july: new FormControl('', [Validators.required]),
        august: new FormControl('', [Validators.required]),
        september: new FormControl('', [Validators.required]),
        october: new FormControl('', [Validators.required]),
        november: new FormControl('', [Validators.required]),
        december: new FormControl('', [Validators.required]),
    });
    remappedData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    constructor(
        private store: Store<fromApp.AppState>,
        public dialogRef: MatDialogRef<DialogContentUpdateTargetComponent>,
        // @Inject(MAT_DIALOG_DATA) public data$: object[],
        private chartService: ChartService,
    ) {

        // console.log("DialogContentUpdateTarget data", data$);
    }

    ngOnInit(): void {

        this.store.pipe(
            takeUntil(this._unsubscribeAll),
            select(salesTargetSeriesData)).subscribe(data => {
                this.salesTargetSeriesData = data;
                console.log("salesTargetSeriesData", this.salesTargetSeriesData)
                this.remappedData = this.chartService.remapSalesTargetSeriesData(data)
                console.log("remappedData", this.remappedData)

                this.salesTargetsForm.patchValue({
                    january: this.remappedData[0],
                    february: this.remappedData[1],
                    march: this.remappedData[2],
                    april: this.remappedData[3],
                    may: this.remappedData[4],
                    june: this.remappedData[5],
                    july: this.remappedData[6],
                    august: this.remappedData[7],
                    september: this.remappedData[8],
                    october: this.remappedData[9],
                    november: this.remappedData[10],
                    december: this.remappedData[11],
                })

            });

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onSubmit() {
        console.log("this.salesTargetsForm.value", this.salesTargetsForm.value);

        const salesTargetsUpdateForm = {
            "id": this.salesTargetSeriesData["branch_id"],
            "form": {
                "id": this.salesTargetSeriesData["id"],
                "branch_id": this.salesTargetSeriesData["branch_id"],
                "january": String(this.salesTargetsForm.value.january),
                "february": String(this.salesTargetsForm.value.february),
                "march": String(this.salesTargetsForm.value.march),
                "april": String(this.salesTargetsForm.value.april),
                "may": String(this.salesTargetsForm.value.may),
                "june": String(this.salesTargetsForm.value.june),
                "july": String(this.salesTargetsForm.value.july),
                "august": String(this.salesTargetsForm.value.august),
                "september": String(this.salesTargetsForm.value.september),
                "october": String(this.salesTargetsForm.value.october),
                "november": String(this.salesTargetsForm.value.november),
                "december": String(this.salesTargetsForm.value.december),
                "date": this.salesTargetSeriesData["date"],
                "created_at": this.salesTargetSeriesData["created_at"],
                "updated_at": this.salesTargetSeriesData["updated_at"],
            },
        }
        // console.log("salesTargetsUpdateForm", salesTargetsUpdateForm)

        this.store.dispatch(ChartActions.updateTargetSalesSeriesRequestedtAction({ payload: salesTargetsUpdateForm }));

        this.dialogRef.close();

    }
}
