<template>
  <section
    class="auth d-flex justify-center align-center"
    style="background-image: url(/assets/images/bg-login.png)"
  >
    <div class="auth__container">
      <div class="text-center mb-2">
        <Image width="120px" name="avatar-login.png" />
      </div>
      <div class="auth__container__card px-14 pt-4 pb-3">
        <Form @submit="handleSubmit" class="mt-4">
          <div class="mb-4">
            <InputText
              validation="required|email"
              :form="form"
              name="email"
              :label="$t('example.email')"
              imageName="email.png"
              :hint="$t('enter_email')"
            />
          </div>
          <div class="mb-4">
            <InputPassword
              validation="required"
              :form="form"
              name="password"
              :label="$t('example.password')"
              imageName="password.png"
              :hint="$t('enter_password')"
            />
          </div>
          <div>
            <Button
              type="submit"
              height="48"
              color="primary"
              class="mt-4 mt-7 mb-5"
              radius="20px"
              block
              :loading="loadingPost"
            >
              <span class="font-weight-bold">
                {{ $t("example.signin") }}
              </span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>
<script setup>
import {  form, submited, loadingPost} from "./index.js";
import { useRouter } from "vue-router";

const router = useRouter();

const handleSubmit = () => {
  submited(router);
};

</script>
