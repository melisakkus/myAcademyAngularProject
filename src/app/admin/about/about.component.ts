import { Component } from '@angular/core';
import { AboutService } from '../../_services/about.service';
import { About } from '../../_models/about';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  about : About = new About();
  aboutList : About[];
  editAbout : any = {};
  errors : any = {};

  constructor(private aboutService : AboutService) {
    this.getAll();
   }

  getAll(){
    this.aboutService.getAll().subscribe({
      next : values => this.aboutList = values,
      error : error => console.log(error),
    })
  }

  create(){
    this.aboutService.create(this.about).subscribe({
    next : value => this.aboutList.push(value),
    error: err => {
      if(err.status === 400) {
        console.log(err);
        this.errors = err.error.errors;
      }
    },
    complete: () => {
      Swal.fire({
        icon: 'success',
        title: 'Kaydedildi.',
        text: 'Yeni Hakkımda alanı başarıyla kaydedildi!',
      }).then(()=> location.reload());
    }
    });
  }

  getSelected(model){
    this.editAbout = {...model};
  }

  update(){
    this.aboutService.update(this.editAbout).subscribe({
      error: err => {
        if(err.status === 400) {
          console.log(err);
          this.errors = err.error.errors;
        }
      },
      complete : () =>{
        Swal.fire({
          icon: 'success',
          title: 'Güncellendi.',
          text: 'Hakkımda alanı başarıyla güncellendi!',
        }).then(()=> location.reload())
      }
    })
  }
     delete(id : number){
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
           this.aboutService.delete(id).subscribe({
             error : err => console.log(err),
             complete : () =>  { Swal.fire({
               title: "Silindi!",
               text: "Hakkımda alanı başarıyla silindi.",
               icon: "success"
             })
             this.getAll();
           }
           })
         }
       });
     }

     clearErrors() {
      this.errors = {};
    }

}
