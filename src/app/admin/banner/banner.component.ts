import { Component } from '@angular/core';
import { BannerService } from '../../_services/banner.service';
import { Banner } from '../../_models/banner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  bannerList : Banner[];
  banner : Banner = new Banner();
  editBanner : any = {};
  errors: any = {};
  constructor(private bannerService : BannerService) {
    this.getAll();
  }

  getAll(){
    return this.bannerService.getAll().subscribe({
      next : values => this.bannerList = values,
      error : error => console.log(error),
    })
  }

  getById(id:number){
    return this.bannerService.getById(id).subscribe({
      next : value => this.banner = value,
      error : error => console.log(error),
    })
  }

  onSelected(model:Banner){
    this.editBanner = {...model};
  }


  create(){
    Swal.fire({
      title : 'Kaydetmek istediğinize emin misiniz?',
      icon : 'question',
      showCancelButton : true,
      confirmButtonText : 'Evet',
      cancelButtonText : 'Hayır',
    }).then( (result) => { if(result.isConfirmed) {
      this.bannerService.create(this.banner).subscribe({
        next : value => this.banner = value,
        error: err => {
          if(err.status === 400) {
            console.log(err);
            this.errors = err.error.errors;
          }
        },
        complete : () => Swal.fire({
          title: "Eklendi!",
          text: "Yeni öne çıkan alan başarıyla eklendi.",
          icon: "success"
        }).then(()=> location.reload())
      })}
    })}

    update(){
      return this.bannerService.update(this.editBanner).subscribe({
        next : value => this.editBanner = value,
        error: err => {
          if(err.status === 400) {
            console.log(err);
            this.errors = err.error.errors;
          }
        },
        complete : () => Swal.fire({
          title : "Güncellendi!",
          text : "Öne çıkan alan başarıyla güncellendi.",
          icon : "success"
        }).then(()=> location.reload())
      })
     }

     delete(id:number){
      Swal.fire({
        title: "Silmek istediğinize emin misiniz?",
        text : "Bu işlemi geri alamazsınız!",
        icon : "warning",
        showCancelButton : true,
        showConfirmButton : true,
        confirmButtonText : "Evet, sil!",
        cancelButtonText : "Hayır, iptal et!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.bannerService.delete(id).subscribe({
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

     clearErrors() {
      this.errors = {};
    }

}
