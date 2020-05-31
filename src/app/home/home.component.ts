import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as lodash from 'lodash'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jsonResp : any;
  jsonRespGlobal : any;
  jsonRespCountries : any;
  jsonRespOrdered : any;
  textCountry : string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): any {
    console.log('Welcome!')
    var apiUrl = 'https://api.covid19api.com/summary';
    this.http.get(apiUrl)
    .subscribe(
      data=>{
        //return data.body
        this.jsonResp = data;
        this.jsonRespGlobal = this.jsonResp.Global;
        this.jsonRespCountries = this.jsonResp.Countries
        this.jsonRespOrdered=this.filterData(this.jsonRespCountries);
      }
    )
  }

  private filterData(jsonresp): any{
    console.log('data filteration');
    var temparray = lodash.sortBy(jsonresp, (p) => {return + p.TotalConfirmed}).reverse();
    return lodash.take(temparray, 20);
  }

  searchCountry(textInput : string){
    if(textInput.length>2){
      this.jsonRespOrdered = this.jsonRespCountries.filter(res=>
        {
          return res.Country.toLocaleLowerCase().match(textInput)
        });
    }
    else{
      this.jsonRespOrdered=this.filterData(this.jsonRespCountries);
    }
  }
}
