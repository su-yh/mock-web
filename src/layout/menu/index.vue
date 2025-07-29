<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 是否菜单 -->
    <template v-if="item.meta.isMenu">
      <template v-if="!item.meta.hidden">
        <template v-if="item.children">
          <!-- 有子节点，表示目录 -->
          <el-sub-menu :index="item.path">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon"/>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>

            <!-- 递归 -->
            <Menu :menuList="item.children"/>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" @click="goRoute">
            <el-icon>
              <component :is="item.meta.icon"/>
            </el-icon>
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </template>
    <template v-else>
      <!-- 非菜单且children 非空 才会将子节点递归 -->
      <Menu :menuList="item.children" v-if="item.children"/>
    </template>
  </template>
</template>


<script setup lang="ts">
// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])

// @ts-ignore
import {useRouter} from 'vue-router';

let $router = useRouter();

const goRoute = (vc: any) => {
  console.log("点击路由路径：", vc.index);
  $router.push(vc.index);
}
</script>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped>

</style>