import { describe, beforeEach, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { submited, fetchAffiliateData, get, post } from './index.js'

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

vi.mock('@/stores/locale', () => ({
  useLocaleStore: () => ({
    localeValue: ref('en')
  })
}))

describe('testing affiliates fetchAffiliateData', () => {
  beforeEach(() => {
    get.mockClear()
    get.mockResolvedValue({ data: { affiliate: {} } })
  })

  it('calls get with the correct endpoint', async () => {
    const affiliateIden = '123'
    await fetchAffiliateData(affiliateIden)
    expect(get).toHaveBeenCalledWith(`/affiliates/${affiliateIden}`)
  })
})

describe('testing affiliates submited', () => {
  beforeEach(() => {
    post.mockClear()
    post.mockResolvedValueOnce({})
  })

  it('calls post with the correct endpoint and form data', async () => {
    const affiliateIden = '123'
    await submited(affiliateIden)
    expect(post).toHaveBeenCalledTimes(1)
    expect(post.mock.calls[0][0]).toBe(`/affiliates/${affiliateIden}`)

    const sentForm = post.mock.calls[0][1]
    expect(sentForm).toBeInstanceOf(FormData)
  })
})
