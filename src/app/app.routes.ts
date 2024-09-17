import { AdminDashboardCategoriesNewFormComponent } from './admin-dashboard/admin-dashboard-categories/admin-dashboard-categories-new-form/admin-dashboard-categories-new-form.component';
import { AdminDashboardProductsEditFormComponent } from './admin-dashboard/admin-dashboard-products/admin-dashboard-products-edit-form/admin-dashboard-products-edit-form.component';
import { AdminDashboardCategoriesComponent } from './admin-dashboard/admin-dashboard-categories/admin-dashboard-categories.component';
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
import { CheckoutAddressComponent } from './checkout/checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout/checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout/checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout/checkout-payment/checkout-payment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardProductsComponent } from './admin-dashboard/admin-dashboard-products/admin-dashboard-products.component';
import { AdminDashboardBrandsComponent } from './admin-dashboard/admin-dashboard-brands/admin-dashboard-brands.component';
import { AdminDashboardDeliveryComponent } from './admin-dashboard/admin-dashboard-delivery/admin-dashboard-delivery.component';
import { AdminDashboardOrdersComponent } from './admin-dashboard/admin-dashboard-orders/admin-dashboard-orders.component';
import { AdminDashboardProductsNewFormComponent } from './admin-dashboard/admin-dashboard-products/admin-dashboard-products-new-form/admin-dashboard-products-new-form.component';
import { CheckoutSuccessComponent } from './checkout/checkout-success/checkout-success.component';
import { AdminDashboardCategoriesEditFormComponent } from './admin-dashboard/admin-dashboard-categories/admin-dashboard-categories-edit-form/admin-dashboard-categories-edit-form.component';
import { AdminDashboardBrandsNewFormComponent } from './admin-dashboard/admin-dashboard-brands/admin-dashboard-brands-new-form/admin-dashboard-brands-new-form.component';
import { AdminDashboardBrandsEditFormComponent } from './admin-dashboard/admin-dashboard-brands/admin-dashboard-brands-edit-form/admin-dashboard-brands-edit-form.component';
import { AdminGuard } from './Services/authentication/adminguard';
import { AdminDashboardUsersComponent } from './admin-dashboard/admin-dashboard-users/admin-dashboard-users.component';
import { AdminDashboardUsersEditUserComponent } from './admin-dashboard/admin-dashboard-users/admin-dashboard-users-edit-user/admin-dashboard-users-edit-user.component';
import { OrdersComponent } from './orders/orders.component';

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
  { path: 'orders', component: OrdersComponent },
  { path: 'shippingAddress', component: ShippingAddressComponent },
  { path: 'accountDetails', component: AccountDetailsComponent },
  { path: 'compare', component: CompareComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'adminDashboard', component: AdminDashboardComponent,  canActivate: [AdminGuard], children: [
    { path: '', redirectTo: 'admin-products', pathMatch: 'full' },

    { path: 'admin-users', component: AdminDashboardUsersComponent },
    { path: 'admin-users-edit/:id', component: AdminDashboardUsersEditUserComponent },


    { path: 'admin-categories', component: AdminDashboardCategoriesComponent },
    { path: 'admin-categories-new', component: AdminDashboardCategoriesNewFormComponent },
    { path: 'admin-categories-edit/:id', component: AdminDashboardCategoriesEditFormComponent },

    { path: 'admin-brands', component: AdminDashboardBrandsComponent },
    { path: 'admin-brands-new', component: AdminDashboardBrandsNewFormComponent },
    { path: 'admin-brands-edit/:id', component: AdminDashboardBrandsEditFormComponent },


    { path: 'admin-delivery', component: AdminDashboardDeliveryComponent },
    { path: 'admin-orders', component: AdminDashboardOrdersComponent },

    { path: 'admin-products', component: AdminDashboardProductsComponent },
    { path: 'admin-product-new', component: AdminDashboardProductsNewFormComponent },
    { path: 'admin-product-edit/:id', component: AdminDashboardProductsEditFormComponent },
    ]
  },
  { path: 'checkout', component: CheckoutComponent, children: [
    { path: '', redirectTo: 'address', pathMatch: 'full' },
    { path: 'address', component: CheckoutAddressComponent },
    { path: 'delivery', component: CheckoutDeliveryComponent },
    { path: 'review', component: CheckoutReviewComponent },
    { path: 'payment', component: CheckoutPaymentComponent },
    {path: 'success' , component : CheckoutSuccessComponent}
  ]
},
{ path: '', redirectTo: '/checkout/address', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'product-details/:id', component: AwfarlkComponentComponent },
  { path: '**', component: NotfoundComponent },
];
