import {
  mountComponent,
  checkInput,
  mockingApiCreate,
  mockingApiGet
} from '@/utils/testUtils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import component from './index.vue'

import { form, post, get, router, formData, submited } from './index.js'

let wrapper = mountComponent(component)

describe(`test component inputs`, () => {
  it('check inputs', () => {
    checkInput(wrapper, '[name="locale"]')
    checkInput(wrapper, '[name="name"]', 'required|min:3|max:255')
    checkInput(wrapper, '[name="title"]', 'required|min:3|max:255')
    checkInput(wrapper, '[name="description"]', 'required|min:3|max:40000')
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
        '/pages/home',
        form,
        submited,
        post,
        formData(),
        router,
        '/pages'
      )
    })
})

describe('test moking api show', () => {
  describe('called api show data', () => {
    return mockingApiGet(wrapper, '/pages/home', 'handleShow', get)
  })
})
