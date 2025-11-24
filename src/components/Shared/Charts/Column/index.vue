<template>
  <div>
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
});

// Reference to the canvas element
const chartCanvas = ref(null);

onMounted(() => {
  const ctx = chartCanvas.value.getContext("2d");

  // Create the Stacked Column (Bar) chart
  new Chart(ctx, {
    type: "bar", // Bar chart for stacked column
    data: props.chartData,
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true, // Stacked columns on the X-axis
        },
        y: {
          stacked: true, // Stacked bars on the Y-axis
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            },
          },
        },
      },
    },
  });
});
</script>
