export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExperationDate: Date
  ) { }
  get token() { //геттер для отримання токена
    if (!this._tokenExperationDate || new Date > this._tokenExperationDate) { //перевірка на наявність терміну валідності і чи термін не сплив
      return null;
    }
    return this._token;
  }
}