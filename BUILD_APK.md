# 打包APK指南

## 前置要求

1. **安装Java JDK** (推荐 JDK 11 或更高版本)
   - 下载地址: https://www.oracle.com/java/technologies/downloads/
   - 设置 JAVA_HOME 环境变量

2. **安装Android Studio**
   - 下载地址: https://developer.android.com/studio
   - 安装 Android SDK (API Level 33 或更高)
   - 设置 ANDROID_HOME 环境变量

3. **安装Node.js和npm** (已完成)

## 步骤

### 1. 构建Web应用

```bash
npm run build
```

### 2. 同步到Android项目

```bash
npx cap sync android
```

### 3. 打开Android Studio

```bash
npx cap open android
```

或者手动打开 `android` 文件夹

### 4. 在Android Studio中构建APK

1. 打开项目后，等待Gradle同步完成
2. 点击菜单: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. 构建完成后，APK文件位置:
   - `android/app/build/outputs/apk/debug/app-debug.apk` (调试版)
   - `android/app/build/outputs/apk/release/app-release.apk` (发布版，需要签名)

### 5. 生成签名APK (发布版)

如果需要发布到应用商店，需要签名APK:

1. 生成密钥库:
```bash
keytool -genkey -v -keystore romantic-stars-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias romantic-stars
```

2. 在 `android/app/build.gradle` 中配置签名信息

3. 构建发布版APK:
   - 在Android Studio中: **Build** → **Generate Signed Bundle / APK**

## 注意事项

- 首次构建可能需要下载Gradle和依赖，需要较长时间
- 确保Android SDK已正确安装
- 如果遇到路径问题，检查项目路径中是否包含中文字符（建议使用英文路径）

## 快速命令

```bash
# 构建并同步
npm run build && npx cap sync android

# 打开Android Studio
npx cap open android
```

## 故障排除

如果遇到问题:
1. 检查Java和Android SDK是否正确安装
2. 检查环境变量 JAVA_HOME 和 ANDROID_HOME
3. 清理并重新构建: `cd android && ./gradlew clean`
4. 查看Android Studio的Build日志获取详细错误信息

