import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import {TabsPage} from "../tabs/tabs.page";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  @ViewChild('barChart', {static: true}) barChart;

  DeviceID: string;
  isSignedUp = false;
  PatientName: string;
  bars: any;
  private currentDate: string;
  dateList = [];
  reportList = [];

  constructor(private uniqueDeviceID: UniqueDeviceID, private http: HttpClient,) {}

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString();
    for(let i = 6; i >= 0; i--){
      this.dateList[i] = moment().subtract(i, 'days').format('L').substring(0, 5);
    }
    this.dateList = this.dateList.reverse();
    this.reportList = [];
    this.getReportData()
  }

  // showuuid(): void{
  //   // console.info(device.uuid);
  //   this.uniqueDeviceID.get()
  //       .then((uuid: any) => {console.log(uuid); this.DeviceID = uuid})
  //       .catch((error: any) => console.log(error));
  // }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dateList,
        datasets: [{
          label: 'nums',
          data: this.reportList,
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  getReportData() {
    this.requestReportData().subscribe(result => {
      this.reportList = result.substring(1, result.length - 1).split(',');
      console.log((this.reportList));
      this.createBarChart();
    })
  }

  requestReportData(){
    return this.http.get<string>(
        'https://stormy-dawn-15351.herokuapp.com/userAttacksReport?' +
        'userday=' + new Date().getFullYear()+'/'+ (new Date().getMonth() + 1)+'/'+new Date().getDate() +
        '&uuid=' + TabsPage.deviceId,
        {responseType: 'text' as 'json'});
  }

  ionViewWillEnter(){
    this.getReportData();
  }

  // ionViewDidLoad(){
  //   this.getReportData();
  // }
}
