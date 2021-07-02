import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      subscribers: [
        {
          id: 1,
          name: 'Deniz Gunduz',
          email: 'id@gmail.com',
          phone: 645985328
        },
        {
          id: 2,
          name: 'Sabah Gunduz',
          email: 'sabah@hotmail.com ',
          phone: 667895432
        },
        
      ]
    };
  }
}