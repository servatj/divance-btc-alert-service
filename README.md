# Service for alert BTC management
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a repo for creating a service that monitors BTC prize and create alerts. This repor is still working in progress this is the service that will manage alerts for users. Those users will be manage by a small auth service that will create the users and dispatch access token when login in order to get the basic info of the user so he can manage those alerts.

Probably another piece will be needed and this architecture is mean to be create in AWS so probably SQS support will be added in the future.

You will be able to find <strong>divance-btc-alert-front</strong> soon in the divance-crypto organization will be a nextjs with SSR and tailwind css for registering a user , login show the BTC price and
and also the auth is comming this week and will be a project really similar to this one <strong>divance-btc-alert-auth</strong>

![image](https://user-images.githubusercontent.com/3521485/136714080-841dd0f2-3696-4044-9c26-8e26a194abab.png)

## Setup

```shell
npm install
```

## Run prisma

```shell
npx prisma migrate dev --name "init"
npx prisma db seed
```

## Run

```shell
npm run start
```


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://servatj.me"><img src="https://avatars.githubusercontent.com/u/3521485?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josep Servat</b></sub></a><br /><a href="#infra-servatj" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!