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

// Add global mock for $hasPermission at the top of the file
config.global.mocks = {
  ...config.global.mocks,
  $hasPermission: vi.fn(() => true)
}

let wrapper = mountComponent(component)

describe(`test component inputs create mode`, () => {
  isEdit.value = false

  it('check inputs', () => {
    if (!isEdit.value) {
      checkInput(
        wrapper,
        '[name="main_image"]',
        'size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'
      )
    } else {
      checkInput(
        wrapper,
        '[name="main_image"]',
        'required|size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'
      )
    }

    checkInput(wrapper, '[name="name"]', 'required|min:3|max:100')
    checkInput(wrapper, '[name="blogDescription"]', 'required|min:3|max:65000')
    checkInput(wrapper, '[name="slug"]', 'alpha_dash|required|min:3|max:50')
    checkInput(wrapper, '[name="meta_title"]', 'required|min:3|max:255')
    checkInput(wrapper, '[name="meta_description"]', 'required|min:3|max:65000')
    checkInput(wrapper, '[name="blog_category"]', 'required')
    checkInput(wrapper, '[name="tags"]')
  })
})

describe(`test component inputs edit more`, () => {
  isEdit.value = true
  it('check inputs', () => {
    checkInput(wrapper, '[name="locale"]')
  })
})

describe('test moking api create', () => {
  isEdit.value = false
  let mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })
  ;(form.value = {
    name: 'name',
    description: 'desc',
    blog_category: 2,
    slug: 's_lug',
    meta_title: 'metaTitle',
    meta_description: 'metaDesc',
    main_image: mockFile,
    tags: [{ name: 'tagName', id: 3 }]
  }),
    describe('called api create data', () => {
      return mockingApiCreate(
        wrapper,
        '/blogs',
        form,
        submited,
        post,
        formData(),
        router,
        '/blogs',
        null,
        null
      )
    })
})

describe('test moking api update', () => {
  isEdit.value = true
  let mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' })

  ;(form.value = {
    name: 'name2',
    description: 'desc2',
    blog_category: 3,
    slug: 's_lug2',
    meta_title: 'metaTitle2',
    meta_description: 'metaDesc2',
    main_image: mockFile,
    tags: [
      { name: 'tagName', id: 3 },
      { name: 'tagName2', id: 2 }
    ]
  }),
    describe('called api update data', () => {
      return mockingApiUpdate(
        wrapper,
        `/blogs/${route?.params?.id}`,
        form,
        submited,
        post,
        formData(),
        router,
        '/blogs',
        null,
        null
      )
    })
})

describe('test moking api show', () => {
  describe('called api show data', () => {
    return mockingApiGet(wrapper, `/blogs/${route?.params?.id}`, 'handleShow', get)
  })
})