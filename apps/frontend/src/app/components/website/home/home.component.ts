import { Component, OnInit } from '@angular/core';
import { Slide } from '@frontend/models/slide.model';

import { UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public slides: any[] = [
    {
      alt: 'anime',
      image: '/assets/images/slide/dragonquest.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/mansle.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/spykyou.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/tokyo.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/dragonquest.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/mansle.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/spykyou.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/tokyo.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/spykyou.jpg'
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/tokyo.jpg'
    },
  ]

  public array = [ 1, 2, 3, 4, 5, 6, 7, 8]
  ngOnInit(): void {}
}
