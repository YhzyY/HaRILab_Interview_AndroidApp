import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  action: string;
  attack1 = {
    id : 1,
    date : "2020/1/1",
    time : "12:12",
    action: ''
  }
  attack2 = {
    id : 2,
    date : "2020/1/5",
    time : "20:20",
    action: ''
  }
  attacks = [this.attack1, this.attack2];


  constructor() {}

  ngOnInit(): void {

  }

  attackAction(id: number) {
    if (this.action == 'edit'){
      console.log(id , "edit clicked ");
    }else if (this.action == 'delete'){
      console.log(id , "delete clicked ");
    }

  }
}
