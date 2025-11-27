# Codemagic 快速开始指南

## 🚀 5 分钟快速上手

### 第一步：注册 Codemagic

1. 访问 https://codemagic.io
2. 点击右上角 **"Sign up"**
3. 选择 **"Continue with GitHub"**（推荐）

### 第二步：添加项目

1. 登录后，点击 **"Add application"** 按钮
2. 选择 **"GitHub"**
3. 授权 Codemagic 访问 GitHub（如果还没授权）
4. 在仓库列表中找到你的项目（`star`）
5. 点击 **"Select"**
6. 选择 **"Android"** 平台
7. 点击 **"Finish: Add application"**

### 第三步：开始构建

1. 在项目页面，点击 **"Start new build"**
2. 选择 **"Android"** 工作流
3. Codemagic 会自动检测到 `codemagic.yaml` 配置文件
4. 点击 **"Start new build"** 开始构建

### 第四步：下载 APK

1. 等待构建完成（约 5-10 分钟）
2. 构建成功后，在构建详情页面
3. 找到 **"Artifacts"** 部分
4. 点击下载 `app-release.apk`

## 📧 配置邮箱通知（可选）

1. 编辑项目根目录的 `codemagic.yaml` 文件
2. 找到 `user@example.com`，替换为你的邮箱
3. 提交并推送更改

## ⚙️ 自动构建设置

### 启用自动构建

1. 在 Codemagic 项目页面，点击 **"Settings"**
2. 找到 **"Build triggers"** 部分
3. 启用以下选项：
   - ✅ Build on push（推送时构建）
   - ✅ Build on pull request（PR 时构建）
4. 保存设置

之后每次推送代码到 GitHub，Codemagic 会自动开始构建。

## 🎯 工作流程

```
修改代码 → 推送到 GitHub → Codemagic 自动构建 → 下载 APK
```

## 💡 提示

- **免费额度**：每月 500 分钟构建时间
- **构建速度**：通常 5-10 分钟完成
- **APK 保留**：构建产物会保留一段时间，可以随时下载
- **构建日志**：可以查看详细的构建日志，方便调试

## 🆘 遇到问题？

1. **构建失败**：查看构建日志，找到错误信息
2. **找不到配置文件**：确保 `codemagic.yaml` 在项目根目录
3. **权限问题**：确保 Codemagic 有访问仓库的权限

## 📱 安装 APK

1. 下载 APK 文件到手机
2. 打开文件管理器
3. 找到 APK 文件并点击安装
4. 如果提示"禁止安装未知来源应用"，需要在设置中允许

## 🔄 更新应用

每次修改代码后：
1. 提交并推送到 GitHub
2. Codemagic 会自动构建（如果启用了自动构建）
3. 或手动点击 "Start new build"
4. 下载新的 APK

---

**详细配置说明请查看 `CODEMAGIC_SETUP.md`**

