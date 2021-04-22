import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  product: any;
  // constructor(private productService: ProductService) { }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  
  //   ngOnInit() {
  //    this.productService.getCrouselProduct().subscribe(data=>{
  //     this.product=data;
  //     });

  //   }
  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      
      this.product = data.productList;
    })
  }


}
