<template>
  <v-btn
    v-bind="$attrs"
    variant="flat"
    :style="buttonStyle"
    class="button"
    :to="to"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <slot />
    <v-icon v-if="icon" :icon="icon" class="mx-2" />
    <v-img
      v-if="image"
      :src="image"
      class="mx-2"
      :width="imageWidth"
      :height="imageHeight"
    />
  </v-btn>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps([
  "to",
  "radius",
  "icon",
  "image",
  "imageWidth",
  "imageHeight",
  "gradient",
  "color",
]);
const hovered = ref(false);

const colorMap = {
  primary: "#9368F9",
  secondary: "#E6626D",
};

function darkenColor(hex, amount = 20) {
  return (
    "#" +
    hex
      .replace(/^#/, "")
      .replace(/../g, (c) =>
        ("0" + Math.max(0, parseInt(c, 16) - amount).toString(16)).slice(-2)
      )
  );
}

const buttonStyle = computed(() => {
  if (props.gradient) {
    const background = hovered.value
      ? "linear-gradient(158.56deg, #733BF7 9.68%, #E34F5B 95.54%)" 
      : "linear-gradient(129.88deg, #9368F9 5.7%, #E6626D 98.5%)";

    return {
      borderRadius: props.radius,
      background,
      color: "white",
    };
  }

  const baseColor = props.color?.startsWith("#")
    ? props.color
    : colorMap[props.color] || "#E6626D"; // fallback color

  return {
    borderRadius: props.radius,
    backgroundColor: hovered.value ? darkenColor(baseColor) : baseColor,
    color: "white",
  };
});
</script>
