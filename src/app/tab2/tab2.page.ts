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

  constructor(private http: HttpClient, public alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.loadData();

  }

  attackAction(id: number) {
    if (this.action[id] == 'edit'){
      console.log(id , "edit clicked ");
    }else if (this.action[id] == 'delete'){
      console.log(id , "delete clicked ");
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
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 300);
  }


}
