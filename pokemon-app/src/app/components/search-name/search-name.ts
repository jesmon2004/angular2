import { Component } from '@angular/core';
import { CommonModule, UpperCasePipe, TitleCasePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon'; // Ajusta ruta si es necesario
import { Pokemon } from '../../models/pokemon'; // Ajusta ruta a tus interfaces

@Component({
  selector: 'app-search-name',
  standalone: true,
  imports: [CommonModule, FormsModule, UpperCasePipe, TitleCasePipe, DecimalPipe],
  templateUrl: './search-name.html',
  styleUrls: ['./search-name.css']
})
export class SearchNameComponent {
  searchTerm: string = '';
  foundPokemon: Pokemon | null = null;
  
  searchError: boolean = false; // Variable nueva para controlar el mensaje de error

  constructor(private pokemonService: PokemonService) {}

  searchByName() {
    if (!this.searchTerm.trim()) return;

    
    this.searchError = false;
    this.foundPokemon = null;

    // Convertimos a minúsculas porque la API falla con mayúsculas
    const term = this.searchTerm.toLowerCase().trim();

    this.pokemonService.getPokemon(term).subscribe({
      next: (pokemon) => {
        this.foundPokemon = pokemon;
        
      },
      error: (err) => {
        console.error('Error buscando pokemon:', err);
        this.searchError = true; // Activamos el mensaje de error
        
      }
    });
  }
  //Coge la url directamente asi no hay q filtrar
  getSpriteUrl(): string {
    return this.foundPokemon?.sprites?.front_default || '';
  }
}