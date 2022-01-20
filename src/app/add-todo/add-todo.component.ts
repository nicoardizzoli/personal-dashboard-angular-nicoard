import { NotificationService } from './../shared/notification.service';
import { Router } from '@angular/router';
import { TodoService } from './../shared/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  showValidationMessage : boolean = false;

  constructor(private todoService: TodoService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onSubmitForm(form : NgForm) {

    let text = form.control.get("textField");
    if (text?.valid) {
      this.todoService.addTodo(this.todoService.createTodo(text.value));
      this.router.navigateByUrl("/todos");
      this.notificationService.show('Todo Added');
    } else {
      this.showValidationMessage = true;
    }




  }

}
