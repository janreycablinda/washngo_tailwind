import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import { Observable, Subscription } from 'rxjs';
import * as VehicleActions from 'app/store/vehicles/vehicles.actions';
import * as CategoryActions from 'app/store/category/category.actions';
import { VehicleDTO } from 'app/models/vehicles';
import { CategoryDTO } from 'app/models/category';
import { ServiceDTO } from 'app/models/services';
import * as ServicesActions from 'app/store/services/services.actions';
import { TempTransDTO } from 'app/models/transactions';
import { DiscountDTO } from 'app/models/discounts';
import * as DiscountActions from '../../store/discounts/discounts.actions';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})

export class TransactionDialogComponent implements OnInit {
  dialogForm: FormGroup;
  dialogFormService: FormGroup;
  dialogHeader = 'Add Transaction';
  actionBtn = 'Submit';
  discounted: number = 0;
  sub_total: number = 0;
  total: number = 0;
  temp_trans: Object[];
  vehicles$: Subscription;
  category$: Subscription;
  services$: Subscription;
  discounts$: Subscription;
  category: CategoryDTO[] = [];
  vehicles: VehicleDTO[] = [];
  services: ServiceDTO[] = [];
  discounts: DiscountDTO[] = [];
  vehicleFilteredData: VehicleDTO[] = [];
  categoryFilteredData: CategoryDTO[] = [];
  servicesFilteredData: ServiceDTO[] = [];
  
  displayedColumns: string[] = ['services_name', 'services_charge', 'action'];
  dataSource: MatTableDataSource<any>;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  public variables = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
  public filteredVariables = this.variables.slice();
  filteredVehicleVariables = this.vehicles.slice();

  ngOnInit(): void {
    this.defaultEmptyForm();
    this.servicesEmptyForm();
    this.vehicles$ = this.store.select('vehicles').subscribe((vehicles) => {
      this.vehicles = vehicles.vehicles;
      this.vehicleFilteredData = vehicles.vehicles;
    });
    this.category$ = this.store.select('categories').subscribe((categories) => {
      this.category = categories.categories;
      this.categoryFilteredData = categories.categories;
    });
    this.services$ = this.store.select('services').subscribe((services) => {
      this.services = services.selected_services;
      this.servicesFilteredData = services.selected_services;
      console.log(services.selected_services);
    });
    this.store.dispatch(DiscountActions.loadDiscountRequestedAction());
    this.discounts$ = this.store.select('discounts').subscribe((discounts) => {
      this.discounts = discounts.discounts;
      console.log(discounts.discounts);
    });
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

  public servicesEmptyForm(){
    this.dialogFormService = this.formBuilder.group({
      services_type: ['', Validators.required],
      services: ['', Validators.required],
    });
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
      temp_trans: [[], Validators.required],
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
      temp_trans: [[], Validators.required],
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
      temp_trans: [[], Validators.required],
    });
  }

  filterVehicles(vehicle){
    let vehicleFilteredData = this.vehicles.filter((unit) => unit.vehicle_name.toLowerCase().indexOf(vehicle) > -1);
    this.vehicleFilteredData = vehicleFilteredData;
  }

  filterCategory(category){
    let categoryFilteredData = this.category.filter((unit) => unit.category_name.toLowerCase().indexOf(category) > -1);
    this.categoryFilteredData = categoryFilteredData;
  }

  filterServices(service){
    let servicesFilteredData = this.services.filter((unit) => unit.services_name.toLowerCase().indexOf(service) > -1);
    this.servicesFilteredData = servicesFilteredData;
  }

  openVehicle(){
    if(this.vehicles.length == 0){
      this.store.dispatch(VehicleActions.loadVehiclesRequestedAction());
    }
  }

  checkValue(event){
    console.log(event)
  }

  openCategory(){
    if(this.dialogForm.value.vehicle_id || this.dialogForm.value.property_id){
      if(this.category.length == 0){
        this.store.dispatch(CategoryActions.loadCategoryRequestedAction());
      }
    }
  }

  openServices(){
    console.log(this.dialogFormService.value.services_type);
    if(this.dialogFormService.value.services_type){
      this.store.dispatch(ServicesActions.loadSelectedServicesRequestedAction({payload: {size_id: this.dialogForm.value.vehicle_id.size_id, category_id: this.dialogFormService.value.services_type}}));
    }
  }

  submitForm(){
    if(this.dialogForm.valid){

    }
  }

  calculateTempTrans(){
    let sub_total: number = 0;
    let discounts: number = 0;
    this.dialogForm.value.temp_trans.forEach((item:TempTransDTO) => {
      console.log(item);
      sub_total += item.price;
      this.discounts.forEach((discount) => {
        if(this.dialogForm.value.add_as_member){
          if(discount.discount_type == 'Regular Membership Discount'){
            if(item.services_id == discount.services_id){
              if(discount.percentage_type == '%'){
                let divide = discount.discount_percentage / 100;
                discounts += item.price * divide;
              }else{
                discounts += discount.discount_percentage;
              }
            }
          }
        }
        if(discount.discount_type == 'Regular Membership Discount'){
          if(this.dialogForm.value.member_id){
            console.log('Regular Membership Discount');
            if(discount.services_id == item.services_id){
              if(discount.percentage_type == '%'){
                let divide = discount.discount_percentage / 100;
                discounts += item.price * divide;
              }else{
                discounts += discount.discount_percentage;
              }
            }
          }
        } else if(discount.discount_type == 'First Wash Discount'){
          if(this.is_first_trans || this.dialogForm.value.add_as_member){
            console.log('First Wash Discount');
            if(discount.services_id == item.services_id){
              if(discount.percentage_type == '%'){
                let divide = discount.discount_percentage / 100;
                discounts += item.price * divide;
              }else{
                discounts += discount.discount_percentage;
              }
            }
          }
        } else if(discount.discount_type == '10 points Discount'){
          if(this.vehicle_redeem != ''){
            console.log('10 points Discount');
            if(discount.services_id == item.services_id){
              if(discount.percentage_type == '%'){
                let divide = discount.discount_percentage / 100;
                discounts += item.price * divide;
              }else{
                discounts += discount.discount_percentage;
              }
            }
          }
        }
        console.log(discounts);
      })
    });
    this.discounted = discounts;
    this.sub_total = sub_total;
  }

  submitFormService(){
    if(this.dialogFormService.valid){
      const services = this.servicesFilteredData.find((service) => service.id == this.dialogFormService.value.services);
      const existed = this.dialogForm.value.temp_trans.find((service) => service.variation_id == services.variations[0].id);
      if(!existed){
        const data:TempTransDTO = {
          services_id: services.id,
          services_name: services.services_name,
          price: services.variations[0].price,
          variation_id: services.variations[0].id
        }
        const temp_trans = [...this.dialogForm.value.temp_trans, data];
        this.dialogForm.controls['temp_trans'].setValue(temp_trans);
        this.calculateTempTrans();
        }
      }
    }
    
  deleteTempTrans(id:number){
    let newData = this.dialogForm.value.temp_trans.filter(item => item.variation_id !== id);
    this.dialogForm.controls['temp_trans'].setValue(newData);
  }

  resetServiceForm(){
    this.dialogFormService.reset();
  }

}
