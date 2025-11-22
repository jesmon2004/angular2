import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para formularios
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from '../../services/pokemon'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-search-type',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, TitleCasePipe, RouterLink],
  templateUrl: './search-type.html',
  styleUrls: ['./search-type.css']
})
export class SearchTypeComponent implements OnInit {
  types$: Observable<any[]> | undefined;
  selectedType: string = '';
  typePokemons: any[] = [];
  
 
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.types$ = this.pokemonService.getTypes();
  }

  searchByType() {
    if (this.selectedType) {
      
      this.typePokemons = []; // Limpiar resultados anteriores

      this.pokemonService.getPokemonByType(this.selectedType).subscribe({
        next: (pokemons) => {
          this.typePokemons = pokemons;
          
        },
        error: (err) => {
          console.error('Error:', err);
          
        }
      });
    }
  }
}