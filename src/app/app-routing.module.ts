import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CrouselProductResolver } from './components/resolvers/crousel-product.resolver';
import { ProductsComponent } from './shared/products/products.component';
import { ProductResolver } from './components/resolvers/product.resolver';
import { CartComponent } from './components/cart/cart.component';
import { AuthenticationGuard } from './components/authentication/authentication.guard';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: '' , redirectTo: '/home' , pathMatch: 'full'},
  { path: 'home', component: HomeComponent , resolve: {
    productList: CrouselProductResolver
  }},
  { path: 'cart', component: CartComponent, canActivate: [AuthenticationGuard]},
  { path: 'products', component: ProductsComponent, resolve: {
    productList: ProductResolver
  }
},
  { path: 'login' , component: LoginComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
