import { vi } from 'vitest'
import { ref } from 'vue'

// Mock vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: ref('en'),
    t: vi.fn((key) => key),
  }),
}))

// Mock Pinia stores
vi.mock('@/stores/locale', () => ({
  useLocaleStore: () => ({
    localeValue: ref('en'),
    setLocaleApp: vi.fn()
  })
}))

import {
  mountComponent,
  mockingApiUpdate,
  mockingApiGet
} from "@/utils/testUtils";

import { describe, vi } from 'vitest';
import component from './index.vue';

import {
  get,
  post,
  form,
  section_groups,
  handleShow,
  handleShowSection,
  submitForm,
  generateFormData,
} from './index.js';

let wrapper = mountComponent(component);

wrapper.vm.$route.params.id = 1;


describe('test mocking api show section groups', () => {

  wrapper.vm.handleShowWithParams = () => handleShow('1')

  describe('called api show section groups data', () => {
    return mockingApiGet(
      wrapper,
      'project-setting-groups/1/project-setting-sections',
      'handleShowWithParams',
      get
    )
  });
});

describe('test mocking api show specific section', () => {
  wrapper.vm.section = { key: 'example-key', selectedLocale: 'en', translatable: true }

  section_groups.value = [
    {
      project_settings: [
        { key: 'example-key', selectedLocale: 'en', translatable: true }
      ]
    }
  ];

  
  wrapper.vm.handleShowSectionWithParams = () =>
    handleShowSection('1', '1', wrapper.vm.section, 0, 0)

  describe('called api show section data', () => {
    return mockingApiGet(
      wrapper,
      'project-setting-groups/1/project-setting-sections/1/project-settings/example-key',
      'handleShowSectionWithParams',
      get
    )
  });
});


describe('test mocking api update setting', () => {
  wrapper.vm.section = {
    key: 'example-key',
    value: 'updated value',
    name: 'Test Setting',
    type: { name: 'text' },
    selectedLocale: 'en'
  };

  form.value = {
    value: "updated value",
    main_image: { path: null },
    number: 1
  };

  describe('called api update setting data', () => {
    return mockingApiUpdate(
      wrapper,
      'project-setting-groups/1/project-setting-sections/1/project-settings/example-key',
      form,
      () => submitForm('1', '1', wrapper.vm.section),
      post,
      generateFormData(wrapper.vm.section),
    )
  });
});
