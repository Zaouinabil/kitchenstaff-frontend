import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class Items {
    http;
    apiUrl = 'http://localhost:8080/api/v1/items';
    constructor(http) {
        this.http = http;
    }
    findAll() {
        return this.http.get(this.apiUrl, {
            headers: this.getHeaders()
        });
    }
    getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }
    static ɵfac = function Items_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Items)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Items, factory: Items.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Items, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
