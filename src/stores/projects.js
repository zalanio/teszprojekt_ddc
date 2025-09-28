import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: JSON.parse(localStorage.getItem('projects') || '[]')
    }),
    actions: {
        save() {
            localStorage.setItem('projects', JSON.stringify(this.projects))
        },
        add(project) {
            const id = Date.now()
            const { name, description, startDate, budget } = project
            this.projects.push({ id, name, description, startDate, budget })
            this.save()
            return id
        },
        update(id, patch) {
            const i = this.projects.findIndex(p => p.id === id)
            if (i !== -1) {
                this.projects[i] = { ...this.projects[i], ...patch }
                this.save()
            }
        },
        remove(id) {
            this.projects = this.projects.filter(p => p.id !== id)
            this.save()
        }
    }
})