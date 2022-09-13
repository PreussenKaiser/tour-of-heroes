import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../core/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.less']
})

/**
 * The code-behind for the HeroSearch component.
 */
export class HeroSearchComponent implements OnInit {

  /**
   * The service to search heroes with.
   */
  private readonly heroService: HeroService

  /**
   * Heroes which match the search term.
   */
  public heroes$!: Observable<Hero[]>

  /**
   * Terms to queue into the searchbar.
   */
  private searchTerms: Subject<string>

  /**
   * Initializes the HeroSearchComponent class.
   * @param heroService 
   */
  constructor(heroService: HeroService) {

    this.heroService = heroService
    this.searchTerms = new Subject<string>()
  }

  /**
   * Initializes the hero's list by the entered search term.
   */
  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(

      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHero(term))
    )
  }

  /**
   * Adds a search term.
   * @param term The term to add.
   */
  public search(term: string) {

    this.searchTerms.next(term)
  }
}
