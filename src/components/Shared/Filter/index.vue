<template>
  <section class="d-flex justify-end align-center ga-2 ms-auto">
    <!-- filter dropdown -->
    <div class="text-center">
      <Button
        gradient="true"
        radius="15px"
        height="43"
        :width="$vuetify.display.mdAndUp ? 95 : 48"
        class="d-flex justify-center align-center"
      >
        <span class="d-none d-md-inline ms-3 me-1 font-size-12">{{ $t("filter") }}</span>
        <Image class="me-md-4" name="filter.svg" />
        <v-menu activator="parent" :close-on-content-click="false">
          <v-list class="rounded-lg" style="min-width:230px">
            <v-list-subheader
              class="text-center font-weight-bold font-size-16 font-din text-black"
            >
              {{ $t("filter_by") }}
            </v-list-subheader>

            <slot></slot>
          </v-list>
        </v-menu>
      </Button>
    </div>

    <!-- clear button -->
    <OutlinedButton
      color="primary"
      radius="15px"
      class="p-2 d-flex justify-center align-center"
      height="43"
      :width="$vuetify.display.mdAndUp ? 85 : 48"
      @click.stop="$emit('reset')"
    >
      <span class="d-none d-md-inline font-weight-bold font-size-12">
        {{ $t("clear") }}</span
      >
      <v-icon class="d-inline d-md-none" size="20">mdi-close-circle-outline</v-icon>
    </OutlinedButton>

    <!-- search button -->
    <Button
      color="primary"
      radius="15px"
      class="p-2 d-flex justify-center align-center"
      height="43"
      :width="$vuetify.display.mdAndUp ? 85: 48"
      @click.stop="$emit('search')"
    >
      <span class="font-weight-bold d-none d-md-inline font-size-12">
        {{ $t("search") }}
      </span>
      <v-icon class="d-inline d-md-none" size="20">mdi-magnify</v-icon>
    </Button>
  </section>
</template>

<script setup></script>
