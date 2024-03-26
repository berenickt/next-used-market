FROM node:18

COPY package*.json ./

# npm 6 이하 버전의 동작 방식으로 되돌아가 peer dependencies를 자동으로 설치하지 않도록 설정
# 특정 패키지가 peer dependencies에 대해 엄격한 요구사항을 가지고 있지만, 이 요구사항이 프로젝트의 다른 부분과 충돌할 때 유용
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start