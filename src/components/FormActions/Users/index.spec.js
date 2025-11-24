import { mountComponent, deepClone, checkInput, mockingApiCreate, mockingApiUpdate, mockingApiGet } from "@/utils/testUtils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';

import { form, post, get, router, formData, isEdit, submited } from './index.js';
vi.mock('vue-i18n', () => {
  return {
    useI18n: () => ({
      t: (key) => key,
    }),
  };
});


let wrapper = mountComponent(component);

describe(`test component inputs`, () => {
    it("check inputs", () => {
        checkInput(wrapper, '[name="firstname"]',"required|min:3|max:20");
        checkInput(wrapper, '[name="lastname"]', "required|min:3|max:20");
        checkInput(wrapper, '[name="email"]',"required|email|max:50");
        checkInput(wrapper, '[name="phone"]',"numeric|numeric_min:9|numeric_max:15");
        checkInput(wrapper, '[name="role"]');

    });
});

describe('test moking api create', () => {
    isEdit.value = false;
    form.value = {
        firstname: "jjj",
        lastname: "ttt",
        role: 0,
        email: "rrr@ggg.kkkk",
        password: "R@dw1234",
        phone: '999999999',
        country_code: '00966',
        image: { path: null },

    },
        describe('called api create data', () => {
            return mockingApiCreate(wrapper, '/users', form,submited, post, formData(), router, '/users')
        });
});

describe('test moking api update', () => {
    isEdit.value = true;
    form.value = {
        role: 0,
    },
        describe('called api update data', () => {
            return mockingApiUpdate(wrapper, '/users/1', form, submited, post, formData(), router, '/users')
        });
});

describe('test moking api show', () => {
    describe('called api show data', () => {
        return mockingApiGet(wrapper, '/users/1', 'handleShow', get)
    });
});