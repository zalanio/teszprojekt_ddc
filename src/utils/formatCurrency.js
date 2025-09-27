export function formatCurrency(amount) {
    return new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(amount || 0)
}
