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
    this.event.EventTime = new Date().getHours() + ":" + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();
    this.event.EventLoc = 'inside';
  }

  submitData() {
    this.event.EventDate = new Date(this.event.EventDate).toLocaleDateString();

    let newday = new Date(this.event.EventDate + ' ' + this.event.EventTime);
    let UTCdate = newday.getUTCFullYear() + '/' + (newday.getUTCMonth() + 1) + '/' + newday.getUTCDate();
    let UTCtime = ((newday.getUTCHours()<10?'0':'') + newday.getUTCHours() )+ ':' + ((newday.getUTCMinutes()<10?'0':'') + newday.getUTCMinutes());
    console.log(
        newday,
        "\n",
        "LocalDate : " + this.event.EventDate  + ", LocalTime : " + this.event.EventTime + ", EventLoc : " + this.event.EventLoc + ", uuid : " + TabsPage.deviceId,
        "\n",
        "UTC : EventDate : " + UTCdate  + ", EventTime : " + UTCtime + ", EventLoc : " + this.event.EventLoc + ", uuid : " + TabsPage.deviceId,
    )

    this.submitRequest(UTCdate, UTCtime, this.event.EventLoc)
        .subscribe(result => {
          console.log(result);
          this.submitFeedback(result)
        });
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

  submitFeedback(result: string){
    if(result == 'new attack is added'){
      console.log('result check true successful')
    }else{
      console.log('result check false successful')
    }

  }
}
