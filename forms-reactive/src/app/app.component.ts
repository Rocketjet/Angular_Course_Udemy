import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });

    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    }); //повертає {} з заданими нами властивостями в коді і значеннями, які ми змінюємо, тобто якщо ми в полі username будемо вводити текст, то на кожну введену дукву ми отримуватимемо новий {} з оновленим значенням поля

    /* this.signupForm.statusChanges.subscribe((status) => {
      console.log(status); //INVALID або VALID
    }); */
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
    console.log(this.signupForm)
  }

  get hobbyControls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }
  
  //!КАСТОМНИЙ ВАЛІДАТОР
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    //Він перевірятиме, чи введені користувачем дані == одному з імен в масиві forbiddenUsernames. Ця функція буде викликатись автоматично в той момент, коли Angular перевіряє валідність поля форми
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      //робимо перевірку того, чи введене в поле форми значення відповідає одному зі значень в нашому масиві forbiddenUsernames
      return { nameIsForbidden: true };
    }
    return null; //щоб дати зрозуміти Angular, що поле валідне, повертаємо null або взагалі нічого не повертаємо
  } // функція приймає на вхід поле форми і повертає key: value пару, де ключ - рядок, значення - true/false
  //!КАСТОМНИЙ АСИНХРОННИЙ ВАЛІДАТОР
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
