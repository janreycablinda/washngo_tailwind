import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesStoreService {

  constructor(private http: HttpClient) { }

  getAllSales(): Observable<any> {
    const transactionUrl = '/api/action/transactions';
    return this.http.get<any>(environment.backend_url + transactionUrl);
  }
}
