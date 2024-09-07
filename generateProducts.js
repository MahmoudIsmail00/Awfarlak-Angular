// generateProducts.ts
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";

function generateProduct() {
  return {
    id: faker.string.uuid(),
    price: parseFloat(faker.commerce.price()),
    title: faker.commerce.productName(),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    rating: faker.number.int({ min: 1, max: 5 }),
    image: faker.image.urlLoremFlickr({ category: "commerce" }),
  };
}

function generateProducts(count) {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateProduct());
  }
  return products;
}

const products = generateProducts(50); // Generate 50 products

writeFileSync("db.json", JSON.stringify({ products }, null, 2));
