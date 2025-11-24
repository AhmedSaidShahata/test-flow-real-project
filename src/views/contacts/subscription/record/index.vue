<template>
  <section class="bg-white pa-5 ms-0 ms-lg-n6 rounded-xl position-relative">
    <HeadingPage
      :title="$t('contacts')"
      icon="heading-messages.svg"
      :description="$t('subscribers_crud.description')"
      class="mb-4"
    />
    <Table :headers="headers" :url="url" class="mb-10">
      <template v-slot:item.controls="{ item }">
        <div class="d-flex align-center ga-2">
          <!-- Destroy Button -->
          <Destroy v-if="$hasPermission('subscribers_delete')" :url="url" :id="item.id" title="delete_msg_title" description="delete_msg_description" />
        </div>
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed} from 'vue'


const url = computed(() => 'subscribers')
const headers = computed(() => [
  { key: 'id' },
  { key: 'firstname' },
  { key: 'lastname' },
  { key: 'email' },
  { key: 'controls' }
])

</script>