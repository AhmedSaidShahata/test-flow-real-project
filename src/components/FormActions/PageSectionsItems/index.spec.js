import { mountComponent, checkInput, mockingApiCreate, mockingApiGet, checkConditionalInput } from '@/utils/testUtils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import component from './index.vue'

import { form, post, get, router, formData, submited, hasDescription, hasTitle } from './index.js'

let wrapper = mountComponent(component)

describe(`test component inputs`, () => {
  it('check inputs', () => {
    checkInput(wrapper, '[name="locale"]')
    checkInput(wrapper, '[name="name"]', 'required|min:3|max:190')
    checkConditionalInput(wrapper, hasTitle, '[name="title"]')
    checkConditionalInput(wrapper, hasDescription, '[name="description"]')
  })
})

describe('test moking api create', () => {
  (form.value = {
    name: '',
    title: '',
    description: ''
  }),
    describe('called api create data', () => {
      return mockingApiCreate(
        wrapper,
        '/pages/home/sections/home_statistics/section-items/home_statistics_active_marketers',
        form,
        submited,
        post,
        formData(),
        router,
        '/pages/home/sections/home_statistics/section-items'
      )
    })
})

describe('test moking api show', () => {
  describe('called api show data', () => {
    return mockingApiGet(wrapper, '/pages/home/sections/home_statistics/section-items/home_statistics_active_marketers', 'handleShow', get)
  })
})
