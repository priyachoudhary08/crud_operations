import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { employeeModel } from './employee dashboard';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {
  formValue!:FormGroup;
 employeeModelObj:employeeModel=new employeeModel()
  employeData!: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  
  constructor( private formbuilder:FormBuilder ,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]]  ,
      salary:['',Validators.required],
    })
    this.getAllEmployee();

    
  }
  isNumbers(evt:any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

  clickAddEmployee(){ 
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
   }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
  
     this.api.postemploye(this.employeeModelObj)
     .subscribe((res: any)=>{
      console.log(res);
      alert("added successfully");
      this.formValue.reset();
      let ref=document.getElementById('cancel')
      ref?.click();
      this.getAllEmployee();
     })
   }
   getAllEmployee(){
    this.api.getemploye().subscribe(res=>{
      this.employeData=res;
    })
  }
  
  deleteEmployee(row:any){
    this.api.deleteemploye(row.id).subscribe(res=>{
      alert("employee deleted successfully");
      this.getAllEmployee();
    }

    )
  }
   onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id =row.id;
     this.formValue.controls['firstName'].setValue(row.firstName);
     this.formValue.controls['lastName'].setValue(row.lastName);
     this.formValue.controls['email'].setValue(row.email);
     this.formValue.controls['mobile'].setValue(row.mobile);
     this.formValue.controls['salary'].setValue(row.salary);
    
    
   }
   updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.updateemploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe((res: any)=>{
      alert("updated successfully");
      this.formValue.reset();
      let ref=document.getElementById('cancel')
      ref?.click();
      this.getAllEmployee();
    })
   }
}

