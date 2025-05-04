import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { About } from '../_models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  apiurl = 'https://localhost:7000/api/Abouts/';
  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<About[]>(this.apiurl);
  }

  getById(id:number){
    return this.http.get<About>(this.apiurl + id);
  }

  create(model : About){
    return this.http.post(this.apiurl, model);
  }

  update(model : About){
    return this.http.put(this.apiurl, model);
  }

  delete(id:number){
    return this.http.delete(this.apiurl + id);
  }
}
