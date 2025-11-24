<template>
  <section class="heading-page position-relative w-100">
    <div class="heading-page__bg position-absolute pe-5" />
    <div class="heading-page__container position-relative w-100 px-5 me-5 d-flex align-center flex-wrap py-2">
      
      <!-- Icon section - same as heading -->
      <div class="me-4 mt-2">
        <Image :name="name" />
      </div>
      
      <!-- Breadcrumb and description section - replacing title/description from heading -->
      <div class="mt-n4">
        <div class="mb-n4">
          <v-breadcrumbs :items="processedItems">
            <template v-slot:divider>
              <v-icon :icon="lang === 'ar' ? 'mdi-chevron-left' : 'mdi-chevron-right'" style="padding:0; margin: 0;"></v-icon>
            </template>
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :disabled="item.disabled"
                @click.stop="!item.disabled && handleBreadcrumbClick(item)"
                class="font-weight-bold bradcrumb_font px-0 mx-0"
                :class="{
                  'breadcrumb-clickable': !item.disabled,
                  'breadcrumb-enabled': !item.disabled,
                  'breadcrumb-disabled': item.disabled
                }"
              >
                {{ $t(item.titleKey) }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </div>
        <span class="font-inter ms-3 font-size-14">{{ $t(descriptionKey) }}</span>
      </div>
      
      <!-- Slot section - same position as heading -->
      <div class="ms-auto mt-1 mt-md-0">
        <slot />
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const lang = computed(() => localStorage.getItem('lang') || 'en')

const props = defineProps({
  name: {
    type: String,
    default: 'document.png'
  },
  descriptionKey: {
    type: String,
    default: 'breadcrumbs.default_description'
  },
  label: {
    type: String,
    default: 'Create'
  },
  items: {
    type: Array,
    default: () => [
      {
        titleKey: 'breadcrumbs.contact_topics',
        disabled: false,
        route: '/contact-topics'
      },
      {
        titleKey: 'breadcrumbs.keywords',
        disabled: true,
        route: ''
      }
    ]
  }
})

// Process items to automatically disable the last item and enable navigation for others
const processedItems = computed(() => {
  return props.items.map((item, index) => ({
    ...item,
    disabled: index === props.items.length - 1 // Last item is always disabled
  }))
})

// Handle breadcrumb navigation
const handleBreadcrumbClick = async (item) => {
  if (!item.disabled && item.route) {
    await router.push(item.route)
  }
}

onMounted(() => {
  console.log(lang.value);
})
</script>

<style scoped>
/* More specific selector to override Vuetify defaults */
:deep(.v-breadcrumbs-divider) {
  margin: 0 !important;  /* Adjust horizontal spacing */
  padding: 0 !important;
}

:deep(.v-breadcrumbs .v-icon) {
  font-size: 40px !important;
  margin: 0 !important;
  padding: 0 !important;
  color: #9368F9 !important;
}
</style>