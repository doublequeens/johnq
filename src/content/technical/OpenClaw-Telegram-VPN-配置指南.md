---
title: OpenClaw Telegram 通道 VPN/代理配置完整指南
excerpt: 在中国大陆环境下，为 OpenClaw Telegram 通道配置代理并完成故障排查的实战指南。
date: 2026-03-02
cover: /images/posts/openclaw-telegram-vpn-guide.jpg
readTime: 8 min read
---

## 前言

在中国大陆使用 [OpenClaw](https://openclaw.ai/) 的 Telegram 通道时，由于 Telegram API (`api.telegram.org`) 被网络屏蔽，直接配置会导致连接失败。本文基于实际调试经验，详细说明问题现象、错误日志、配置方法和排查步骤。

---

## 问题现象

### 1. 初始配置失败

当你在 `openclaw.json` 中配置 Telegram bot 后，OpenClaw 启动时会尝试：

- 删除旧的 webhook (`deleteWebhook`)
- 删除命令列表 (`deleteMyCommands`)
- 设置新的命令 (`setMyCommands`)
- 发送测试消息 (`sendMessage`)

**结果：所有操作都失败**

### 2. 错误日志特征

查看 `~/.openclaw/logs/gateway.err.log`，你会看到大量类似的错误：

```
2026-03-01T17:00:18.202Z [telegram] deleteWebhook failed: Network request for 'deleteWebhook' failed!
2026-03-01T17:00:18.205Z [telegram] webhook cleanup failed: Network request for 'deleteWebhook' failed!; retrying in 30s.
2026-03-01T17:00:18.209Z [telegram] deleteMyCommands failed: Network request for 'deleteMyCommands' failed!
2026-03-01T17:00:28.712Z [telegram] setMyCommands failed: Network request for 'setMyCommands' failed!
2026-03-01T17:00:28.715Z [telegram] command sync failed: HttpError: Network request for 'setMyCommands' failed!
2026-03-01T17:02:21.929Z [telegram] message failed: Network request for 'sendMessage' failed!
```

### 3. 状态显示

运行 `openclaw status`，Telegram 通道可能显示为：

- **错误时**：可能显示为 `enabled` 但实际无法工作
- **配置代理后**：显示为 `ON · OK`

---

## 根本原因

**Telegram API 在中国大陆被屏蔽**

[OpenClaw](https://openclaw.ai/) 的 Telegram 通道需要访问 `https://api.telegram.org`，但该域名在大陆无法直接访问。因此所有 HTTP 请求都会失败，表现为 "Network request failed"。

---

## 解决方案

### 方案 1：配置 HTTP/SOCKS5 代理

#### 步骤 1：准备代理服务器

确保你有一个可用的代理服务器，常见的有：

- **本地代理**（如 Clash、V2Ray 等客户端）
- **远程代理**（VPS + 代理软件）

假设你的代理运行在 `http://127.0.0.1:1087`（根据你的实际情况修改）

#### 步骤 2：编辑配置文件

编辑 `~/.openclaw/openclaw.json`，在 `channels.telegram` 中添加 `proxy` 字段：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "你的_BOT_TOKEN",
      "proxy": "http://127.0.0.1:1087",
      "dmPolicy": "allowlist",
      "allowFrom": ["你的_Telegram_ID"],
      "groupPolicy": "allowlist"
    }
  }
}
```

**代理格式支持：**

- HTTP 代理：`http://host:port`
- SOCKS5 代理：`socks5://host:port`
- 带认证的代理：`http://user:pass@host:port`

#### 步骤 3：重启 OpenClaw Gateway

OpenClaw 支持热重载，修改配置后会自动检测并重载，但为了确保生效，建议手动重启：

```bash
openclaw gateway restart
```

或者等待自动重载（日志会显示）：

```
2026-03-01T17:04:03.991Z [reload] config change detected; evaluating reload (channels.telegram.proxy)
2026-03-01T17:04:04.002Z [reload] config hot reload applied (channels.telegram.proxy)
```

#### 步骤 4：验证配置

查看日志，确认没有更多错误：

```bash
openclaw logs --follow
```

或者查看日志文件：

```bash
tail -f ~/.openclaw/logs/gateway.log
```

成功后你会看到：

```
2026-03-01T17:04:06.305Z [telegram] [default] starting provider (@JohnQ_clawbot)
2026-03-01T17:04:31.335Z [telegram] sendMessage ok chat=7862241352 message=16
```

运行状态检查：

```bash
openclaw status
```

应该显示：

```
Channels
┌──────────┬─────────┬────────┬─────────────────────────────────────────────────────────┐
│ Channel  │ Enabled │ State  │ Detail                                                │
├──────────┼─────────┼────────┼─────────────────────────────────────────────────────────┤
│ Telegram │ ON      │ OK     │ token config (7759…dPGg · len 46) · accounts 1/1      │
└──────────┴─────────┴────────┴─────────────────────────────────────────────────────────┘
```

---

## 完整配置示例

### 基础配置（无代理，**在中国大陆无法工作**）

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "7759868391:AAHOCu36uHOWNQWjYbgdJ7z189CnlgMdPGg",
      "dmPolicy": "allowlist",
      "allowFrom": ["7862241352"],
      "groupPolicy": "allowlist"
    }
  }
}
```

**错误日志：**

```
[telegram] deleteWebhook failed: Network request for 'deleteWebhook' failed!
[telegram] setMyCommands failed: Network request for 'setMyCommands' failed!
[telegram] sendMessage failed: Network request for 'sendMessage' failed!
```

### 正确配置（带代理）

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "7759868391:AAHOCu36uHOWNQWjYbgdJ7z189CnlgMdPGg",
      "proxy": "http://127.0.0.1:1087",
      "dmPolicy": "allowlist",
      "allowFrom": ["7862241352"],
      "groupPolicy": "allowlist"
    }
  }
}
```

**成功日志：**

```
[telegram] sendMessage ok chat=7862241352 message=16
[telegram] sendMessage ok chat=7862241352 message=17
```

---

## 排查步骤

### 1. 检查代理是否可用

**方法 1：使用 curl 测试**

```bash
curl -x http://127.0.0.1:1087 https://api.telegram.org/bot<BOT_TOKEN>/getMe
```

如果返回 JSON（包含 bot 信息），说明代理可用。

**方法 2：检查代理服务状态**

```bash
# 对于 Clash/V2Ray
lsof -i :1087

# 或者检查进程
ps aux | grep -i clash
```

### 2. 检查 OpenClaw 日志

**实时日志：**

```bash
openclaw logs --follow
```

**错误日志：**

```bash
tail -50 ~/.openclaw/logs/gateway.err.log
```

**正常日志：**

```bash
tail -50 ~/.openclaw/logs/gateway.log
```

### 3. 搜索关键错误

```bash
# 查看所有 Telegram 相关的错误
grep -i "telegram.*failed" ~/.openclaw/logs/gateway.err.log | tail -50

# 查看成功发送的消息
grep "sendMessage ok" ~/.openclaw/logs/gateway.log | tail -20
```

### 4. 验证配置文件

```bash
# 查看当前配置
cat ~/.openclaw/openclaw.json | grep -A 10 "telegram"

# 或者使用 jq 格式化输出（需要安装 jq）
cat ~/.openclaw/openclaw.json | jq '.channels.telegram'
```

### 5. 测试网络连接

**直接访问（预期失败）：**

```bash
curl https://api.telegram.org
```

**通过代理访问（预期成功）：**

```bash
curl -x http://127.0.0.1:1087 https://api.telegram.org
```

---

## 常见错误及解决方法

### 错误 1：代理配置错误

**症状：**

配置了代理但仍然失败，日志中仍然显示 "Network request failed"

**原因：**

- 代理地址不正确
- 代理端口错误
- 代理服务未启动

**解决方法：**

1. 检查代理服务是否运行：`lsof -i :端口号`
2. 使用 curl 测试代理是否可用
3. 确认配置文件中的代理地址和端口正确

### 错误 2：代理需要认证

**症状：**

代理需要用户名和密码，但配置中没有提供

**解决方法：**

在配置中添加认证信息：

```json
{
  "channels": {
    "telegram": {
      "proxy": "http://username:password@127.0.0.1:1087"
    }
  }
}
```

### 错误 3：代理不稳定

**症状：**

有时消息能发送成功，有时失败

**解决方法：**

1. 检查代理服务的稳定性
2. 尝试切换到其他代理服务器
3. 考虑使用延迟更低的服务器

### 错误 4：使用 SOCKS5 代理

**症状：**

需要使用 SOCKS5 而不是 HTTP 代理

**解决方法：**

修改代理协议：

```json
{
  "channels": {
    "telegram": {
      "proxy": "socks5://127.0.0.1:1080"
    }
  }
}
```

---

## 高级配置

### 使用环境变量

如果你不想在配置文件中明文存储代理地址，可以使用环境变量：

```bash
export TELEGRAM_PROXY="http://127.0.0.1:1087"
openclaw gateway start
```

然后在配置中引用：

```json
{
  "channels": {
    "telegram": {
      "proxy": "${TELEGRAM_PROXY}"
    }
  }
}
```

### 多代理切换

如果需要在多个代理之间切换，可以：

1. 创建多个配置文件
2. 根据需要切换配置
3. 使用符号链接：

```bash
ln -sf ~/.openclaw/openclaw-proxy1.json ~/.openclaw/openclaw.json
openclaw gateway restart
```

---

## 安全建议

1. **保护配置文件权限**

   ```bash
   chmod 600 ~/.openclaw/openclaw.json
   ```

2. **不要在公共仓库提交包含 botToken 和代理地址的配置**

   在 `.gitignore` 中添加：

   ```
   openclaw.json
   ```

3. **使用专用代理账号**

   不要使用共享或公共代理，避免泄露通信内容

4. **定期更新 botToken**

   如果怀疑 botToken 泄露，立即在 Telegram BotFather 处重新生成

---

## 总结

### 关键点回顾

| 问题 | 现象 | 原因 | 解决方案 |
|------|------|------|----------|
| Telegram 无法连接 | 所有网络请求失败 | API 被屏蔽 | 配置 `proxy` 字段 |
| 配置后仍失败 | 日志仍然显示错误 | 代理地址错误或未启动 | 检查代理服务状态 |
| 消息发送不稳定 | 时好时坏 | 代理不稳定 | 切换更稳定的代理 |

### 时间线（实际案例）

```
16:30 - 16:38    Telegram 通道启用
16:54 - 17:04    所有请求失败，持续报错
17:04:03         配置代理 channels.telegram.proxy
17:04:04         配置热重载成功
17:04:06         Telegram 通道重新启动
17:04:31 之后    所有消息发送成功 ✅
```

### 最佳实践

1. **在大陆地区使用 Telegram，必须配置代理**
2. **使用前先测试代理可用性**
3. **定期检查日志，及时发现连接问题**
4. **选择稳定、低延迟的代理服务**
5. **做好配置文件的权限管理**

---

## 参考资料

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [Telegram Bot API 文档](https://core.telegram.org/bots/api)
- [OpenClaw 故障排查](https://docs.openclaw.ai/troubleshooting)

---

**最后更新：** 2026-03-02
**适用版本：** OpenClaw 2026.2.26+
**作者：** 实际调试经验总结
