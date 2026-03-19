<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { createNote, listNotes, type Note } from '../api/notes'

const loading = ref(false)
const error = ref<string | null>(null)
const notes = ref<Note[]>([])

const title = ref('')
const content = ref('')

const canSubmit = computed(() => title.value.trim().length > 0 && !loading.value)

async function refresh() {
  loading.value = true
  error.value = null
  try {
    notes.value = await listNotes()
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}

async function submit() {
  if (!canSubmit.value) return
  loading.value = true
  error.value = null
  try {
    await createNote({ title: title.value, content: content.value })
    title.value = ''
    content.value = ''
    await refresh()
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <main class="page">
    <header class="header">
      <div class="brand">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
        <h1 class="title">Notes (Vue + Express + MySQL)</h1>
      </div>
      <button class="btn" type="button" @click="refresh" :disabled="loading">
        {{ loading ? 'Loading…' : 'Refresh' }}
      </button>
    </header>

    <section class="card">
      <h2 class="h2">Create a note</h2>
      <div class="form">
        <label class="field">
          <span class="label">Title</span>
          <input v-model="title" class="input" placeholder="e.g. 面试要点" />
        </label>
        <label class="field">
          <span class="label">Content</span>
          <textarea v-model="content" class="textarea" placeholder="Optional…" rows="4" />
        </label>
        <div class="actions">
          <button class="btn primary" type="button" @click="submit" :disabled="!canSubmit">
            {{ loading ? 'Submitting…' : 'Submit' }}
          </button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </section>

    <section class="card">
      <h2 class="h2">Latest notes</h2>
      <p v-if="!loading && notes.length === 0" class="muted">No notes yet.</p>
      <ul class="list">
        <li v-for="n in notes" :key="n.id" class="item">
          <div class="itemHead">
            <strong class="itemTitle">{{ n.title }}</strong>
            <span class="itemMeta">{{ new Date(n.createdAt).toLocaleString() }}</span>
          </div>
          <p v-if="n.content" class="itemContent">{{ n.content }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 980px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  gap: 16px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 28px;
  height: 28px;
}

.title {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
}

.card {
  border: 1px solid rgba(127, 127, 127, 0.25);
  border-radius: 12px;
  padding: 16px;
  background: rgba(127, 127, 127, 0.06);
}

.h2 {
  margin: 0 0 12px;
  font-size: 14px;
  opacity: 0.9;
}

.form {
  display: grid;
  gap: 12px;
}

.field {
  display: grid;
  gap: 6px;
}

.label {
  font-size: 12px;
  opacity: 0.8;
}

.input,
.textarea {
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(127, 127, 127, 0.35);
  background: rgba(0, 0, 0, 0.12);
  color: inherit;
  padding: 10px 12px;
  outline: none;
}

.input:focus,
.textarea:focus {
  border-color: rgba(100, 108, 255, 0.8);
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  border-radius: 10px;
  border: 1px solid rgba(127, 127, 127, 0.35);
  background: rgba(0, 0, 0, 0.12);
  color: inherit;
  padding: 10px 12px;
  cursor: pointer;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn.primary {
  border-color: rgba(100, 108, 255, 0.8);
}

.error {
  margin: 0;
  color: #ff6b6b;
  font-size: 12px;
}

.muted {
  margin: 0;
  opacity: 0.7;
  font-size: 12px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.item {
  border-radius: 10px;
  padding: 12px;
  border: 1px solid rgba(127, 127, 127, 0.2);
  background: rgba(0, 0, 0, 0.08);
}

.itemHead {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
}

.itemTitle {
  font-size: 13px;
}

.itemMeta {
  font-size: 11px;
  opacity: 0.7;
  white-space: nowrap;
}

.itemContent {
  margin: 8px 0 0;
  font-size: 12px;
  opacity: 0.9;
  white-space: pre-wrap;
}
</style>
