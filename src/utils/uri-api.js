export const getURI = (uri, params) => {
  let aux = uri;
  for (let prop in params) {
    aux = aux.replace(new RegExp("{" + prop + "}", "g"), params[prop]);
  }
  return aux;
};

export const API = "/api";

export const USUARIOS = `${API}/usuarios`;
export const PERGUNTAS = `${API}/perguntas`;
export const CURTIDAS_PERGUNTA = `${PERGUNTAS}/curtir`;
export const RESPOSTAS = `${API}/respostas`;
export const CURTIDAS_RESPOSTA = `${RESPOSTAS}/curtir`;