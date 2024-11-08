import { Injectable } from "@nestjs/common";
import { Cat } from './interfaces/cat.interface';

@Injectable()
// injectable decorator attaches the necessary metadata that declares the class - CatService can be managed by Nest IoC container and can be injected as a dependency into a controller. 
export class CatService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}