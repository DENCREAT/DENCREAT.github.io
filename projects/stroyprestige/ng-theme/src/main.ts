import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';

import { bootstrap } from 'angular2/platform/browser';
import { WpAppComponent } from './components/wpapp.component.ts';
import 'rxjs/Rx'
bootstrap(WpAppComponent, []);