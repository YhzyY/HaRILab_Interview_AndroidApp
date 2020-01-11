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
  // constructor(private uniqueDeviceID: UniqueDeviceID, private http: HttpClient) {}

  showuuid(): void{
    // console.info(device.uuid);
    this.uniqueDeviceID.get()
        .then((uuid: any) => {console.log(uuid); this.DeviceID = uuid})
        .catch((error: any) => console.log(error));
  }

  // login(): void{
  //   try {
  //     this.checkPatient(this.DeviceID).subscribe(data => {this.PatientName = data; console.log(this.PatientName);});
  //   }catch (e) {
  //     console.log(e);
  //   }
  // }
  //
  // checkPatient(DeviceID) {
  //   return this.http.get<string>(
  //     'https://stormy-dawn-15351.herokuapp.com/participantName?' +
  //     'uuid=' + DeviceID,
  //     {responseType: 'text' as 'json' });
  // }

 // signup(newName: string, uuid: string): void {
 //   console.log('signup : ' + newName + ' and ' + newPassword);
 //   this.addClinician(newName, newPassword).subscribe(result => this.postFeedback = result);
 //   console.log(this.postFeedback);
 // }

 //
 //   addClinician(newName: string, newPassword: number) {
 //     return this.http.post<string>(
 //       'https://stormy-dawn-15351.herokuapp.com/newClinician?userName=' + newName + '&password=' + newPassword,
 //       null,
 //       {responseType: 'text' as 'json' });
 //   }

}
