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
      image: '/assets/images/slide/dragonquest.jpg',
      name: 'Rougo ni Sonaete Isekai de 8-manmai no Kinka wo Tamemasu',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/mansle.jpg',
      name: 'Tokyo Kaine1Tokyo Kaineasdasdasdasdasdasdasdasdasdasd Tokyo Kaineasdasdasdasdasdasdasdasdasdasd',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/spykyou.jpg',
      name: 'Tokyo Kaine2Tokyo KaineasdasdasdasdasdasdasdasdasdasdTokyo Kaineasdasdasdasdasdasdasdasdasdasd',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/tokyo.jpg',
      name: 'Tokyo Kaine3',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/dragonquest.jpg',
      name: 'Tokyo Kaine4',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/mansle.jpg',
      name: 'Tokyo Kaine',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/spykyou.jpg',
      name: 'Tokyo Kaine',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/tokyo.jpg',
      name: 'Tokyo Kaine',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/spykyou.jpg',
      name: 'Tokyo Kaine',
      view: '123,232,312',
    },
    {
      alt: 'anime',
      image: '/assets/images/slide/tokyo.jpg',
      name: 'Tokyo Kaine',
      view: '123,232,312',
    },
  ];

  public array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  public arr = [1, 2, 3, 4, 5, 6];
  ngOnInit(): void {}
}
