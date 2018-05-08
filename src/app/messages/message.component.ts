import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Message } from './message.model'
import { MessageService } from "./message.service";


@Component({
    selector :'app-message',
    templateUrl: './message.component.html',
    styleUrls:['./message.component.css'],
})
export class MessageComponent{
   @Input() message:Message;
  // @Output() editClicked = new EventEmitter<string>();

constructor(private messageService:MessageService){

}
onEdit(){
  this.messageService.editMessage(this.message);
}

  onDelete(){
    this.messageService.deleteMessage(this.message)
    .subscribe(
    result =>console.log(result));
  }
  belongsToUser(){
    return localStorage.getItem('userId')==this.message.userId;
  }
  
}