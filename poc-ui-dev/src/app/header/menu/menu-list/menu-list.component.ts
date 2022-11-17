import { Component, OnInit, Input } from '@angular/core';
import { userInfo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  noImgUrl: 'noUserImgUrl';
  @Input() user: userInfo;
  // user = {
  //   imageUrl:
  //     'https://media-exp1.licdn.com/dms/image/C5603AQH1oCZ1hrb0Ug/profile-displayphoto-shrink_200_200/0/1517047111403?e=1666828800&v=beta&t=qsQ2_RekW8cRXxO3X6BJz0Lsakd5YmByAHbul-Gy3EE',
  //   name: 'Lior Aviel',
  // };
  menuItems = [
    { name: 'dashboard', imgUrl: '', link: 'dashboard' },
    { name: 'Patient List', imgUrl: '', link: 'patients' },
    { name: 'Quesstionnaires', imgUrl: '', link: 'questionnaire-list' },
    { name: 'Sessions', imgUrl: '', link: 'sessions' },
    { name: 'Settings', imgUrl: '', link: 'settings' },
    { name: 'Constact Us', imgUrl: '', link: 'contact-us' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.user = this.userService.getUserData();
    this.userService.userDataChanged.subscribe((value) => {
      this.user = value;
      console.log(this.user);
    });
  }
}
