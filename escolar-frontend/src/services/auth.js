export const TOKEN_KEY = "@airbnb-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getLogado = () => {
  try {
    const serializedState = localStorage.getItem('DATA_LOGADO')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  }
  catch (err) {
    return undefined
  }

}


export const setLogado = (usuario) => 
{ 
  localStorage.setItem("DATA_LOGADO", JSON.stringify(usuario)); 
}


export const login = (token, usuario) => { 

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("DATA_LOGADO", JSON.stringify(usuario));
  
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("DATA_MENU");
  localStorage.removeItem("DATA_LOGADO");
};



export const setMenu = (menu, menuCategoria) => 
{ 
  localStorage.setItem("DATA_MENU", JSON.stringify(menu)); 
  localStorage.setItem("DATA_MENUCATEGORIA", JSON.stringify(menuCategoria)); 
}

export const getMenu = () => 
{   
  const serializedState = localStorage.getItem('DATA_MENU')
  return JSON.parse(serializedState)
}



export const setMenuCategoria = (menuCategoria) => 
{  
  localStorage.setItem("DATA_MENUCATEGORIA", JSON.stringify(menuCategoria)); 
}

export const getMenuCategoria = () => 
{   
  const serializedState = localStorage.getItem('DATA_MENUCATEGORIA')
  return JSON.parse(serializedState)
}