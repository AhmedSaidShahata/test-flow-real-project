import {
  mountComponent,
  deepClone,
  checkInput,
  mockingApiCreate,
  mockingApiUpdate,
  mockingApiGet
} from '@/utils/testUtils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { config } from '@vue/test-utils'
import component from './index.vue'
import { form, post, get, router, formData, isEdit, submited, route } from './index.js'

import { defineRule } from 'vee-validate'
import { required, min, max } from '@vee-validate/rules'


defineRule('required', required)

config.global.stubs = {
  ...config.global.stubs,
  'v-rating': true,
  'v-spacer': true,
}

let wrapper = mountComponent(component)

describe(`test component inputs create mode`, () => {
  isEdit.value = false

  it('check inputs', () => {
    if (!isEdit.value) {
      checkInput(
        wrapper,
        '[name="image"]',
        'size:1024|mimes:image/jpeg,image/jpeg,image/png'
      )
    } else {
      checkInput(
        wrapper,
        '[name="image"]',
        'required|size:1024|mimes:image/jpeg,image/jpeg,image/png'
      )
    }

    checkInput(wrapper, '[name="name"]', 'required|min:3|max:100')
    checkInput(wrapper, '[name="position"]', 'required|min:3|max:100')
    checkInput(wrapper, '[name="text"]', 'required|min:3|max:10000')
    checkInput(wrapper, '[name="customer_type"]', 'required')
    checkInput(wrapper, '[name="rating"]', 'required')
  })
})

describe('test moking api create', () => {
  isEdit.value = false
  let mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })
  form.value = {
    name: 'name',
    position: 'desc',
    customer_type: 2,
    text: 'text',
    rating: 3,
    image: mockFile,
  }

  describe('called api create data', () => {
    return mockingApiCreate(
      wrapper,
      '/customer-reviews',
      form,
      submited,
      post,
      formData(),
      router,
      '/customer-reviews',
      null,
      null
    )
  })
})

describe('test moking api update', () => {
  isEdit.value = true
  let mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })
  form.value = {
    name: 'name',
    position: 'desc',
    customer_type: 2,
    text: 'text',
    rating: 3,
    image: mockFile,
  }

  describe('called api update data', () => {
    return mockingApiUpdate(
      wrapper,
      `/customer-reviews/${route?.params?.id}`,
      form,
      submited,
      post,
      formData(),
      router,
      '/customer-reviews',
      null,
      null
    )
  })
})

describe('test moking api show', () => {
  describe('called api show data', () => {
    return mockingApiGet(wrapper, `/customer-reviews/${route?.params?.id}`, 'handleShow', get)
  })
})
