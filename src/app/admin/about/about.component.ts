import { Component } from '@angular/core';
import { AboutService } from '../../_services/about.service';
import { About } from '../../_models/about';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  about : About = new About();
  aboutList : About[];
  editAbout : About;
  errors : any = {};

  constructor(private aboutService : AboutService) {
    this.getAll();
   }

  getAll(){
    this.aboutService.getAll().subscribe({
      next : values => this.aboutList = values,
      error : error => console.log(error),
    })
  }

  create(){
    this.aboutService.create(this.about).subscribe({
    next : value => this.aboutList.push(value),
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
        text: 'Yeni Hakkımda alanı başarıyla kaydedildi!',
      }).then(()=> location.reload());
    }
    });
  }




}
