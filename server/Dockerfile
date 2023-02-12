FROM node:18.13.0

RUN mkdir -p /app
WORKDIR /app
ADD package.json /app/package.json
# RUN npm config set registry "http://registry.npm.taobao.org/"

# RUN npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
# RUN npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
RUN npm install
ADD src .

CMD ["npm", "run", "start"]