
<template>
    <!-- TO DO Customize FontSize    -->
  <component :is="tag" :class="variantClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Variant = "large" | "small" | "text";

const { tag = "p", variant = "text" } = defineProps<{
  tag?: "h1" | "h2" | "p"; 
  variant?: Variant;
}>();

const VARIANT_CLASSES: Record<Variant, string> = {
  large: "heading-large", // font-bold text-5xl
  small: "heading-small",
  text: "",
};

const variantClasses = computed(() => {
  return VARIANT_CLASSES[variant];
});
</script>


<style scoped>
.heading-large {
  font-size: 60pt;
  color: red;
}
.heading-small {
  font-size: 30pt;
  text-decoration: underline;
}
.text {
  text-decoration: underline;
}
</style>

