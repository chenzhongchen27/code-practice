FROM keymetrics/pm2:8-alpine

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

# Bundle APP files
RUN mkdir -p /home/project
WORKDIR /home/project
COPY . /home/project

# 替换为对应的 HOSTNAME, 决定取的配置文件是src/config 中的哪一个
ENV HOSTNAME=xxxxx
ENV NODE_ENV=production

EXPOSE 9080
VOLUME [ "/home/project/logs" ]

ENTRYPOINT [ "pm2-runtime", "start", "apps-pri.json"]

## .env位置
ENV env_path="./src/config/.env_pri_online"