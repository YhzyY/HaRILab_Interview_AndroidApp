import {Component, OnInit} from '@angular/core';
import {TabsPage} from "../tabs/tabs.page";
import {HttpClient} from "@angular/common/http";
import {AlertController, ToastController} from "@ionic/angular";

interface attackInfo {
  attackDate: string
  attackTime: string
  attackLocation: string
  uuid : string
  id: number
  localTime: string
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {


  attackList: attackInfo[];
  action = [];
  private tempDate: any;
  private tempTime: any;
  private tempLoc: any;

  constructor(private http: HttpClient, public alertCtrl: AlertController, public toastController: ToastController) {}

  ngOnInit(): void {
    this.loadData();

  }

  attackAction(id: number) {
    if (this.action[id] == 'edit'){
      console.log(id , "edit clicked ");
      this.editTimeAlert(id).then();
      this.refreshPage();
    }else if (this.action[id] == 'delete'){
      console.log(id , "delete clicked ");
      this.deleteAttack(id);
      this.refreshPage();
    }

  }

  loadData() {
    this.requestData().subscribe(result => {
      this.parseJSON(result);
    })
  }

  requestData(){
    return this.http.get<string>(
        'https://stormy-dawn-15351.herokuapp.com/todayAttacks?' +
        'today=' + new Date().getFullYear()+'/'+ (new Date().getMonth() + 1)+'/'+new Date().getDate() +
        '&uuid=' + TabsPage.deviceId,
        {responseType: 'json' });
  }

  parseJSON(result: string){
    console.log(JSON.stringify(result));
    this.attackList = <attackInfo[]>JSON.parse(JSON.stringify(result));
  }

  getLocaltime( attackDate: string, attackTime: string) : string{
    let timeString = attackDate +'T' +  attackTime + 'Z';
    // console.log(timeString);
    // console.log(new Date(timeString));
    return new Date(timeString).toLocaleString();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.action = [];
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 300);
  }


  async editTimeAlert(id: number) {

    // console.log(id, '-------' , this.attackList[id]);
    const Timealert = await this.alertCtrl.create({
      header: 'Edit Attack',
      inputs: [
        {
          name: 'newDate',
          type: 'date',
          // placeholder : this.attackList[id].attackDate
        },
        {
          name: 'newTime',
          type: 'time',
          placeholder: "HH:MM"
          // placeholder : this.attackList[id].attackTime
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.tempDate = JSON.parse(JSON.stringify(data)).newDate;
            this.tempTime = JSON.parse(JSON.stringify(data)).newTime;
            console.log('Confirm Ok');
            this.editLocAlert(id);
          }
        }
      ]
    });
    await Timealert.present();
  }


  async editLocAlert(id: number) {
    const Localert = await this.alertCtrl.create({
      header: 'Edit Attack',
      inputs: [
        {
          // name: 'newLoc',
          label: 'inside',
          value: 'inside',
          type: 'radio',
          checked: true
        },
        {
          // name: 'newLoc',
          label: 'outside',
          value: 'outside',
          type: 'radio',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.tempLoc = JSON.parse(JSON.stringify(data));
            console.log('Confirm Ok');
          }
        }
      ]
    });
    Localert.onDidDismiss().then(()=>
        this.editAttack(id)
    );
    await Localert.present();
  }


  editAttack(id: number) {
      // console.log('this.tempDate', this.tempDate, 'this.tempTime', this.tempTime);
      // console.log('this.tempLoc', this.tempLoc);
      this.editAttackRequest(id).subscribe(
          result =>{
            this.refreshPage();
            this.presentToast("edited successfully")},
              error => {this.presentToast("invalid input")});

  }

  editAttackRequest(id){
    try{
      let newday = new Date(this.tempDate + ' ' + this.tempTime);
      let UTCdate = newday.getUTCFullYear() + '/' + (newday.getUTCMonth() + 1) + '/' + newday.getUTCDate();
      let UTCtime = ((newday.getUTCHours()<10?'0':'') + newday.getUTCHours() )+ ':' + ((newday.getUTCMinutes()<10?'0':'') + newday.getUTCMinutes());
      let userdate = new Date(this.tempDate);
      let userDate = userdate.getUTCFullYear() + '/' + (userdate.getUTCMonth() + 1) + '/' + userdate.getUTCDate();
      return this.http.put<string>(
          'https://stormy-dawn-15351.herokuapp.com/modifyAttack?' +
          'attackDate=' + UTCdate + '&attackTime=' + UTCtime + '&attackLocation=' + this.tempLoc + '&id=' + id + '&userDate=' + userDate ,
          null,
          {responseType: 'text' as 'json' });
    }catch (e) {
      this.presentToast("invalid input");
      console.log("invalid input" );

    }
  }

  private deleteAttack(id: number) {
      this.deleteAttackRequest(id).subscribe( result =>{});
          // result => {console.log(result)},
          // error=>{console.log(error)});
  }

  deleteAttackRequest(id: number){
    return this.http.delete<string>(
        'https://stormy-dawn-15351.herokuapp.com/deleteAttack?' +
        'id=' + id,
        {responseType: 'text' as 'json' });
  }

  ionViewWillEnter(){
    this.loadData();
  }

  ionViewDidLoad(){
    this.loadData();
  }

  refreshPage() {
    this.ionViewWillEnter();
    this.ionViewDidLoad();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }
}
