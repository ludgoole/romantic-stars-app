# Codemagic 云打包设置指南

## 🎯 快速开始

### 步骤 1：注册 Codemagic 账号

1. 访问 https://codemagic.io
2. 点击 "Sign up" 或 "Get started"
3. 使用 GitHub 账号登录（推荐，方便连接仓库）

### 步骤 2：添加项目

1. 登录后，点击 **"Add application"** 或 **"Add new app"**
2. 选择 **"GitHub"** 作为代码仓库
3. 授权 Codemagic 访问你的 GitHub 账号
4. 选择你的仓库（`star` 或你的仓库名）
5. 点击 **"Finish"**

### 步骤 3：配置构建

1. 在项目页面，点击 **"Start new build"**
2. 选择 **"Android"** 平台
3. Codemagic 会自动检测到 `codemagic.yaml` 配置文件
4. 点击 **"Start new build"** 开始构建

### 步骤 4：下载 APK

1. 等待构建完成（通常 5-10 分钟）
2. 构建完成后，在构建详情页面找到 **"Artifacts"** 部分
3. 下载 `app-release.apk` 文件

## 📧 配置邮箱通知

编辑 `codemagic.yaml` 文件，将 `user@example.com` 替换为你的邮箱：

```yaml
publishing:
  email:
    recipients:
      - your-email@example.com  # 改为你的邮箱
```

## 🔐 配置签名（可选，用于发布到应用商店）

如果需要签名 APK，需要配置密钥库：

### 1. 生成密钥库（本地）

```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### 2. 在 Codemagic 中添加密钥库

1. 进入 Codemagic 项目设置
2. 点击 **"Environment variables"** 或 **"Code signing"**
3. 添加以下变量：
   - `CM_KEYSTORE_PATH`: 上传你的 `.jks` 文件
   - `CM_KEYSTORE_PASSWORD`: 密钥库密码
   - `CM_KEY_ALIAS`: 密钥别名（如：my-key-alias）
   - `CM_KEY_PASSWORD`: 密钥密码

### 3. 更新 build.gradle

在 `android/app/build.gradle` 中添加签名配置：

```gradle
android {
    ...
    signingConfigs {
        release {
            if (System.getenv("CM_KEYSTORE_PATH")) {
                storeFile file(System.getenv("CM_KEYSTORE_PATH"))
                storePassword System.getenv("CM_KEYSTORE_PASSWORD")
                keyAlias System.getenv("CM_KEY_ALIAS")
                keyPassword System.getenv("CM_KEY_PASSWORD")
            }
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

## 🎨 自定义构建配置

### 修改应用信息

编辑 `android/app/build.gradle`：

```gradle
defaultConfig {
    applicationId "com.romanticstars.app"  // 应用包名
    versionCode 2                           // 版本号（每次更新+1）
    versionName "1.1"                       // 版本名称
}
```

### 修改应用名称

编辑 `android/app/src/main/res/values/strings.xml`：

```xml
<resources>
    <string name="app_name">浪漫星空</string>
</resources>
```

## 🔄 自动构建设置

### 触发条件

Codemagic 默认会在以下情况自动构建：
- 推送到主分支（main/master）
- 创建 Pull Request
- 创建 Tag

### 修改触发条件

在 Codemagic 项目设置中：
1. 进入 **"Build triggers"**
2. 选择你想要的触发条件
3. 保存设置

## 📊 构建历史

- 在 Codemagic 项目页面可以查看所有构建历史
- 每个构建都有详细的日志
- 可以下载历史版本的 APK

## 💡 优势

相比 GitHub Actions，Codemagic 的优势：
- ✅ 专为移动应用构建优化
- ✅ 更友好的用户界面
- ✅ 更好的构建日志查看体验
- ✅ 内置代码签名支持
- ✅ 免费额度：每月 500 分钟构建时间

## 🆘 常见问题

**Q: 构建失败怎么办？**
A: 查看构建日志，通常在 "Build APK" 步骤会显示具体错误信息。

**Q: 如何更新代码后重新构建？**
A: 推送代码到 GitHub，Codemagic 会自动检测并开始构建（如果启用了自动构建）。

**Q: 免费额度用完了怎么办？**
A: 可以等待下个月重置，或升级到付费计划。

**Q: 可以同时构建多个版本吗？**
A: 可以，Codemagic 支持并行构建，但会消耗更多构建时间。

## 📚 更多资源

- Codemagic 官方文档：https://docs.codemagic.io
- Capacitor 文档：https://capacitorjs.com/docs

