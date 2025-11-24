import { mountComponent, deepClone, checkInput, mockingApiCreate, mockingApiUpdate, mockingApiGet } from "@/utils/testUtils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';

import { form, post, get, router, formData, isEdit, submited } from './index.js';

let wrapper = mountComponent(component);

describe(`test component inputs`, () => {
    it("check inputs", () => {
        checkInput(wrapper, '[name="locale"]');
        checkInput(wrapper, '[name="name"]', "required");
    });
});


describe('test moking api create', () => {
    isEdit.value = false;
    form.value = {
        name: "Topic",

    },
        describe('called api create data', () => {
            return mockingApiCreate(wrapper, '/topics', form,submited, post, formData(), router, '/topics')
        });
});


describe('test moking api update', () => {
    isEdit.value = true;
    form.value = {
        name: "Topic Update",
    },
        describe('called api update data', () => {
            return mockingApiUpdate(wrapper, '/topics/1', form, submited, post, formData(), router, '/topics')
        });
});


describe('test moking api show', () => {
    describe('called api show data', () => {
        return mockingApiGet(wrapper, '/topics/1', 'handleShow', get)
    });
});

