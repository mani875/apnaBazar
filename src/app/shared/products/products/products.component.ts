import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute,private modalService: NgbModal) { }
  product: Product;
  addToCartProduct:Product;
  closeResult = '';
  gridLayout=[1,2,3];
  num:any=[];
grid:any=[];
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.productList;
      for(let i=1;i<=data.productList.length;i++){
        if(i%4 !=0){
        this.num.push(data.productList[i-1]);
        }
        else{
       this.grid.push(this.num);
        this.num = [];
        }
        }
    })
  }
  
  public _opened: boolean = false;

  public _toggleSidebar() {
    this._opened = !this._opened;}
    
    open(content) {
      this.modalService.open(content,
     {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.addToCartProduct=this.addToCartProduct;
      }, (reason) => {
        this.closeResult = 
           `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
}


