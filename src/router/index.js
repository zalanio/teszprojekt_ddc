import { createRouter, createWebHistory } from 'vue-router'
import ProjectList from '../views/ProjectList.vue'
import ProjectForm from '../views/ProjectForm.vue'

const routes = [
    { path: '/projects', component: ProjectList },
    { path: '/projects/new', component: ProjectForm },
    { path: '/projects/:id/edit', component: ProjectForm, props: true },
    { path: '/', redirect: '/projects' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
