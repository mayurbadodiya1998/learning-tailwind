import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isLoggedIn = false;

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    let token = this.coreService.localStorageGetItem('AUTH_TOKEN');
    if (token) {
      this.isLoggedIn = true
    }
    this.coreService.notifyOther.subscribe(res => {
      if (res.key == "AUTH_NOTIFY") {
        this.isLoggedIn = res.value
      }
    })
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.isLoggedIn = false;
    this.coreService.setNotifyItem("AUTH_NOTIFY", false)
    this.coreService.localStorageClear();
  }
}
