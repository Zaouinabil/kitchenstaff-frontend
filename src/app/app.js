import { Component } from '@angular/core';
import { Login } from './pages/login/login';
import { TasksPage } from './pages/tasks/tasks';
import * as i0 from "@angular/core";
function App_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-tasks");
} }
export class App {
    title = 'kitchenstaff-frontend';
    isLoggedIn = false;
    authListener = () => {
        this.checkLogin();
    };
    ngOnInit() {
        this.checkLogin();
        window.addEventListener('auth-changed', this.authListener);
    }
    ngOnDestroy() {
        window.removeEventListener('auth-changed', this.authListener);
    }
    checkLogin() {
        this.isLoggedIn = !!localStorage.getItem('token');
    }
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 3, vars: 1, consts: [[1, "app-shell"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-login");
            i0.ɵɵconditionalCreate(2, App_Conditional_2_Template, 1, 0, "app-tasks");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoggedIn ? 2 : -1);
        } }, dependencies: [Login, TasksPage], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: calc(100vh - 16px);\n  background: #f3f4f6;\n  font-family: Arial, sans-serif;\n  color: #1f2937;\n}\n\n.app-shell[_ngcontent-%COMP%] {\n  width: min(1120px, calc(100% - 40px));\n  margin: 0 auto;\n  padding: 28px 0 48px;\n}\n\napp-login[_ngcontent-%COMP%], \napp-tasks[_ngcontent-%COMP%] {\n  display: block;\n}\n\n@media (max-width: 640px) {\n  .app-shell[_ngcontent-%COMP%] {\n    width: min(100% - 24px, 1120px);\n    padding: 16px 0 32px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', imports: [Login, TasksPage], template: "<div class=\"app-shell\">\n  <app-login></app-login>\n\n  @if (isLoggedIn) {\n    <app-tasks></app-tasks>\n  }\n</div>\n", styles: [":host {\n  display: block;\n  min-height: calc(100vh - 16px);\n  background: #f3f4f6;\n  font-family: Arial, sans-serif;\n  color: #1f2937;\n}\n\n.app-shell {\n  width: min(1120px, calc(100% - 40px));\n  margin: 0 auto;\n  padding: 28px 0 48px;\n}\n\napp-login,\napp-tasks {\n  display: block;\n}\n\n@media (max-width: 640px) {\n  .app-shell {\n    width: min(100% - 24px, 1120px);\n    padding: 16px 0 32px;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 11 }); })();
