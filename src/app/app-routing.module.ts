import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CrouselProductResolver } from './components/resolvers/crousel-product.resolver';
import { ProductsComponent } from './shared/products/products/products.component';
import { ProductResolver } from './components/resolvers/product.resolver';

const routes: Routes = [
  {path:'' ,redirectTo:'/home' ,pathMatch:'full'},
  {path:'home', component:HomeComponent,resolve:{
    productList: CrouselProductResolver
  }},
  {path:'products',component:ProductsComponent,resolve:{
    productList: ProductResolver
  }},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
