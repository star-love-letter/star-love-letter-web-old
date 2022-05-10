<template>
  <el-container class="home-container" v-title data-title="你的校园小情书 — 星愿墙">
    <el-header class="w-11/12">
      <img src="../../assets/logo1.png" alt="logo" class="w-14" @click="$router.push('/TableList');">
      <el-menu class="menu <md:hidden" :default-active="activeIndex" mode="horizontal" @select="handleSelect"
        text-color="#000" active-text-color="#fff" background-color="#FF7F50">
        <el-menu-item index="/TableList">
          <i class="ico fas fa-clipboard"></i>
          表白墙
        </el-menu-item>
        <el-menu-item index="/Confession">
          <i class="ico fas fa-heart"></i>
          我要表白
        </el-menu-item>
        <el-menu-item index="/Help">
          <i class="ico fas fa-question"></i>
          帮助
        </el-menu-item>
      </el-menu>
      <!-- 列表图标 -->
      <div class="w-8 h-8 hidden <md:flex items-center justify-center m-4 bg-stone-500 bg-opacity-50 rounded-1/2"
        @click="moblie.showMenu = !moblie.showMenu">
        <i class="fas fa-thin fa-list text-white"></i>
      </div>
      <!-- 移动端menu -->
      <div v-show="moblie.showMenu"
        class="w-full h-40 bg-white absolute top-15 bottom-0 left-0 right-0 z-10 border-1 border-solid border-gray-300 rounded-b-lg p-2">
        <router-link active-class="menuActive" to="/TableList" class="p-3 border-b-1 border-gray-300 border-solid block text-center text-sm">
          <i class="ico fas fa-clipboard"></i>
          表白墙
        </router-link>
        <router-link active-class="menuActive" to="/Confession" class="p-3 border-b-1 border-gray-300 border-solid block text-center text-sm">
          <i class="ico fas fa-heart"></i>
          我要表白
        </router-link>
        <router-link active-class="menuActive" to="/Help" class="p-3 block text-center text-sm">
          <i class="ico fas fa-question"></i>
          帮助
        </router-link>
      </div>




      <template v-if="isLogin">
        <div class="avatar_box_lg hidden <lg:block" @click="moblie.showUserInfo = !moblie.showUserInfo">
          <img src="@/assets/img/avatar.jpg" alt="">
        </div>
        <div v-show="moblie.showUserInfo" class="transition-box-mobile min-w-1/3 p-2">
          <ul>
            <li class="p-3">
              <span class="text-orange-400">用户名：</span>
              {{ this.userInfo.name }}
            </li>
            <li class="p-3">
              <span class="text-orange-400">用户邮箱：</span>
              <div class="text">
                {{ this.userInfo.email }}
              </div>
            </li>
            <li class="p-3">
              <span class="text-orange-400">注册账号的时间：</span>
              <div class="text">
                {{ this.toDates(this.userInfo.createTime) }}
              </div>
            </li>
            <li class="p-3">
              <span class="text-orange-400">上次登录的时间：</span>
              <div class="text">
                {{ this.toDates(this.userInfo.lastTime) }}
              </div>
            </li>
          </ul>
        </div>
      </template>

      <div class="flex items-center block">
        <!-- 搜索图标 -->
        <div
          class="w-8 h-8 hidden <lg:flex items-center justify-center m-4 bg-stone-500 bg-opacity-50 rounded-1/2 text-white"
          @click="moblie.showSearchInput = !moblie.showSearchInput">
          <i class="fas fa-search"></i>
        </div>
        <!-- 搜索框(mobile) -->
        <div class="absolute top-15 bottom-0 left-0 right-0 z-10 p-1 h-12 bg-stone-400 bg-opacity-60 rounded-b-lg"
          v-show="moblie.showSearchInput">
          <el-input v-model="SearchKeyword" placeholder="请输入你想搜索的数据">
            <el-button @click="goSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>



        <!-- 搜索框(pc) -->
        <el-input v-model="SearchKeyword" @keyup.enter.native="goSearch" placeholder="请输入你想搜索的数据" class="<lg:hidden">
          <el-button @click="goSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <div v-if="isLogin" class="userAvatar <lg:hidden" @mouseenter="showUserInfo = !showUserInfo"
          @mouseleave="showUserInfo = !showUserInfo">
          <!-- 用户头像   -->
          <div class="avatar_box">
            <img src="@/assets/img/avatar.jpg" alt="">
          </div>
          <!--   用户个人信息   -->
          <div v-show="showUserInfo" class="transition-box">
            <ul>
              <li>
                <span class="text-orange-400">用户名：</span>
                {{ this.userInfo.name }}
              </li>
              <li>
                <span class="text-orange-400">用户邮箱：</span>
                <div class="text">
                  {{ this.userInfo.email }}
                </div>
              </li>
              <li>
                <span class="text-orange-400">注册账号的时间：</span>
                <div class="text">
                  {{ this.toDates(this.userInfo.createTime) }}
                </div>
              </li>
              <li>
                <span class="text-orange-400">上次登录的时间：</span>
                <div class="text">
                  {{ this.toDates(this.userInfo.lastTime) }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 退出登录 -->
        <el-button v-if="isLogin" type="primary" round size="small" @click="Logout" class="<lg:hidden">退出登录</el-button>
        <!-- 登录用户 -->
        <el-button v-else type="primary" round size="small" @click="Login" class="<lg:hidden">登录用户</el-button>
        <!-- 退出登录 -->
        <button v-if="isLogin" size="small" @click="Logout"
          class="hidden <lg:block w-18 h-8 bg-sky-500 rounded-lg text-xs text-white">退出登录</button>
        <!-- 登录用户 -->
        <button v-else size="small" @click="Login"
          class="hidden <lg:block w-18 h-8 bg-sky-500 rounded-lg text-xs text-white">登录用户</button>
      </div>

    </el-header>

    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null,
      // 是否展示pc端用户信息
      showUserInfo: false,
      //是否为手机端
      isMobile: false,
      activeIndex: '1',
      // 搜索关键词
      SearchKeyword: '',
      //是否展开侧边导航栏
      changeMenuState: false,
      isLogin: false,
      moblie: {
        // 是否展示移动端用户信息
        showUserInfo: false,
        showSearchInput: false,
        showMenu: false,
      }
    }
  },
  created() {
    //获取当前是否为手机端
    this.isMobile = this.getIsMobile();
    //获取路由路径
    this.activeIndex = this.$route.path;
    // 获取用户信息
    this.getUserInfo()
  },
  watch: {
    userInfo(newV, oldV) {
      this.isLogin = !this.isNull(newV)
    }
  },
  methods: {
    Login() {
      this.$router.push('/Login');
    },
    Logout() {
      this.$http.post('/api/user/logout').then((response) => {
        this.setToken('')
        this.$message.success('退出登录');
        this.$router.push('/Login');
      })
    },
    //跳转搜索页面
    goSearch() {
      this.$router.push({
        name: 'Search',
        params: { keyword: this.SearchKeyword }
      })
    },
    //跳转导航
    handleSelect(key, keyPath) {
      this.$router.push({
        path: key
      })
    },
    //打开或关闭侧边导航栏
    changeMenuState() {
      this.isMenuState = !this.isMenuState
    },
    //获取用户信息
    async getUserInfo() {

      //当token为空
      if (this.isNull(this.getToken())) {
        this.userInfo = null
        return
      }

      await this.$http.get('/api/user/user', {
        keyword: this.keyword,
        page_index: this.page_index,
        page_size: this.page_size
      }).then((data) => {
        this.userInfo = data.data
      }).catch((res) => {
        this.userInfo = null
      })
    }
  }
}
</script>
<style scoped lang="less">
.el-header {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.25rem;
  position: relative;
  background-color: #FF7F50;
}

.el-input {
  margin-right: 100px;
}

.transition-box-mobile {
  background-color: #fff;
  position: absolute;
  top: 3.7rem;
  left: 0;
  border-radius: 10px;
  font-size: 16px;
  color: #555;
  overflow: hidden;
  z-index: 998;
  box-shadow: 5px 5px 10px #999;
  border: 1px solid #e4e4e4;
}

.transition-box {
  width: 230px;
  background-color: #fff;
  position: absolute;
  top: 30px;
  right: -83px;
  border-radius: 10px;
  font-size: 16px;
  color: #555;
  overflow: hidden;
  z-index: 998;
  box-shadow: 5px 5px 10px #999;
  border: 1px solid #e4e4e4;

  ul {
    margin-top: 30px;

    li {
      width: 100%;
      border-bottom: 1px solid #e3e3e3;
      padding: 10px 10px 22px 10px;

      .text {
        padding-left: 20px;
        font-size: 14px;
        padding-top: 10px;
        text-align: center;
      }
    }

    li:last-child {
      border: 0;
    }
  }
}

.el-button {
  margin-left: 20px;
}

.userAvatar {
  position: relative;
}

.userAvatar:hover .avatar_box {
  height: 80px;
  width: 80px;
  top: -25px;
  right: -10px;
}

.avatar_box_lg {
  height: 50px;
  width: 50px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 0 10px #999;
  background-color: #fff;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 50%;
  }
}

.avatar_box {
  height: 50px;
  width: 50px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 0 10px #999;
  background-color: #fff;
  cursor: pointer;
  z-index: 999;
  position: absolute;
  top: -25px;
  right: 10px;
  transition: .3s all;
}

.avatar_box img {
  width: 100%;
  border-radius: 50%;
}

.home-container {
  background-color: #FF7F50;
  height: 100%;
  margin-right: calc(100% - 100vw);
}

.item,
.el-header {
  font-size: 16px;
}

.el-aside {
  background-color: #82ADD9;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.menu i {
  color: #000;
}

.menuActive {
  color: #FF7F50;
}
</style>
