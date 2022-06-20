export const RULES_USER_NAME = [
  {
    whitespace: true,
    message: "O nome não conter apenas espaços em branco.",
  },
  {
    required: true,
    message: "Por favor, insira o nome!",
  },
  {
    pattern: /^[A-zÀ-ú0-9\s]+$/,
    message: "O nome só pode conter letras e números.",
  },
];

export const RULES_USER_EMAIL = [
  {
    required: true,
    message: "Por favor, insira o email!",
  },
  {
    pattern: /^[^@]+$/,
    message: "Não insira o domínio de email",
  },
];

export const RULES_USER_PASSWORD = [
  {
    required: true,
    message: "Por favor, inserir a senha!",
  },
  {
    pattern:
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?\-+_~])[0-9a-zA-Z!@#$%^&*?+_\-~]{6,12}$/,
    message:
      "A senha deve conter entre 6-12 caracteres com ao menos 1 maiúsculas, 1 minusculas, 1 caracter especial e 1 número.",
  },
];

export const RULES_USER_AGREEMENT = [
  {
    validator: (_, value) =>
      value
        ? Promise.resolve()
        : Promise.reject(
            new Error(
              "Para completar o cadastro é necessário aceitar os termos de uso."
            )
          ),
  },
];
