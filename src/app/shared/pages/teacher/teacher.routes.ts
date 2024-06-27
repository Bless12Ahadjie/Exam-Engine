import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AnalyticsComponent } from "./components/analytics/analytics.component";

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
];