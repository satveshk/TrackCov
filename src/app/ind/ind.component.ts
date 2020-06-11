import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ind',
  templateUrl: './ind.component.html',
  styleUrls: ['./ind.component.scss']
})
export class IndComponent implements OnInit {

  jsonResp : any;
  jsonRespDaily : any;
  jsonRespStates : any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadIndData();
  }

  private loadIndData(){
    console.log("Loading India Data...")
    var indUrl= "https://api.covid19india.org/data.json";
    this.http.get(indUrl)
    .subscribe(
      data=>{
        //return data.body
        this.jsonResp = data;
        this.jsonRespDaily = this.jsonResp.cases_time_series;
        this.jsonRespStates = this.jsonResp.statewise;
      })
  }

}
