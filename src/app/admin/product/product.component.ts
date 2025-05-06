import { Component } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product';
import Swal from 'sweetalert2';
import { CategoryService } from '../../_services/category.service';
import { Category } from '../../_models/category';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productList : Product[];
  product : Product = new Product();
  editProduct : any = {};
  errors: any = {};
  categoryList : Category[];

  constructor(private productService : ProductService, private categoryService : CategoryService)
   {
    this.getAll();
    this.getCategories(); //sayfa yüklendiğinde kategorileri de al
   }

  getAll(){
    this.productService.getAll().subscribe({
      next : values => this.productList = values,
      error : error => console.log(error),
    })
  }

  getCategories(){
    this.categoryService.getAll().subscribe({
      next : values => this.categoryList = values,
      error : error => console.log(error),
    })
  }

  create(){
    this.productService.create(this.product).subscribe({
      next: value => this.productList.push(value),
      error: err => {
        if(err.status===400){
          console.log(err)
          this.errors = err.error.errors;
        }
      },
      complete: () => Swal.fire({
            title: "Eklendi!",
            text: "Ürün başarıyla eklendi.",
            icon: "success"
          }).then(()=> location.reload())
    })
  }

  onSelected(model){
      this.editProduct = model;
  }

  update(){
   this.productService.update(this.editProduct.id, this.editProduct).subscribe({
    error : err => {
      if(err.status === 400){
        console.log(err);
        this.errors = err.error.errors;
      }
    },
    complete : () => {
      Swal.fire({
        title: "Güncellendi!",
        text: "Kategori başarıyla güncellendi.",
        icon: "success"
      }).then(()=> location.reload())
    }
   }
   )}

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
         this.productService.delete(id).subscribe({
           error : err => console.log(err),
           complete : () =>  { Swal.fire({
             title: "Silindi!",
             text: "Ürün başarıyla silindi.",
             icon: "success"
           })
           this.getAll();
         }
         })
       }
     });
   }
}
