import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  public event = {
    EventDate: new Date().toDateString(),
    EventTime: new Date().toTimeString(),
    EventLoc: 'inside'
  }


  clearData() {
    this.event.EventDate = new Date().toDateString();
    this.event.EventTime = new Date().toTimeString();
    this.event.EventLoc = 'inside';
  }

  submitData() {
    console.log(
        "EventDate : " + this.event.EventDate + ", EventTime : " + this.event.EventTime + ", EventLoc : " + this.event.EventLoc
    )
  }
}
