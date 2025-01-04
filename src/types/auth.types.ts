// Добавить позже сюда Pick для модели, чтобы наследовалось от туда
export interface SingIn_I {
  login: string;
  password: string;
}

// Сделано на будущее, т.к могут добавиться какие то поля
export interface SingUp_I extends SingIn_I {
  mail: string;
}
