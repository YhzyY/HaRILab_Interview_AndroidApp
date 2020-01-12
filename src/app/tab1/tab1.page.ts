import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AlertController} from "@ionic/angular";
import {TabsPage} from "../tabs/tabs.page";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private http: HttpClient, public alertCtrl: AlertController) {}

  public event = {
    EventDate: new Date().toLocaleDateString(),
    EventTime: new Date().getHours() + ":" + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes(),
    EventLoc: 'inside'
  }


  clearData() {
    this.event.EventDate = new Date().toLocaleDateString();
    // this.event.EventTime = new Date().getHours() + ":" + new Date().getMinutes();
    this.event.EventTime = new Date().getHours() + ":" + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();
    this.event.EventLoc = 'inside';
  }

  submitData() {
    this.event.EventDate = new Date(this.event.EventDate).toLocaleDateString();
    console.log(
        "EventDate : " + this.event.EventDate  + ", EventTime : " + this.event.EventTime + ", EventLoc : " + this.event.EventLoc + ", uuid : " + TabsPage.deviceId
    )
    this.submitRequest(this.event.EventDate, this.event.EventTime, this.event.EventLoc)
        .subscribe(result => {console.log(result)});
  }

  submitRequest(EventDate: string, EventTime: string, EventLoc: string) {
    return this.http.post<string>(
        'https://stormy-dawn-15351.herokuapp.com/newAttack?' +
        'attackDate=' + EventDate +
        '&attackTime=' + EventTime +
        '&attackLocation=' + EventLoc +
        '&uuid=' + TabsPage.deviceId,
        null,
        {responseType: 'text' as 'json' });
  }
}
