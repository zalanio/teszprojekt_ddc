<script setup>
    import { ref } from 'vue'
    import Navbar from './components/Navbar.vue'
    import Toasts from './components/Toasts.vue'
    import ProjectForm from './views/ProjectForm.vue'
    import ProjectList from './views/ProjectList.vue'

    // Egyszer? „nézetváltás” router nélkül: 'list' | 'new'
    const view = ref('list')

    // Toast állapot a teljes appban
    const toasts = ref([]) // { id, type: 'success'|'error'|'info', message }

    function pushToast(message, type = 'success') {
        const id = Date.now() + Math.random()
        toasts.value.push({ id, type, message })
        setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== id)
        }, 3000)
    }

    // Szerkesztéshez átadott projekt (null, ha új)
    const projectToEdit = ref(null)

    function openNew() {
        projectToEdit.value = null
        view.value = 'new'
    }

    function openEdit(project) {
        projectToEdit.value = { ...project }
        view.value = 'new'
    }

    function backToList() {
        projectToEdit.value = null
        view.value = 'list'
    }

    // A form submit után visszalépünk a listára és toastot mutatunk
    function onSaved(msg = 'Projekt mentve!') {
        pushToast(msg, 'success')
        backToList()
    }
</script>

<template>
    <div class="min-h-screen bg-gray-50 text-gray-900">
        <Navbar @go-list="() => { view = 'list' }"
                @go-new="openNew" />

        <main class="max-w-4xl mx-auto p-4">
            <ProjectList v-if="view === 'list'"
                         @edit="openEdit"
                         @notify="(m,t) => pushToast(m,t)" />
            <ProjectForm v-else
                         :initial="projectToEdit"
                         @cancel="backToList"
                         @saved="onSaved"
                         @notify="(m,t) => pushToast(m,t)" />
        </main>

        <Toasts :items="toasts" />
    </div>
</template>

<style>

     :root {
         --green: #16a34a;
         --red: #dc2626;
         --blue: #2563eb;
         --fg: #111;
         --bg: #f9fafb;
     }

     .btn {
         padding: .5rem .9rem;
         border-radius: .5rem;
         border: 1px solid #ddd;
         background: #fff;
         cursor: pointer
     }

     .btn-primary {
         background: var(--blue);
         color: #fff;
         border-color: transparent
     }

     .btn-danger {
         background: var(--red);
         color: #fff;
         border-color: transparent
     }

    .input, .textarea, .select, .date {
        width: 100%;
        padding: .55rem .7rem;
        border: 1px solid #d1d5db;
        border-radius: .5rem;
        background: #fff;
        color: #111;
    }

     .label {
         font-weight: 600;
         margin-bottom: .25rem;
         display: block
     }

     .table {
         width: 100%;
         border-collapse: collapse
     }

         .table th, .table td {
             border-bottom: 1px solid #eee;
             padding: .6rem
         }

         .table th {
             text-align: left;
             background: #fafafa
         }

     .min-h-screen {
         min-height: 100vh
     }

     .bg-gray-50 {
         background: #f9fafb
     }

     .text-gray-900 {
         color: #111827
     }

     .max-w-4xl {
         max-width: 56rem
     }

     .mx-auto {
         margin-inline: auto
     }

     .p-4 {
         padding: 1rem
     }

     .mt-2 {
         margin-top: .5rem
     }

     .mt-4 {
         margin-top: 1rem
     }

     .gap-2 {
         gap: .5rem
     }

     .flex {
         display: flex
     }

     .items-center {
         align-items: center
     }

     .justify-between {
         justify-content: space-between
     }

     .rounded {
         border-radius: .5rem
     }

     .shadow {
         box-shadow: 0 1px 2px rgba(0,0,0,.06)
     }

     .card {
         background: #fff;
         border: 1px solid #eee;
         border-radius: .75rem;
         padding: 1rem
     }

     .small {
         font-size: .9rem;
         color: #6b7280
     }
    .btn {
        background: #fff;
        color: #111; /* fekete szöveg */
    }

</style>
