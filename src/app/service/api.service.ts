import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  private apiURL= '/api/dummy/items/';
  httpOptions = {
    Headers: new HttpHeaders({
      "Access-Control-Allow-Origin" : "*",
      "Content-type": "Application/json",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Authorization" : "Bearer ALDJAK23423JKSLAJAF23423J23SAD3"
     })

  }

  saveUser(data: any) {
    return this.httpClient.post<any>('http://developers.gictsystems.com/api/dummy/submit/', data);
  }

  listItems():Observable<any>{
return this.httpClient.get(this.apiURL, {headers: this.httpOptions.Headers });

  }
}

