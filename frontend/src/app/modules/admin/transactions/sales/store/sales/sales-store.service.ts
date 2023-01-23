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

  getWorkOrder(): Observable<any> {
    const workOrderUrl = '/api/action/get_transaction_last';
    return this.http.get<any>(environment.backend_url + workOrderUrl);
  }

  addSale(payload): Observable<any>{
    const transactionUrl = '/api/action/add_transaction';
    return this.http.post<any>(environment.backend_url + transactionUrl, payload);
  } 

  deleteSale(id): Observable<any>{
    const transactionUrl = `/api/action/delete_transaction/${id}`;
    return this.http.delete<any>(environment.backend_url + transactionUrl);
  } 
}
