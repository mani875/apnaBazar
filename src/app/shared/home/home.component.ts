import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  product: any;
  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.product = data.productList;
    });
  }
}
