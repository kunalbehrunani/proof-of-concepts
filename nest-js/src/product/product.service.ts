import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductService {
    private products: ProductModel[] = [];

    addNewProduct(newProduct: ProductModel): ProductModel[] {
        this.products.push(newProduct);
        return this.products;
    }

    getAllProducts (): ProductModel[] {
        // return this.products;

        // Reason why we're not directly returning the array is because arrays are stores in references. Which means when we return this.products, we are actually returning the reference of our products array which is indeed private. Hence we return a local copy using JS spread operator.
        return [...this.products];
    }

    getProductByName (productName: string): ProductModel {
        const product = this.products.find(ele => ele.name === productName);
        if (product) {
            return {...product};
        } else {
            // Nest JS provides methods for throwing standard errors. 
            throw new NotFoundException('Cannot Find any product with Name - ' + productName);
        }
    }


    updateProductByName(oldName: string, newName: string, newDesc: string, newPrice: number) {
        const product = this.products.find(ele => ele.name === oldName);
        if (!product) {
            throw new NotFoundException('Cannot Find any product with Name - ' + oldName);
        }
        product.name = (newName) ? (newName) : product.name;
        product.description = (newDesc) ? (newDesc) : product.description;
        product.price = (newPrice) ? (newPrice) : product.price;
        return {...product};
    }
}