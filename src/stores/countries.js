import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "../composables/useApi";
 
const { get } = useApi();
 
export const useCountriesStore = defineStore("allCountriesStore", () => {
    const countries = ref ([]);
 
    const allCountries = computed(() => countries);
 
    async function getCountries() {
        try {
            const response = await get("/countries?pagination=all");
            const countriesData = response.data.data || [];
            countries.value = countriesData;
      
          } catch (error) {
            console.error(error);
          }
    }
 
    return { allCountries, getCountries};
});