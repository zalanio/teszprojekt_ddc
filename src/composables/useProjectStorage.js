import { ref } from 'vue'

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
        const id = Date.now()
        projects.value.push({ id, ...project })
        save()
        return id
    }

    function update(id, patch) {
        const i = projects.value.findIndex(p => p.id === id)
        if (i !== -1) {
            projects.value[i] = { ...projects.value[i], ...patch }
            save()
        }
    }

    function remove(id) {
        projects.value = projects.value.filter(p => p.id !== id)
        save()
    }

    return { projects, add, update, remove }
}
