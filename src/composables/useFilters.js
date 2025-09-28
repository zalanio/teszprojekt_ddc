import { ref, computed } from 'vue'

export function useProjectFilters(projects) {
  const query = ref('')

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return projects.value
    return projects.value.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    )
  })

  return { query, filtered }
}