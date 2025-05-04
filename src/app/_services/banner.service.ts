import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Banner } from '../_models/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  apiUrl = 'https://localhost:7000/api/Banners/';
  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Banner[]>(this.apiUrl);
  }

  getById(id:number){
    return this.http.get<Banner>(this.apiUrl+id);
  }

  create(model : Banner){
    return this.http.post<Banner>(this.apiUrl, model);
  }

  update(model :Banner){
    return this.http.put(this.apiUrl, model);
  }

  delete(id:number){
    return this.http.delete(this.apiUrl + id);
  }
}
