import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list';
import { SearchNameComponent } from './components/search-name/search-name';
import { SearchTypeComponent } from './components/search-type/search-type';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail';


export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: PokemonListComponent },
  { path: 'search-name', component: SearchNameComponent },
  { path: 'search-type', component: SearchTypeComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent }, 
  { path: '**', redirectTo: '/list' }
];