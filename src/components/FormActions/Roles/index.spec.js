import { mountComponent, deepClone, checkInput, mockingApiCreate, mockingApiUpdate, mockingApiGet } from "@/utils/testUtils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';

import { form, post, get, router, formData, isEdit, submited } from './index.js';

let wrapper = mountComponent(component);

describe(`test component inputs`, () => {
    it("check inputs", () => {
        checkInput(wrapper, '[name="locale"]');
        checkInput(wrapper, '[name="name"]', "required|min:3|max:191");
        checkInput(wrapper, '[name="description"]', "max:10000");
    });
});

describe('test moking api create', () => {
    isEdit.value = false;
    form.value = {
        name: "role",

    },
        describe('called api create data', () => {
            return mockingApiCreate(wrapper, '/roles', form,submited, post, formData(), router, '/roles')
        });
});

describe('test moking api update', () => {
    isEdit.value = true;
    form.value = {
        name: "role Update",
        description : "permission description",
        'permissions_ids[0]' : "1",
    },
        describe('called api update data', () => {
            return mockingApiUpdate(wrapper, '/roles/1', form, submited, post, formData(), router, '/roles')
        });
});


describe('test moking api show', () => {
    describe('called api show data', () => {
        return mockingApiGet(wrapper, '/roles/1', 'handleShow', get)
    });
});