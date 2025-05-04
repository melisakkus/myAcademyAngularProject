import { Component } from '@angular/core';
import { SocialMediaService } from '../../_services/social-media.service';
import { SocialMedia } from '../../_models/socialmedia';

@Component({
  selector: 'app-main-header',
  standalone: false,
  templateUrl: './main-header.component.html',

  styleUrls: [
    './main-header.component.css',
    "../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
    "../../../../assets/vendor/aos/aos.css",
    "../../../../assets/vendor/glightbox/css/glightbox.min.css",
    "../../../../assets/vendor/swiper/swiper-bundle.min.css"
]


})
export class MainHeaderComponent {

  socialMedias : SocialMedia[];

  constructor(private socialMediaService : SocialMediaService)
  {
    this.getAllSocialMedias();
  }

  getAllSocialMedias(){
    this.socialMediaService.getAll().subscribe({
      next : values => this.socialMedias = values,
      error : err => console.log(err)
    });
  }
}
