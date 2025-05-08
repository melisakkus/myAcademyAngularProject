import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductComponent } from './admin/product/product.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainProductComponent } from './_main/main-product/main-product.component';
import { MainHeroComponent } from './_main/main-hero/main-hero.component';
import { MainAboutComponent } from './_main/main-about/main-about.component';
import { MainServiceComponent } from './_main/main-service/main-service.component';
import { MainClientComponent } from './_main/main-client/main-client.component';
import { MainHeaderComponent } from './_main/main-header/main-header.component';
import { MainFooterComponent } from './_main/main-footer/main-footer.component';
import { MainFooterSocialmediaComponent } from './_main/main-footer-socialmedia/main-footer-socialmedia.component';
import { AboutComponent } from './admin/about/about.component';
import { BannerComponent } from './admin/banner/banner.component';
import { BrandComponent } from './admin/brand/brand.component';
import { ServiceComponent } from './admin/service/service.component';
import { SocialMediaComponent } from './admin/social-media/social-media.component';
import { SubscribeUserComponent } from './admin/subscribe-user/subscribe-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    ProductComponent,
    MainProductComponent,
    MainHeroComponent,
    MainAboutComponent,
    MainServiceComponent,
    MainClientComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainFooterSocialmediaComponent,
    AboutComponent,
    BannerComponent,
    BrandComponent,
    ServiceComponent,
    SocialMediaComponent,
    SubscribeUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
