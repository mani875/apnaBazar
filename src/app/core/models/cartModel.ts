import { Product } from '.';

export interface Cart {
    code: string;
    userName:string;
    address: string;
    product:Product[];
  }
  
