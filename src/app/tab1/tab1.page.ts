import {Component, OnInit} from '@angular/core';
import { SocketServiceService } from '../services/socket-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

// export interface User {
//   id: number;
//   username: string;
//   password: string;
//   socket_id: string;
//   online: boolean;
//   avatar: string;
// };

export class Tab1Page implements OnInit {

  public onlineUsers = [];
  // public user: User;
  public userId: any;


  constructor(
    private socketService: SocketServiceService,
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private router: Router,
    ) {}

  ngOnInit() {
    console.log('init tab');
    this.userId = this.userService.getId();
    // console.log('init tab', this.user);

    // if(this.user){
    //   this.user.id = parseInt(this.user.id, 10);
    // }

    console.log('user id in tab', this.userId);
    this.socketService.getOnlineUsers().subscribe((users) => {
      console.log('users connected', users);
      if(users) {
        this.onlineUsers = users;
      }
    });
  }

  async navigateToChat(id,socketIo) {
    console.log(socketIo)
    await this.router.navigate(['/home/tab2'],{queryParams:{userId:id,socketIo:socketIo}});
  }

  hola(){
    console.log('hola');
  }
}
