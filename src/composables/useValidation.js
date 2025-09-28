export function useValidation() {
    function validateProject(form) {
        if (!form.name.trim()) return 'A projekt neve kötelező'
        if (Number(form.budget) <= 0) return 'A költségvetés pozitív szám legyen'
        // stb.
        return null
    }
    return { validateProject }
}