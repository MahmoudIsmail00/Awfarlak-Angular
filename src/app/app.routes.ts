import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { AboutComponent } from './Components/about/about.component';
import { ProductComponent } from './Components/product/product.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AuthGuard } from './Services/authentication/authguard';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AlertComponent } from './Components/alert/alert.component';
import { CompareComponent } from './Components/compare/compare.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AwfarlkComponentComponent } from './Components/awfarlk-component/awfarlk-component.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  { path: 'products/:id', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'alert', component: AlertComponent },
  { path: 'compare', component: CompareComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'product-details/:id', component: AwfarlkComponentComponent },
  { path: '**', component: NotfoundComponent },
];
