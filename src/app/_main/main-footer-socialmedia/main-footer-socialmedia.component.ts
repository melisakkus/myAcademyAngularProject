import { Component } from '@angular/core';
import { SocialMediaService } from '../../_services/social-media.service';
import { SocialMedia } from '../../_models/socialmedia';

@Component({
  selector: 'app-main-footer-socialmedia',
  standalone: false,
  templateUrl: './main-footer-socialmedia.component.html',

  styleUrls: [
    './main-footer-socialmedia.component.css',
    "../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
    "../../../../assets/vendor/aos/aos.css",
    "../../../../assets/vendor/glightbox/css/glightbox.min.css",
    "../../../../assets/vendor/swiper/swiper-bundle.min.css"
]


})
export class MainFooterSocialmediaComponent {

  socialList : SocialMedia[];
  constructor(private socialMediuaService : SocialMediaService) {
    this.getSocialMedia();
   }

  getSocialMedia(){
    return this.socialMediuaService.getAll().subscribe({
      next : values => this.socialList = values,
      error : err => console.log(err),
    });
  }

}
