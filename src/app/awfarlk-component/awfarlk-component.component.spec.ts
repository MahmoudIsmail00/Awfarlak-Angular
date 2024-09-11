// Example using Jasmine and Karma
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AwfarlkComponentComponent } from './awfarlk-component.component';
import { ProductsService } from '../Services/store/products.service';
import { CartService } from '../Services/cart/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { ProductWithSpecs } from '../../Models/productWithSpecs';

describe('AwfarlkComponentComponent', () => {
  let component: AwfarlkComponentComponent;
  let fixture: ComponentFixture<AwfarlkComponentComponent>;
  let mockProductsService: any;
  let mockCartService: any;

  beforeEach(async () => {
    mockProductsService = {
      getProductWithSpecs: jasmine.createSpy('getProductWithSpecs').and.returnValue(of({ /* mock product */ }))
    };

    mockCartService = {
      addToCart: jasmine.createSpy('addToCart').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      declarations: [ AwfarlkComponentComponent ],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: CartService, useValue: mockCartService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwfarlkComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product on init', () => {
    expect(mockProductsService.getProductWithSpecs).toHaveBeenCalled();
    expect(component.product).toBeDefined();
  });

  it('should add product to cart', () => {
    component.product = { /* mock product */ } as ProductWithSpecs;
    component.addToCart();
    expect(mockCartService.addToCart).toHaveBeenCalledWith(component.product, 1);
  });
});
