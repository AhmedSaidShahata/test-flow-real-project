import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { createPinia } from 'pinia'

vi.mock('@/composables/useApi', () => ({
  default: vi.fn(() => ({
    post: vi.fn(),
    get: vi.fn(),
    errorsResponse: ref(null),
    loadingGet: ref(false),
    loadingPost: ref(false),
    loadingPut: ref(false),
    loadingDelete: ref(false)
  }))
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  })),
  useRoute: vi.fn(() => ({
    params: {
      id: '1',
      path: 'home',
      identifier: 'home_statistics',
      itemIdentifier: 'home_statistics_active_marketers',
      attributeKey: 'statistics_active_marketers_attribute_1'
    }
  }))
}))

// Mock $t function
const mockI18n = {
  install(app) {
    app.config.globalProperties.$t = (key) => key
  }
}
  

export function mountComponent(wrapper) {
  const pinia = createPinia()
  return mount(wrapper, {
    global: {
      plugins: [pinia, mockI18n],
      mocks: {
        $hasPermission: () => true,
        $route: {
          params: {
            id: 1,
            slug: "blog_slugss"
          }
        }
      }
    }
  })
}
export function checkInput(wrapper, selector, expectedValidation) {
  const formGroup = wrapper.find(selector)
  expect(formGroup.exists()).toBe(true)
  if (expectedValidation) {
    expect(formGroup.attributes('validation')).toBe(expectedValidation)
  }
}

export function checkConditionalInput(wrapper, conditionVar, selector, expectedValue) {
  if (!conditionVar.value) {
    return 
  }
  const formGroup = wrapper.find(selector)
  expect(formGroup.exists()).toBe(true)
  expect(formGroup.element.value).toBe(expectedValue)
}

export const mockingApiCreate = async (
  wrapper,
  endPoint,
  form,
  method,
  post,
  expected,
  router,
  redirect = null,
  reset = false,
  resetData = null
) => {
  post.mockResolvedValueOnce(form)
  await method(router)
  it('expected mocking call api with expected url and data ', () => {
    expect(post).toHaveBeenCalledWith(endPoint, expected)
  })

  if (redirect) {
    it('expected call route with expected route ', () => {
      expect(router.push).toHaveBeenCalledWith(redirect)
    })
  }

  if (reset) {
    await wrapper.vm[resetData]
  }
}

export const mockingApiUpdate = async (
  wrapper,
  endPoint,
  form,
  method,
  post,
  expected,
  router,
  redirect = null,
  reset = false,
  resetData = null
) => {
  post.mockResolvedValueOnce(form)
  await method(router)
  it('expected mocking call api with expected url and data ', () => {
    expect(post).toHaveBeenCalledWith(endPoint, expected)
  })

  if (redirect) {
    it('expected call route with expected route ', () => {
      expect(router.push).toHaveBeenCalledWith(redirect)
    })
  }

  if (reset) {
    await wrapper.vm[resetData]
  }
}

export const mockingApiGet = async (wrapper, endPoint, method, get) => {
  get.mockResolvedValueOnce()
  await wrapper.vm[method]()
  it('expected mocking call api with expected url ', () => {
    expect(get).toHaveBeenCalledWith(endPoint)
  })
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  }

  const clonedObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }

  return clonedObj
}
