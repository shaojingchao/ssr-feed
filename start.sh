#!/bin/sh
#判断文件存在，判断是否为文件夹等
packageFile="/www/package.json"
#判断文件夹是否存在 -d
if [[ ! -f "$packageFile" ]]; then
 echo "package.json not found"
else
npm run start
fi
node
