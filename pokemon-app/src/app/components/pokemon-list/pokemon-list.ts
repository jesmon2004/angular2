import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common'; 
import { firstValueFrom } from 'rxjs'; 
import { PokemonService } from '../../services/pokemon';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TitleCasePipe],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = []; 
  
  offset = 0 ;
  

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    //para guardar donde te quedas cuando cambias de pagina o resfrescas
    const savedOffset = (typeof sessionStorage !== 'undefined')
      ? sessionStorage.getItem('pokemonOffset')
      : null;

    if (savedOffset) {
     this.offset = parseInt(savedOffset, 10);
    }

    //carga los pokemons al iniciar la pagina
    this.loadPokemons(); 
  }

  async loadPokemons() {
      //carga la api de la lista que solo tiene el nombre y la url
      const listResponse = await firstValueFrom(this.pokemonService.getPokemonList(20, this.offset)); 
      const results = listResponse?.results || [];

      this.pokemons = []; 

      for (const pokemonLite of results) {
        //Saca los detelles de cada pokemon usando su nombre
          const fullPokemon = await firstValueFrom(this.pokemonService.getPokemon(pokemonLite.name)); 
          this.pokemons.push(fullPokemon); 
        }
       
  }

  //Carga los siguientes
  loadNext() {
    this.offset += 20;
     if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('pokemonOffset', this.offset.toString()); //para guardar donde te quedas cuando cambias de pagina o resfrescas
      }
    this.loadPokemons(); 
  }

  //Carga los anteriores
  loadPrevious() {
    if (this.offset >= 20) {
      this.offset -= 20;
      //lo hace solo si no es undefined
       if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('pokemonOffset', this.offset.toString()); //para guardar donde te quedas cuando cambias de pagina o resfrescas
      }
      this.loadPokemons(); 
    }
  }

  
  
}