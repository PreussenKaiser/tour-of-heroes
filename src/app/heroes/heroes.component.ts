import { Component, OnInit } from '@angular/core'
import { Hero } from '../core/hero'
import { HEROES } from '../infratructure/mock-heroes'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})

/**
 * Represents the 'heroes' component.
 */
export class HeroesComponent implements OnInit {

  /**
   * A list of heroes.
   */
  public heroes: Hero[]

  /**
   * The currently selected hero.
   */
  public selectedHero?: Hero

  /**
   * Initializes the HeroesComponent class.
   */
  constructor() {

    this.heroes = HEROES
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void { }

  /**
   * Sets the currently selected hero.
   * @param hero The hero to select.
   */
  public onSelect(hero: Hero) {

    this.selectedHero = hero
  }
}
