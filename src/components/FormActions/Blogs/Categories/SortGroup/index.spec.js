import { mountComponent, deepClone, checkInput, mockingApiCreate, mockingApiUpdate, mockingApiGet } from "@/utils/testUtils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';

import { form, post, get, router, formData, isEdit, submited } from './index.js';

let wrapper = mountComponent(component);


describe('test moking api create', () => {
    form.value.groups = [{
        name: "blog-category",
        id: 1
    }]
    describe('called api create data', () => {
        return mockingApiCreate(wrapper, '/blog-categories/sort', form, submited, post, formData(), null, '')
    });
});


describe('test moking api show', () => {
    describe('called api show data', () => {
        return mockingApiGet(wrapper, '/blog-categories?pagination=all', 'handleShow', get)
    });
});

