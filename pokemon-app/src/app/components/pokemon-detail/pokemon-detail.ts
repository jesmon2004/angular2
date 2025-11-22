import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon';
import { Pokemon } from '../../models/pokemon';
import { TitleCasePipe, LowerCasePipe } from '@angular/common'; 

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TitleCasePipe, LowerCasePipe, UpperCasePipe],
  templateUrl: './pokemon-detail.html',
  styleUrls: ['./pokemon-detail.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;

  today = new Date();

  

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    //Coge la id de la ruta 
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      //con la id q hemos cogido la manda al service para sacar los datps
      this.pokemonService.getPokemon(id).subscribe(p => this.pokemon = p);
    }
  }

  //Coge la url directamente asi no hay q filtrar
  getSpriteUrl(): string {
    return this.pokemon?.sprites?.front_default || '';
  }

}

