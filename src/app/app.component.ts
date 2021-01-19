import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = ['Stable', 'Critical', 'Finished']
  form: FormGroup;
  forbiddenProjects = ['Test1', 'Test2']
  

  ngOnInit() {
    this.form = new FormGroup({
      'project-name': new FormControl(null, [Validators.required, this.forbiddenProject.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      'statuses': new FormControl(['Stable'])
    })
  }
  onSubmit() {
    console.log(this.form.value);
  }
  forbiddenProject(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenProjects.indexOf(control.value) !== -1) {
      return {'forbiddenProject': true}
    }
    return (null)
  }
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve ({'emailIsForbidden': true})
        } else {
          resolve (null)
        }
      } ,2000)
    })
    return promise
  }
}
