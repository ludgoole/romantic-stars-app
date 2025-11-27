# 云打包指南

本项目已配置好 GitHub Actions 云打包，无需安装 Android Studio 即可构建 APK。

## 方法一：GitHub Actions（推荐，免费）

### 使用步骤：

1. **将代码推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

2. **触发构建**
   - **自动触发**：每次推送到 `main` 或 `master` 分支时自动构建
   - **手动触发**：
     1. 进入 GitHub 仓库页面
     2. 点击 "Actions" 标签
     3. 选择 "Build Android APK" 工作流
     4. 点击 "Run workflow" 按钮

3. **下载 APK**
   - 构建完成后，在 Actions 页面找到对应的构建记录
   - 点击进入构建详情
   - 在 "Artifacts" 部分下载 `app-release` 文件
   - 解压后即可获得 `app-release.apk`

### 注意事项：
- 首次构建可能需要 5-10 分钟
- APK 文件会保留 30 天
- 确保代码已推送到 GitHub

## 方法二：其他云构建服务

### Codemagic（推荐，对 Capacitor 友好）
1. 访问 https://codemagic.io
2. 使用 GitHub 账号登录
3. 导入你的仓库
4. 选择 Android 平台
5. 使用默认配置即可开始构建

### AppCircle
1. 访问 https://appcircle.io
2. 连接 GitHub 仓库
3. 配置 Android 构建流程
4. 开始构建

## 本地构建（需要 Android SDK）

如果你有 Android SDK，也可以本地构建：

```bash
# 1. 构建 Web 应用
npm run build

# 2. 同步到 Android
npx cap sync android

# 3. 构建 APK（需要 Android SDK）
cd android
./gradlew assembleRelease

# APK 位置：android/app/build/outputs/apk/release/app-release.apk
```

## 签名 APK（用于发布）

如果要发布到应用商店，需要签名 APK：

1. 生成密钥库（仅需一次）：
   ```bash
   keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```

2. 配置签名（在 `android/app/build.gradle` 中添加）：
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file('path/to/my-release-key.jks')
               storePassword 'your-store-password'
               keyAlias 'my-key-alias'
               keyPassword 'your-key-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               ...
           }
       }
   }
   ```

3. 构建签名 APK：
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

## 常见问题

**Q: 构建失败怎么办？**
A: 检查 GitHub Actions 日志，通常是因为依赖问题或配置错误。

**Q: APK 文件太大？**
A: 可以启用代码混淆和资源压缩，在 `android/app/build.gradle` 中设置 `minifyEnabled true`。

**Q: 如何更新版本号？**
A: 修改 `android/app/build.gradle` 中的 `versionCode` 和 `versionName`。

