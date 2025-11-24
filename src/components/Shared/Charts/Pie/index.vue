<template>
  <div style="height: 300px" class="d-flex justify-center position-relative">
    <div class="font-size-34 font-weight-bold position-absolute mt-16 pt-16">
      <p class="mt-3">57%</p>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { Chart } from "chart.js/auto";
import { ref, onMounted } from "vue";

// Props for chart data and chart type
const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartType: {
    type: String,
    default: "pie", // Default to 'pie' chart
  },
});

// Reference to the canvas element
const chartCanvas = ref(null);

onMounted(() => {
  const ctx = chartCanvas.value.getContext("2d");

  // Create the chart (pie or doughnut based on chartType)
  new Chart(ctx, {
    type: props.chartType, // 'pie' or 'doughnut'
    data: props.chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            },
          },
        },
      },
    },
  });
});
</script>
