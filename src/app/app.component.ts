import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SubscriptionApp';

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9)
      ]),
      Name: new FormControl('', [
        Validators.required,
      ])
    });
  }

  onSubmit() {
    console.log(this.formGroup);
  }
}
