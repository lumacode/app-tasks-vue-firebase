<template>

  <div class="navbar navbar-dark bg-dark px-5">
      <router-link to="/" class="navbar-brand">
      Formularios
      </router-link>
      <div class="d-flex">
          <router-link to="/" class="btn btn-primary m-2" v-if="usuarioAutenticado">
          Tareas
          </router-link>
          <router-link to="/login" class="btn btn-primary m-2" v-if="!usuarioAutenticado">
          Ingresar
          </router-link>
          <router-link to="/registro" class="btn btn-primary m-2" v-if="!usuarioAutenticado">
          Registrarse
          </router-link>
          <button @click="cerrarSesion" class="btn btn-danger m-2" v-if="usuarioAutenticado">
            Cerrar sesión
          </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters(['usuarioAutenticado'])
  },
  methods:{
    ...mapActions(['cerrarSesion'])
  }
}
</script>

