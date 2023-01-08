import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChartStoreService {

    constructor(private http: HttpClient) { }

    getSalesSeries(year: any): Observable<any> {
        const chartUrl = `/api/action/get_chart/${year}`;
        return this.http.get<any>(environment.backend_url + chartUrl);
    }

    getTargetSalesSeries(branchId: any): Observable<any> {
        const targetChartUrl = `/api/action/get_target/${branchId}`;
        return this.http.get<any>(environment.backend_url + targetChartUrl);
    }

    updateTargetSalesSeries(payload: any): Observable<any> {
        const targetChartUrl = `/api/action/update_target`;
        return this.http.post<any>(environment.backend_url + targetChartUrl, payload);
    }

}
