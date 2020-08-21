<template>
  <el-dropdown class="fe-layout-dropdown" trigger="hover" szie="small" @command="changeLocale">
    <span class="el-dropdown-link">
      <i class="fa fa-language mr-5"></i>
      {{ $languages.find((i) => i.value === $i18n.locale).label }}
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="language in $languages" :key="language.value" :command="language.value">
        <i :class="$i18n.locale === language.value ? 'fa fa-dot-circle-o mr-5' : 'fa fa-circle-o mr-5'" />
        {{ language.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import CookieService from '@/util/CookieService';

export default {
  name: 'header-locales',
  methods: {
    changeLocale(e) {
      if (this.$i18n.locale === e) {
        return;
      }
      this.$i18n.locale = e;
      CookieService.setCookie('Business-Lang', e, 1);
      window.location.reload(true);
    },
  },
};
</script>
