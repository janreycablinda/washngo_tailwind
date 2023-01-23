import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as ChartActions from './store/chart/chart.actions';
import { ChartOptions } from 'app/models/chart-options';
import { ChartService } from './store/chart/chart.service';
import { MatDialog, } from '@angular/material/dialog';
import { Observable, Subject, map, switchMap, take, takeUntil } from 'rxjs';
import { membersCountsData, salesCountsData, salesSeriesData, salesTargetSeriesData } from './store/chart/chart.selectors';
import { ChartComponent } from 'ng-apexcharts';
import { FuseLoadingService } from '@fuse/services/loading';
import { userData } from 'app/store/auth/auth.selectors';
import { NoteDTO } from 'app/models/note';
import { selectNotes } from './store/notes/notes.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as NotesActions from './store/notes/notes.actions';
import { FuseConfirmationService } from '@fuse/services/confirmation';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    @ViewChild("chart", { static: false }) chart: ChartComponent;
    @ViewChild('setupTargetDrawer', { static: true }) setupTargetDrawerHandle: any;
    @ViewChild('notesDrawer', { static: true }) notesDrawerHandle: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    isLoading$: Observable<boolean> = this._fuseLoadingService.show$;
    private userData: object;

    formFieldHelpers: string[] = [''];

    setupTargetDrawerName = 'setupTargetDrawer';
    setupTargetDrawerMode = 'over';
    setupTargetDrawerPosition = 'right';
    setupTargetDrawerOpened = false;

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


    notesDrawerName = 'notesDrawer';
    notesDrawerMode = 'over';
    notesDrawerPosition = 'right';
    notesDrawerOpened = false;

    // note form - start
    noteForm: FormGroup = new FormGroup({
        message: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
    });
    // note form - end

    // note date/time picker - start
    noteDateTime: Date = new Date();
    customErrorStateMatcher = {
        isErrorState: (control: FormControl) => control.invalid
    };
    // note date/time picker - end

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

    notes$: Observable<NoteDTO[]> = this.store.pipe(
        select(selectNotes));

    constructor(
        private store: Store<fromApp.AppState>,
        private chartService: ChartService,
        public dialog: MatDialog,
        private _fuseLoadingService: FuseLoadingService,
        private _fuseConfirmationService: FuseConfirmationService,
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

        this.store.pipe(
            takeUntil(this._unsubscribeAll),
            select(salesTargetSeriesData)).subscribe(data => {
                if (data) {
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
                }
            });

        // this.noteForm = this.fb.group({
        //     message: ['', Validators.required]
        // });

    }

    onYearSelected(year: number) {
        this.yearSelected = year;
        this.store.dispatch(ChartActions.loadSalesSeriesRequestedtAction({ year: this.yearSelected }));
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
                data: duration,
                branch_id: this.userData['branch_id'],
            }
        }));
    }

    onSetupTargetFormSubmit() {
        console.log("this.salesTargetsForm.value", this.salesTargetsForm.value);

        if (this.salesTargetsForm.dirty) {

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
            console.log("salesTargetsUpdateForm", salesTargetsUpdateForm)

            this.store.dispatch(ChartActions.updateTargetSalesSeriesRequestedtAction({ payload: salesTargetsUpdateForm }));

            this.salesTargetsForm.markAsPristine();

            this.setupTargetDrawerHandle.close();

        }
    }

    onNoteFormSubmit(): void {
        // console.log("this.noteForm.value", this.noteForm.value);

        if (this.noteForm.dirty) {

            // get date time
            const dataTimeString = this.noteDateTime;
            const year = dataTimeString.getFullYear();
            const month = ("0" + (dataTimeString.getMonth() + 1)).slice(-2);
            const day = ("0" + dataTimeString.getDate()).slice(-2);
            const hours = ("0" + dataTimeString.getHours()).slice(-2);
            const minutes = ("0" + dataTimeString.getMinutes()).slice(-2);
            const seconds = ("0" + dataTimeString.getSeconds()).slice(-2);
            const dateString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

            const payload = {
                "id": this.userData["id"],
                "message": this.noteForm["value"]["message"],
                "date": dateString,
                "location": "dashboard",
            }
            // console.log("noteForm payload", payload);

            this.store.dispatch(NotesActions.addNote({ payload }));
            this.noteForm.markAsPristine();
            this.notesDrawerHandle.close();
            this.noteForm.reset();
            this.noteDateTime = new Date();

        }

    }

    noteTimeChangeHandler(event: Date) {
        console.log(event);
    }

    invalidNoteDateTimeInputHandler() {
        console.log('Invalid Input');
    }

    onDeleteNoteClicked(noteId: number): void {

        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Note',
            message: 'Are you sure you want to remove this note? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {

                console.log("userData", this.userData);
                console.log("noteId", noteId);

                const payload = {
                    "id": noteId,
                    "user_id": this.userData['id'],
                }

                this.store.dispatch(NotesActions.deleteNote({ payload }));

            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}

