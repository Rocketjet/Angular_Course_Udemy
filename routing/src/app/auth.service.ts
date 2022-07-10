export class AuthService {
  //сервіс для імітації авторизації з методами логіну і вилогіну і перевірки стану авторизації
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 600);
    });

    return promise;
  }
  login() {
    if (this.loggedIn) alert("You are already logged in");
    else {
      this.loggedIn = true;
      alert("You are logged in");
    }
  }
  logOut() {
    this.loggedIn = false;
    alert("You are logged out");
  }
}
