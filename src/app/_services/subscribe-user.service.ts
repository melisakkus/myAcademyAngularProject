import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscribeUser } from '../_models/subscribeUser';

@Injectable({
  providedIn: 'root'
})
export class SubscribeUserService {

  apiUrl = 'https://localhost:7000/api/SubscribeUsers/';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<SubscribeUser[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<SubscribeUser>(this.apiUrl + id);
  }

  create(model: SubscribeUser) {
    return this.http.post<SubscribeUser>(this.apiUrl, model);
  }

  update(model: SubscribeUser) {
    return this.http.put(this.apiUrl, model);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + id);
  }

}
