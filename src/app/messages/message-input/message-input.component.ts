import { Component, OnInit } from "@angular/core";

import { MessageService } from "../message.service";
import { Message } from "../message.model";
import { NgForm } from "@angular/forms";

@Component({
    selector:'app-message-input',
    templateUrl:'./message-input.component.html',
  
})
export class MessageInputComponent implements OnInit{

    message : Message;
    constructor(private messageService : MessageService){}

    onSubmit(form: NgForm){

        if(this.message){
            // If the message is not null then update without creating new one
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message).subscribe(
                result => console.log(result)
            );
            this.message=null;
        }
        else{
            // if the message is null then create new one
            const message = new Message(form.value.content, 'chandu');
            this.messageService.addMessage(message)
            .subscribe(
            data => console.log(data),
            error => console.error(error)

        );
        }

        form.resetForm();

    }
    onClear(form : NgForm){
        this.message=null;
        form.resetForm();
    }
    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message:Message) => this.message=message
        );
    }
}