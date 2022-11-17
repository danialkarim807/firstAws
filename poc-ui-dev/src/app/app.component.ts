import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';

import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Equanimity-App';
  @ViewChild('sidenav') sidenav: MatSidenav;
  credentials: {};
  constructor(private router: Router, private sidenavService: SidenavService) {
    // this.router.navigate(['/patients']);
  }

  ngOnInit(): void {}

  navToPatientList() {
    this.router.navigate(['/patients']);
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
