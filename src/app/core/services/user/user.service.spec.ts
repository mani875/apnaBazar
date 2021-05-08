import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  const mockHttp: HttpClient = null;
  const mockLocalStorageService: LocalStorageService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(UserService);
    service = new UserService(mockHttp, mockLocalStorageService);
  });

  it('should return users data', () => {
    const mockResponse = [
      {
        userName: 'nagp',
        password: 'Nagp@123',
        level: 'Diamond',
        name: 'NAGP USER',
      },
    ];
    let response;
    spyOn(service, 'getUsers').and.returnValue(of(mockResponse));
    service.getUsers().subscribe((res) => {
      response = res;
    });
    expect(response).toEqual(mockResponse);
  });
});
