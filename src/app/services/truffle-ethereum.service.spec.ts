import { TestBed, inject } from '@angular/core/testing';

import { TruffleEthereumService } from './truffle-ethereum.service';

describe('TruffleEthereumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TruffleEthereumService]
    });
  });

  it('should be created', inject([TruffleEthereumService], (service: TruffleEthereumService) => {
    expect(service).toBeTruthy();
  }));
});
