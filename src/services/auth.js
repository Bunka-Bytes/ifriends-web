export const TOKEN_KEY = '@user-token'
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const salvarToken = (data) => {
  localStorage.setItem(TOKEN_KEY, data.token)
  const tokenObj = parseJwt(data.token)
  sessionStorage.setItem('@user-name', tokenObj.nome)
  sessionStorage.setItem('@user-email', tokenObj.sub)
  sessionStorage.setItem('@user-id', tokenObj.idUsuario)
  sessionStorage.setItem('@user-image', data.imagem)
  sessionStorage.setItem('expiration', tokenObj.exp)
}
export const removeTokenOnLogout = () => {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.clear()
}

function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
