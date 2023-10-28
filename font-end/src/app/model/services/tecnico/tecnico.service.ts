import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnico } from 'src/app/components/tecnico/Tecnico';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<Tecnico[]>{
    return this.httpClient.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
    // return this.httpClient.get<Tecnico[]>(`${API_CONFIG}` + "/tecnicos");
  }
}
