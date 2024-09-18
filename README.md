
# Awfarlak Angular Frontend

## Overview

This is the frontend of the Awfarlak application built using the Angular framework. The project is designed with a reactive architecture, incorporating modern technologies such as TypeScript, RxJS, and Tailwind CSS. It features an Admin Dashboard and integrates with an ASP.NET Web API backend for data consumption and user authentication.

## Features

- **Angular Framework**: A modern front-end framework for building SPAs.
- **TypeScript**: Type-safe development for more maintainable code.
- **RxJS**: Reactive programming with Observables for managing async data streams.
- **Reactive Forms**: Built-in Angular module for managing complex forms and validations.
- **Auth Guard**: Protect routes that require authentication.
- **Admin Dashboard**: Role-based access control for admin functionality.
- **Tailwind CSS**: A utility-first CSS framework for building responsive designs.
- **UUID**: Used for generating GUIDs.
- **Integration with ASP.NET Web API**: APIs consumed using RxJS (Observables and Subscribe).

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Running the Project](#running-the-project)
- [License](#license)

## Technologies

- **Angular** (latest stable version)
- **TypeScript**
- **RxJS**
- **Angular Reactive Forms Module**
- **Tailwind CSS**
- **UUID**
- **ASP.NET Web API Integration**

## Project Structure

```
/src
  /app
    /components    # UI components for the app
    /services      # Angular services to interact with APIs
    /guards        # Auth guard for protecting routes
    /models        # TypeScript interfaces and models
    /admin         # Admin Dashboard specific components
    /shared        # Shared modules and utilities
    /assets        # Static assets like images, fonts, etc.
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (LTS version)
- [Angular CLI](https://angular.io/cli)
- [Tailwind CSS](https://tailwindcss.com/) (installed and configured)

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/MahmoudIsmail00/Awfarlak-Angular.git
    cd Awfarlak-Angular
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    ng serve
    ```

4. **Navigate to** `http://localhost:4200/` in your browser to see the application running.

## Configuration

- **API Base URL**: The Angular services are configured to consume the ASP.NET Web API. Ensure the API base URL is correctly set in `environment.ts`.

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

- **Auth Guard**: Protects the routes requiring authentication.

## API Integration

RxJS is used to consume APIs with `Observable` and `subscribe`. The services are responsible for handling data from the backend ASP.NET Web API.

Example service method:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:5001/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
```

## Running the Project

1. **Start the development server**:
    ```bash
    ng serve
    ```

2. **Admin Dashboard**: The admin dashboard can be accessed by navigating to `/admin`.

3. **Build the project**:
    For a production build, run:
    ```bash
    ng build --prod
    ```

## License

This project is licensed under the MIT License.
