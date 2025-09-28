import { useToast } from 'vue-toastification'

export function useNotify() {
    const toast = useToast()

    function success(message) {
        toast.success(message, {
            timeout: 3000
        })
    }

    function error(message) {
        toast.error(message, {
            timeout: 5000
        })
    }

    function handle(err, fallback = 'Ismeretlen hiba történt') {
        // ha Error objektumot kapsz, abból szedd ki az üzenetet
        const msg = typeof err === 'string' ? err : err?.message || fallback
        toast.error(msg, { timeout: 5000 })
    }

    return { success, error, handle }
}