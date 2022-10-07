
import { Component, OnInit, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators, } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { messageRecieved } from './user';
import { interval, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';




@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  registrationform !: FormGroup;
  StatusCode = '';
  Message = '';
  data = [this.StatusCode, this.Message]
  interval: any;
  responseSuccess='';
  private unsub = new Subject<void>();



  constructor(private formbuilder: FormBuilder, private api: ApiService, public dialog: MatDialog) { }
  messagelist!: messageRecieved[];

  displayedColumns: string[] = ['ID', 'Message', 'Age', 'Action'];
  dataSource = new MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {

    timer(0,10000).pipe(
      tap((x)=>console.log(x)),
      takeUntil(this.unsub),
      switchMap(async () => this.listItems())
    ).subscribe();

    this.registrationform = this.formbuilder.group({
      fullnames: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent,{
      data: { responseMsg: this.responseSuccess },
    });
  }

  SaveUser() {
    if (this.registrationform.valid) {
      this.api.saveUser(JSON.stringify(this.registrationform.value))
        .subscribe({
          next: (res) => {
            console.log(res, "body")
            this.responseSuccess=res;
            this.openDialog();
          },
          error: () => { this.openDialog(); }
        });
      this.registrationform.reset;
    }
  }

  listItems() {
    console.log("Am listing Items")
    this.api.listItems()
      .subscribe({
        next: (data) => {
          this.dataSource=new MatTableDataSource(data);
          console.log(JSON.stringify(data));
        },
        error: () => { console.log("Problem occurred") }
      });
  }
  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete();
  }
}

