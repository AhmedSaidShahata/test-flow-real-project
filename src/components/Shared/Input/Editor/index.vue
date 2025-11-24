<template>
  <div>
    <v-label v-if="label" class="my-1 d-inline-block font-size-14 font-weight-medium">
      {{ label }}
    </v-label>
    <vue-editor
      v-model="value"
      @keyup="errorsResult[name] = ''"
      v-bind="$attrs"
      :dir="$i18n.locale=='ar'? 'rtl':'ltr'"
      ref="editorRef"
      :editorToolbar="customToolbar"
      id="editor"
      :class="errorMessage || (errorsResult && errorsResult[name]) ? 'has_error' : ''"
    >
    </vue-editor>
    <p class="font-size-12" v-if="hint && !errorMessage && !(errorsResult && errorsResult[name])">
      {{ hint }}
    </p>
    <p class="text-danger" v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <p class="text-danger" v-if="errorsResult && errorsResult[name]">
      {{ errorsResult[name][0] }}
    </p>
  </div>
</template>
<script setup>
import { ref, watch, onUnmounted, onMounted,nextTick } from "vue";
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { VueEditor } from "vue3-editor";
const props = defineProps(["form", "type", "name", "label", "validation", "icon","hint"]);
const { value, errorMessage, resetField } = useField(props.name, props.validation);
const { errorsResult, resetErrors } = useErrorsStore();
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
watch(
  () => value.value,
  (newValue) => {
    // if (newValue) {
      props.form[props.name] = newValue;
    // }
  }
);

watch(
  () => props.form[props.name],
  (newValue) => {
    resetField({
      value: newValue !== undefined ? newValue : "",
    });
  },
  { immediate: true }
);


const customToolbar = ref([
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "link"],
  [{ align: "" }, { align: "justify" }, { align: "right" }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ direction: "rtl" }],
  [{ color: ["#9368F9", "#E6626D", "#000000", "#ffffff"] }],
]);

const editorRef = ref(null);

const replaceHeaderLabels = () => {
  nextTick(() => {
    const pickerItems = editorRef.value?.$el.querySelectorAll(
      ".ql-header .ql-picker-item"
    );
    if (!pickerItems || pickerItems.length === 0) return;

    const labels = {
      1: "H1",
      2: "H2",
      3: "H3",
      4: "H4",
      5: "H5",
      6: "H6",
      "": "Normal",
    };

    pickerItems.forEach((item) => {
      const value = item.getAttribute("data-value") || "";
      const label = labels[value];
      if (label) {
        item.innerText = label;
      }
    });
  });
};

onMounted(() => {
  replaceHeaderLabels();
  const editorEl = editorRef.value?.quill;
  // if (editorEl && locale.value == "ar") {
  //   editorEl.format("direction", "rtl");
  //   editorEl.format("align", "right");
  // }
});

onUnmounted(() => {
  resetErrors();
});
</script>
