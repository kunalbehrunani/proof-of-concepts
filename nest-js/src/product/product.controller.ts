import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductModel } from "./product.model";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    addProducts(
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('price') price: number
        ): ProductModel[] {
            console.log({name, description, price})
            const newProduct = new ProductModel(name, description, price);
            return this.productService.addNewProduct(newProduct);
    }

    @Post('/v2')
    addProductsV2(
        @Body() product: {
            name: string,
            description: string,
            price: number
        }
        ): ProductModel[] {
            console.log({product})
            const newProduct = new ProductModel(product.name, product.description,product.price);
            return this.productService.addNewProduct(newProduct);
    }


    @Get()
    getProducts(): ProductModel[] {
        return this.productService.getAllProducts();
    }


    @Get(':name')
    getProductById(@Param('name') name: string): ProductModel {
        console.log({name});
        return this.productService.getProductByName(name);
    }



    @Patch(':name')
    updateProductByName(
        @Param('name') name: string,
        @Body('name') newName: string,
        @Body('description') newDesc: string,
        @Body('price') newPrice: number
        ): ProductModel {
        return this.productService.updateProductByName(name, newName, newDesc, newPrice);
    }
}

