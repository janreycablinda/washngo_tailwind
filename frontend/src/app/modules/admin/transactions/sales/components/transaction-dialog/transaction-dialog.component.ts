import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent implements OnInit {
  dialogForm: FormGroup;
  dialogHeader = 'Add Transaction';
  actionBtn = 'Submit';
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<TransactionDialogComponent>
  ) { }

  ngOnInit(): void {
    this.dialogForm = this.formBuilder.group({
      id: [''],
      transaction_date: ['']
    })
  }

  submitForm(){

  }

}
