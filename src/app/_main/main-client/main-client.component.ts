import { BrandService } from '../../_services/brand.service';
import { Brand } from './../../_models/brand';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-client',
  standalone: false,
  templateUrl: './main-client.component.html',

  styleUrls: [
    './main-client.component.css',
    "../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
    "../../../../assets/vendor/aos/aos.css",
    "../../../../assets/vendor/glightbox/css/glightbox.min.css",
    "../../../../assets/vendor/swiper/swiper-bundle.min.css"
]


})
export class MainClientComponent {
    brandList : Brand[];

    constructor(private brandService : BrandService) {
      this.getAllBrands();
    }

    getAllBrands(){
      this.brandService.getAll().subscribe({
        next : values => this.brandList = values,
        error : err => console.log(err),
      });
    }
}
