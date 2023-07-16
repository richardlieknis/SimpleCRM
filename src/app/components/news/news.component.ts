import { Component, OnInit } from '@angular/core';
import { AnyObject } from 'chart.js/types/basic';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsData: any = [];

  async ngOnInit(): Promise<void> {
    const apikey = 'c885cdb68f5d65089cb1ca9cd5c2a7ec';
    const category = 'technology';
    const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.newsData = data.articles;
      });
  }
}
