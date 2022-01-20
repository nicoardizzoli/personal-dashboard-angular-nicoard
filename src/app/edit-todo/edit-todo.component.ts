import { Todo } from './../shared/todo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from './../shared/todo.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  showValidationMessage : boolean = false;
  todo!: Todo ;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idTodo = params['id'];
      this.todo = this.todoService.getTodo(idTodo)!;
    })
  }

  onSubmitForm(form: NgForm){
    let text = form.control.get('text');
    if (text?.valid) {
      this.todoService.updateTodo(this.todo.id, form.value);
      this.router.navigateByUrl('todos')
    } else {
      this.showValidationMessage = true;
    }

  }

}
