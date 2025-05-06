import { Component } from '@angular/core';
import { AboutService } from '../../_services/about.service';
import { About } from '../../_models/about';

@Component({
  selector: 'app-main-about',
  standalone: false,
  templateUrl: './main-about.component.html',
  styleUrls: [
    './main-about.component.css',
    "../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css",
    "../../../../assets/vendor/aos/aos.css",
    "../../../../assets/vendor/glightbox/css/glightbox.min.css",
    "../../../../assets/vendor/swiper/swiper-bundle.min.css"
]

})
export class MainAboutComponent {
  // aboutList : About[];
  about : About = new About();
  constructor(private aboutService : AboutService) {
    this.getAllAbouts();
  }

  getAllAbouts(){
    this.aboutService.getLast().subscribe({
      next : value => this.about = value,
      error : err => console.log(err)  });
    }
}
