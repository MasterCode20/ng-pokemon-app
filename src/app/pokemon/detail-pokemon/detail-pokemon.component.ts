import { PokemonService } from './../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [
  ]
})
export class DetailPokemonComponent implements OnInit {

  pokemonList:Pokemon[] ;
  pokemon:Pokemon|undefined;
  
  constructor(private route : ActivatedRoute, private router :Router, private pokemonService : PokemonService){}

  ngOnInit(): void {
   const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
     if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon);
     }
  }
  deletePokemon(pokemon :  Pokemon){
     this.pokemonService.deletePokemonById(pokemon.id).subscribe(
      () => this.GotoPokemonList()
     );
  }
  GotoPokemonList(){
    this.router.navigate(['/pokemons']);
  }
  GoToEditPokemon(pokemon : Pokemon)
  {
    this.router.navigate(['/edit/pokemon',pokemon.id])
  }
}