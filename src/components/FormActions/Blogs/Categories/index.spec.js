import { mountComponent, deepClone, checkInput, mockingApiCreate, mockingApiUpdate, mockingApiGet } from "@/utils/testUtils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';

import { form, post, get, router, formData, isEdit, submited } from './index.js';

let wrapper = mountComponent(component);

describe(`test component inputs`, () => {
    it("check inputs", () => {
        checkInput(wrapper, '[name="locale"]');
        checkInput(wrapper, '[name="slug"]', "required|alpha_dash|min:3|max:50");
        checkInput(wrapper, '[name="name"]', "required|min:3|max:100");
        checkInput(wrapper, '[name="visible"]');
    });
});


describe('test moking api create', () => {
    isEdit.value = false;
    form.value = {
        name: "blog-category",
        visible: true

    },
        describe('called api create data', () => {
            return mockingApiCreate(wrapper, '/blog-categories', form, submited, post, formData(), router, '/blog-categories')
        });
});


describe('test moking api update', () => {
    isEdit.value = true;
    form.value = {
        name: "blog-category Update",
        visible: true
    },
        describe('called api update data', () => {
            return mockingApiUpdate(wrapper, '/blog-categories/1', form, submited, post, formData(), router, '/blog-categories')
        });
});


describe('test moking api show', () => {
    describe('called api show data', () => {
        return mockingApiGet(wrapper, '/blog-categories/1', 'handleShow', get)
    });
});

