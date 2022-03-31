import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GeneralService } from '../services/general.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public user = {
    user: '',
    password: '',
    email: ''
  };
  constructor(private userService: UserService, public generalService: GeneralService, private router: Router,) { }

  ngOnInit() {
  }

  redirect(url) {
    this.router.navigateByUrl(url);
  }

  public async registerUser() {
    const query: any = await this.userService.createUser(this.user);
    console.log(query);
    if(query && query.ok) {
      const alert = await this.generalService.presentAlert('Success', '', 'User created successfully');
      this.redirect('/');
    } else {
      await this.generalService.presentAlert('Error', '', 'User not created');
    }
  }

}
