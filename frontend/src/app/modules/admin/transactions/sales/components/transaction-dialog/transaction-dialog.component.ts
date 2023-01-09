import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})

export class TransactionDialogComponent implements OnInit {
  dialogForm: FormGroup;
  dialogHeader = 'Add Transaction';
  actionBtn = 'Submit';
  discounted: number = 0;
  sub_total: number = 0;
  total: number = 0;
  temp_trans: Object[];
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<TransactionDialogComponent>
  ) { }

  public variables = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
  public filteredVariables = this.variables.slice();

  ngOnInit(): void {
    this.defaultEmptyForm();
    this.dataSource = new MatTableDataSource([
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}]);
  }

  toggleMember(event){
    if(event.checked){
      this.memberEmptyForm();
    }else{
      this.defaultEmptyForm();
    }
  }

  toggleAddAsMember(event){
    if(event.checked){
      this.addAsNewMemberForm();
    }else{
      this.defaultEmptyForm();
    }
  }

  memberEmptyForm(){
    this.dialogForm = this.formBuilder.group({
      id: [''],
      transaction_date: [new Date(), Validators.required],
      work_order: ['', Validators.required],
      member: [true],
      member_id: ['', Validators.required],
      property_id: ['', Validators.required],
      add_as_member: [false, Validators.required],
    });
  }

  addAsNewMemberForm(){
    this.dialogForm = this.formBuilder.group({
      id: [''],
      transaction_date: [new Date(), Validators.required],
      work_order: [this.dialogForm.value.work_order, Validators.required],
      member: [false],
      card_no: ['', Validators.required],
      name: [this.dialogForm.value.name, Validators.required],
      contact_no: [this.dialogForm.value.contact_no, Validators.required],
      birthdate: [new Date(), Validators.required],
      beneficiary_name: ['', Validators.required],
      beneficiary_contact: ['', Validators.required],
      expiration_date: ['', Validators.required],
      member_id: ['', Validators.required],
      vehicle_id: [this.dialogForm.value.vehicle_id, Validators.required],
      plate_no: [this.dialogForm.value.plate_no, Validators.required],
      property_id: ['', Validators.required],
      odo: [this.dialogForm.value.odo, Validators.required],
      add_as_member: [true, Validators.required],
    });
  }

  defaultEmptyForm(){
    this.dialogForm = this.formBuilder.group({
      id: [''],
      transaction_date: [new Date(), Validators.required],
      work_order: ['', Validators.required],
      member: [false],
      name: ['', Validators.required],
      contact_no: ['', Validators.required],
      vehicle_id: ['', Validators.required],
      plate_no: ['', Validators.required],
      odo: ['', Validators.required],
      add_as_member: [false, Validators.required],
    });
  }

  submitForm(){
    if(this.dialogForm.valid){

    }
  }

  setMember(value){

  }

}
