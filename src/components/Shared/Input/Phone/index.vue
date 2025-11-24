<template>
  <Field :name="name" :rules="validation" v-slot="{ field, errors }">
    <v-row no-gutters>
      <v-col>
        <v-text-field
          variant="solo"
          :label="label"
          persistent-hint
          v-bind="field"
          :hint="hint"
          @keyup="errorsResult[name] = ''"
          :type="type"
          :prepend-icon="icon"
          color="primary"
          :error-messages="errors.length ? errors : errorsResult && errorsResult[field.name]"
          :model-value="form[name]"
          @update:model-value="(value) => {
            field.onChange(value);
            form[name] = value;
          }"
          :disabled="disabled"
          class="phone"
        >
          <template #prepend-inner v-if="imageName">
            <Image width="19" :name="imageName"></Image>
          </template>
        </v-text-field>
      </v-col>
      <v-col style="max-width: 105px !important; min-width: 70px">
        <v-autocomplete
          :disabled="disabled"
          variant="plain"
          :no-data-text="$t('no_items')"
          :items="allCountries"
          item-title="phone_code"
          item-value="phone_code"
          class="country"
          :model-value="form.country_code"
          @update:model-value="(value) => form.country_code = value"
          prepend-inner-icon="mdi-menu-down"
        >
          <template v-slot:chip="{ props, item }">
            <v-list class="d-flex align-center text-white font-weight-medium">
              <v-list-item class="pa-0" v-bind="props"></v-list-item>
              <div class="d-flex align-center cursor-pointer">
                <p class="code">
                  {{ formattedPhoneCode(item.raw.phone_code) }}
                </p>
                <span class="font-flag ms-1 rounded-lg" v-text="item.raw.flag" />
              </div>
            </v-list>
          </template>
          <template v-slot:item="{ props, item }">
            <v-list class="d-flex align-center justify-space-around">
              <v-list-item
                min-width="69px"
                class="pa-0 d-flex align-center justify-space-between"
                v-bind="props"
                :title="formattedPhoneCode(item.raw.phone_code)"
              >
                <template #append>
                  <span class="font-flag" v-text="item.raw.flag" />
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </Field>
</template>
 
<script setup>
import { Field } from 'vee-validate';
import { useErrorsStore } from '@/stores/errors';
import { useCountriesStore } from '@/stores/countries';
import { useI18n } from 'vue-i18n';
import { watch, onMounted, ref } from "vue";
import { useField } from "vee-validate";
 
const { locale } = useI18n();
const props = defineProps({
  form: Object,
  name: String,
  label: String,
  validation: [String, Object],
  icon: String,
  imageName: String,
  hint: String,
  disabled: Boolean
});
 
const { errorsResult } = useErrorsStore();
const { allCountries } = useCountriesStore();
const { value: fieldValue, handleChange } = useField(props.name, props.validation);
 
const formattedPhoneCode = (phoneCode) => {
  if (!phoneCode) return '';
  const trimmedCode = phoneCode.startsWith('00') ? phoneCode.slice(2) : phoneCode;
  return locale.value == 'ar' ? `${trimmedCode}+` : `+${trimmedCode}`;
};
 
// Initialize field value with form value
watch(() => props.form[props.name], (newValue) => {
  if (newValue !== undefined) {
    handleChange(newValue);
  }
});
 
onMounted(async () => {
  await useCountriesStore().getCountries();
});
</script>