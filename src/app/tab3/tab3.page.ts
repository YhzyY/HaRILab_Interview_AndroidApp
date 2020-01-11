import { Component } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  DeviceID: string;
  isSignedUp = false;
  PatientName: string;
  constructor(private uniqueDeviceID: UniqueDeviceID) {}

  showuuid(): void{
    // console.info(device.uuid);
    this.uniqueDeviceID.get()
        .then((uuid: any) => {console.log(uuid); this.DeviceID = uuid})
        .catch((error: any) => console.log(error));
  }

}
