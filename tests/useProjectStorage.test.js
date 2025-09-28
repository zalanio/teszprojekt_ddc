import { describe, it, expect, beforeEach } from 'vitest'
import { useProjectStorage } from '../src/composables/useProjectStorage'

describe('useProjectStorage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('add hozzáad egy projektet', () => {
        const { projects, add } = useProjectStorage()
        add({ name: 'Teszt', budget: 100 })
        expect(projects.value.length).toBe(1)
        expect(projects.value[0].name).toBe('Teszt')
    })

    it('update frissít egy projektet', () => {
        const { projects, add, update } = useProjectStorage()
        const id = add({ name: 'Teszt', budget: 100 })
        update(id, { name: 'Módosított' })
        expect(projects.value[0].name).toBe('Módosított')
    })

    it('remove töröl egy projektet', () => {
        const { projects, add, remove } = useProjectStorage()
        const id = add({ name: 'Teszt', budget: 100 })
        remove(id)
        expect(projects.value.length).toBe(0)
    })
})
