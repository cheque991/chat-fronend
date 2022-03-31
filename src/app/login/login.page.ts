import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SocketServiceService } from '../services/socket-service.service';
import { UserService } from '../services/user.service';
import { GeneralService } from '../services/general.service';
import {UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string;
  public password: string;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private socketService: SocketServiceService,
    public generalService: GeneralService,
    private userService: UserService,
    private usrService: UserServiceService
  ) { }


  ngOnInit() {
  }

  redirect(url) {
    this.router.navigateByUrl(url);
  }

  async signIn(){
    console.log(this.email, this.password);

    if(this.email && this.password ) {
      const user = {
          email: this.email,
          password: this.password
      };

      console.log(user);
      const query: any = await this.userService.login(user);
      console.log(query);
      if(query && query.ok){
        localStorage.setItem(this.usrService.JWToken, 'token123123123jsjdfsdfskdjflskdjf');
        localStorage.setItem('userId', query.user.id);
        this.socketService.login(query.user);
        await this.router.navigate(['/home/tab1'], { queryParams: query.user });
        //this.redirect('/home/tab1');
      } else {
        await this.generalService.presentAlert('Error', '', 'User not found');
      }

    } else {
      await this.generalService.presentAlert('Error', '', 'User not found');
    }
  }
}
