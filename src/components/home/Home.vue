<template>
  <div
    class="w-full h-full"
  >
    <div
      class="
        w-1/3
        <lg:w-3/5
        <md:w-4/5
        bg-zinc-400
        p-4
        rounded-lg
        mt-15
        mb-auto
        mr-auto
        ml-auto
      "
    >
      <span class="text-center block text-base text-dark-700 m-2"
        >微信小程序</span
      >
      <img class="m-auto" src="@/assets/AppletsQRcode_0.16.jpg" />
    </div>
    <div class="bg-dark-100 h-15 w-full absolute bottom-0 leading-15 text-center text-white text-sm">
      <a href="https://beian.miit.gov.cn" target="_blank">
        鲁ICP备19013208号</a
      >
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
</style>
