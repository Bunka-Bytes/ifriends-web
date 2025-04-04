export const SIZE_LIM_TAG = 15
export const PAGINATION_SIZE_DEFAULT = 10
export const DATE_FORMAT_BR = 'DD/MM/YYYY HH:mm:ss'
export const DATE_FORMAT_US = 'YYYY-MM-DD hh:mm:ss A'
export const pathsMenu = {
  dashboard: '/dashboard/',
  perguntas: '/dashboard/perguntas',
  usuarios: '/dashboard/usuarios',
  eventos: '/dashboard/eventos',
}

export const contentEmailForgotPassword = (data = {}) => {
  const { codigo } = data
  return `<p>Ol&aacute; Friender,</p>
<p>
  Recebemos uma solicita&ccedil;&atilde;o para&nbsp;<span class="il"
    >redefinir</span
  >&nbsp;sua&nbsp;<span class="il">senha</span>. Voc&ecirc; pode criar uma
  nova, clicando no bot&atilde;o abaixo.
</p>
<p style="text-align: center">
  <a
    style="
      background: #99cccc;
      color: white;
      font-weight: 500;
      display: inline-block;
      padding: 10px 35px;
      margin: 6px 8px;
      text-decoration: none;
      border-radius: 6px;
    "
    href="https://ifriends.vercel.app/recuperacao-senha/${codigo}"
    target="_blank"
    rel="noopener"
    >Redefinir Senha</a
  >
</p>
<p>Ou copie e cole esta URL em uma nova guia do seu navegador:</p>
<p>
  <a
    style="text-decoration: none; outline: none"
    href="https://ifriends.vercel.app/recuperacao-senha/${codigo}"
    target="_blank"
    rel="noopener"
  >
    https://ifriends.vercel.app/recuperacao-senha/${codigo}</a
  >
</p>
<p style="margin-top: 40px;">
  Abra&ccedil;os,
  <br>
  equipe Bunka Bytes.
</p>`
}

export const contentEmailVerification = (data = {}) => {
  const { nome, email, codigo } = data
  return `<p>Ol&aacute; ${nome},</p>
  <p>Par&aacute;bens por se tornar um novo IFriender em nossa comunidade.</p>
  <p>
    Por favor, confirme seu e-mail (${email}) clicando no bot&atilde;o
    abaixo.
  </p>
  <p style="text-align: center">
    <a
      style="
        background: #99cccc;
        color: white;
        font-weight: 500;
        display: inline-block;
        padding: 10px 35px;
        margin: 6px 8px;
        text-decoration: none;
        border-radius: 6px;
      "
      href="https://ifriends.vercel.app/validar/${codigo}"
      target="_blank"
      rel="noopener"
      >Confirmar</a
    >
  </p>
  <p>Ou copie e cole esta URL em uma nova guia do seu navegador:</p>
  <a
    style="text-decoration: none; outline: none"
    href="https://ifriends.vercel.app/validar/${codigo}"
    target="_blank"
    rel="noopener"
  >
    https://ifriends.vercel.app/validar/${codigo}</a
  >
  <p>Este link expir&aacute; em 24 horas.</p>
  <p style="margin-top: 40px;">
    Abra&ccedil;os,
    <br>
    equipe Bunka Bytes.
  </p>
  `
}

export const contactFormContent = (data = {}) => {
  const { nome, conteudo, email } = data

  return `${conteudo.replaceAll('\n', '<br/>')}
<p style="margin-top: 40px;">
Favor responder no email ${email}.
<br/>
Abra&ccedil;os,
<br/>
${nome}.
</p>`
}
