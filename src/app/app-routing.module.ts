import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './admin/category/category.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductComponent } from './admin/product/product.component';
import { AboutComponent } from './admin/about/about.component';
import { BannerComponent } from './admin/banner/banner.component';
import { Brand } from './_models/brand';
import { BrandComponent } from './admin/brand/brand.component';
import { ServiceComponent } from './admin/service/service.component';
import { SocialMediaComponent } from './admin/social-media/social-media.component';
import { SubscribeUser } from './_models/subscribeUser';
import { SubscribeUserComponent } from './admin/subscribe-user/subscribe-user.component';

const routes: Routes = [

  //Main Routes
  { path: '' , component : MainLayoutComponent , children : [

  ]},

  //Admin Routes
  {
    path : 'admin' , component : AdminLayoutComponent , children : [
      {
        path : 'category' , component : CategoryComponent
      },
      {
        path : 'product' , component : ProductComponent
      },
      {
        path : 'about' , component : AboutComponent
      },
      {
        path : 'banner', component : BannerComponent
      },
      {
        path : 'brand', component : BrandComponent
      },
      {
        path : 'service', component : ServiceComponent
      },
      {
        path : 'socialMedia', component : SocialMediaComponent
      },
      {
        path : 'subscribeUser', component : SubscribeUserComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
