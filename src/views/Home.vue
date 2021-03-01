<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>

  <hr>
  <ListaTareas />
</template>

<script>
// @ is an alias to /src
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'
import { mapActions } from 'vuex'
const shortid = require('shortid')

export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
  },
  data(){
    return{
      tarea:{
        id: '',
        nombre: '',
        categorias: [],
        prioridad: '',
        numero: 0,

      }
    }
  },
  methods: {
    ...mapActions(['setTareas', 'cargarLocalStorage']),
    procesarFormulario(){
      console.log(this.tarea);
      if(this.tarea.nombre.trim() === ''){
        console.log('Nombre vacio')
        return
      }
      console.log('no esta vacio')

      //generar id 
      this.tarea.id = shortid.generate()
      console.log(this.tarea.id)

      //enviamos los datos 
      this.setTareas(this.tarea)

      //limpiar datos
      this.tarea = {
        nombre: '',
        id: '',
        categorias: [],
        prioridad: '',
        numero: 0,

      }
    }
  },
   created(){
    this.cargarLocalStorage()
  }

}
</script>
