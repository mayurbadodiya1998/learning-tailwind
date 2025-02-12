import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  item = new BehaviorSubject<any>({});
  notifyOther = this.item.asObservable();
  uesrDetails = undefined;

  constructor(private toastr: ToastrService) { }

  setNotifyItem(key: string, value: any) {
    this.item.next({ key, value })
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  successMessage(msg: string) {
    this.toastr.success(msg)
  }
  errorMessage(msg: string) {
    this.toastr.error(msg)
  }
  infoMessage(msg: string) {
    this.toastr.info(msg)
  }
  warningMessage(msg: string) {
    this.toastr.warning(msg)
  }

  localStorageSetItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn('⚠️ localStorage is not available');
    }
  }
  localStorageRemoveItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }
  localStorageGetItem<T>(key: string): T | null {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
  localStorageClear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }
  setUserDetails(value: any) {
    this.uesrDetails = value;
  }

  getUserDetails(): any {
    return this.uesrDetails;
  }
}
