import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
category : string = 'Kategoriler';
categories : string[] = ['Kategori 1','Kategori 2', 'Kategori 3', 'Kategori 4', 'Kategori 5'
]}
