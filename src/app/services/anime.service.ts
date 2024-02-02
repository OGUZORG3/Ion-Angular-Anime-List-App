import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnimeResult, ApiResult } from './interfaces';
const BASE_URL = 'https://api.jikan.moe/v4';
@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private http = inject(HttpClient);
  constructor() { }
  getTopRatedAnimes(page:number):Observable<ApiResult>{
    return this.http.get<ApiResult>(`${BASE_URL}/top/anime?page=${page}`);
  };
  getAnimeDetails(id:string):Observable<AnimeResult>{
    return this.http.get<AnimeResult>(`${BASE_URL}/anime/${id}/full`);
  };
}
