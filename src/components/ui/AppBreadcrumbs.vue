<template>
  <div class="container">
    <nav class="breadcrumb">
      <ol>
        <li class="breadcrumb-item">
          <router-link
            class="no-underline hover:underline"
            :to="{ name: 'home' }"
            >{{ $t("Home") }}
          </router-link>
        </li>
        <li v-for="(crumb, idx) in crumbs" :key="idx" class="breadcrumb-item">
          <router-link
            v-if="!isLatest(idx)"
            :to="crumb.to"
            class="no-underline hover:underline"
            v-text="$t(crumb.text)"
          />
          <span v-else class="text-gray-400" v-text="$t(crumb.text)"></span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "AppBreadcrumbs",
  setup() {
    const route = useRoute();
    const crumbs = computed(() => {
      let pathArray = route.path.split("/");
      pathArray.shift();
      return pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: route.matched[idx].meta.breadCrumb || path,
        });
        return breadcrumbArray;
      }, []);
    });

    const isLatest = (idx) => idx === crumbs.value.length - 1;

    return { crumbs, isLatest };
  },
};
</script>
<style>
/* .breadcrumb-item {
        &::after {
            padding: 0 .5rem;
            color: rgb(156, 163, 175);
            content: '/';
        }

        &:last-child {
            &::after {
                content: '';
            }
        }
    } */
</style>
