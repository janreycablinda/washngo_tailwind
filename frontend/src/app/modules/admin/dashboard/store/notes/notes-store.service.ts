import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotesStoreService {

    constructor(private http: HttpClient) { }

    getNotes(userId: number): Observable<any> {
        const notesUrl = `/api/action/get_note/${userId}`;
        return this.http.get<any>(environment.backend_url + notesUrl);
    }

}
