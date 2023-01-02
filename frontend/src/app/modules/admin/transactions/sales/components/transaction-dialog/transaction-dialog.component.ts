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

  public variables = [{ id: 0, name: 'One' }, { id: 1, name: 'Two' }];
  public filteredVariables = this.variables.slice();

  ngOnInit(): void {
    this.dialogForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      transaction_date: ['', Validators.required],
      work_order: ['', Validators.required]
    });

    this.dialogForm.controls['transaction_date'].setValue(new Date());
  }

  submitForm(){

  }

  setMember(value){

  }

}
