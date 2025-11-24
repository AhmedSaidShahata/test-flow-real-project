import {
  mountComponent,
  checkInput,
  mockingApiCreate,
  mockingApiUpdate,
  mockingApiGet
} from '@/utils/testUtils'
import { describe, it, vi } from 'vitest'
import component from './index.vue'

import {
  form,
  post,
  get,
  router,
  formData,
  isEdit,
  submited,
  handleShow,
  id,
  route
} from './index.js'
import { beforeEach } from 'node:test'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key) => key
  })
}))

vi.mock('@/stores/countries', () => ({
  useCountriesStore: () => ({
    allCountries: [],
    getCountries: vi.fn()
  })
}))

vi.mock('@/stores/locale', () => ({
  useLocaleStore: vi.fn()
}))

let wrapper = mountComponent(component)

describe(`test component inputs`, () => {
  it('check inputs', () => {
    if (!isEdit.value) {
      checkInput(
        wrapper,
        '[name="logo"]',
        'mimes:image/jpeg,image/png,image/jpg|size:1024'
      )
    } else {
      checkInput(
        wrapper,
        '[name="logo"]',
        'required|mimes:image/jpeg,image/png,image/jpg|size:1024'
      )
    }

    checkInput(wrapper, '[name="display_name"]', 'required|min:3|max:100')
    checkInput(wrapper, '[name="registration_number"]', 'required|min:5|max:50')
    checkInput(wrapper, '[name="legal_name"]', 'required|min:3|max:100')
    checkInput(wrapper, '[name="identifier"]', 'required|min:3|max:50|alpha_dash')
    checkInput(wrapper, '[name="country"]', 'required')
    checkInput(wrapper, '[name="city"]', 'required')
    checkInput(wrapper, '[name="contact_name"]', 'required|min:3|max:100')
    checkInput(wrapper, '[name="phone"]', 'required|numeric|numeric_min:9|numeric_max:15')
    checkInput(wrapper, '[name="contact_email"]', 'required|email|min:3|max:50')
  })
})

describe('test mocking api create', () => {
  isEdit.value = false
  form.value = {
    display_name: 'Test Provider',
    registration_number: 'REG123456',
    legal_name: 'Test Provider Legal Name',
    identifier: 'test-provider',
    // country: 1,
    // city: 1,
    phone: '123456789',
    country_code: '00966',
    logo: { path: null, file: null },
    contact_name: 'John Doe',
    contact_email: 'john@example.com'
  }

  describe('called api create data', () => {
    return mockingApiCreate(
      wrapper,
      '/providers',
      form,
      submited,
      post,
      formData(),
      router,
      '/providers'
    )
  })
})

describe('test mocking api update', () => {
  isEdit.value = true
  id.value = 'identtt'
  form.value = {
    display_name: 'Updated Provider',
    registration_number: 'REG123456',
    legal_name: 'Updated Provider Legal Name',
    // identifier: 'identtt',
    // country: 1,
    // city: 1,
    phone: '987654321',
    country_code: '00966',
    logo: { path: null, file: null },
    contact_name: 'Jane Doe',
    contact_email: 'jane@example.com'
  }

  describe('called api update data', () => {
    return mockingApiUpdate(
      wrapper,
      '/providers/identtt',
      form,
      submited,
      post,
      formData(),
      router,
      '/providers'
    )
  })
})

describe('test mocking api show', () => {
  describe('called api show data', () => {
    mockingApiGet(wrapper, `/providers/${route.params.id}`, 'handleShow', get)
  })
})
