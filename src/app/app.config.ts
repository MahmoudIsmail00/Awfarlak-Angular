import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, ROUTES, withComponentInputBinding, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { AuthGuard } from './Services/authentication/authguard';
import { AuthService } from './Services/authentication/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { ProductsService } from './Services/store/products.service';
import { CartService } from './Services/cart/cart.service';
import { JwtInterceptor } from './Services/authentication/JwtInterceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AuthGuard,
    AuthService,
    ProductsService,
    provideHttpClient(),
    CartService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, provideAnimationsAsync(),MatSnackBarModule ,
    provideRouter(routes ,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
     ),

  ],
};
