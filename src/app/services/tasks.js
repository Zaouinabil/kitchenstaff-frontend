import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class Tasks {
    http;
    apiUrl = 'http://localhost:8080/api/v1/tasks';
    constructor(http) {
        this.http = http;
    }
    findAll(status, date) {
        let params = new HttpParams();
        if (status) {
            params = params.set('status', status);
        }
        if (date) {
            params = params.set('date', date);
        }
        return this.http.get(this.apiUrl, {
            headers: this.getHeaders(),
            params: params
        });
    }
    createTask(request) {
        return this.http.post(this.apiUrl, request, {
            headers: this.getHeaders()
        });
    }
    startTask(id) {
        return this.http.patch(`${this.apiUrl}/${id}/start`, {}, {
            headers: this.getHeaders()
        });
    }
    completeTask(id) {
        return this.http.patch(`${this.apiUrl}/${id}/done`, {}, {
            headers: this.getHeaders()
        });
    }
    cancelTask(id) {
        return this.http.patch(`${this.apiUrl}/${id}/cancel`, {}, {
            headers: this.getHeaders()
        });
    }
    getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }
    static ɵfac = function Tasks_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Tasks)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Tasks, factory: Tasks.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Tasks, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
