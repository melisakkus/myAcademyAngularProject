import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialMedia } from '../_models/socialmedia';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  apiUrl = 'https://localhost:7000/api/SocialMedias/';
  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<SocialMedia[]>(this.apiUrl);
  }

  getById(id:number){
    return this.http.get<SocialMedia>(this.apiUrl + id);
  }

  create(model:SocialMedia){
    return this.http.post<SocialMedia>(this.apiUrl, model);
  }

  update(model:SocialMedia){
    return this.http.put(this.apiUrl, model);
  }

  delete(id:number){
    return this.http.delete(this.apiUrl + id);
  }
}
