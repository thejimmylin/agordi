#!/usr/bin/env node
import fs from "fs";
import path from "path"

const CWD = process.cwd();
const CONFIGS = [
  {
    filePath: path.resolve(CWD, ".vscode", "settings.json"), 
    defaultData: {
      "prettier.tabWidth": 2,
      "python.formatting.provider": "black",
      "python.formatting.blackArgs": [
        "--line-length=79"
      ],
      "python.linting.flake8Enabled": true,
      "python.linting.enabled": true,
    }
  }
]

const parseConfig = (filePath) => {
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  const data = content ? JSON.parse(content) : {}
  return data
}

const stringifyConfig = (filePath, data) => {
  const content = JSON.stringify(data, null, 2)
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  return fs.writeFileSync(filePath, content);
}

for (const config of CONFIGS) {
  const oldData = parseConfig(config.filePath)
  const newData = {...config.defaultData, ...oldData}
  stringifyConfig(config.filePath, newData)
}
