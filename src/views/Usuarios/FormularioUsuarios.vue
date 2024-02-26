<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoUsuario" class="label"> Nome do Usuario </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoUsuario"
          id="nomeDoUsuario"
        />
      </div>
      <div class="field">
        <label for="emailDoUsuario" class="label"> Email do Usuario </label>
        <input
          type="text"
          class="input"
          v-model="emailUsuario"
          id="emailDoUsuario"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
        <router-link to="/usuarios" class="button">
          <span>Voltar</span>
        </router-link> 
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";

import { TipoNotificacao } from "@/interfaces/INotificacao";

import useNotificador from "@/hooks/notificador";
import { ALTERAR_USUARIO, CADASTRAR_USUARIO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormularioUsuario",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();
    
    const nomeDoUsuario = ref("");
    const emailUsuario = ref("");

    const validarEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

    if (props.id) {
      const usuario = store.state.usuario.usuarios.find(
        (user) => user.id == props.id
      );
      nomeDoUsuario.value = usuario?.nome || "";
      emailUsuario.value = usuario?.nome || "";
    }

    const lidarComSucesso = () => {
      nomeDoUsuario.value = "";
      emailUsuario.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O usuário foi cadastrado com sucesso!"
      );
      router.push("/usuarios");
    };

    const salvar = () => {
      if (!nomeDoUsuario.value.trim()) {
        notificar(TipoNotificacao.FALHA,
        "Atenção",
        "Nome do usuário não pode ser vazio!");
        return;
      }

      if (!emailUsuario.value.trim()) {
        notificar(TipoNotificacao.FALHA,
        "Atenção",
        "Email do usuário não pode ser vazio!");
        return;
      }

      if (!validarEmail(emailUsuario.value.trim())) {
        notificar(TipoNotificacao.FALHA,
        "Atenção",
        "Por favor, insira um formato de email válido!");
        return;
      }
      
      if (props.id) {
        store
          .dispatch(ALTERAR_USUARIO, {
            id: props.id,
            nome: nomeDoUsuario.value,
            email: emailUsuario.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_USUARIO, { nomeDoUsuario: nomeDoUsuario.value, email: emailUsuario.value })
          .then(() => lidarComSucesso());
      }
    };

    return {
      nomeDoUsuario,
      emailUsuario,
      salvar
    };
  },
});
</script>

<style>
.button {
  margin-right: 8px;
}
</style>