import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {UserService} from "../services/user.service";
import  {SocketServiceService} from "../services/socket-service.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public messageList = [];
  public chatMessage: string = '';
  public myUserId: any;
  public selectedUserId: any;
  public conversationUuid: string;
  public socketSelectedUser: any;

  constructor(private socketService: SocketServiceService,private service: UserService,public router: Router, private route: ActivatedRoute) {
  }
  async ngOnInit(){

      console.log('init tab');
      console.log('Waiting for new incoming messages...');

      this.socketService.newMessageReceived().subscribe((chatMessages)=>{this.messageList = chatMessages;});
      const user = this.route.snapshot.queryParams;
      if (user && user.userId){
        this.selectedUserId = user.userId;
        this.myUserId = this.service.getId();

        const payload = {
          sender: this.myUserId,
          receiver: this.selectedUserId
        };

        const query: any = await this.service.loadConversation(payload);
        console.log(query);
        if(query){
          this.conversationUuid = query.uuid;
          this.messageList = query.data;
        }
      }
      console.log('init tab', user);
  }



  async sendMessage() {
    console.log(this.chatMessage);
    const payload = {
    user_id: this.myUserId,
    conversation_uuid: this.conversationUuid,
    msg: this.chatMessage
    };
    const query: any = await this.service.saveMessage(payload);
    if (query){
      this.messageList.push(query.data);
    }
    console.log(query);
    this.chatMessage = '';

    const userSelectedData = this.route.snapshot.queryParams;

    const payloadToSocket = {
      uuid: this.conversationUuid,
      userSocketId: userSelectedData.socketIo
    };

    this.socketService.messageSent(payloadToSocket);

    return true;
  }

}
