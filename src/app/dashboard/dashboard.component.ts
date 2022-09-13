import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})

/**
 * Represents the code-behind for the Dashboard component.
 */
export class DashboardComponent implements OnInit {

  /**
   * Queries the top heroes.
   */
  private readonly heroService: HeroService

  /**
   * Top heroes.
   */
  public heroes: Hero[]

  /**
   * Initializes the DashboardComponent class.
   * @param heroService  Queries top heroes.
   */
  constructor(heroService: HeroService) {

    this.heroService = heroService
    this.heroes = []
  }

  /**
   * Initializes the top 5 heroes.
   */
  ngOnInit(): void {

    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}
