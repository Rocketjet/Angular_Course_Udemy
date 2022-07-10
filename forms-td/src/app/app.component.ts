import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("f") signupForm: NgForm;
  @ViewChild("email") emailInput: NgForm;

  defaultQuestion = "pet";
  defaultUserName = "";
  answer = "";
  genders = ["male", "female"];
  submitted = false;
  user = {
    username: "",
    email: "",
    secretQuestion: "pet",
    answer: "",
    gender: "",
  };

  suggestUserName() {
    const suggestedName = "Superuser";
    //patchValue() і setValue() доступні лише на формі, яка обгорнута в ngForm
    /* this.signupForm.setValue({ //setValue() перезапише всі дані
      userData: {
        username: suggestedName,
        email: "admin@gmail.com"
      },
      secret: "pet",
      questionAnswer: "",
      gender: "male"
    }) */
    //це не найркащий спосіб задати потрібні значення полям форми, так як якщо там вже були введені якісь значення раніше, вони будуть перпезаписані
    this.signupForm.form.patchValue({
      //patchValue() дає можливість перезаписати дані, які ми хочемо
      userData: {
        username: suggestedName,
        email: "test@gmail.com",
      },
      secretQuestion: "pet",
      questionAnswer: "Funny",
      gender: "male",
    });
  }

  /* onSubmit(form: NgForm) {
    console.log(form)
  } */

  onSubmit() {
    console.log(this.signupForm);
    // console.log(this.emailInput);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset(); //цей метод не тільки очищає поля форми, а і також всі вбудовані властивості форми, як от valid, touched і так далі
  }
}
