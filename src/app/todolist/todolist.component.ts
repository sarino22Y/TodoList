import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [{ taskName: 'Brush teeth', isCompleted: false, isEditable: false }];

  constructor() { }

  ngOnInit(): void {
    this.getFromLocaStorage();    
  }
  
  saveOnLocalStorage() {
    let stringJson = JSON.stringify(this.taskArray);
    localStorage.setItem("todoLists", stringJson);
  }

  getFromLocaStorage() {
    let itemsJSONString = localStorage.getItem("todoLists");
    if (itemsJSONString != null) {
      this.taskArray = JSON.parse(itemsJSONString)
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false
    })

    this.saveOnLocalStorage();

    form.reset();
  }

  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);

    this.saveOnLocalStorage();
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    
    this.saveOnLocalStorage();
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;

    this.saveOnLocalStorage();
  }

  onSave(index: number, newtask: string) {
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
    this.saveOnLocalStorage();
  }

}
