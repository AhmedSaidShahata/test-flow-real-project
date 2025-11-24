<template>
<main class="ms-lg-n5">
    <FormAction />
  </main>
</template>
<script setup>
import FormAction from '@/components/FormActions/Blogs/index.vue'

import { useIsEdit } from '@/composables/useIsEdit'
const { isEdit } = useIsEdit()
</script>
