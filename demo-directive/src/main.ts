import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// 引入防抖指令
import debounceDirective from './directives/debounce';

app.directive('debounce', debounceDirective);
app.mount('#app');
