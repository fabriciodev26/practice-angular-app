import { Component, OnInit, computed, effect, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IFilterType, ITodo } from './todo.model';

@Component({
  selector: 'todoList',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  constructor() {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this.todolist()));
    });
  }

  ngOnInit(): void {
    const store = localStorage.getItem('todos');
    if (store) {
      this.todolist.set(JSON.parse(store));
    }
  }
  todolist = signal<ITodo[]>([]);

  filter = signal<IFilterType>('All');

  changeFilter(selectedFilter: IFilterType) {
    this.filter.set(selectedFilter);
  }

  todoListFiltered = computed(() => {
    const currentFilter = this.filter();
    const allTodos = this.todolist();

    switch (currentFilter) {
      case 'Completed':
        return allTodos.filter((todo) => todo.completed);
      case 'No Completed':
        return allTodos.filter((todo) => !todo.completed);
      default:
        return allTodos;
    }
  });

  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  toggleTodo(todoId: string) {
    return this.todolist.update((prev) => {
      return prev.map((todo) => {
        return todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      const newTitle = (this.todoForm.value.title as string).trim();
      const newDescription = (this.todoForm.value.description as string).trim();
      if (newTitle !== '' && newDescription !== '') {
        this.todolist.update((prev) => {
          return [
            ...prev,
            {
              id: crypto.randomUUID(),
              title: newTitle,
              description: newDescription,
              completed: false,
            },
          ];
        });
      }
      this.todoForm.reset();
    } else {
      this.todoForm.reset();
    }
  }

  removeTodo(todoId: string) {
    this.todolist.update((prev) => prev.filter((todo) => todo.id !== todoId));
  }

  updateTodo(todoId: string) {
    return this.todolist.update((prev) =>
      prev.map((todo) => {
        return todo.id === todoId
          ? { ...todo, editing: true }
          : { ...todo, editing: false };
      })
    );
  }

  saveEditing(todoId: string) {
    const editingTitle = (
      document.getElementById('titleId') as HTMLInputElement
    ).value;
    const editingDescription = (
      document.getElementById('descriptionId') as HTMLInputElement
    ).value;

    return this.todolist.update((prev) =>
      prev.map((todo) => {
        return todo.id === todoId
          ? {
              ...todo,
              title: editingTitle,
              description: editingDescription,
              editing: false,
            }
          : todo;
      })
    );
  }
}
