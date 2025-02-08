import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export default class CoreService {
    option = {
        timeOut: 1000,
    }
    constructor(private toastr: ToastrService) { }
    toastrSuccess(message: string) {
        this.toastr.success('everything is broken', "", {
            timeOut: 1000,
        });
    }

    toastrError(message: string) {
        this.toastr.error('everything is broken', "", {
            timeOut: 1000,
        });
    }

}