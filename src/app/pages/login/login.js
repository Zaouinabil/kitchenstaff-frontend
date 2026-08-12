import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../services/auth";
import * as i2 from "@angular/forms";
function Login_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "label", 6);
    i0.ɵɵtext(2, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 7);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_6_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.email, $event) || (ctx_r1.email = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(4, "label", 8);
    i0.ɵɵtext(5, "Mot de passe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 9);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_6_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.password, $event) || (ctx_r1.password = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(7, "button", 10);
    i0.ɵɵlistener("click", function Login_Conditional_6_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSubmit()); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 11);
    i0.ɵɵtext(10, " Utilisez un compte ADMIN, CHEF ou COMMIS cr\u00E9\u00E9 dans le backend. ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.email);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.password);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.loading ? "Connexion..." : "Se connecter", " ");
} }
function Login_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "p");
    i0.ɵɵtext(2, "Connect\u00E9 comme :");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 12);
    i0.ɵɵlistener("click", function Login_Conditional_7_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵtext(8, " Se d\u00E9connecter ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("R\u00F4le : ", ctx_r1.userRole);
} }
export class Login {
    auth;
    email = '';
    password = '';
    errorMessage = '';
    successMessage = '';
    loading = false;
    isLoggedIn = false;
    userName = '';
    userRole = '';
    constructor(auth) {
        this.auth = auth;
        this.loadSession();
    }
    onSubmit() {
        this.errorMessage = '';
        this.successMessage = '';
        if (!this.email.trim() || !this.password.trim()) {
            this.errorMessage = 'Veuillez remplir l’email et le mot de passe.';
            return;
        }
        this.loading = true;
        this.auth.login(this.email, this.password).subscribe({
            next: (response) => {
                this.auth.saveSession(response);
                this.isLoggedIn = true;
                this.userName = response.name;
                this.userRole = response.role;
                this.successMessage = `Connexion réussie. Bienvenue ${response.name}.`;
                this.loading = false;
                console.log('Token JWT:', response.token);
            },
            error: (error) => {
                console.error('Erreur login:', error);
                this.errorMessage = 'Connexion impossible. Vérifiez vos identifiants.';
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    logout() {
        this.auth.logout();
        this.isLoggedIn = false;
        this.userName = '';
        this.userRole = '';
        this.successMessage = '';
        this.errorMessage = '';
        this.password = '';
    }
    loadSession() {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('userName');
        const role = localStorage.getItem('userRole');
        if (token && name && role) {
            this.isLoggedIn = true;
            this.userName = name;
            this.userRole = role;
        }
    }
    static ɵfac = function Login_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Login)(i0.ɵɵdirectiveInject(i1.Auth)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Login, selectors: [["app-login"]], decls: 12, vars: 4, consts: [[1, "login-page"], [1, "login-card"], [1, "session-box"], [1, "error"], [1, "success"], [1, "login-form"], ["for", "email"], ["id", "email", "type", "email", "name", "email", "placeholder", "admin@kitchenstaff.test", 3, "ngModelChange", "ngModel"], ["for", "password"], ["id", "password", "type", "password", "name", "password", "placeholder", "Votre mot de passe", 3, "ngModelChange", "ngModel"], ["type", "button", 3, "click", "disabled"], [1, "hint"], ["type", "button", 1, "logout-button", 3, "click"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "h1");
            i0.ɵɵtext(3, "Kitchenstaff");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h2");
            i0.ɵɵtext(5, "Connexion");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, Login_Conditional_6_Template, 11, 4);
            i0.ɵɵconditionalCreate(7, Login_Conditional_7_Template, 9, 2, "div", 2);
            i0.ɵɵelementStart(8, "p", 3);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 4);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(!ctx.isLoggedIn ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoggedIn ? 7 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.errorMessage, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.successMessage, " ");
        } }, dependencies: [FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel], styles: [".login-page[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 72px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: white;\n  padding: 36px;\n  border-radius: 16px;\n  box-sizing: border-box;\n  border: 1px solid #e5e7eb;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n}\n\n.login-page[_ngcontent-%COMP%]:has(.session-box) {\n  min-height: 0;\n  justify-content: stretch;\n}\n\n.login-page[_ngcontent-%COMP%]:has(.session-box)   .login-card[_ngcontent-%COMP%] {\n  max-width: none;\n  padding: 20px 24px;\n}\n\n.login-page[_ngcontent-%COMP%]:has(.session-box)   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n\n.login-page[_ngcontent-%COMP%]:has(.session-box)   h2[_ngcontent-%COMP%] {\n  display: none;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 36px;\n  color: #1f2937;\n}\n\nh2[_ngcontent-%COMP%] {\n  margin: 8px 0 24px;\n  color: #4b5563;\n  font-size: 22px;\n}\n\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\nlabel[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #374151;\n}\n\ninput[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 15px;\n}\n\nbutton[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding: 12px;\n  border: none;\n  border-radius: 8px;\n  background: #1f2937;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n}\n\nbutton[_ngcontent-%COMP%]:hover {\n  background: #111827;\n}\n\n.hint[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  color: #6b7280;\n  font-size: 14px;\n}\n.error[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #dc2626;\n  font-size: 14px;\n}\n.error[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #dc2626;\n  font-size: 14px;\n  font-weight: bold;\n}\n.success[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #16a34a;\n  font-size: 14px;\n  font-weight: bold;\n}\n\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.session-box[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 14px 16px;\n  background: #eef2ff;\n  border: 1px solid #dbeafe;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n\n.session-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #4b5563;\n}\n\n.session-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1f2937;\n}\n\n.logout-button[_ngcontent-%COMP%] {\n  margin: 0 0 0 auto;\n  padding: 9px 14px;\n  font-size: 14px;\n  background: #dc2626;\n}\n\n.logout-button[_ngcontent-%COMP%]:hover {\n  background: #b91c1c;\n}\n\n@media (max-width: 640px) {\n  .login-card[_ngcontent-%COMP%] {\n    padding: 26px 22px;\n  }\n\n  .session-box[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 6px;\n  }\n\n  .logout-button[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 8px 0 0;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Login, [{
        type: Component,
        args: [{ selector: 'app-login', imports: [FormsModule], template: "<main class=\"login-page\">\n  <section class=\"login-card\">\n    <h1>Kitchenstaff</h1>\n    <h2>Connexion</h2>\n\n    @if (!isLoggedIn) {\n      <div class=\"login-form\">\n        <label for=\"email\">Email</label>\n        <input\n          id=\"email\"\n          type=\"email\"\n          name=\"email\"\n          placeholder=\"admin@kitchenstaff.test\"\n          [(ngModel)]=\"email\"\n        />\n\n        <label for=\"password\">Mot de passe</label>\n        <input\n          id=\"password\"\n          type=\"password\"\n          name=\"password\"\n          placeholder=\"Votre mot de passe\"\n          [(ngModel)]=\"password\"\n        />\n\n        <button type=\"button\" (click)=\"onSubmit()\" [disabled]=\"loading\">\n          {{ loading ? 'Connexion...' : 'Se connecter' }}\n        </button>\n      </div>\n\n      <p class=\"hint\">\n        Utilisez un compte ADMIN, CHEF ou COMMIS cr\u00E9\u00E9 dans le backend.\n      </p>\n    }\n\n    @if (isLoggedIn) {\n      <div class=\"session-box\">\n        <p>Connect\u00E9 comme :</p>\n        <h3>{{ userName }}</h3>\n        <p>R\u00F4le : {{ userRole }}</p>\n\n        <button type=\"button\" class=\"logout-button\" (click)=\"logout()\">\n          Se d\u00E9connecter\n        </button>\n      </div>\n    }\n\n    <p class=\"error\">\n      {{ errorMessage }}\n    </p>\n\n    <p class=\"success\">\n      {{ successMessage }}\n    </p>\n  </section>\n</main>", styles: [".login-page {\n  min-height: calc(100vh - 72px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-card {\n  width: 100%;\n  max-width: 420px;\n  background: white;\n  padding: 36px;\n  border-radius: 16px;\n  box-sizing: border-box;\n  border: 1px solid #e5e7eb;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n}\n\n.login-page:has(.session-box) {\n  min-height: 0;\n  justify-content: stretch;\n}\n\n.login-page:has(.session-box) .login-card {\n  max-width: none;\n  padding: 20px 24px;\n}\n\n.login-page:has(.session-box) h1 {\n  font-size: 28px;\n}\n\n.login-page:has(.session-box) h2 {\n  display: none;\n}\n\nh1 {\n  margin: 0;\n  font-size: 36px;\n  color: #1f2937;\n}\n\nh2 {\n  margin: 8px 0 24px;\n  color: #4b5563;\n  font-size: 22px;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\nlabel {\n  font-weight: bold;\n  color: #374151;\n}\n\ninput {\n  padding: 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 15px;\n}\n\nbutton {\n  margin-top: 12px;\n  padding: 12px;\n  border: none;\n  border-radius: 8px;\n  background: #1f2937;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #111827;\n}\n\n.hint {\n  margin-top: 20px;\n  color: #6b7280;\n  font-size: 14px;\n}\n.error {\n  margin-top: 16px;\n  color: #dc2626;\n  font-size: 14px;\n}\n.error {\n  margin-top: 16px;\n  color: #dc2626;\n  font-size: 14px;\n  font-weight: bold;\n}\n.success {\n  margin-top: 16px;\n  color: #16a34a;\n  font-size: 14px;\n  font-weight: bold;\n}\n\nbutton:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.session-box {\n  margin-top: 14px;\n  padding: 14px 16px;\n  background: #eef2ff;\n  border: 1px solid #dbeafe;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n\n.session-box p {\n  margin: 0;\n  color: #4b5563;\n}\n\n.session-box h3 {\n  margin: 0;\n  color: #1f2937;\n}\n\n.logout-button {\n  margin: 0 0 0 auto;\n  padding: 9px 14px;\n  font-size: 14px;\n  background: #dc2626;\n}\n\n.logout-button:hover {\n  background: #b91c1c;\n}\n\n@media (max-width: 640px) {\n  .login-card {\n    padding: 26px 22px;\n  }\n\n  .session-box {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 6px;\n  }\n\n  .logout-button {\n    width: 100%;\n    margin: 8px 0 0;\n  }\n}\n"] }]
    }], () => [{ type: i1.Auth }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Login, { className: "Login", filePath: "src/app/pages/login/login.ts", lineNumber: 11 }); })();
