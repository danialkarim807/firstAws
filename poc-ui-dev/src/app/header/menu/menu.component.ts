import { Component, OnInit } from '@angular/core';

import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

  toggleSideNavbar() {
    this.sidenavService.open(); //.sidenavToggleClicked('click');
  }
}
