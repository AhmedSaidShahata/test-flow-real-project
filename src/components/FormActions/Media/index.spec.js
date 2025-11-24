import {
  mountComponent,
  checkInput,
} from '@/utils/testUtils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';
import { form, post, get, formData, submited, id, fetchData } from './index.js';

describe('test component inputs', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountComponent(component, {
      props: {
        id: '1',
        slug: 'blog_slugss'
      }
    });
  });

  it('check inputs', () => {
    checkInput(wrapper, '[name="locale"]');
    checkInput(wrapper, '[name="title"]', 'min:3|max:255');
    checkInput(wrapper, '[name="description"]', 'min:3|max:255');
  });
});

describe('test mocking api create', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountComponent(component, {
      props: {
        id: '1',
        slug: 'blog_slugss'
      }
    });
    // Set form and id values
    form.value = {
      title: 'title',
      description: 'description'
    };
    id.value = '1';
  });

  it('called api create data', async () => {
    const mockEmit = vi.fn();
    const expectedFormData = formData();
    post.mockResolvedValueOnce({ data: form.value });
    await submited(mockEmit, 'blog_slugss');
    expect(post).toHaveBeenCalledWith('/blogs/blog_slugss/medias/1', expectedFormData);
    expect(mockEmit).toHaveBeenCalledWith('close');
  });
});

describe('test mocking api get', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountComponent(component, {
      props: {
        id: '1',
        slug: 'blog_slugss'
      }
    });
    form.value = { title: '', description: '' };
    id.value = '';
  });

  it('fetchData updates form and id correctly', async () => {
    const mockResponse = {
      data: {
        medium: {
          media_meta: {
            meta_title: 'test-title',
            alternative_text: 'test-description'
          }
        }
      }
    };
    get.mockResolvedValueOnce(mockResponse);
    await fetchData('blog_slugss', '1');
    expect(get).toHaveBeenCalledWith('/blogs/blog_slugss/medias/1');
    expect(id.value).toBe('1');
  });
});