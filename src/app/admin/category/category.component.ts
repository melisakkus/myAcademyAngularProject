import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent {

categoryList : Category[];
category : Category = new Category();
editCategory : any = {} ;
errors : any = {};

constructor(private categoryService : CategoryService){
  this.getAll();
}

getAll(){
  this.categoryService.getAll().subscribe({
    next : values => this.categoryList = values,
    error : error => console.log(error),
  })
}

clearErrors() {
  this.errors = {};
}
create(){
    Swal.fire({
      title: 'Kaydetmek istediğinize emin misiniz?',
      icon : 'question',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet!",
      cancelButtonText: "Hayır, iptal et!"
    }).then((result)=> {
    if(result.isConfirmed) {
        this.categoryService.create(this.category).subscribe({
          next : value => this.category = value,
          error : err => {
            if(err.status === 400) {
              console.log(err.error.errors);
              console.log(err);
              this.errors = err.error.errors;
            }
          },
          complete : () => Swal.fire({
            title: "Eklendi!",
            text: "Yeni marka başarıyla eklendi.",
            icon: "success"
          }).then(()=> location.reload())
        })
      }
    })
  }

onSelected(model : Category){
  this.editCategory = {...model};
  // seçilen category değerini editCategory değişkenine atadık
}

update(){
  this.categoryService.update(this.editCategory.id, this.editCategory).subscribe({
    error : err => {
      if(err.status === 400) {
        console.log(err);
        this.errors = err.error.errors;
      }
    },
    complete : () => {
      Swal.fire({
        title: "Güncellendi!",
        text: "Kategori başarıyla güncellendi.",
        icon: "success"
      }) .then(()=> location.reload())}
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
      this.categoryService.delete(id).subscribe({
        error : err => console.log(err),
        complete : () =>  { Swal.fire({
          title: "Silindi!",
          text: "Kategori başarıyla silindi.",
          icon: "success"
        })
        this.getAll();
      }
      })
    }
  });
}

}
