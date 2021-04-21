import { TestBed } from '@angular/core/testing';

import { CrouselProductResolver } from './crousel-product.resolver';

describe('CrouselProductResolver', () => {
  let resolver: CrouselProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CrouselProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
