import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../_models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:7000/api/Brands/';
  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getById(id:number){
    return this.http.get<Brand>(this.apiUrl+id);
  }

  create(model:Brand){
    return this.http.post<Brand>(this.apiUrl,model)
  }

  update(model:Brand){
    return this.http.put(this.apiUrl,model)
  }

  delete(id:number){
    return this.http.delete(this.apiUrl + id);
  }
}
