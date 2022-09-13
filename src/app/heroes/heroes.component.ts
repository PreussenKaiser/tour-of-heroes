import { Component, OnInit } from '@angular/core'
import { Hero } from '../core/hero'
import { HeroService } from '../hero.service'
import { MessageService } from '../message.service'

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
   * Queries heroes.
   */
  private readonly heroService: HeroService

  /**
   * Logs component actions.
   */
  private readonly messageService: MessageService

  /**
   * A list of heroes.
   */
  public heroes: Hero[]

  /**
   * Initializes the HeroesComponent class.
   * @param heroService Queries heroes.
   * @param messageService Logs component actions.
   */
  constructor(heroService: HeroService,
              messageService: MessageService) {

    this.heroService = heroService
    this.messageService = messageService

    this.heroes = []
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {

    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  /**
   * Adds a hero.
   * @param name The name of the hero.
   */
  public add(name: string) {

    name = name.trim()

    if (name == null)
      return

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero))
  }

  public delete(hero: Hero) {

    this.heroes = this.heroes.filter(h => h != hero)
    
    this.heroService.deleteHero(hero.id)
      .subscribe()
  }
}
