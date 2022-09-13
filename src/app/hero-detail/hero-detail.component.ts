import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Hero } from '../core/hero'
import { HeroService } from '../hero.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})

/**
 * Code-behind for the hero-detail component.
 */
export class HeroDetailComponent implements OnInit {

  private readonly route: ActivatedRoute

  private readonly heroService: HeroService

  private readonly location: Location

  /**
   * The hero to detail.
   */
  public hero?: Hero

  /**
   * Initializes the HeroDetailComponent class.
   * @param route 
   * @param heroService
   * @param location
   */
  constructor(route: ActivatedRoute,
              heroService: HeroService,
              location: Location) {
    
    this.route = route
    this.heroService = heroService
    this.location = location
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))
    
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  /**
   * Saves the current hero in the service.
   */
  public save() {
    
    if (this.hero == null)
      return

    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack())
  }

  /**
   * Goes back to the previous page.
   */
  public goBack() {
    this.location.back()
  }
}
