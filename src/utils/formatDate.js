export function formatDate(dateStr) {
    if (!dateStr) return '—'
    return new Intl.DateTimeFormat('hu-HU').format(new Date(dateStr))
}
