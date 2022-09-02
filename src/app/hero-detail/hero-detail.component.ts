import { Component, Input, OnInit } from '@angular/core'
import { Hero } from '../core/hero'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})

/**
 * Code-behind for the hero-detail component.
 */
export class HeroDetailComponent implements OnInit {

  /**
   * The hero to detail.
   */
  @Input()
  public hero?: Hero

  /**
   * Initializes the HeroDetailComponent class.
   */
  constructor() { }

  /**
   * Initializes the component.
   */
  ngOnInit(): void { }
}
