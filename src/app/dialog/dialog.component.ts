import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';





@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  responseMsg: any;


  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {responseMsg: any}) { 
   
    console.log(this.responseMsg)
  }

  ngOnInit(): void {

  }
  
 
}
