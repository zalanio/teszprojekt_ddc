import { describe, it, expect } from 'vitest'
import { useValidation } from '../src/composables/useValidation'

describe('useValidation', () => {
    const { validateProject } = useValidation()

    it('hiba ha üres a név', () => {
        const error = validateProject({ name: '', budget: 100 })
        expect(error).toBe('A projekt neve kötelező')
    })

    it('hiba ha negatív költségvetés', () => {
        const error = validateProject({ name: 'Teszt', budget: -10 })
        expect(error).toBe('A költségvetés pozitív szám legyen')
    })

    it('nincs hiba ha jó az adat', () => {
        const error = validateProject({ name: 'Teszt', budget: 100 })
        expect(error).toBeNull()
    })
})
