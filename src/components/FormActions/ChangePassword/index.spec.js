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
    checkInput(wrapper, '[name="password"]', 'required|min:8|max:50')
    checkInput(wrapper, '[name="new_password"]', 'required|min:8|max:50')
    checkInput(wrapper, '[name="new_password_confirmation"]', 'required|min:8|max:50|confirmed:@new_password')
  })
})

describe('test moking api update', () => {
  ;(form.value = {
  password: "pass1",
  new_password: "pass2",
  new_password_confirmation: "pass2"
}),
    describe('called api update data', () => {
      return mockingApiUpdate(wrapper, '/change-password', form, submited, post, formData(), router, null)
    })
})


