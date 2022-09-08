import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  animal: string;
  name: string;
  constructor(private fb:FormBuilder, public dialog: MatDialog,private spinner: NgxSpinnerService) { }
  taskForm!: FormGroup;
  userFile: string;
  imageSrc: string;
  imageSelected: '';
  size: '';
  checkboxdata = [];
  savelocaldata:'';
  
  showafterupload: boolean = false;

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(){
    this.taskForm = this.fb.group({
      taskname:['',],
      taskdescription:['',],
      attachment: [],
      tasklist1: [],
      tasklist2: [],
      tasklist3: [],
      tasklist4: [],
    })
  }

  submitDetail(): void{
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
   console.log('husu', this.taskForm.value);
   localStorage.setItem('key', JSON.stringify(this.taskForm.value));
   var store = JSON.parse(localStorage.getItem('key'));
   this.savelocaldata = store;
   console.log("store", store);
    // this.spinner.show();
    if(this.taskForm.value.taskname == ''){
      alert('please enter taskname')
    }
    else{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '500px',
        height: '400px',
        data: {name: this.name, animal: this.animal},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
  }



  // readURL(event: Event): void {
  //   if (event.target.files && event.target.files[0]) {
  //       const file = event.target.files[0];

  //       const reader = new FileReader();
  //       reader.onload = e => this.imageSrc = reader.result;

  //       reader.readAsDataURL(file);
  //   }
    readURL(event: any): void {
      this.userFile = event.target.files[0].name;
      this.size = event.target.files[0].size;
      // this.imageSelected = this.userFile.name;
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      this.showafterupload = true;
      console.log(this.userFile)
    }

    subtaskdata(id): void{
      console.log(id);
      // this.checkboxdata = id
       if(id.target.checked){
        //  if(this.checkboxdata.includes(id.target.value)){
        //   this.checkboxdata = this.checkboxdata.filter(item => item !== id.target.value)

        //  }
       }
    }
    
}



@Component({
  selector: 'dialogs-details',
  templateUrl: 'dialogs-details.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  savedata;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  
  ngOnInit(): void {
    var store = JSON.parse(localStorage.getItem('key'));
     this.savedata = store
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

 


