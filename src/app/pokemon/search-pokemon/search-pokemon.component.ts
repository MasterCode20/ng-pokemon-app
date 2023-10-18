import { Component ,OnInit} from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { Subject, Observable,  debounceTime, distinctUntilChanged,  switchMap,} from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
   
})
export class SearchPokemonComponent implements OnInit {
  //subject concerve flux de donnees de lutilisateur dans le temps differents de Obsevable ou il faut  souscrire pour lutiliser
  searchTerms = new Subject<string>();
  pokemonList$: Observable<Pokemon[]>;
 

  constructor(
    private pokemonService: PokemonService,
    private router : Router) {}

     
  Search(term : string){
    //next est similaire a push
        return this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //{..'a'.'ab'...'abz'.'ab'....'abc'.........}
    this.pokemonList$ = this.searchTerms.pipe(
      debounceTime(100),
      //{ 'ab'... 'ab'....'abc'.........}
      distinctUntilChanged(),
      //{....'ab'...............'abc'........}
     switchMap((term : string) => this.pokemonService.searchPokemonList(term))
      // renvoit directement le flux de donnees;

    )
  }
   
  GoToDetail(pokemon : Pokemon){
    const link = ['/pokemon',pokemon.id];
    return this.router.navigate(link)
  }

}
function concathMap(arg0: (term: string) => Observable<Pokemon[]>): import("rxjs").OperatorFunction<string, Pokemon[]> {
  throw new Error('Function not implemented.');
}

