import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './core/hero';

@Injectable({
  providedIn: 'root'
})

/**
 * Represents a local data store of heroes.
 */
export class InMemoryDataService implements InMemoryDbService {

  /**
   * Creates the hero data store.
   * @returns An array of heroes.
   */
  public createDb() {

    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ]
    
    return { heroes }
  }


  /**
   * Overrides the genId method to ensure that a hero always has an id.
   * @param heroes 
   * @returns
   * If the heroes array is empty,
   * the method below returns the initial number (11).
   * if the heroes array is not empty, the method below returns the highest
   * hero id + 1.
   */
  public genId(heroes: Hero[]): number {

    return heroes.length > 0
      ? Math.max(...heroes.map(hero => hero.id)) + 1
      : 11
  }
}
