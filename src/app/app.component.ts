import { Component } from '@angular/core';
// @ts-ignore
import hymnsData from '../assets/hymns.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = hymnsData['1'].title;
}
