import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './Services/authentication/authguard';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './alert/alert.component';
import { CompareComponent } from './compare/compare.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AwfarlkComponentComponent } from './awfarlk-component/awfarlk-component.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AllAddressesComponent } from './all-addresses/all-addresses.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

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
  { path: 'addresses', component: AllAddressesComponent },
  { path: 'shippingAddress', component: ShippingAddressComponent },
  { path: 'accountDetails', component: AccountDetailsComponent },
  { path: 'compare', component: CompareComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'product-details/:id', component: AwfarlkComponentComponent },
  { path: '**', component: NotfoundComponent },
];
