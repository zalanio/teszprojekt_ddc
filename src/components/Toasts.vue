<script setup>
defineProps({
  items: { type: Array, default: () => [] } // {id,type,message}
})
</script>

<template>
    <div class="toast-wrap">
        <div v-for="t in items"
             :key="t.id"
             class="toast"
             :class="t.type"
             role="status"
             aria-live="polite">
            {{ t.message }}
        </div>
    </div>
</template>

<style scoped>
    .toast-wrap {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        z-index: 50;
    }

    .toast {
        background: #111;
        color: #fff;
        padding: .6rem .8rem;
        border-radius: .5rem;
        box-shadow: 0 4px 10px rgba(0,0,0,.12);
    }

        .toast.success {
            background: var(--green)
        }

        .toast.error {
            background: var(--red)
        }

        .toast.info {
            background: var(--blue)
        }
</style>
