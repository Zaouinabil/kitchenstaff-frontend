import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, forkJoin, map, of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/tasks";
import * as i2 from "../../services/items";
import * as i3 from "../../services/users";
import * as i4 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.id;
function TasksPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1, " Vous pouvez consulter et mettre \u00E0 jour vos t\u00E2ches, mais la cr\u00E9ation est r\u00E9serv\u00E9e au chef. ");
    i0.ɵɵelementEnd();
} }
function TasksPage_Conditional_10_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵtext(1, "Chargement des options...");
    i0.ɵɵelementEnd();
} }
function TasksPage_Conditional_10_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", item_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", item_r3.name, " (", item_r3.unit, ")");
} }
function TasksPage_Conditional_10_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", user_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", user_r4.name, " \u2014 ", user_r4.role);
} }
function TasksPage_Conditional_10_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const priority_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", priority_r5.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(priority_r5.label);
} }
function TasksPage_Conditional_10_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formErrorMessage);
} }
function TasksPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 29);
    i0.ɵɵlistener("ngSubmit", function TasksPage_Conditional_10_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.createTask()); });
    i0.ɵɵelementStart(1, "div", 30)(2, "div")(3, "h3");
    i0.ɵɵtext(4, "Nouvelle t\u00E2che");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Ajoutez une pr\u00E9paration \u00E0 la liste des t\u00E2ches.");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(7, TasksPage_Conditional_10_Conditional_7_Template, 2, 0, "span", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 32)(9, "label");
    i0.ɵɵtext(10, " Item ");
    i0.ɵɵelementStart(11, "select", 33);
    i0.ɵɵtwoWayListener("ngModelChange", function TasksPage_Conditional_10_Template_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.newTask.itemId, $event) || (ctx_r1.newTask.itemId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(12, "option", 34);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(14, TasksPage_Conditional_10_For_15_Template, 2, 3, "option", 35, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵtext(17, " Utilisateur assign\u00E9 ");
    i0.ɵɵelementStart(18, "select", 36);
    i0.ɵɵtwoWayListener("ngModelChange", function TasksPage_Conditional_10_Template_select_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.newTask.assignedUserId, $event) || (ctx_r1.newTask.assignedUserId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(19, "option", 34);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(21, TasksPage_Conditional_10_For_22_Template, 2, 3, "option", 35, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label");
    i0.ɵɵtext(24, " Quantit\u00E9 ");
    i0.ɵɵelementStart(25, "input", 37);
    i0.ɵɵtwoWayListener("ngModelChange", function TasksPage_Conditional_10_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.newTask.quantity, $event) || (ctx_r1.newTask.quantity = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label");
    i0.ɵɵtext(27, " Priorit\u00E9 ");
    i0.ɵɵelementStart(28, "select", 38);
    i0.ɵɵtwoWayListener("ngModelChange", function TasksPage_Conditional_10_Template_select_ngModelChange_28_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.newTask.priority, $event) || (ctx_r1.newTask.priority = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵrepeaterCreate(29, TasksPage_Conditional_10_For_30_Template, 2, 2, "option", 35, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "label");
    i0.ɵɵtext(32, " Date ");
    i0.ɵɵelementStart(33, "input", 39);
    i0.ɵɵtwoWayListener("ngModelChange", function TasksPage_Conditional_10_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.newTask.taskDate, $event) || (ctx_r1.newTask.taskDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "label", 40);
    i0.ɵɵtext(35, " Commentaire ");
    i0.ɵɵelementStart(36, "textarea", 41);
    i0.ɵɵtwoWayListener("ngModelChange", function TasksPage_Conditional_10_Template_textarea_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.newTask.comment, $event) || (ctx_r1.newTask.comment = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(37, TasksPage_Conditional_10_Conditional_37_Template, 2, 1, "p", 42);
    i0.ɵɵelementStart(38, "div", 43)(39, "button", 44);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(ctx_r1.optionsLoading ? 7 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.newTask.itemId);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.optionsLoading ? "Chargement des items..." : ctx_r1.items.length > 0 ? "S\u00E9lectionner un item" : "Aucun item disponible", " ");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.items);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.newTask.assignedUserId);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.optionsLoading ? "Chargement des utilisateurs..." : ctx_r1.users.length > 0 ? "S\u00E9lectionner un utilisateur" : "Aucun utilisateur actif disponible", " ");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.users);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.newTask.quantity);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.newTask.priority);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.priorities);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.newTask.taskDate);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.newTask.comment);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.formErrorMessage ? 37 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.creatingTask || ctx_r1.optionsLoading || ctx_r1.items.length === 0 || ctx_r1.users.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.creatingTask ? "Cr\u00E9ation..." : "Cr\u00E9er la t\u00E2che", " ");
} }
function TasksPage_For_50_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function TasksPage_For_50_Template_button_click_0_listener() { const filter_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeStatusFilter(filter_r7.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const filter_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.selectedStatus === filter_r7.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", filter_r7.label, " ");
} }
function TasksPage_For_56_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function TasksPage_For_56_Template_button_click_0_listener() { const filter_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changePriorityFilter(filter_r9.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const filter_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.selectedPriority === filter_r9.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", filter_r9.label, " ");
} }
function TasksPage_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function TasksPage_Conditional_62_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSearch()); });
    i0.ɵɵtext(1, " Effacer ");
    i0.ɵɵelementEnd();
} }
function TasksPage_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1, "Chargement des t\u00E2ches...");
    i0.ɵɵelementEnd();
} }
function TasksPage_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function TasksPage_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.actionMessage);
} }
function TasksPage_Conditional_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.emptyTasksMessage);
} }
function TasksPage_Conditional_67_For_2_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 55);
    i0.ɵɵlistener("click", function TasksPage_Conditional_67_For_2_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const task_r12 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startTask(task_r12.id)); });
    i0.ɵɵtext(1, " D\u00E9marrer ");
    i0.ɵɵelementEnd();
} }
function TasksPage_Conditional_67_For_2_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function TasksPage_Conditional_67_For_2_Conditional_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const task_r12 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.completeTask(task_r12.id)); });
    i0.ɵɵtext(1, " Terminer ");
    i0.ɵɵelementEnd();
} }
function TasksPage_Conditional_67_For_2_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 57);
    i0.ɵɵlistener("click", function TasksPage_Conditional_67_For_2_Conditional_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const task_r12 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.cancelTask(task_r12.id)); });
    i0.ɵɵtext(1, " Annuler ");
    i0.ɵɵelementEnd();
} }
function TasksPage_Conditional_67_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 46)(1, "div", 47)(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 48);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 49);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, " Quantit\u00E9 : ");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "p");
    i0.ɵɵtext(13, " Priorit\u00E9 : ");
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "p");
    i0.ɵɵtext(17, " Assign\u00E9 \u00E0 : ");
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "p", 50);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 51);
    i0.ɵɵconditionalCreate(23, TasksPage_Conditional_67_For_2_Conditional_23_Template, 2, 0, "button", 52);
    i0.ɵɵconditionalCreate(24, TasksPage_Conditional_67_For_2_Conditional_24_Template, 2, 0, "button", 53);
    i0.ɵɵconditionalCreate(25, TasksPage_Conditional_67_For_2_Conditional_25_Template, 2, 0, "button", 54);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r12.itemName);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("done", task_r12.status === "TERMINEE")("cancelled", task_r12.status === "ANNULEE")("in-progress", task_r12.status === "EN_COURS");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", task_r12.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r12.categoryName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", task_r12.quantity, " ", task_r12.unit);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(task_r12.priority);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(task_r12.assignedUserName || "Non assign\u00E9");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", task_r12.comment, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(task_r12.status === "A_FAIRE" ? 23 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(task_r12.status === "EN_COURS" ? 24 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canCancelTask && task_r12.status !== "TERMINEE" && task_r12.status !== "ANNULEE" ? 25 : -1);
} }
function TasksPage_Conditional_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵrepeaterCreate(1, TasksPage_Conditional_67_For_2_Template, 26, 17, "article", 46, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.filteredTasks);
} }
export class TasksPage {
    tasksService;
    itemsService;
    usersService;
    userRole = '';
    tasks = [];
    loading = false;
    errorMessage = '';
    actionMessage = '';
    formErrorMessage = '';
    optionsLoading = false;
    creatingTask = false;
    summary = this.getEmptySummary();
    items = [];
    users = [];
    newTask = this.getEmptyTaskForm();
    priorities = [
        { label: 'Basse', value: 'BASSE' },
        { label: 'Normale', value: 'NORMALE' },
        { label: 'Haute', value: 'HAUTE' },
        { label: 'Urgente', value: 'URGENTE' }
    ];
    selectedStatus = '';
    selectedPriority = '';
    selectedDate = this.getTodayDate();
    searchQuery = '';
    currentRequest;
    formDataRequest;
    createRequest;
    statusFilters = [
        { label: 'Toutes', value: '' },
        { label: 'À faire', value: 'A_FAIRE' },
        { label: 'En cours', value: 'EN_COURS' },
        { label: 'Terminées', value: 'TERMINEE' },
        { label: 'Annulées', value: 'ANNULEE' }
    ];
    priorityFilters = [
        { label: 'Toutes', value: '' },
        { label: 'BASSE', value: 'BASSE' },
        { label: 'NORMALE', value: 'NORMALE' },
        { label: 'HAUTE', value: 'HAUTE' },
        { label: 'URGENTE', value: 'URGENTE' }
    ];
    get filteredTasks() {
        const normalizedSearch = this.searchQuery.trim().toLocaleLowerCase();
        return this.tasks.filter((task) => {
            const matchesPriority = !this.selectedPriority || task.priority === this.selectedPriority;
            if (!matchesPriority || !normalizedSearch) {
                return matchesPriority;
            }
            return [
                task.itemName,
                task.categoryName,
                task.assignedUserName,
                task.comment
            ].some((value) => value?.toLocaleLowerCase().includes(normalizedSearch));
        });
    }
    get emptyTasksMessage() {
        if (this.summary.total === 0) {
            return 'Aucune tâche trouvée pour cette date.';
        }
        if (this.searchQuery.trim()) {
            return 'Aucune tâche ne correspond à votre recherche.';
        }
        if (this.selectedStatus || this.selectedPriority) {
            return 'Aucune tâche ne correspond aux filtres sélectionnés.';
        }
        return 'Aucune tâche trouvée.';
    }
    get canCreateTask() {
        return this.userRole === 'ADMIN' || this.userRole === 'CHEF';
    }
    get canCancelTask() {
        return this.userRole === 'ADMIN' || this.userRole === 'CHEF';
    }
    get isCommis() {
        return this.userRole === 'COMMIS';
    }
    constructor(tasksService, itemsService, usersService) {
        this.tasksService = tasksService;
        this.itemsService = itemsService;
        this.usersService = usersService;
    }
    ngOnInit() {
        this.userRole = (localStorage.getItem('userRole') ?? '').toUpperCase();
        if (this.canCreateTask) {
            this.loadFormData();
        }
        this.loadTasks();
    }
    ngOnDestroy() {
        this.currentRequest?.unsubscribe();
        this.formDataRequest?.unsubscribe();
        this.createRequest?.unsubscribe();
    }
    loadFormData() {
        this.optionsLoading = true;
        this.formErrorMessage = '';
        this.formDataRequest = forkJoin({
            items: this.itemsService.findAll().pipe(catchError((error) => {
                console.error('Erreur chargement items:', error);
                return of([]);
            })),
            users: this.usersService.findActive().pipe(catchError((error) => {
                if (error.status === 403) {
                    console.error('Accès refusé aux utilisateurs (403). Testez avec un compte ADMIN.');
                }
                else {
                    console.error('Erreur chargement utilisateurs:', error);
                }
                return of([]);
            }))
        })
            .pipe(finalize(() => {
            this.optionsLoading = false;
        }))
            .subscribe({
            next: ({ items, users }) => {
                this.items = items;
                this.users = users;
            }
        });
    }
    createTask() {
        if (!this.canCreateTask) {
            this.formErrorMessage = 'La création de tâche est réservée au chef.';
            return;
        }
        const { itemId, assignedUserId, quantity, priority, comment, taskDate } = this.newTask;
        if (itemId === null || assignedUserId === null || quantity <= 0 || !taskDate) {
            this.formErrorMessage = 'Veuillez compléter tous les champs obligatoires.';
            return;
        }
        const request = {
            itemId,
            assignedUserId,
            quantity,
            priority,
            comment: comment.trim(),
            taskDate
        };
        this.creatingTask = true;
        this.formErrorMessage = '';
        this.actionMessage = '';
        this.createRequest = this.tasksService.createTask(request)
            .pipe(finalize(() => {
            this.creatingTask = false;
        }))
            .subscribe({
            next: () => {
                this.newTask = this.getEmptyTaskForm();
                this.loadTasks();
                this.actionMessage = 'Tâche créée avec succès.';
            },
            error: (error) => {
                console.error('Erreur création tâche:', error);
                this.formErrorMessage = 'Impossible de créer la tâche.';
            }
        });
    }
    loadTasks() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.tasks = [];
            this.summary = this.getEmptySummary();
            this.loading = false;
            this.errorMessage = 'Connectez-vous pour afficher les tâches.';
            return;
        }
        this.currentRequest?.unsubscribe();
        this.loading = true;
        this.errorMessage = '';
        this.actionMessage = '';
        const tasksRequest = this.selectedStatus
            ? forkJoin({
                tasks: this.tasksService.findAll(this.selectedStatus, this.selectedDate),
                summaryTasks: this.tasksService.findAll('', this.selectedDate)
            })
            : this.tasksService.findAll('', this.selectedDate).pipe(map((tasks) => ({ tasks, summaryTasks: tasks })));
        this.currentRequest = tasksRequest
            .pipe(finalize(() => {
            this.loading = false;
        }))
            .subscribe({
            next: ({ tasks, summaryTasks }) => {
                this.tasks = tasks;
                this.summary = this.calculateSummary(summaryTasks);
                this.loading = false;
            },
            error: (error) => {
                console.error('Erreur chargement tâches:', error);
                this.tasks = [];
                this.summary = this.getEmptySummary();
                this.errorMessage = 'Impossible de charger les tâches.';
                this.loading = false;
            }
        });
    }
    changeStatusFilter(status) {
        this.selectedStatus = status;
        this.loadTasks();
    }
    changePriorityFilter(priority) {
        this.selectedPriority = priority;
    }
    clearSearch() {
        this.searchQuery = '';
    }
    changeDateFilter(date) {
        if (!date) {
            return;
        }
        this.selectedDate = date;
        this.loadTasks();
    }
    resetDateFilter() {
        const today = this.getTodayDate();
        if (this.selectedDate === today) {
            return;
        }
        this.selectedDate = today;
        this.loadTasks();
    }
    startTask(taskId) {
        this.tasksService.startTask(taskId).subscribe({
            next: () => {
                this.actionMessage = 'Tâche démarrée avec succès.';
                this.loadTasks();
            },
            error: (error) => {
                console.error('Erreur démarrage tâche:', error);
                this.errorMessage = 'Impossible de démarrer la tâche.';
            }
        });
    }
    completeTask(taskId) {
        this.tasksService.completeTask(taskId).subscribe({
            next: () => {
                this.actionMessage = 'Tâche terminée avec succès.';
                this.loadTasks();
            },
            error: (error) => {
                console.error('Erreur fin tâche:', error);
                this.errorMessage = 'Impossible de terminer la tâche.';
            }
        });
    }
    cancelTask(taskId) {
        if (!this.canCancelTask) {
            this.errorMessage = 'Vous n’êtes pas autorisé à annuler une tâche.';
            return;
        }
        this.tasksService.cancelTask(taskId).subscribe({
            next: () => {
                this.actionMessage = 'Tâche annulée avec succès.';
                this.loadTasks();
            },
            error: (error) => {
                console.error('Erreur annulation tâche:', error);
                this.errorMessage = 'Impossible d’annuler la tâche.';
            }
        });
    }
    getEmptyTaskForm() {
        return {
            itemId: null,
            assignedUserId: null,
            quantity: 1,
            priority: 'NORMALE',
            comment: '',
            taskDate: this.getTodayDate()
        };
    }
    getTodayDate() {
        const today = new Date();
        return new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
            .toISOString()
            .slice(0, 10);
    }
    calculateSummary(tasks) {
        return tasks.reduce((summary, task) => {
            summary.total += 1;
            if (task.status === 'A_FAIRE') {
                summary.todo += 1;
            }
            else if (task.status === 'EN_COURS') {
                summary.inProgress += 1;
            }
            else if (task.status === 'TERMINEE') {
                summary.completed += 1;
            }
            else if (task.status === 'ANNULEE') {
                summary.cancelled += 1;
            }
            return summary;
        }, this.getEmptySummary());
    }
    getEmptySummary() {
        return {
            total: 0,
            todo: 0,
            inProgress: 0,
            completed: 0,
            cancelled: 0
        };
    }
    static ɵfac = function TasksPage_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || TasksPage)(i0.ɵɵdirectiveInject(i1.Tasks), i0.ɵɵdirectiveInject(i2.Items), i0.ɵɵdirectiveInject(i3.Users)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TasksPage, selectors: [["app-tasks"]], decls: 68, vars: 15, consts: [[1, "tasks-page"], [1, "tasks-header"], ["type", "button", 3, "click"], [1, "role-info"], [1, "create-task-form"], ["aria-label", "R\u00E9sum\u00E9 des t\u00E2ches", 1, "tasks-summary"], [1, "summary-card", "summary-total"], [1, "summary-card", "summary-todo"], [1, "summary-card", "summary-progress"], [1, "summary-card", "summary-completed"], [1, "summary-card", "summary-cancelled"], [1, "task-filters"], [1, "filter-group"], ["for", "task-date-filter", 1, "filter-label"], [1, "date-filter"], ["id", "task-date-filter", "type", "date", 3, "ngModelChange", "ngModel"], [1, "filter-label"], [1, "status-filters"], ["type", "button", 3, "active"], [1, "priority-filters"], [1, "task-search"], ["for", "task-search-input"], [1, "search-control"], ["id", "task-search-input", "type", "search", "placeholder", "Item, cat\u00E9gorie, utilisateur ou commentaire", 3, "ngModelChange", "ngModel"], ["type", "button", "aria-label", "Vider la recherche"], [1, "info"], [1, "error"], [1, "success"], [1, "tasks-list"], [1, "create-task-form", 3, "ngSubmit"], [1, "form-heading"], [1, "form-loading"], [1, "form-grid"], ["name", "itemId", "required", "", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["name", "assignedUserId", "required", "", 3, "ngModelChange", "ngModel"], ["name", "quantity", "type", "number", "min", "0.01", "step", "0.01", "required", "", 3, "ngModelChange", "ngModel"], ["name", "priority", "required", "", 3, "ngModelChange", "ngModel"], ["name", "taskDate", "type", "date", "required", "", 3, "ngModelChange", "ngModel"], [1, "comment-field"], ["name", "comment", "rows", "3", "placeholder", "Instructions ou pr\u00E9cisions", 3, "ngModelChange", "ngModel"], [1, "error", "form-message"], [1, "form-actions"], ["type", "submit", 3, "disabled"], ["type", "button", "aria-label", "Vider la recherche", 3, "click"], [1, "task-card"], [1, "task-top"], [1, "status"], [1, "category"], [1, "comment"], [1, "task-actions"], ["type", "button", 1, "start-button"], ["type", "button", 1, "done-button"], ["type", "button", 1, "cancel-button"], ["type", "button", 1, "start-button", 3, "click"], ["type", "button", 1, "done-button", 3, "click"], ["type", "button", 1, "cancel-button", 3, "click"]], template: function TasksPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "h2");
            i0.ɵɵtext(4, "T\u00E2ches du jour");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Liste des pr\u00E9parations \u00E0 suivre en cuisine.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 2);
            i0.ɵɵlistener("click", function TasksPage_Template_button_click_7_listener() { return ctx.loadTasks(); });
            i0.ɵɵtext(8, " Actualiser ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(9, TasksPage_Conditional_9_Template, 2, 0, "p", 3);
            i0.ɵɵconditionalCreate(10, TasksPage_Conditional_10_Template, 41, 14, "form", 4);
            i0.ɵɵelementStart(11, "section", 5)(12, "article", 6)(13, "span");
            i0.ɵɵtext(14, "Total t\u00E2ches");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "strong");
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "article", 7)(18, "span");
            i0.ɵɵtext(19, "\u00C0 faire");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "strong");
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "article", 8)(23, "span");
            i0.ɵɵtext(24, "En cours");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "strong");
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "article", 9)(28, "span");
            i0.ɵɵtext(29, "Termin\u00E9es");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "strong");
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "article", 10)(33, "span");
            i0.ɵɵtext(34, "Annul\u00E9es");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "strong");
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "div", 11)(38, "div", 12)(39, "label", 13);
            i0.ɵɵtext(40, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 14)(42, "input", 15);
            i0.ɵɵlistener("ngModelChange", function TasksPage_Template_input_ngModelChange_42_listener($event) { return ctx.changeDateFilter($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(43, "button", 2);
            i0.ɵɵlistener("click", function TasksPage_Template_button_click_43_listener() { return ctx.resetDateFilter(); });
            i0.ɵɵtext(44, "Aujourd\u2019hui");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(45, "div", 12)(46, "span", 16);
            i0.ɵɵtext(47, "Statut");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 17);
            i0.ɵɵrepeaterCreate(49, TasksPage_For_50_Template, 2, 3, "button", 18, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "div", 12)(52, "span", 16);
            i0.ɵɵtext(53, "Priorit\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 19);
            i0.ɵɵrepeaterCreate(55, TasksPage_For_56_Template, 2, 3, "button", 18, _forTrack0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(57, "div", 20)(58, "label", 21);
            i0.ɵɵtext(59, "Rechercher une t\u00E2che");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 22)(61, "input", 23);
            i0.ɵɵtwoWayListener("ngModelChange", function TasksPage_Template_input_ngModelChange_61_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(62, TasksPage_Conditional_62_Template, 2, 0, "button", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(63, TasksPage_Conditional_63_Template, 2, 0, "p", 25);
            i0.ɵɵconditionalCreate(64, TasksPage_Conditional_64_Template, 2, 1, "p", 26);
            i0.ɵɵconditionalCreate(65, TasksPage_Conditional_65_Template, 2, 1, "p", 27);
            i0.ɵɵconditionalCreate(66, TasksPage_Conditional_66_Template, 2, 1, "p", 25);
            i0.ɵɵconditionalCreate(67, TasksPage_Conditional_67_Template, 3, 0, "div", 28);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.isCommis ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.canCreateTask ? 10 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.summary.total);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary.todo);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary.inProgress);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary.completed);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary.cancelled);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngModel", ctx.selectedDate);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.statusFilters);
            i0.ɵɵadvance(6);
            i0.ɵɵrepeater(ctx.priorityFilters);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.searchQuery ? 62 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading && ctx.tasks.length === 0 ? 63 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 64 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.actionMessage ? 65 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.loading && ctx.filteredTasks.length === 0 && !ctx.errorMessage ? 66 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.filteredTasks.length > 0 ? 67 : -1);
        } }, dependencies: [FormsModule, i4.ɵNgNoValidate, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i4.NumberValueAccessor, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.RequiredValidator, i4.MinValidator, i4.NgModel, i4.NgForm], styles: [".tasks-page[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  width: 100%;\n  padding: 24px;\n  box-sizing: border-box;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 16px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);\n}\n\n.tasks-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.tasks-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1f2937;\n  font-size: 26px;\n}\n\n.tasks-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #6b7280;\n}\n\n.tasks-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: none;\n  border-radius: 8px;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n  font-weight: 600;\n  transition: background 0.2s ease;\n}\n\n.tasks-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n\n.create-task-form[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding: 20px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n}\n\n.role-info[_ngcontent-%COMP%] {\n  margin: 0 0 24px;\n  padding: 12px 14px;\n  border: 1px solid #bfdbfe;\n  border-radius: 10px;\n  background: #eff6ff;\n  color: #1e40af;\n  font-size: 14px;\n}\n\n.form-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 18px;\n}\n\n.form-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1f2937;\n}\n\n.form-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  color: #6b7280;\n  font-size: 14px;\n}\n\n.form-loading[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 14px;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  color: #374151;\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.form-grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-grid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-grid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 11px;\n  box-sizing: border-box;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: white;\n  color: #1f2937;\n  font: inherit;\n}\n\n.form-grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-grid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-grid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  outline: 2px solid #dbeafe;\n}\n\n.comment-field[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n\n.form-message[_ngcontent-%COMP%] {\n  margin: 14px 0 0;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border: none;\n  border-radius: 8px;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n  font-weight: 600;\n}\n\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n\n.tasks-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 12px;\n  margin-bottom: 22px;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  min-width: 0;\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-top: 4px solid #64748b;\n  border-radius: 10px;\n  background: #ffffff;\n}\n\n.summary-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.summary-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-size: 28px;\n  line-height: 1;\n}\n\n.summary-todo[_ngcontent-%COMP%] {\n  border-top-color: #6366f1;\n}\n\n.summary-progress[_ngcontent-%COMP%] {\n  border-top-color: #f59e0b;\n}\n\n.summary-completed[_ngcontent-%COMP%] {\n  border-top-color: #16a34a;\n}\n\n.summary-cancelled[_ngcontent-%COMP%] {\n  border-top-color: #dc2626;\n}\n\n.tasks-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.task-card[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 14px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);\n}\n\n.task-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: center;\n}\n\n.task-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n}\n\n.status[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 999px;\n  background: #e0e7ff;\n  color: #3730a3;\n  font-size: 13px;\n  font-weight: bold;\n}\n\n.category[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin-top: 6px;\n}\n\n.comment[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  color: #374151;\n  font-style: italic;\n}\n\n.info[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n\n.error[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: bold;\n}\n.success[_ngcontent-%COMP%] {\n  color: #16a34a;\n  font-weight: bold;\n}\n\n.task-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n  flex-wrap: wrap;\n}\n\n.task-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  cursor: pointer;\n  font-weight: bold;\n}\n\n.start-button[_ngcontent-%COMP%] {\n  background: #2563eb;\n}\n\n.done-button[_ngcontent-%COMP%] {\n  background: #16a34a;\n}\n\n.cancel-button[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n\n.status.done[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.status.cancelled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.task-filters[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  margin-bottom: 20px;\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  background: #f8fafc;\n}\n\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n\n.filter-label[_ngcontent-%COMP%] {\n  width: 58px;\n  flex: 0 0 58px;\n  color: #475569;\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.status-filters[_ngcontent-%COMP%], \n.priority-filters[_ngcontent-%COMP%], \n.date-filter[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.status-filters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.priority-filters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.date-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 999px;\n  background: white;\n  color: #374151;\n  cursor: pointer;\n  font-weight: 600;\n  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;\n}\n\n.status-filters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.priority-filters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.date-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #2563eb;\n  color: #1d4ed8;\n}\n\n.date-filter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 7px 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: white;\n  color: #374151;\n  font: inherit;\n}\n\n.date-filter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  outline: 2px solid #dbeafe;\n}\n\n.status-filters[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%], \n.priority-filters[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: white;\n  border-color: #2563eb;\n}\n\n.status.in-progress[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n\n.task-search[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.task-search[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 7px;\n  color: #475569;\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.search-control[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n\n.search-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  color: #1f2937;\n  font: inherit;\n}\n\n.search-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  outline: 2px solid #dbeafe;\n}\n\n.search-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: white;\n  color: #374151;\n  cursor: pointer;\n  font-weight: 600;\n}\n\n.search-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #2563eb;\n  color: #1d4ed8;\n}\n\n@media (max-width: 760px) {\n  .tasks-page[_ngcontent-%COMP%] {\n    margin-top: 12px;\n    padding: 18px;\n  }\n\n  .tasks-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n\n  .tasks-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .tasks-summary[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 480px) {\n  .tasks-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .tasks-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .comment-field[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n\n  .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .tasks-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .filter-group[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 8px;\n  }\n\n  .filter-label[_ngcontent-%COMP%] {\n    width: auto;\n    flex-basis: auto;\n  }\n\n  .search-control[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TasksPage, [{
        type: Component,
        args: [{ selector: 'app-tasks', imports: [FormsModule], template: "<section class=\"tasks-page\">\n  <div class=\"tasks-header\">\n    <div>\n      <h2>T\u00E2ches du jour</h2>\n      <p>Liste des pr\u00E9parations \u00E0 suivre en cuisine.</p>\n    </div>\n\n    <button type=\"button\" (click)=\"loadTasks()\">\n      Actualiser\n    </button>\n  </div>\n\n  @if (isCommis) {\n    <p class=\"role-info\">\n      Vous pouvez consulter et mettre \u00E0 jour vos t\u00E2ches, mais la cr\u00E9ation est r\u00E9serv\u00E9e au chef.\n    </p>\n  }\n\n  @if (canCreateTask) {\n  <form class=\"create-task-form\" (ngSubmit)=\"createTask()\">\n    <div class=\"form-heading\">\n      <div>\n        <h3>Nouvelle t\u00E2che</h3>\n        <p>Ajoutez une pr\u00E9paration \u00E0 la liste des t\u00E2ches.</p>\n      </div>\n\n      @if (optionsLoading) {\n        <span class=\"form-loading\">Chargement des options...</span>\n      }\n    </div>\n\n    <div class=\"form-grid\">\n      <label>\n        Item\n        <select name=\"itemId\" [(ngModel)]=\"newTask.itemId\" required>\n          <option [ngValue]=\"null\" disabled>\n            {{ optionsLoading\n              ? 'Chargement des items...'\n              : items.length > 0\n                ? 'S\u00E9lectionner un item'\n                : 'Aucun item disponible' }}\n          </option>\n          @for (item of items; track item.id) {\n            <option [ngValue]=\"item.id\">{{ item.name }} ({{ item.unit }})</option>\n          }\n        </select>\n      </label>\n\n      <label>\n        Utilisateur assign\u00E9\n        <select name=\"assignedUserId\" [(ngModel)]=\"newTask.assignedUserId\" required>\n          <option [ngValue]=\"null\" disabled>\n            {{ optionsLoading\n              ? 'Chargement des utilisateurs...'\n              : users.length > 0\n                ? 'S\u00E9lectionner un utilisateur'\n                : 'Aucun utilisateur actif disponible' }}\n          </option>\n          @for (user of users; track user.id) {\n            <option [ngValue]=\"user.id\">{{ user.name }} \u2014 {{ user.role }}</option>\n          }\n        </select>\n      </label>\n\n      <label>\n        Quantit\u00E9\n        <input\n          name=\"quantity\"\n          type=\"number\"\n          min=\"0.01\"\n          step=\"0.01\"\n          [(ngModel)]=\"newTask.quantity\"\n          required\n        />\n      </label>\n\n      <label>\n        Priorit\u00E9\n        <select name=\"priority\" [(ngModel)]=\"newTask.priority\" required>\n          @for (priority of priorities; track priority.value) {\n            <option [ngValue]=\"priority.value\">{{ priority.label }}</option>\n          }\n        </select>\n      </label>\n\n      <label>\n        Date\n        <input name=\"taskDate\" type=\"date\" [(ngModel)]=\"newTask.taskDate\" required />\n      </label>\n\n      <label class=\"comment-field\">\n        Commentaire\n        <textarea\n          name=\"comment\"\n          rows=\"3\"\n          [(ngModel)]=\"newTask.comment\"\n          placeholder=\"Instructions ou pr\u00E9cisions\"\n        ></textarea>\n      </label>\n    </div>\n\n    @if (formErrorMessage) {\n      <p class=\"error form-message\">{{ formErrorMessage }}</p>\n    }\n\n    <div class=\"form-actions\">\n      <button\n        type=\"submit\"\n        [disabled]=\"creatingTask || optionsLoading || items.length === 0 || users.length === 0\"\n      >\n        {{ creatingTask ? 'Cr\u00E9ation...' : 'Cr\u00E9er la t\u00E2che' }}\n      </button>\n    </div>\n  </form>\n  }\n\n  <section class=\"tasks-summary\" aria-label=\"R\u00E9sum\u00E9 des t\u00E2ches\">\n    <article class=\"summary-card summary-total\">\n      <span>Total t\u00E2ches</span>\n      <strong>{{ summary.total }}</strong>\n    </article>\n\n    <article class=\"summary-card summary-todo\">\n      <span>\u00C0 faire</span>\n      <strong>{{ summary.todo }}</strong>\n    </article>\n\n    <article class=\"summary-card summary-progress\">\n      <span>En cours</span>\n      <strong>{{ summary.inProgress }}</strong>\n    </article>\n\n    <article class=\"summary-card summary-completed\">\n      <span>Termin\u00E9es</span>\n      <strong>{{ summary.completed }}</strong>\n    </article>\n\n    <article class=\"summary-card summary-cancelled\">\n      <span>Annul\u00E9es</span>\n      <strong>{{ summary.cancelled }}</strong>\n    </article>\n  </section>\n\n  <div class=\"task-filters\">\n    <div class=\"filter-group\">\n      <label class=\"filter-label\" for=\"task-date-filter\">Date</label>\n      <div class=\"date-filter\">\n        <input\n          id=\"task-date-filter\"\n          type=\"date\"\n          [ngModel]=\"selectedDate\"\n          (ngModelChange)=\"changeDateFilter($event)\"\n        />\n        <button type=\"button\" (click)=\"resetDateFilter()\">Aujourd\u2019hui</button>\n      </div>\n    </div>\n\n    <div class=\"filter-group\">\n      <span class=\"filter-label\">Statut</span>\n      <div class=\"status-filters\">\n        @for (filter of statusFilters; track filter.value) {\n          <button\n            type=\"button\"\n            [class.active]=\"selectedStatus === filter.value\"\n            (click)=\"changeStatusFilter(filter.value)\"\n          >\n            {{ filter.label }}\n          </button>\n        }\n      </div>\n    </div>\n\n    <div class=\"filter-group\">\n      <span class=\"filter-label\">Priorit\u00E9</span>\n      <div class=\"priority-filters\">\n        @for (filter of priorityFilters; track filter.value) {\n          <button\n            type=\"button\"\n            [class.active]=\"selectedPriority === filter.value\"\n            (click)=\"changePriorityFilter(filter.value)\"\n          >\n            {{ filter.label }}\n          </button>\n        }\n      </div>\n    </div>\n  </div>\n\n  <div class=\"task-search\">\n    <label for=\"task-search-input\">Rechercher une t\u00E2che</label>\n    <div class=\"search-control\">\n      <input\n        id=\"task-search-input\"\n        type=\"search\"\n        [(ngModel)]=\"searchQuery\"\n        placeholder=\"Item, cat\u00E9gorie, utilisateur ou commentaire\"\n      />\n      @if (searchQuery) {\n        <button type=\"button\" (click)=\"clearSearch()\" aria-label=\"Vider la recherche\">\n          Effacer\n        </button>\n      }\n    </div>\n  </div>\n\n  @if (loading && tasks.length === 0) {\n    <p class=\"info\">Chargement des t\u00E2ches...</p>\n  }\n\n  @if (errorMessage) {\n    <p class=\"error\">{{ errorMessage }}</p>\n  }\n\n  @if (actionMessage) {\n    <p class=\"success\">{{ actionMessage }}</p>\n  }\n\n  @if (!loading && filteredTasks.length === 0 && !errorMessage) {\n    <p class=\"info\">{{ emptyTasksMessage }}</p>\n  }\n\n  @if (filteredTasks.length > 0) {\n    <div class=\"tasks-list\">\n      @for (task of filteredTasks; track task.id) {\n        <article class=\"task-card\">\n          <div class=\"task-top\">\n            <h3>{{ task.itemName }}</h3>\n\n            <span\n              class=\"status\"\n              [class.done]=\"task.status === 'TERMINEE'\"\n              [class.cancelled]=\"task.status === 'ANNULEE'\"\n              [class.in-progress]=\"task.status === 'EN_COURS'\"\n            >\n              {{ task.status }}\n            </span>\n          </div>\n\n          <p class=\"category\">{{ task.categoryName }}</p>\n\n          <p>\n            Quantit\u00E9 :\n            <strong>{{ task.quantity }} {{ task.unit }}</strong>\n          </p>\n\n          <p>\n            Priorit\u00E9 :\n            <strong>{{ task.priority }}</strong>\n          </p>\n\n          <p>\n            Assign\u00E9 \u00E0 :\n            <strong>{{ task.assignedUserName || 'Non assign\u00E9' }}</strong>\n          </p>\n\n          <p class=\"comment\">\n            {{ task.comment }}\n          </p>\n\n          <div class=\"task-actions\">\n            @if (task.status === 'A_FAIRE') {\n              <button type=\"button\" class=\"start-button\" (click)=\"startTask(task.id)\">\n                D\u00E9marrer\n              </button>\n            }\n\n            @if (task.status === 'EN_COURS') {\n              <button type=\"button\" class=\"done-button\" (click)=\"completeTask(task.id)\">\n                Terminer\n              </button>\n            }\n\n            @if (canCancelTask && task.status !== 'TERMINEE' && task.status !== 'ANNULEE') {\n              <button type=\"button\" class=\"cancel-button\" (click)=\"cancelTask(task.id)\">\n                Annuler\n              </button>\n            }\n          </div>\n        </article>\n      }\n    </div>\n  }\n</section>\n", styles: [".tasks-page {\n  margin-top: 18px;\n  width: 100%;\n  padding: 24px;\n  box-sizing: border-box;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 16px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);\n}\n\n.tasks-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.tasks-header h2 {\n  margin: 0;\n  color: #1f2937;\n  font-size: 26px;\n}\n\n.tasks-header p {\n  margin: 6px 0 0;\n  color: #6b7280;\n}\n\n.tasks-header button {\n  padding: 10px 16px;\n  border: none;\n  border-radius: 8px;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n  font-weight: 600;\n  transition: background 0.2s ease;\n}\n\n.tasks-header button:hover {\n  background: #1d4ed8;\n}\n\n.create-task-form {\n  margin-bottom: 24px;\n  padding: 20px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n}\n\n.role-info {\n  margin: 0 0 24px;\n  padding: 12px 14px;\n  border: 1px solid #bfdbfe;\n  border-radius: 10px;\n  background: #eff6ff;\n  color: #1e40af;\n  font-size: 14px;\n}\n\n.form-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 18px;\n}\n\n.form-heading h3 {\n  margin: 0;\n  color: #1f2937;\n}\n\n.form-heading p {\n  margin: 5px 0 0;\n  color: #6b7280;\n  font-size: 14px;\n}\n\n.form-loading {\n  color: #6b7280;\n  font-size: 14px;\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.form-grid label {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  color: #374151;\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.form-grid input,\n.form-grid select,\n.form-grid textarea {\n  width: 100%;\n  padding: 10px 11px;\n  box-sizing: border-box;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: white;\n  color: #1f2937;\n  font: inherit;\n}\n\n.form-grid input:focus,\n.form-grid select:focus,\n.form-grid textarea:focus {\n  border-color: #2563eb;\n  outline: 2px solid #dbeafe;\n}\n\n.comment-field {\n  grid-column: span 2;\n}\n\n.form-message {\n  margin: 14px 0 0;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n\n.form-actions button {\n  padding: 10px 18px;\n  border: none;\n  border-radius: 8px;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n  font-weight: 600;\n}\n\n.form-actions button:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n\n.form-actions button:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n\n.tasks-summary {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 12px;\n  margin-bottom: 22px;\n}\n\n.summary-card {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  min-width: 0;\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-top: 4px solid #64748b;\n  border-radius: 10px;\n  background: #ffffff;\n}\n\n.summary-card span {\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.summary-card strong {\n  color: #1f2937;\n  font-size: 28px;\n  line-height: 1;\n}\n\n.summary-todo {\n  border-top-color: #6366f1;\n}\n\n.summary-progress {\n  border-top-color: #f59e0b;\n}\n\n.summary-completed {\n  border-top-color: #16a34a;\n}\n\n.summary-cancelled {\n  border-top-color: #dc2626;\n}\n\n.tasks-list {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.task-card {\n  padding: 18px;\n  border-radius: 14px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);\n}\n\n.task-top {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: center;\n}\n\n.task-card h3 {\n  margin: 0;\n  color: #111827;\n}\n\n.status {\n  padding: 5px 10px;\n  border-radius: 999px;\n  background: #e0e7ff;\n  color: #3730a3;\n  font-size: 13px;\n  font-weight: bold;\n}\n\n.category {\n  color: #6b7280;\n  margin-top: 6px;\n}\n\n.comment {\n  margin-top: 12px;\n  color: #374151;\n  font-style: italic;\n}\n\n.info {\n  color: #6b7280;\n}\n\n.error {\n  color: #dc2626;\n  font-weight: bold;\n}\n.success {\n  color: #16a34a;\n  font-weight: bold;\n}\n\n.task-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n  flex-wrap: wrap;\n}\n\n.task-actions button {\n  padding: 8px 12px;\n  border: none;\n  border-radius: 8px;\n  color: white;\n  cursor: pointer;\n  font-weight: bold;\n}\n\n.start-button {\n  background: #2563eb;\n}\n\n.done-button {\n  background: #16a34a;\n}\n\n.cancel-button {\n  background: #dc2626;\n}\n\n.status.done {\n  background: #dcfce7;\n  color: #166534;\n}\n.status.cancelled {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.task-filters {\n  display: grid;\n  gap: 14px;\n  margin-bottom: 20px;\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  background: #f8fafc;\n}\n\n.filter-group {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n\n.filter-label {\n  width: 58px;\n  flex: 0 0 58px;\n  color: #475569;\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.status-filters,\n.priority-filters,\n.date-filter {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.status-filters button,\n.priority-filters button,\n.date-filter button {\n  padding: 8px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 999px;\n  background: white;\n  color: #374151;\n  cursor: pointer;\n  font-weight: 600;\n  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;\n}\n\n.status-filters button:hover,\n.priority-filters button:hover,\n.date-filter button:hover {\n  border-color: #2563eb;\n  color: #1d4ed8;\n}\n\n.date-filter input {\n  padding: 7px 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: white;\n  color: #374151;\n  font: inherit;\n}\n\n.date-filter input:focus {\n  border-color: #2563eb;\n  outline: 2px solid #dbeafe;\n}\n\n.status-filters button.active,\n.priority-filters button.active {\n  background: #2563eb;\n  color: white;\n  border-color: #2563eb;\n}\n\n.status.in-progress {\n  background: #fef3c7;\n  color: #92400e;\n}\n\n.task-search {\n  margin-bottom: 20px;\n}\n\n.task-search label {\n  display: block;\n  margin-bottom: 7px;\n  color: #475569;\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.search-control {\n  display: flex;\n  gap: 10px;\n}\n\n.search-control input {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  color: #1f2937;\n  font: inherit;\n}\n\n.search-control input:focus {\n  border-color: #2563eb;\n  outline: 2px solid #dbeafe;\n}\n\n.search-control button {\n  padding: 10px 14px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: white;\n  color: #374151;\n  cursor: pointer;\n  font-weight: 600;\n}\n\n.search-control button:hover {\n  border-color: #2563eb;\n  color: #1d4ed8;\n}\n\n@media (max-width: 760px) {\n  .tasks-page {\n    margin-top: 12px;\n    padding: 18px;\n  }\n\n  .tasks-header {\n    align-items: flex-start;\n  }\n\n  .tasks-list {\n    grid-template-columns: 1fr;\n  }\n\n  .form-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .tasks-summary {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 480px) {\n  .tasks-header {\n    flex-direction: column;\n  }\n\n  .tasks-header button {\n    width: 100%;\n  }\n\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .comment-field {\n    grid-column: auto;\n  }\n\n  .form-actions button {\n    width: 100%;\n  }\n\n  .tasks-summary {\n    grid-template-columns: 1fr;\n  }\n\n  .filter-group {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 8px;\n  }\n\n  .filter-label {\n    width: auto;\n    flex-basis: auto;\n  }\n\n  .search-control {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n"] }]
    }], () => [{ type: i1.Tasks }, { type: i2.Items }, { type: i3.Users }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TasksPage, { className: "TasksPage", filePath: "src/app/pages/tasks/tasks.ts", lineNumber: 22 }); })();
