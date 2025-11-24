import { mountComponent, checkInput, mockingApiCreate, mockingApiGet } from '@/utils/testUtils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import component from './index.vue'

import { form, post, get, router, formData, submited } from './index.js'

let wrapper = mountComponent(component)

describe(`test component inputs`, () => {
  it('check inputs', () => {
    checkInput(wrapper, '[name="locale"]') 
    checkInput(wrapper, '[name="name"]', 'min:3|max:190')
    checkInput(wrapper, '[name="value"]', 'required|min:3|max:190')
  })
})

describe('test moking api create', () => {
  (form.value = {
    name: '',
    value: '',
  }),
    describe('called api create data', () => {
      return mockingApiCreate(
        wrapper,
        '/pages/home/sections/home_statistics/section-items/home_statistics_active_marketers/custom-attributes/statistics_active_marketers_attribute_1',
        form,
        submited,
        post,
        formData(),
        router,
        '/pages/home/sections/home_statistics/section-items/home_statistics_active_marketers/custom-attributes'
      )
    })
})

describe('test moking api show', () => {
  describe('called api show data', () => {
    return mockingApiGet(wrapper, '/pages/home/sections/home_statistics/section-items/home_statistics_active_marketers/custom-attributes/statistics_active_marketers_attribute_1', 'handleShow', get)
  })
})
