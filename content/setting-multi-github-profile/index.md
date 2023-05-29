---
emoji: 👋
title: '컴퓨터 한 대로 여러 Github 계정 사용하기'
date: '2023-05-29 16:22:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

## 들어가기 앞서

> 재택근무를 하다보면, 개인 컴퓨터에 회사 Github 계정을 함께 사용하는 경우가 발생할 수 있습니다.
>
> 이 때, 아무런 개인 컴퓨터에 아무런 설정을 하지 않는다면 회사 Private Repo를 Clone하는 과정에서 문제가 발생할 수 있습니다.
>
> 저 또한, 이러한 문제를 해결하기 위해 시간을 많이 사용했습니다.
>
> 그래서 이번 글을 통해 저 처럼 고생하시는 분들이 조금이나마 도움을 드리기위해 글을 작성했습니다.

<br>

## 1.SSH 계정 만들기

먼저 최상위 폴더에 있는 ssh 폴더로 이동을 합니다.

```cli
cd ~/.ssh
```

그리고 SSH Key를 생성하는 명령어를 실행합니다. 아래는 개인 계정, 회사 계정을 나누어서 SSH를 생성했습니다.

아래 명령어를 실행하면 다양한 질문을 하는데 저는 그냥 Enter를 계속 눌러 진행했습니다.

```cli
ssh-keygen -t rsa -C "company@gmail.com" -f "github-company"
ssh-keygen -t rsa -C "personal@gmail.com" -f "github-personal"
```

> -C는 ssh 키를 식별하는 데 도움을 주는 명령어 입니다.
>
> -f는 ssh 키가 저장되는 파일 이름을 나타내는 명령어 입니다.

아래의 명령어를 통해 제대로 SSH가 제대로 생성되었는지 확인할 수 있습니다.

```cli
ls - l 실행 하면 아래와 같이 파일을 확인할 수 있습니다.

github-company
github-company.pub

github-personal
github-personal.pub
```

> .pub이라는 공개키와, 개인키가 생성이 되었습니다. 추후에 Github 계정에 공개키를 등록할 때, .pub을 등록해야 합니다.

<br>

## 2. SSH Agent에 생성한 SSH를 등록하기

SSH Agent는 개인키의 비밀번호를 암호화 해 기억해두고 처음 한 번만 개인키 비밀번호를 입력하면 다음부터는 기억한 비밀번호를 이용하므로 사용자는 또
비밀번호를 입력하지 않아도 됩니다.

소켓(Socket)을 생성해서 원격 서버와 통신하기 때문에 비밀번호가 유출될 염려도 없습니다.
그래서 SSH Agent에 위에서 생성한 SSH를 등록을 해야 합니다.

아래의 명령어를 통해 SSH를 SSH Agent에 등록해봅시다.

```cli
ssh-add -K ~/.ssh/github-company
ssh-add -K ~/.ssh/github-personal
```

> -K 옵션을 사용하면 다음에 SSH를 사용할 때마다 개인 키의 암호를 다시 입력할 필요 없이 자동으로 키체인에서 암호를 가져와 사용할 수 있습니다.

아래의 명령어를 통해 정상적으로 SSH-Agent에 등록되었는지 확인해보겠습니다.

```cli
ssh-add -l

company@gmail.com(RSA)
personal@gmail.com(RSA)
```

<br>

## 3. Github에 공개키 등록하기

아래의 명령어를 통해 우리가 생성한 공개키를 한 번에 복사 할 수 있습니다.

```cli
vim ~/.ssh/github-company.pub
vim ~/.ssh/github-personal.pub

pbcopy < ~/.ssh/github-company.pub
pbcopy < ~/.ssh/github-personal.pub
```

이제 Githbub 사이트에 들어가 <b>Settings -> SSH and GPG keys -> New SSH key</b> 순서로 들어가 등록해줍니다.

<br>

## 4. SSH config 파일 설정 후, SSH 연결 확인

SSH config 파일은 ~/.ssh 폴더 밑에 위치해야 합니다.

```cli
cd ~/.ssh

touch config // config 파일을 만들어 줍니다.

open config // config 파일을 열어 안에 내용을 수정해보겠습니다.
```

아래와 같은 내용으로 config를 작성합니다. SSH 클라이언트 config 파일의 내용은 섹션으로 나눠져 있고, 섹션의 시작은 `Host`지시자로 시작합니다.

```cli
#company account
Host github.com-compnay
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-company

#personal account
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-personal
```

- Host: SSH 연결에 사용될 대표 이름입니다.

실제로 SSH 연결이 잘 되었는지 아래의 명령어를 통해 확인할 수 있습니다.

```cli
ssh -T git@github.com-company

ssh -T git@github.com-personal

정상적으로 연결되었다면 아래와 같은 문구가 나옵니다.
Hi {깃허브 설정된 userName} You've successfully authenticated ...
```

<br>

## 5. SSH로 Repo Clone 설정하기

이제 Repo를 Clone할 때, HTTPS가 아닌, SSH로 Clone을 받아야 합니다.

해당 Repo 주소를 복사하게 되면, SSH의 기본 경로는 `git@github.com:{github계정}/{리포지토리명.git}` 입니다.

이 때, 내가 Clone하고자 하는 Repo가 회사 Repo(당연히 회사 Github 계정이겠죠?)이면 SSH 경로를 SSH Config에 설정한 것에 맞춰서 변경해야 합니다.

```cli
git clone git@github.com-{company or personal}:{company or personal github user-name}/{repo-name}.git

git clone git@github.com-company:company/company-test.git
```

<br>

## 6. 각 계정에 맞게 Remote 추가하기.

우리가 위에서 설정한 Github 계정에 맞게 Push와 Commit을 하기 위해서는 Repo별로 config에 user.email과 user.name을 설정을 해야 합니다.

```cli
git config user.email "company@gmail.com"
git config user.name "company"

git config user.email "personal@gmail.com"
git config user.name "personal"
```

그리고 remote 또는 upstream에 company or personal을 잘 구분해서 등록해야 합니다. 그래야 commit or push를 할 때, 해당 계정에 맞게 ssh를 매칭할 수 있습니다.

```cli
git remote add origin git@github.com-personal:personal

git remote add origin git@github.com-company:company
```

<br>

## 마무리

이번 글을 작성하면서 다시 한 번 도움을 주신 팀원분들에게 진심으로 감사의 말씀을 전하고 싶습니다. 처음 설정하는 과정이었는데, 침착하게 기다려 주시고 참고할 자료를 제공해 주셨으며, 제가 해결하지 못한 부분에 직접 나서서 도와주신 것에 대해 정말 감사드립니다. 그래서 이번 경험을 통해 과정을 다시 한 번 정리하고, 혹시나 저처럼 고민하고 고생하고 있는 분들에게 도움이 되고자 글을 작성했습니다. 만약 글을 읽으시면서 부족한 부분이 있다면 언제든지 말씀해주시면 감사하겠습니다.

마지막으로, 어려운 문제에 직면했을 때 부족함을 자책하는 대신, 차분하게 문제를 최대한 단순화하여 해결 가능한 부분을 나열하고 최선을 다하는 태도가 중요하다는 사실을 깨달았습니다. 그래서 앞으로도 문제에 직면했을 때에는 좌절하는 대신에 심호흡을 하며 차분히 해결해 나아갈 수 있는 개발자로 성장하기 위해 노력하겠습니다.

<br>

### 참고

- [SSH Agent 개념](https://devlog.jwgo.kr/2019/04/17/ssh-keygen-and-ssh-agent/)
- [컴퓨터 한대로 github 여러 계정 사용하기 1](https://www.irgroup.org/posts/github-%EC%BB%B4%ED%93%A8%ED%84%B0-%ED%95%9C%EB%8C%80%EB%A1%9C-%EC%97%AC%EB%9F%AC-%EA%B3%84%EC%A0%95-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)
- [컴퓨터 한대로 github 여러 계정 사용하기 2](https://usingu.co.kr/frontend/git/%ED%95%9C-%EC%BB%B4%ED%93%A8%ED%84%B0%EC%97%90%EC%84%9C-github-%EA%B3%84%EC%A0%95-%EC%97%AC%EB%9F%AC%EA%B0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)
- [How To Work With Multiple Github Accounts on a single Machine](https://gist.github.com/rahularity/86da20fe3858e6b311de068201d279e3)
- [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

```toc

```
