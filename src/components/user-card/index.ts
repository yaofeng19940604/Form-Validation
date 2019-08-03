// components/user-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSetting: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAvatarTap: function() {
      this.triggerEvent('avatartap', {}, {})
    },

    onSettingTap: function () {
      this.triggerEvent('settingtap', {}, {})
    },
  }
})
