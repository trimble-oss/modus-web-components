import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-navbar-examples',
  templateUrl: './modus-navbar-examples.component.html',
  styleUrls: ['./modus-navbar-examples.component.scss'],
})
export class ModusNavbarExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  avatarUrl = `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e738c17-7f3c-422e-8225-f8c782b08626/d9pordj-43d4aa59-54b0-46a1-a568-e36dd691cf27.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBlNzM4YzE3LTdmM2MtNDIyZS04MjI1LWY4Yzc4MmIwODYyNlwvZDlwb3Jkai00M2Q0YWE1OS01NGIwLTQ2YTEtYTU2OC1lMzZkZDY5MWNmMjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xvDk9KFIUAx0yAG3BPamDfRqmWUX6zwR4WVW40GjsoY`;

  apps = [
    {
      description: 'The One Trimble Design System',
      logoUrl: 'https://modus.trimble.com/favicon.svg',
      name: 'Trimble Modus',
      url: 'https://modus.trimble.com/',
    },
  ];

  logoOptions = {
    primary: {
      url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
      height: 24,
    },
    secondary: { url: 'https://modus.trimble.com/favicon.svg', height: 24 },
  };

  profileMenuOptions = {
    avatarUrl: 'https://avatar.example.com/broken-image-link.png',
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  };

  buttons = [
    { id: 'addMenu', icon: 'add' },
    { id: 'notificationMenu', icon: 'notifications' },
  ];
}
