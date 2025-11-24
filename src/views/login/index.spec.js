import { mountComponent, checkInput, mockingApiCreate} from "@/utils/testUtils";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import component from './index.vue';

import { form, post, submited, formData } from './index.js';

let wrapper = mountComponent(component);

describe(`test component inputs`, () => {
    it("check inputs", () => {
        checkInput(wrapper, '[name="email"]', "required|email");
        checkInput(wrapper, '[name="password"]', "required");
    });
});


describe('test moking api create', () => {
    form.value = {
        email: "1@1.com",
        password: "123456",
    },
        describe('called api create data', () => {
            return mockingApiCreate(wrapper, '/signin', form, submited, post, formData(), null)
        });
});

