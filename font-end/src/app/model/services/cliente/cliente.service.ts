import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/components/cliente/cliente';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  findById(id : string): Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  create(cliente : Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, cliente);
  }

  update(cliente : Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`, cliente);
  }

  delete(id : string): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

}
