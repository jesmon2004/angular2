import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { PokemonType } from '../models/pokemon-type';


@Injectable({
  providedIn: 'root'
})


export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2'; // Base URL de la API

  constructor(private http: HttpClient) {}


  // Obtener lista paginada de Pokémon 
  getPokemonList(limit: number = 20, offset: number = 0): Observable<any> {
    const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<any>(url); 
  }

  


  // Obtener Pokémon por ID/nombre (mapeo a interfaz Pokemon)
  getPokemon(nameOrId: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${nameOrId}`;
    return this.http.get<Pokemon>(url).pipe(
      map(data => ({
        ...data,
        // Asegura sprites si no está
        sprites: data.sprites || { front_default: '' }
      }))
    );
  }


  // Obtener lista de tipos 
  getTypes(): Observable<PokemonType[]> {
    const url = `${this.baseUrl}/type`;
    return this.http.get<any>(url).pipe(
      map(response => response.results as PokemonType[])
    );
  }



  // Obtener Pokémon de un tipo específico
  getPokemonByType(typeName: string): Observable<any> {
    const url = `${this.baseUrl}/type/${typeName}`;
    return this.http.get<any>(url).pipe(
      map(data => data.pokemon || []) // Mapea a array de Pokémon del tipo
    );
  }



  
  // Helper para obtener ID de URL 
  getIdFromUrl(url: string): number {
    return parseInt(url.split('/').filter(Boolean).pop() || '0', 10);
  }



}