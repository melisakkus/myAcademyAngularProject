import { Component } from '@angular/core';
import { SubscribeUser } from '../../_models/subscribeUser';
import { SubscribeUserService } from '../../_services/subscribe-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-footer',
  standalone: false,
  templateUrl: './main-footer.component.html',

  styleUrls: [
    './main-footer.component.css',
    "../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
    "../../../../assets/vendor/aos/aos.css",
    "../../../../assets/vendor/glightbox/css/glightbox.min.css",
    "../../../../assets/vendor/swiper/swiper-bundle.min.css"
]

})
export class MainFooterComponent {

  constructor(private subscribeUserService : SubscribeUserService) { }

    newUser : SubscribeUser = new SubscribeUser();

    addNewUser(){
      this.subscribeUserService.create(this.newUser).subscribe({
        error: (error) => {
          console.error('Email kaydedilirken hata alındı.', error);
        },
        complete : () => {
              Swal.fire({
                title: "Kaydedildi!",
                text: `${this.newUser.email} için abonelik talebiniz alındı. Teşekkür ederiz!`,
                icon: "success"
              })
            }
      });
    }


}
