import './shared';
import app from './myApp'
import mixins from './mixins/index'
import router from './router/index'
import { i18n, VeeValidate, vuetify, emitter,pinia  } from './plugins'
app.provide('emitter', emitter)
app.use(pinia)
app.use(vuetify)
app.use(VeeValidate);
app.use(router)
app.use(i18n)
app.mixin(mixins)
app.mount('#app')
