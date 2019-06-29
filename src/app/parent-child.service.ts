import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ParentChildService {
  private subjects: Subject<string>[] = [];
 
  publish(eventName: string,data:any) {
  // ensure a subject for the event name exists
   this.subjects[eventName] = this.subjects[eventName] || new Subject();

  // publish event
   this.subjects[eventName].next(data);
  }
   
  on(eventName: string): Observable<string> {
  // ensure a subject for the event name exists
  this.subjects[eventName] = this.subjects[eventName] || new Subject();

  // return observable
  return this.subjects[eventName].asObservable();
  
  }
}
