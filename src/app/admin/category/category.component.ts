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

constructor(private categoryService : CategoryService){
  this.getAll();
}

getAll(){
  this.categoryService.getAll().subscribe({
    next : values => this.categoryList = values,
    error : error => console.log(error),
  })
}

create(){
this.categoryService.create(this.category).subscribe({
  next : value => this.categoryList.push(value), // yeni category değerini listeye pushladık
  error : err => console.log(err),
  complete : () => {
    Swal.fire({
      title: "Eklendi!",
      text: "Kategori başarıyla oluşturuldu.",
      icon: "success"
    })
    this.getAll();
  }
})
}

onSelected(model : Category){
  this.editCategory = model; // seçilen category değerini editCategory değişkenine atadık
}

update(){
  this.categoryService.update(this.editCategory.id, this.editCategory).subscribe({
    error : err => console.log(err),
    complete : () => {
      Swal.fire({
        title: "Güncellendi!",
        text: "Kategori başarıyla güncellendi.",
        icon: "success"
      })
      this.getAll();
    }
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
