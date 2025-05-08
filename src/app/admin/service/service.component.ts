import { Component } from '@angular/core';
import { Service } from '../../_models/service';
import { ServiceService } from '../../_services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  standalone: false,
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  service : Service = new Service();
  serviceList : Service[];
  editService : any = {};
  errors : any = {};
  constructor(private serviceService : ServiceService) {
    this.getAll();
   }

    getAll(){
       this.serviceService.getAll().subscribe({
         next : values => this.serviceList = values,
         error : error => console.log(error),
       })
     }

     create(){
       this.serviceService.create(this.service).subscribe({
       next : value => this.serviceList.push(value),
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
           text: 'Yeni hizmet başarıyla kaydedildi!',
         }).then(()=> location.reload());
       }
       });
     }

     getSelected(model){
       this.editService = {...model};
     }

     update(){
       this.serviceService.update(this.editService).subscribe({
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
             text: 'Hizmet alanı başarıyla güncellendi!',
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
              this.serviceService.delete(id).subscribe({
                error : err => console.log(err),
                complete : () =>  { Swal.fire({
                  title: "Silindi!",
                  text: "Hizmet alanı başarıyla silindi.",
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
         this.editService = {};
       }

}
