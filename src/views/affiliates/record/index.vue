<template>
  <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <HeadingPage
        :title="url"
        description="affiliates_crud.header_description"
        icon="affiliates-header.svg"
      >
      </HeadingPage>
    </div>
    <Table
      class="mb-10 users-table"
      :data="items"
      :headers="headers"
      :url="url"
      :query="mappedQuery"
      :key="tableKey"
    >
      <template v-slot:item.contact_affiliate_name="{ item }">
        {{
          item?.contact_name
        }}
      </template>
      <template v-slot:item.approved="{ item }">
        <CustomChip :value="item.approved" />
      </template>
      <template v-slot:item.blocked="{ item }">
        <PopupToggle
          v-if="$hasPermission('affiliates_edit')"
          v-model="item.blocked"
          :url="url"
          :id="item.identifier"
          name="blocked"
          icon="block-icon.svg"
          :title="item.blocked ? 'affiliates_crud.enable_title' : 'affiliates_crud.block_title'"
          :description="
            item.blocked
              ? 'affiliates_crud.enable_description'
              : 'affiliates_crud.block_description'
          "
          class="pt-2"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <Image
          name="view-gradient.svg"
          v-if="$hasPermission('affiliates_edit')"
          @click="openAffiliateDialog(item.identifier)"
          class="cursor-pointer"
        />
      </template>
    </Table>
    <AffiliateViewDialog
      v-model="affiliateDialog"
      :selectedIdentifier="selectedAffiliate"
      @dialog-closed="handleDialogClosed"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import AffiliateViewDialog from '@/components/FormActions/AffiliateViewDialog/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const url = ref('affiliates')
const headers = computed(() => [
  { key: 'contact_affiliate_name' },
  { key: 'legal_name' },
  { key: 'blocked' },
  { key: 'approved' },
  { key: 'actions' }
])

const affiliateDialog = ref(false)
const selectedAffiliate = ref(null) 
const tableKey = ref(0) 

const openAffiliateDialog = (identifier) => {
  selectedAffiliate.value = identifier 
  affiliateDialog.value = true 
}

const handleDialogClosed = (wasApproved) => {
  // Only refresh the table if an approval was made
  if (wasApproved) {
    tableKey.value++ // Force table refresh by updating the key
  }
  // Reset selected affiliate
  selectedAffiliate.value = null
}
</script>