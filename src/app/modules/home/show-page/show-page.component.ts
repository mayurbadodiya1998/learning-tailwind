import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../core/core.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './show-page.component.html',
  styleUrl: './show-page.component.scss'
})
export class ShowPageComponent implements OnInit {
  isLoggedIn = false;
  constructor(private coreService: CoreService) { }
  ngOnInit(): void {
    let token = this.coreService.localStorageGetItem("AUTH_TOKEN");
    if (token) {
      this.isLoggedIn = true;
    }
    this.coreService.notifyOther.subscribe(res => {
      console.log("inside show page ", res)
      if (res?.key === "AUTH_NOTIFY") {
        this.isLoggedIn = res?.value
      }

    })
  }
}
