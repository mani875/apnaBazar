import { ProductEntry } from './productEntryModel';

export interface Cart {
    code: string;
    userName:string;
    address: string;
    productEntry:ProductEntry[];
  }
  
