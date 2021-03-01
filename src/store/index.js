import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas : [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      prioridad: '',
      numero: 0,

    },
    user: null,
    error: {tipo: null, mensaje: null}
  },
  mutations: {
    setError(state, payload){
      if(payload === null){
        return state.error = {tipo: null, mensaje: null}
      }
      if(payload === "EMAIL_NOT_FOUND"){
        return state.error = {tipo: 'email', mensaje: 'Email no registrado'}
      }
      if(payload === "INVALID_PASSWORD"){
        return state.error = {tipo: 'password', mensaje: 'Clave incorrecta'}
      }
      if(payload === "EMAIL_EXISTS"){
        return state.error = {tipo: 'email_ex', mensaje: 'El correo ya existe en la base de datos'}
      }

    },
    setUser(state, payload){
      state.user = payload

    },
    cargar(state, payload){
      state.tareas = payload
    },
    set(state, payload){
      state.tareas.push(payload)
     
    },
    eliminar(state, payload){
      state.tareas = state.tareas.filter(tarea => tarea.id !== payload)
     
    },
    tarea(state, payload){
      if(!state.tareas.find(tarea => tarea.id === payload)){
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(tarea => tarea.id === payload)
    },
    update(state, payload){
      state.tareas = state.tareas.map(tarea => tarea.id === payload.id ? payload : tarea)
     
    }
  },
  actions: {
    cerrarSesion({commit}){
      commit('setUser', null)
      router.push('/login')
      localStorage.removeItem('usuario')
    },
    async login({commit}, usuario){
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTSkBWFJvlTJSPh0-NXnPLqQcU9lqaSxg',{
          method: 'POST',
          body: JSON.stringify({
              email: usuario.email,
              password: usuario.password,
              returnSecureToken: true
          })
        })

        const userDB = await res.json()
       // console.log('userdb', userDB)
        if(userDB.error){
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }
        commit('setUser', userDB)
        commit('setError', null)
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.error(error)
      }
      
    },
    async registrar({commit}, usuario){
      try {

        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTSkBWFJvlTJSPh0-NXnPLqQcU9lqaSxg',{
          method: 'POST',
          body: JSON.stringify({
            email : usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })

        const userDB = await res.json()
        console.log(userDB)

        if(userDB.error){
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }

        commit('setUser', userDB)
        commit('setError', null)
        router.push('/login')
        localStorage.setItem('usuario', JSON.stringify(userDB))
        
      } catch (error) {

        console.error(error)
        
      }
    },
    async cargarLocalStorage({commit, state}){
      if(localStorage.getItem('usuario')){
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      }else{
        return commit('setUser', null)
      }
      try {
        const res = await fetch(`https://api-tareas-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        //console.log(dataDB)
        const arrayTareas = []

        for(let id in dataDB){
         // console.log(dataDB[id])
          arrayTareas.push(dataDB[id])
        }

       // console.log(arrayTareas)
       commit('cargar', arrayTareas)

      } catch (error) {
        console.error(error)
      }

    },
    async setTareas({commit, state}, tarea){
      try {
       const res = await fetch(`https://api-tareas-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify(tarea)
        })

        const dataDB = await res.json()
        commit('set', tarea)
        
      } catch (error) {
        console.error(error)
      }
      
    },
    async deleteTarea({commit, state}, id){
      try {
           await fetch(`https://api-tareas-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
            method: 'DELETE'
          })
          commit('eliminar', id)
      } catch (error) {
        console.error(error)
      }
      
    },
    setTarea({commit}, id){
      commit('tarea', id)
    },
    async updateTarea({commit, state}, tarea){
      try {
        const res = await fetch(`https://api-tareas-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,{
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        commit('update', dataDB)
 
      } catch (error) {
        console.error(error)
      }
      
      router.push('/')
    }
  },
  getters:{
    usuarioAutenticado(state){
      return !!state.user
    }
  },
  modules: {
  }
})
