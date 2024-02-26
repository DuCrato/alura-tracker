import http from "@/http";
import IUsuario from "@/interfaces/IUsuario";
import { Estado } from "@/store";
import { OBTER_USUARIOS, CADASTRAR_USUARIO, ALTERAR_USUARIO, REMOVER_USUARIO } from "@/store/tipo-acoes";
import { ADICIONA_USUARIO, ALTERA_USUARIO, EXCLUIR_USUARIO, DEFINIR_USUARIOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoUsuario {
  usuarios: IUsuario[]
}

export const usuario: Module<EstadoUsuario, Estado> = {
  mutations: {
    [ADICIONA_USUARIO](state, { nomeDoUsuario, email }: { nomeDoUsuario: string, email: string }) {
      const usuario = {
        id: new Date().toISOString(),
        nome: nomeDoUsuario, 
        email: email,
      } as IUsuario
      state.usuarios.push(usuario)
    },
    [ALTERA_USUARIO](state, usuario: IUsuario) {
      const index = state.usuarios.findIndex(user => user.id == usuario.id)
      state.usuarios[index] = usuario
    },
    [EXCLUIR_USUARIO](state, id: string) {
      state.usuarios = state.usuarios.filter(user => user.id != id)
    },
    [DEFINIR_USUARIOS](state, usuarios: IUsuario[]) {
      state.usuarios = usuarios
    },
  },
  actions: {
    [OBTER_USUARIOS]({ commit }) {
      http.get('usuarios')
        .then(response => commit(DEFINIR_USUARIOS, response.data))
    },
    [CADASTRAR_USUARIO](contexto, { nomeDoUsuario, email }) {
      return http.post('/usuarios', {
        nome: nomeDoUsuario,
        email: email
      });
    },
    [ALTERAR_USUARIO](contexto, usuario: IUsuario) {
      return http.put(`/usuarios/${usuario.id}`, usuario)
    },
    [REMOVER_USUARIO]({ commit }, id: string) {
      return http.delete(`/usuarios/${id}`)
        .then(() => commit(EXCLUIR_USUARIO, id))
    },
  },
  getters: {
    usuarios (state) {
      return state.usuarios
    }
  }
}