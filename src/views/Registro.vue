<template>
  <h1 class="my-4">Registro de usuarios</h1>
  <div class="aler alert-danger p-3" v-if="error.tipo !== null">
      {{error.mensaje}}
  </div>
  <form @submit.prevent="procesarFormulario">
      <input class="form-control my-3" type="email_ex" placeholder="email" v-model.trim="email"
       :class="[error.tipo === 'email' ? 'is-invalid' : '']">
      <input class="form-control my-3" type="password" placeholder="password" v-model.trim="pass1">
      <input class="form-control my-3" type="password" placeholder="password" v-model.trim="pass2">

      <button class="btn btn-primary" type="submit" :disabled="bloquear">Registrarme</button>
  </form>

</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return{
            'email' : '',
            'pass1' : '',
            'pass2' : ''
        }
    },
    computed:{
        ...mapState(['error']),
        bloquear(){
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass1.length > 5 && this.pass1 === this.pass2){
                return false
            }
            return true
        }
    },
    methods:{
        ...mapActions(['registrar']),
       async procesarFormulario(){
           await this.registrar({email: this.email, password: this.pass1})

            if(this.error.tipo !== null){
                return
            }
            
            this.email = '',
            this.pass1 = '',
            this.pass2 = ''
        }
    }

}
</script>

