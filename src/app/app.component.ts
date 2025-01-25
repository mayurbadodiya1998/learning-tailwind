import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgHttpLoaderComponent, Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgHttpLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'learning-tailwind';
  public spinkit = Spinkit;

  constructor() { }

  ngOnInit(): void {
    console.log("inside ng on init")
  }

}
