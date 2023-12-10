import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from 'src/app/components/chamado/chamado';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private httpClient : HttpClient) { }

  findAll() : Observable<Chamado[]>{
    return this.httpClient.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  findById(id : string) : Observable<Chamado> {
    return this.httpClient.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`);
  }

  create(chamado : Chamado) : Observable<Chamado> {
    return this.httpClient.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamado);
  }

  update(chamado : Chamado) : Observable<Chamado> {
    return this.httpClient.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}`, chamado);
  }
}
