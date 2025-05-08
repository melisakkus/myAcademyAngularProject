import { Component } from '@angular/core';
import { SocialMedia } from '../../_models/socialmedia';
import { SocialMediaService } from '../../_services/social-media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-social-media',
  standalone: false,
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css'
})
export class SocialMediaComponent {
  social : SocialMedia = new SocialMedia();
  socialList : SocialMedia[];
  editSocial : any = {};
  errors : any = {};
  constructor(private socialService : SocialMediaService) {
    this.getAll();
   }

    getAll(){
       this.socialService.getAll().subscribe({
         next : values => this.socialList = values,
         error : error => console.log(error),
       })
     }

      create(){
        this.socialService.create(this.social).subscribe({
        next : value => this.socialList.push(value),
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
            text: 'Yeni sosyal medya başarıyla kaydedildi!',
          }).then(()=> location.reload());
        }
        });
      }

      getSelected(model){
        this.editSocial = {...model};
      }

      update(){
        this.socialService.update(this.editSocial).subscribe({
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
              text: 'Sosyal medya başarıyla güncellendi!',
            }).then(()=> location.reload());
          }
        });
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
              this.socialService.delete(id).subscribe({
                error : err => console.log(err),
                complete : () =>  { Swal.fire({
                  title: "Silindi!",
                  text: "Sosyal medya alanı başarıyla silindi.",
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
        this.editSocial = {};
     }

}
