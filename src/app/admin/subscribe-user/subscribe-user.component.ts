import { Component } from '@angular/core';
import { SubscribeUser } from '../../_models/subscribeUser';
import { SubscribeUserService } from '../../_services/subscribe-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscribe-user',
  standalone: false,
  templateUrl: './subscribe-user.component.html',
  styleUrl: './subscribe-user.component.css'
})
export class SubscribeUserComponent {
  user : SubscribeUser = new SubscribeUser();
  userList : SubscribeUser[];
  editUser : any = {};
  errors : any = {};
  constructor(private userService : SubscribeUserService){
    this.getAll();
  }

  getAll(){
    this.userService.getAll().subscribe({
      next : values => this.userList = values,
      error : error => console.log(error),
    })
  }

  create(){
    this.userService.create(this.user).subscribe({
      next : value => this.userList.push(value),
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
          text: 'Yeni kullanıcı başarıyla kaydedildi!',
        }).then(()=> location.reload());
      }
    });
  }

  getSelected(model){
    this.editUser = {...model};
  }

  update(){
    this.userService.update(this.editUser).subscribe({
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
          text: 'Kullanıcı başarıyla güncellendi!',
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
    this.userService.delete(id).subscribe({
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
         this.editUser = {};
       }

}
