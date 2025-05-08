import { SubscribeUser } from './../../_models/subscribeUser';
import { Component } from '@angular/core';
import { BrandService } from '../../_services/brand.service';
import { Brand } from '../../_models/brand';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  standalone: false,
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {

  brandList : Brand[];
  brand : Brand = new Brand();
  editBrand : any = {};
  errors : any = {};
  constructor(private brandService : BrandService){
    this.getAll();
  }

  getAll(){
    this.brandService.getAll().subscribe({
      next : values => this.brandList = values,
      error : err => console.log(err)
    })
  }

  getById(id:number){
    this.brandService.getById(id).subscribe({
      next : value => this.editBrand = value,
      error : err => console.log(err)
    })
  }

  onSelected(model){
    this.editBrand = {...model};
  }

  create(){
    Swal.fire({
      title: 'Kaydetmek istediğinize emin misiniz?',
      icon : 'question',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet!",
      cancelButtonText: "Hayır, iptal et!"
    }).then((result)=> {
    if(result.isConfirmed) {
        this.brandService.create(this.brand).subscribe({
          next : value => this.brand = value,
          error : err => {
            if(err.status === 400) {
              console.log(err);
              this.errors = err.error.errors;
            }
          },
          complete : () => Swal.fire({
            title: "Eklendi!",
            text: "Yeni marka başarıyla eklendi.",
            icon: "success"
          }).then(()=> location.reload())
        })
      }
    })
  }

  update(){
    this.brandService.update(this.editBrand).subscribe({
      error : err => {
        if(err.status === 400) {
          console.log(err);
          this.errors = err.error.errors;
        }
      },
      complete : () => Swal.fire({
        title: "Güncellendi!",
        text: "Marka bilgisi başarıyla güncellendi.",
        icon: "success"
      }).then(()=> location.reload())
    });
  }

  clearErrors() {
    this.errors = {};
  }

  delete(id:number){
        Swal.fire({
          title: "Silmek istediğinize emin misiniz?",
          text: "Bu işlemi geri alamazsınız!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Evet, sil!",
          cancelButtonText: "Hayır, iptal et!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.brandService.delete(id).subscribe({
              error : err => console.log(err),
              complete : () => Swal.fire({
                title: "Silindi!",
                text: "Banner başarıyla silindi.",
                icon: "success"
              }).then(()=> location.reload())
             })
          }
        })
       }


}
