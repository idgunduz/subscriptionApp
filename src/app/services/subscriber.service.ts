import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Subscriber } from '../models/subscriber.model';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private subscribersUrl = 'api/subscribers/';
  constructor(
    private http: HttpClient
    ) { }

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.subscribersUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createSubscriber(subs: Subscriber): Observable<Subscriber> {
    return this.http.post<Subscriber>(this.subscribersUrl, subs).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editSubscriber(subs: Subscriber): Observable<any> {
    return this.http.put(this.subscribersUrl + subs.id, subs);
  }

  deleteSubscriber(id: number): Observable<any> {
    return this.http.delete(this.subscribersUrl + id);
  }

}
