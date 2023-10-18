import { Component,OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { POKEMONS } from '../mock-pokemon-list';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent {

  pokemonList : Pokemon[];

  constructor(private router:Router,
              private pokemonService:PokemonService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList);
    
  }

  GoToPokemon(pokemon : Pokemon)
  {
    this.router.navigate(['/pokemon', pokemon.id])
  }
}
