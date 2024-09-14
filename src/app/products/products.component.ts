import { specs } from './../../Models/specs';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/store/products.service';
import { Product } from '../../Models/product';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ProductWithSpecs } from '../../Models/productWithSpecs';
import { forkJoin } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [ProductComponent, RouterLink, NgFor, NgIf, NgxPaginationModule],
})
export class ProductsComponent implements OnInit {
  allProducts: ProductWithSpecs[] = []; // Unfiltered list of products
  filteredProducts: ProductWithSpecs[] = []; // Filtered list of products
  activeFilters: { brandName?: string; cpuName?: string; ramName?: string; gpuName?: string; storageName?: string; screenName?:string} = {}; // Active filters
  BrandsQuantity!: [string, number][]; // Quantity of brands
  CPUsQuantity!: [string, number][]; // Quantity of CPUs
  RamsQuantity!: [string, number][]; // Quantity of Rams
  GPUQuantity!: [string, number][]; // Quantity of GPUs
  StorageQuantity!: [string, number][]; // Quantity of Storages
  ScreenQuantity!: [string, number][]; // Quantity of Screens
  subcategoryId: any;
  page: number = 1;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.subcategoryId = params.get('id');
      this.loadProducts();
    });

    // Handle search term changes
    this.productService.currentSearchTerm.subscribe((term) => {
      this.updateProductList(term);
    });
  }

  // Load products based on subcategory
  loadProducts() {
    if (this.subcategoryId > 0) {
      this.productService
        .getProductsWithSpecsBySubCategoryId(this.subcategoryId)
        .subscribe((data: ProductWithSpecs[]) => {
          this.initializeProducts(data);
        });
    } else {
      this.getAllProductsWithSpecs();
    }
  }

  // Initialize the product list and compute brand and CPU quantities
  initializeProducts(data: ProductWithSpecs[]) {
    this.allProducts = data;
    this.filteredProducts = [...this.allProducts];
    this.BrandsQuantity = this.getQuantities(this.allProducts.map((p) => p.productBrandName));
    this.CPUsQuantity = this.getQuantities(this.allProducts.map((p) => p.cpu));
    this.RamsQuantity = this.getQuantities(this.allProducts.map((p) => p.ram));
    this.GPUQuantity = this.getQuantities(this.allProducts.map((p) => p.gpu));
    this.StorageQuantity = this.getQuantities(this.allProducts.map((p) => p.storage));
    this.ScreenQuantity = this.getQuantities(this.allProducts.map((p) => p.screen));
  }

  // Filter products by search term
  updateProductList(term: string) {
    this.filteredProducts = this.allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  // Compute the quantities of each brand or CPU
  getQuantities(items: any[]): [string, number][] {
    const map = new Map<string, number>();
    items.forEach((item) => map.set(item, (map.get(item) || 0) + 1));
    return Array.from(map.entries());
  }

  // Filter products by brand name
  filterItemsByBrandName(brandName: string) {
    this.activeFilters.brandName = brandName;
    this.applyFilters();
  }

  // Filter products by CPU name
  filterItemsByCPUName(cpuName: string) {
    this.activeFilters.cpuName = cpuName;
    this.applyFilters();
  }

  // Filter products by Ram name
  filterItemsByRamName(ramName: string) {
    this.activeFilters.ramName = ramName;
    this.applyFilters();
  }

  // Filter products by gpu name
  filterItemsByGpuName(gpuName: string) {
    this.activeFilters.gpuName = gpuName;
    this.applyFilters();
  }

  // Filter products by storage name
  filterItemsByStorageName(storageName: string) {
    this.activeFilters.storageName = storageName;
    this.applyFilters();
  }

  // Filter products by Screen name
  filterItemsByScreenName(screenName: string) {
    this.activeFilters.screenName = screenName;
    this.applyFilters();
  }

  // Remove a specific filter
  removeFilter(filterKey: keyof typeof this.activeFilters) {
    delete this.activeFilters[filterKey];
    this.applyFilters();
  }

  // Clear all filters
  clearAllFilters() {
    this.activeFilters = {};
    this.applyFilters();
  }

  // Apply the active filters
  private applyFilters() {
    this.filteredProducts = [...this.allProducts];

    if (this.activeFilters.brandName) {
      this.filteredProducts = this.filteredProducts.filter(
        (x) => x.productBrandName === this.activeFilters.brandName
      );
    }

    if (this.activeFilters.cpuName) {
      this.filteredProducts = this.filteredProducts.filter(
        (x) => x.cpu === this.activeFilters.cpuName
      );
    }

    if (this.activeFilters.ramName) {
      this.filteredProducts = this.filteredProducts.filter(
        (x) => x.ram === this.activeFilters.ramName
      );
    }

    if (this.activeFilters.gpuName) {
      this.filteredProducts = this.filteredProducts.filter(
        (x) => x.gpu === this.activeFilters.gpuName
      );
    }

    if (this.activeFilters.storageName) {
      this.filteredProducts = this.filteredProducts.filter(
        (x) => x.storage === this.activeFilters.storageName
      );
    }

    if (this.activeFilters.screenName) {
      this.filteredProducts = this.filteredProducts.filter(
        (x) => x.screen === this.activeFilters.screenName
      );
    }
  }

  // Fetch all products and their specs
  getAllProductsWithSpecs() {
    forkJoin({
      products: this.productService.getAllProducts(),
      specs: this.productService.getAllSpecs(),
    }).subscribe(({ products, specs }) => {
      const combinedProducts = products.map((product: Product) => {
        const productSpec = specs.find(
          (spec: specs) => spec.productId === product.id
        );
        return {
          ...product,
          ...productSpec,
        } as ProductWithSpecs;
      });
      this.initializeProducts(combinedProducts);
    });
  }
}
