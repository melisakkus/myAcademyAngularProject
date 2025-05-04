import { Component } from '@angular/core';
import { Service } from '../../_models/service';
import { ServiceService } from '../../_services/service.service';

@Component({
  selector: 'app-main-service',
  standalone: false,
  templateUrl: './main-service.component.html',

  styleUrls: [
    './main-service.component.css',
    "../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
    "../../../../assets/vendor/aos/aos.css",
    "../../../../assets/vendor/glightbox/css/glightbox.min.css",
    "../../../../assets/vendor/swiper/swiper-bundle.min.css"
]

})
export class MainServiceComponent {
  serviceList : Service[];

  constructor(private serviceService : ServiceService) {
    this.getAllServices();
  }

  getAllServices(){
    this.serviceService.getAll().subscribe({
      next : values => this.serviceList = values,
      error : err => console.log(err),
    });
  }


}
