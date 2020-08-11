import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(email: any, password: any): Observable<any> {
    return of<any>({});
  }
}
