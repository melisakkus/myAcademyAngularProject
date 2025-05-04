import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../_models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl = 'https://localhost:7000/api/Services/';
  constructor(private http  : HttpClient) { }

  getAll(){
    return this.http.get<Service[]>(this.apiUrl);
  }

  getById(id:number){
    return this.http.get<Service>(this.apiUrl + id);
  }

  create(model:Service){
    return this.http.post<Service>(this.apiUrl, model);
  }

  update(model:Service){
    return this.http.put(this.apiUrl, model);
  }

  delete(id:number){
    return this.http.delete(this.apiUrl + id);
  }
}
