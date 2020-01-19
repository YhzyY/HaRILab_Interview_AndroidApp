import {Component, OnInit} from '@angular/core';
import {TabsPage} from "../tabs/tabs.page";
import {HttpClient} from "@angular/common/http";
import {AlertController} from "@ionic/angular";

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

  constructor(private http: HttpClient, public alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.loadData();

  }

  attackAction(id: number) {
    if (this.action[id] == 'edit'){
      console.log(id , "edit clicked ");
      this.editTimeAlert(id).then();
      // this.loadData();
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
        'today=' + new Date().toLocaleDateString() +
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
          // placeholder: "HH:MM AM/PM"
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
    if(this.tempDate == '' || this.tempTime == '' || this.tempLoc == '' ) {
      console.log("invalid input" );
    }
    else{
      console.log('this.tempDate', this.tempDate, 'this.tempTime', this.tempTime);
      console.log('this.tempLoc', this.tempLoc);
    }

  }

  editAttackRequest(){

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
}
