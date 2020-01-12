import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UniqueDeviceID} from "@ionic-native/unique-device-id/ngx";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  static deviceId: string;
  static username: string;
  public PatientName: string;
  private postFeedback: string;
  private flag = false;
  private DeviceID: string;

  constructor(private http: HttpClient, public alertCtrl: AlertController) {}
  // constructor(private uniqueDeviceID: UniqueDeviceID, private http: HttpClient) {}

  login(): void{

    try {
      this.checkPatient(this.DeviceID).subscribe(
          data => {this.PatientName = data; this.flag = true; console.log("log in successfully: " , this.PatientName);},
          async error => {
            console.log('HttpClient get checkPatient error');
            this.showPrompt();
          }
      );
    }catch (e) {
      console.log(e);
    }
  }

  // getuuid(): void{
  //   // console.info(device.uuid);
  //   this.uniqueDeviceID.get()
  //       .then((uuid: any) => {console.log(uuid); this.DeviceID = uuid; TabsPage.deviceId = uuid})
  //       .catch((error: any) => console.log(error));
  // }

  checkPatient(DeviceID) {
    return this.http.get<string>(
        'https://stormy-dawn-15351.herokuapp.com/participantName?' +
        'uuid=' + DeviceID,
        {responseType: 'text' as 'json' });
  }

  async showPrompt() {
    const prompt = await this.alertCtrl.create({
      header: 'Login',
      message: "Enter a username to use our system",
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'username'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.PatientName = JSON.parse(JSON.stringify(data)).username;
            console.log('OK clicked, PatientName = ', this.PatientName);
          }
        }
      ]
    });
    prompt.onDidDismiss().then(() => {
      this.signup(this.PatientName, this.DeviceID);
      TabsPage.deviceId = this.DeviceID;
      TabsPage.username = this.PatientName
    });
    await prompt.present();
  }

  signup(newName: string, uuid: string): void {
    console.log('signup : ' + newName + ' and ' + uuid);
    this.addUser(newName, uuid).subscribe(result => {this.postFeedback = result; console.log(this.postFeedback)});
  }


  addUser(newName: string,  uuid: string) {
      return this.http.post<string>(
        'https://stormy-dawn-15351.herokuapp.com/newUser?name=' + newName + '&uuid=' + uuid,
        null,
        {responseType: 'text' as 'json' });
    }

  ngOnInit(): void {
    // this.getuuid();
    this.DeviceID = '33c-hl';
    TabsPage.deviceId = this.DeviceID;
      this.login();
    console.log("TabsPage.uuid : " , TabsPage.deviceId);
  }

}
