import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  public message$: BehaviorSubject<any> = new BehaviorSubject('');
  public onlineUsers$: BehaviorSubject<any> = new BehaviorSubject('');

  socket = io(environment.url, {});

  constructor() { }

  public login(user) {
    this.socket.emit('login', user);
  }

  public getOnlineUsers() {
    this.socket.on('new-user-online', (users) => {
      this.onlineUsers$.next(users);
    });
    return this.onlineUsers$.asObservable();
  }

  public getNewMessage = () => {
    this.socket.on('new-user-online', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public messageSent(payload){
    this.socket.emit('messageSent',payload);
  }

  public newMessageReceived(){
    this.socket.on('msg-received',(messages)=>this.message$.next(messages));
    return this.message$.asObservable();
  }


}
