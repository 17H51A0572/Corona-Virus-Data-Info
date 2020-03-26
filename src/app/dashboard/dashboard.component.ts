import { Component, OnInit, ViewChild, Type } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import{FormGroup,FormControl,Validators,ReactiveFormsModule, FormBuilder} from '@angular/forms';
import{ Country } from './country';
import { CountryService } from './country-services';
import { $ } from 'protractor';
import { type } from 'os';
import { request } from 'https';
import { url } from 'inspector';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataTracker:FormGroup;
  allCountries: Country[];
  response:any;
  constructor(private http:HttpClient,private formBilder:FormBuilder,
              private countryService:CountryService) {
    // let CountryDetails;
    // this.dataTracker= new FormGroup({
    //   countryName:new FormControl(this.dataTracker,Validators.required),
    //   countryCode:new FormControl(null,Validators.required)
    // })
    
   }

  ngOnInit():void {
    this.dataTracker=this.formBilder.group({
      get_country:[null,[Validators.required]]
    });
    this.allCountries=this.countryService.getCountries();
    let obs=this.http.get('https://thevirustracker.com/free-api?global=stats');
    obs.subscribe((response)=>console.log(response));
  }

  get get_country(){
    return this.dataTracker.get('get_country');
  }
  track_data(){
    console.log("Clicked button");
    let country:Country=this.get_country.value;
    // console.log('Country is:'+countryName.cName);
    let contName="COUNTRY : "+country.cName.toUpperCase();
    let contCode=country.cId;
    console.log('Country is:'+contName+'\nCountry code is:'+contCode);
    document.getElementById("abc").innerHTML=contName;
    this.http.get('https://thevirustracker.com/free-api?countryTotal='+contCode)
    .subscribe((response)=>{
      this.response=response;
      console.log(response);
    });
  }
}