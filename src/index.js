const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require('cors')

const app = express();

app.use(cors())

const port = process.env.PORT || 3000;

// 配置multer以保存上传的文件
const upload = multer({ dest: "uploads/" });

// 上传图片的路由
app.post("/upload", upload.single("file"), (req, res) => {
  // 替换为你的GitHub用户名、仓库名和访问令牌
  const username = req.body.username || process.env.GIT_USER;
  const repo = req.body.repo || process.env.GIT_REPO;
  const token = req.body.token || process.env.GIT_TOKEN;
  const dir = req.body.dir || process.env.DIR || "files";

  const filePath = req.file.path;

  const fileName = `${Date.now()}${Math.random().toString(32)}${path.extname(
    req.file.originalname
  )}`;

  // 读取图片文件
  const imageContent = fs.readFileSync(filePath, { encoding: "base64" });

  // GitHub API URL
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${dir}/${fileName}`;

  // 请求配置
  const config = {
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
  };

  // 请求体
  const data = {
    message: `upload image ${fileName}`,
    content: imageContent,
  };

  const cdnUrl = `https://cdn.jsdelivr.net/gh/${username}/${repo}/${dir}/${fileName}`;

  // 发送请求
  axios
    .put(url, data, config)
    .then((response) => {
      // 删除临时文件
      fs.unlinkSync(filePath);
      res.json({ message: "ok", code: 0, data: { url: cdnUrl } });
    })
    .catch((error) => {
      // 删除临时文件
      fs.unlinkSync(filePath);
      res
        .status(500)
        .json({ error: "Error uploading image", details: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
