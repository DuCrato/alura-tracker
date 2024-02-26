<template>
    <section>
      <router-link to="/usuarios/novo" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Novo Usuários</span>
      </router-link> 
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email}}</td>
            <td>
              <router-link :to="`/usuarios/${usuario.id}`" class="button">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
              </router-link>
              <button class="button ml-2 is-danger" @click="excluir(usuario.id)">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script lang="ts">
  import { useStore } from "@/store";
  import { computed, defineComponent } from "vue";
  import { OBTER_USUARIOS, REMOVER_USUARIO } from "@/store/tipo-acoes";
  
  export default defineComponent({
    // eslint-disable-next-line
    name: "ListaUsuarios",
    methods: {
      excluir (id: string) {
        this.store.dispatch(REMOVER_USUARIO, id)
      }
    },
    setup () {
      const store = useStore()
      store.dispatch(OBTER_USUARIOS)
      return {
        usuarios: computed(() => store.state.usuario.usuarios),
        store
      }
    }
  });
  </script>