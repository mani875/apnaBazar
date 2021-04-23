import { TestBed } from '@angular/core/testing';

import { CartProductResolver } from './cart-product.resolver';

describe('CartProductResolver', () => {
  let resolver: CartProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CartProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
