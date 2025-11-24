import {
  mountComponent,
  checkInput,
  mockingApiUpdate,
  mockingApiGet
} from '@/utils/testUtils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import component from './index.vue'

import { form, post, get, router, formData, submited } from './index.js'

let wrapper = mountComponent(component)

// Test for inputs and validation
describe(`test component inputs`, () => {
  it('check inputs', () => {
    checkInput(wrapper, '[name="firstname"]', 'required|min:3|max:50')
    checkInput(wrapper, '[name="lastname"]', 'required|min:3|max:50')
    checkInput(wrapper, '[name="phone"]', 'numeric|numeric_min:9|numeric_max:15')
  })
})

describe('test moking api update', () => {
  ;(form.value = {
    firstname: 'Unit',
    lastname: 'Test',
    phone: '123456789',
    country_code: ''
  }),
    describe('called api update data', () => {
      return mockingApiUpdate(wrapper, '/profile', form, submited, post, formData(), router, null)
    })
})

describe('test moking api show', () => {
  describe('called api show data', () => {
    return mockingApiGet(wrapper, '/profile', 'handleShow', get)
  })
})
