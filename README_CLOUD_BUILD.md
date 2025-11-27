# 云打包快速开始

## 🚀 最简单的使用方法

### 1. 将代码上传到 GitHub

```bash
# 如果还没有初始化 Git
git init
git add .
git commit -m "准备云打包"

# 在 GitHub 上创建新仓库，然后：
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

### 2. 触发构建

**方式一：自动构建**
- 直接推送代码到 main 分支，GitHub Actions 会自动开始构建

**方式二：手动触发**
1. 打开你的 GitHub 仓库页面
2. 点击顶部的 **"Actions"** 标签
3. 在左侧选择 **"Build Android APK"**
4. 点击右侧的 **"Run workflow"** 按钮
5. 选择分支（通常是 main），点击绿色的 **"Run workflow"**

### 3. 下载 APK

1. 等待构建完成（通常 5-10 分钟）
2. 在 Actions 页面找到最新的构建记录（绿色 ✓ 表示成功）
3. 点击进入构建详情
4. 滚动到底部，找到 **"Artifacts"** 部分
5. 点击 **"app-release"** 下载
6. 解压 ZIP 文件，里面就是 `app-release.apk`

## 📱 安装 APK

1. 将 APK 文件传输到 Android 手机
2. 在手机上打开文件管理器
3. 找到 APK 文件并点击安装
4. 如果提示"禁止安装未知来源应用"，需要在设置中允许安装

## ⚙️ 自定义配置

### 修改应用名称和版本

编辑 `android/app/build.gradle`：
```gradle
defaultConfig {
    applicationId "com.romanticstars.app"  // 应用ID
    versionCode 1                          // 版本号（数字）
    versionName "1.0"                      // 版本名称（字符串）
}
```

### 修改应用名称显示

编辑 `android/app/src/main/res/values/strings.xml`：
```xml
<string name="app_name">浪漫星空</string>
```

## 🔧 故障排除

**构建失败？**
- 查看 GitHub Actions 的日志，找到错误信息
- 常见问题：依赖版本冲突、配置文件错误

**APK 无法安装？**
- 确保手机允许安装未知来源应用
- 检查 Android 版本是否满足最低要求（通常是 Android 5.0+）

**需要更新代码后重新打包？**
- 修改代码后，提交并推送到 GitHub
- 构建会自动触发，或手动触发一次

## 📚 更多信息

详细说明请查看 `CLOUD_BUILD.md` 文件。

