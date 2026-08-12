import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class Auth {
    http;
    apiUrl = 'http://localhost:8080/api/v1/auth';
    authenticatedSubject = new BehaviorSubject(!!localStorage.getItem('token'));
    authenticated$ = this.authenticatedSubject.asObservable();
    constructor(http) {
        this.http = http;
    }
    login(email, password) {
        return this.http.post(`${this.apiUrl}/login`, {
            email,
            password
        });
    }
    saveSession(response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.name);
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('userEmail', response.email);
        this.authenticatedSubject.next(true);
        window.dispatchEvent(new Event('auth-changed'));
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        this.authenticatedSubject.next(false);
        window.dispatchEvent(new Event('auth-changed'));
    }
    static ɵfac = function Auth_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Auth)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Auth, factory: Auth.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Auth, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
