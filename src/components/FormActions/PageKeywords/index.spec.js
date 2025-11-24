import {
  mountComponent,
  deepClone,
  checkInput,
  mockingApiCreate,
  mockingApiUpdate,
  mockingApiGet
} from '@/utils/testUtils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import component from './index.vue'

import {
  form,
  post,
  get,
  router,
  formData,
  submited,
  route,
  pageSlug,
  deleteKeywordFromPage
} from './index.js'

let wrapper = mountComponent(component)

describe(`test component inputs`, () => {
  it('check inputs', () => {
    checkInput(wrapper, '[name="keywords"]', 'numeric')
  })
})

describe('test moking api create', () => {
  pageSlug.value = 'slug'
  ;(form.value = {
    keywords: [1, 2, 3]
  }),
    describe('called api create data', () => {
      return mockingApiCreate(
        wrapper,
        `/pages/slug/keywords`,
        form,
        submited,
        post,
        formData(),
        router,
        null
      )
    })

})

// describe('test moking api show', () => {
//   describe('called api show data', () => {
//     return mockingApiGet(wrapper, '/keywords', 'handleShow', get)
//   })
// })
