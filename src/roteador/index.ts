import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import Formulario from '../views/Projetos/Formulario.vue'
import Lista from '../views/Projetos/Lista.vue'
import Usuarios from "@/views/Usuarios.vue";
import ListaUsuarios from "@/views/Usuarios/ListaUsuarios.vue";
import FormularioUsuarios from "@/views/Usuarios/FormularioUsuarios.vue";

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: Formulario,
                props: true
            },
        ]
    },
    {
        path: '/usuarios',
        component: Usuarios,
        children: [
            {
                path: '',
                name: 'Usuarios',
                component: ListaUsuarios
            },
            {
                path: 'novo',
                name: 'Novo usuario',
                component: FormularioUsuarios
            },
            {
                path: ':id',
                name: 'Editar usuario',
                component: FormularioUsuarios,
                props: true
            },
        ]
    }
    
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;
