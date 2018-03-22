import { Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { GreenComponent } from './green/green.component';
import { RedComponent } from './red/red.component';

export const DashboardRoutes: Routes = [{
    path: '',
    children: [{
        path: 'overview',
        component: OverviewComponent
    }, {
        path: 'green',
        component: GreenComponent
    }, {
        path: 'red',
        component: RedComponent
    }
    ]
}];
