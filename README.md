# 将一个github仓库变成CDN

这是一个docker镜像, 通过 jsdelivr 将github文件CDN加速

## 准备
- 一个github账号 (怕有风险注册个小号) 对应环境变量 GIT_USER
- 获取apitoken (不知道就直接满权限) 对应环境变量 GIT_TOKEN
- 创建一个公开的仓库 (用于存储文件) 对应环境变量 GIT_REPO

## 环境变量

**必填**
> 通过参数传递也行

| 环境变量 | 备注 |
|-|-|
| `GIT_USER` | github用户名 |
| `GIT_REPO` | 指定仓库 |
| `GIT_TOKEN` | github的token |

_选填_
| 环境变量 | 备注 |
|-|-|
| `PORT` | 项目端口 (默认: `3000`) |
| `DIR` | 文件路径 (默认: `files`) |

---

## 接口文档
/upload POST

参数格式
form-data

参数

**必填**
| 参数名 | 类型 | 备注 |
|-|-|-|
| `file` | 文件 | 上传的文件 |

_选填_
| 参数名 | 类型 | 备注 |
|-|-|-|
| `username` | string | 覆盖环境变量GIT_USER |
| `repo` | string | 覆盖环境变量GIT_REPO |
| `token` | string | 覆盖环境变量GIT_TOKEN |
| `dir` | string | 覆盖环境变量DIR |

curl
```shell
curl --location '<HOST>/upload' \
--form 'file=@"/path/to/file"'
```