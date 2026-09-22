# chenqiao.com.cn DNS 配置

目标站点：https://www.chenqiao.com.cn

托管方案：GitHub Pages

## 一、DNS 目标

GitHub 用户名：KevinQ7889

www 子域名的 CNAME 目标：

    KevinQ7889.github.io

## 二、DNSPod 记录

登录 DNS 服务商 DNSPod，进入 chenqiao.com.cn 的 DNS 解析设置。

### 1. www 子域名

| 主机记录 | 记录类型 | 记录值 | TTL | 状态 |
| --- | --- | --- | --- | --- |
| www | CNAME | KevinQ7889.github.io | 600 | 启用 |

### 2. 根域名 chenqiao.com.cn

建议添加以下 A 记录，让根域名也指向 GitHub Pages，并由 GitHub 自动跳转到 www：

| 主机记录 | 记录类型 | 记录值 | TTL | 状态 |
| --- | --- | --- | --- | --- |
| @ | A | 185.199.108.153 | 600 | 启用 |
| @ | A | 185.199.109.153 | 600 | 启用 |
| @ | A | 185.199.110.153 | 600 | 启用 |
| @ | A | 185.199.111.153 | 600 | 启用 |

可选 IPv6 记录：

| 主机记录 | 记录类型 | 记录值 | TTL | 状态 |
| --- | --- | --- | --- | --- |
| @ | AAAA | 2606:50c0:8000::153 | 600 | 启用 |
| @ | AAAA | 2606:50c0:8001::153 | 600 | 启用 |
| @ | AAAA | 2606:50c0:8002::153 | 600 | 启用 |
| @ | AAAA | 2606:50c0:8003::153 | 600 | 启用 |

不要在 @ 上保留其他冲突的 A、AAAA 或 CNAME 记录。

## 三、GitHub 设置

1. 把网站仓库推送到 GitHub。
2. 打开仓库的 Settings -> Pages。
3. 在 Build and deployment 的 Source 中选择 GitHub Actions。
4. 等待 Deploy academic website to GitHub Pages 工作流成功。
5. 在 Custom domain 中填写 www.chenqiao.com.cn 并保存。
6. DNS 检查通过后，开启 Enforce HTTPS。
7. 建议在 GitHub 账号 Settings -> Pages -> Verified domains 中验证 chenqiao.com.cn。

仓库中的 CNAME 文件已经写好，GitHub Actions 会把网站、CNAME 和资源一起发布。

## 四、生效时间

- DNSPod 解析通常几分钟内生效。
- GitHub Pages 的 HTTPS 证书通常会在 DNS 生效后自动签发。
- 全球 DNS 完全生效可能需要几分钟到 24 小时。

## 五、验证

在浏览器依次检查：

    http://www.chenqiao.com.cn
    https://www.chenqiao.com.cn
    https://chenqiao.com.cn

最终应统一访问 https://www.chenqiao.com.cn。
