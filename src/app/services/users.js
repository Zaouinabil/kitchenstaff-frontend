import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class Users {
    http;
    apiUrl = 'http://localhost:8080/api/v1/users';
    constructor(http) {
        this.http = http;
    }
    findAll() {
        return this.http.get(this.apiUrl, {
            headers: this.getHeaders()
        });
    }
    findActive() {
        return this.findAll().pipe(map((users) => users.filter((user) => user.active)));
    }
    getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }
    static ɵfac = function Users_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Users)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Users, factory: Users.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Users, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
