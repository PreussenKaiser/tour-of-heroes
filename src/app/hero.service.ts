import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from './core/hero';
import { HEROES } from './infrastructure/mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Queries heroes.
 */
export class HeroService {

  /**
   * The http client to query heroes with.
   */
  private readonly client: HttpClient

  /**
   * Configuration for the client.
   */
  private readonly clientOptions: any

  /**
   * Queries application messages.
   */
  private readonly messageService: MessageService

  /**
   * The url to the heroes API.
   */
  private readonly heroesUrl: string

  /**
   * Initializes the HeroService class.
   * @param client The http client to query heros with.
   * @param messageService Queries application messages.
   */
  constructor(client: HttpClient,
              messageService: MessageService) { 

    this.client = client
    this.clientOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.messageService = messageService

    this.heroesUrl = 'api/heroes'
  }

  /**
   * Creates a hero in the service.
   * @param hero The hero to create.
   * @return The created hero.
   */
  public addHero(hero: Hero): Observable<Hero> {
    
    return this.client.post<Hero>(this.heroesUrl, hero, this.clientOptions)
      .pipe(
        tap(_ => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      ) as Observable<Hero>
  }

  /**
   * Gets heroes from the mock data store asynchronously.
   * @returns An array of heroes.
   */
  public getHeroes(): Observable<Hero[]> {

    const heroes = this.client.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )

    this.log('fetched heroes')

    return heroes
  }

  /**
   * Gets a hero from the array.
   * @param id The hero's identifier.
   * @returns The found hero, the first one in the array if none were found.
   */
  public getHero(id: Number): Observable<Hero> {

    const url = `${this.heroesUrl}/${id}`
    const hero = this.client.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )

    return hero
  }

  /**
   * Searches for heroes.
   * @param term The search term to use.
   * @returns Heroes matching the search term.
   */
  public searchHero(term: string): Observable<Hero[]> {
    if (term.trim() == null)
      return of([])

    return this.client.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length
              ? this.log(`found heroes matching term=${term}`)
              : this.log(`no heroes matching term=${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
  }

  /**
   * Updates a hero in the service.
   * @param hero The hero to update.
   */
  public updateHero(hero: Hero) {

    return this.client.put(this.heroesUrl, hero, this.clientOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  /**
   * Deletes a hero from the service.
   * @param id The hero's identifier.
   * @returns The deleted hero.
   */
  public deleteHero(id: number): Observable<Hero> {

    const url = `${this.heroesUrl}/id=${id}`

    return this.client.delete<Hero>(url, this.clientOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      ) as Observable<Hero>
  }

  /**
   * Logs a message to the message service.
   * @param msg The message to log.
   */
  private log(msg: string) {

    this.messageService.add(`HeroService: ${msg}`)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation Name of the operation that failed.
   * @param result Optional value to return as the observable result.
   */
  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
