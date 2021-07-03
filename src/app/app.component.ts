import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Subscriber } from './models/subscriber.model';
import { SubscriberService } from './services/subscriber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'SubscriptionApp';
  private _success = new Subject<string>();
  subscriber = {
    id: null,
    name: '',
    email: '',
    phone: null
  }
  subscribers: Subscriber[];
  formGroup: FormGroup;
  isSaved: boolean = false;
  showSuscribers: boolean = false;
  successMessage = '';
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  
  constructor(private subscriberService: SubscriberService) {}
  
  name: FormControl;
  phone: FormControl;
  email: FormControl;

  ngOnInit() {
    this.getSubscribers();
    this.phone = new FormControl('', [Validators.required , Validators.minLength(9), Validators.pattern('^[6]+[0-9]*$')]);
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.formGroup = new FormGroup({
      'Name': this.name,
      'Phone': this.phone,
      'Email': this.email,
    });
  
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.isSaved = false;
        this.selfClosingAlert.close();
      }
    });
  }

  getSubscribers() {
    this.subscriberService.getSubscribers().subscribe(subscribers => {
      if(subscribers && subscribers.length > 0) {
        this.showSuscribers = true;
      }
      this.subscribers = subscribers;
    });
  }


  addSubscriber(formData) {
    this.subscriber.name = formData.Name;
    this.subscriber.email = formData.Email;
    this.subscriber.phone = formData.Phone;
    const newSubscriber = {
      id: null,
      name: this.subscriber.name,
      email: this.subscriber.email,
      phone: this.subscriber.phone
    }
    this.subscriberService.createSubscriber(newSubscriber).subscribe(data => {
      if(data){
        this.subscriber.id= data.id;
        console.log(data);
        this._success.next(`Subscription completed correctly`);
        this.isSaved = true;
        this.getSubscribers();
        console.log(this.subscribers);
        this.resetForm();
      }
      
    });

  }

  resetForm () {
    this.formGroup.reset();
  }

  onSubmit(data) {
    this.addSubscriber(data);
  }
}
