module.exports = {
  // 配置使用的插件
  plugins: {
    // autoprefixer: {
    //   // 给css加上前缀
    //   // vuecli已经配置了这个 这里再配置就冲突

    //   // 配置兼容环境信息
    //   browsers: ["Android >= 4.0", "iOS >= 8"],
    // },
    'postcss-pxtorem': {
      // 把px -> rem
      rootValue: 37.5,
      // 配置转换的css属性 *是涉及属性都转
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
