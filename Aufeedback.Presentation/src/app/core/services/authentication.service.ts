import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthenticationService {

    constructor(
    ) {

    }

    public login(userId: string) {

        this.setTokenValue(userId);
    }

    logOut() {

        sessionStorage.removeItem('userId');
    }

    public IsLoggedIn(): boolean {

        var tokenValue = this.getTokenValue();
        if (tokenValue)
            return true;
        else
            return false;
    }

    public GetCurrentUserId(): string {
        return this.getTokenValue();
    }

    public getTokenValue(): string {
        return sessionStorage.getItem('userId');
    }

    public setTokenValue(loggedInUserId) {
        sessionStorage.setItem('userId', loggedInUserId);

    }


}

