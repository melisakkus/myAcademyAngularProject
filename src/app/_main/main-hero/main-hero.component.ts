import { Component } from '@angular/core';
import { BannerService } from '../../_services/banner.service';
import { Banner } from '../../_models/banner';

@Component({
  selector: 'app-main-hero',
  standalone: false,
  templateUrl: './main-hero.component.html',

  styleUrls: [
    './main-hero.component.css',
    "../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
    "../../../../assets/vendor/aos/aos.css",
    "../../../../assets/vendor/glightbox/css/glightbox.min.css",
    "../../../../assets/vendor/swiper/swiper-bundle.min.css"
]

})
export class MainHeroComponent {
  bannerList : Banner[];

  constructor(private bannerService : BannerService){
    this.getAllBanners();
  }

  getAllBanners(){
    this.bannerService.getAll().subscribe({
      next : values => this.bannerList = values,
      error : err => console.log(err)
    });
  }
}
