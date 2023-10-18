import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  private log(response : any)
  {
    return console.table(response);
  };
  private handleError(error : Error, errorValue :any){
    console.error(error);
    return of(errorValue);
  }
  
  

  constructor(private http : HttpClient) { }

  getPokemonList(): Observable<Pokemon[]>
  {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
    catchError((error) =>{
       return this.handleError(error, []);
    })
    );
    //return POKEMONS;
  }

  getPokemonById(pokemonId: number ):Observable<Pokemon | undefined>
  {
       
        return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(  
          tap((response) => this.log(response)),
        catchError((error) =>{
          return this.handleError(error, undefined);
        })

        );
  }
  addPokemon(pokemon : Pokemon):Observable<Pokemon>
  {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Pokemon>('api/pokemons',pokemon,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) =>{
        return this.handleError(error, undefined);})
    );    

  }
  updatePokemon(pokemon : Pokemon): Observable<null>{
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put('api/pokemons', pokemon,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,null))
    )
  }

  searchPokemonList(term : string): Observable<Pokemon[]>{
    if(term.length<=1){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,[]))
    );
  }
  deletePokemonById(pokemonId :number):Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,null))
    )
  }

       
  getPokemonTypeList(): string[]
  {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
      'Normal'
    ];
  }
 }

