# Herois da Marvel

Aplicativo para avaliação pelo processo seletivo da meliuz.

## Bibliotecas usadas

- React Navigation 5 (e suas dependências): utilizado para performar a navegação
  entre as diferentes telas do aplicativo
- Axios: utilizado para gerenciar as requisições à API fornecida
- React Redux: utilizado para gerenciar os estados globais da aplicação
- Redux Saga: utilizado para gerenciar os side-effects da aplicação
- Firebase: usado para autenticação, persistência, e configurações

## Instalação

Primeiramente, siga o tutorial de configuração oficial do React Native. Depois,
nstale o node na versão LTS e o yarn. Após isso, vá para a pasta do projeto e
execute os comandos:

```bash
yarn
```

## Execução

Ative o modo de USB debug no seu celular, e após isso:

### Android

```bash
cd android
./gradlew assembleRelease
cd app/build/outputs/apk/release
adb install app-release.apk
```

### Ios

```bash
cd ios
pod install
yarn ios
```
