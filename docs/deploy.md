# 배포 방법

## 1. vercel 배포

- `Zero-configuration CI/CD`
  - Github / Bitbucket / GitLab 등 많이 사용되는 Git 서비스와 연동되어
  - 빠르고 편한 'Zero-configuration' CI/CD를 지원
- `빠른 배포와 롤백`
  - Zero-configuration CI/CD를 사용하면 빠르게 배포하고 롤백이 가능

---

## 2. Github Action + EC2 배포

### 2.1 Github Action

- GitHub Actions를 사용하여 리포지토리에서 바로 소프트웨어 개발 워크플로를 자동화, 사용자 지정 및 실행합니다.
- CI/CD를 포함하여 원하는 작업을 수행하기 위한 작업을 검색, 생성 및 공유하고 완전히 사용자 정의된 워크플로에서 작업을 결합할 수 있습니다.
- cf. https://docs.github.com/ko/actions

---

### 2.2 Github Action 주요 구성요소

- `Workflow`
  - 하나 이상의 작업을 수행하는 구성 가능한 자동화된 프로세스
  - 수동으로 실행하거나 지정된 Event 발생 시 자동으로 실행하거나, 설정된 스케쥴에 따라서 실행 가능
  - .github/workflows 폴더 내부의 YMAL 파일로 정의
  - cf. https://github.com/aws-actions/configure-aws-credentials
- `Event`
  - Workflow를 실행시킬 수 있는 Github 이벤트
  - issue 생성 / label 생성 / Pull Request 생성 / push 등
- `Runner`
  - Workflow가 실행될 서버 환경 Ubuntu / Windows / macOS 서버를 제공하며, 개인 서버 환경에서 실행하는것도 가능
  - 각 Workflow는 매번 새로 생성된 “가상머신” 환경에서 실행

---

### 2.3 AWS EC2

- AWS에서 제공하는 '컴퓨팅 플랫폼'
  - EC2에 구성된 Github Action Runner를 사용하여 빌드
  - AWS EC2 내부의 PM2를 이용해서 서버 구동

---

### 2.4 PM2

- Node.js Application을 안정적으로 실행하기 위한 "Process Manager"
- Nginx 장점
  1. 보안 강화
  2. 로드밸런싱 구성 가능
  3. 응답 최적화 가능

---

### 2.2 작업 순서

1. EC2 생성
2. EC2 Swap 메모리 4GB 할당
3. NVM 설치 후 pm2 설치
4. Nginx 설치 및 설정
5. Github Runner 구성
6. Github Action Workflow 구성 및 배

---

## 3. Github Action + Elastic Beanstalk + Docker 배포

### 3.1 Docker

```dockerfile
FROM node:18

COPY package*.json ./

# npm 6 이하 버전의 동작 방식으로 되돌아가 peer dependencies를 자동으로 설치하지 않도록 설정
# 특정 패키지가 peer dependencies에 대해 엄격한 요구사항을 가지고 있지만, 이 요구사항이 프로젝트의 다른 부분과 충돌할 때 유용
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start
```

- 컨테이너를 기반으로 애플리케이션을 빠르게 실행하고 관리할 수 있는 오픈소스 프로젝트
- DockerHub
  - 도커 이미지를 보관할 수 있는 Docker Image Registry
  - Base Image 참고에 사용되는 '기본' Registry
  - https://hub.docker.com

---

### 3.2 AWS Elastic Beanstalk

- AWS 클라우드 인프라를 잘 알지 못하더라도 애플리케이션을 쉽게 배포할 수 있게 도와주는 '완전관리형' 서비스
- 대표적으로 제공하는 기능
  - 서버 용량 조정
  - 로드밸런싱 추가 / 수정
  - 상태 모니터링
  - 배포 프로세싱
- 지원하는 애플리케이션 종류
  - Node.js, Go, Java, .NET, PHP, Python, Ruby, Docker

---

### 3.3 작업 순서

1. AWS Elastic Beanstalk 생성
2. AWS IAM 새로운 사용자 계정 생성
3. DockerHub 가입
4. AWS Access Key, DockerHub Token을 Github에 추가
5. Github Action Workflow, Dockerfile, Dockerrun.aws.json 추가
6. Git Pus
