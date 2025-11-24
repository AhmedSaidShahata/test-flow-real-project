<template>
  <section class="bg-white pa-5 ms-0 ms-lg-n6 rounded-xl position-relative">
    <HeadingPage
      :title="url"
      icon="heading-messages.svg"
      :description="$t('heading-messages-description')"
      class="mb-4"
    />
    <Table :headers="headers" :url="url" :key="tableKey" class="mb-10">
      <template v-slot:item.contact_topic_name="{ item }">
        {{ item.contact_topic?.name || '-' }}
      </template>
      <template v-slot:item.seen="{ item }">
        <CustomChip :value="item.seen" />
      </template>
      <template v-slot:item.closed="{ item }">
        <MessageToggle
          v-if="$hasPermission('contact-messages_edit')"
          v-model="item.closed"
          :url="url"
          :id="item.id"
          name="closed"
          @update:value="updateVisibility(item, $event)"
          :loading="loadingPut"
        />
      </template>
      <template v-slot:item.controls="{ item }">
        <div class="d-flex align-center ga-2">
          <!-- View Message Button -->
          <Image
            name="view-gradient.svg"
            v-if="$hasPermission('contact-messages_view')"
            @click="openMessageDialog(item)"
            class="cursor-pointer"
          />

          <!-- Destroy Button -->
          <Destroy
            v-if="$hasPermission('contact-messages_delete')"
            :url="url"
            :id="item.id"
            title="delete_msg_title"
            description="delete_msg_description"
          />
        </div>
      </template>
    </Table>

    <MsgViewDialog
      v-model="messageDialog"
      :selected-message="selectedMessage"
      :loading="loadingMessage"
      @dialog-closed="handleDialogClosed"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import useApi from '@/composables/useApi'
import MsgViewDialog from '@/components/MsgViewDialogue/index.vue'

const { get, put, loadingPut } = useApi()

const url = computed(() => 'contact-messages')
const headers = computed(() => [
  { key: 'id' },
  { key: 'person_email' },
  { key: 'contact_topic_name' },
  { key: 'seen' },
  { key: 'closed' },
  { key: 'controls' }
])

// Dialog and message state
const messageDialog = ref(false)
const selectedMessage = ref(null)
const loadingMessage = ref(false)
const tableKey = ref(0) // Key to force table refresh

const openMessageDialog = async (item) => {
  messageDialog.value = true
  loadingMessage.value = true
  selectedMessage.value = null

  try {
    const { data } = await get(`/${url.value}/${item.id}`)
    selectedMessage.value = data.contact_message
  } catch (error) {
    console.error('Error fetching message:', error)
  } finally {
    loadingMessage.value = false
  }
}

const handleDialogClosed = () => {
  // Force table refresh by updating the key
  tableKey.value++
  // Reset selected message
  selectedMessage.value = null
}

const updateVisibility = async (item, value) => {
  const initialValue = item.closed // Store initial value
  item.closed = value // update UI

  try {
    await put(`/${url.value}/${item.id}`, {
      closed: value,
      locale: localStorage.getItem("lang"),
    })
  } catch (error) {
    console.error('Error updating visibility:', error)
    item.closed = initialValue
  }
}
</script>