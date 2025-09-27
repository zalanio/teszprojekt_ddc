import { ref } from 'vue'
import { Project } from '../models/Project'
const STORAGE_KEY = 'projects'

export function useProjectStorage() {
    const projects = ref(load())

    function load() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        } catch {
            return []
        }
    }
    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects.value))
    }

    function add(project) {
        const newProject = new Project(project)
        projects.value.push(newProject)
        save()
        return newProject.id
    }

    function update(id, patch) {
        const i = projects.value.findIndex(p => p.id === id)
        if (i !== -1) {
            // új Project példány a régiből + patch
            projects.value[i] = new Project({ ...projects.value[i], ...patch })
            save()
        }
    }

    function remove(id) {
        projects.value = projects.value.filter(p => p.id !== id)
        save()
    }

    return { projects, add, update, remove }
}
