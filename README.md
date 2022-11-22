<p align="center">Next Level Week #10 - Ignite</p>

<h3 align="center">
  NLW Copa - Challenge your friends
</h3>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="NLW" src="https://img.shields.io/badge/NLW-10-%2304D361">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<img alt="NLW Copa" src="https://user-images.githubusercontent.com/17517028/201545635-6dc54ec0-e161-4e98-942b-d6d010825592.png" />


# ⚽ About this project

This project was inspired by the World Cup atmosphere, and it has one purpose - to bet with your friends.

First, you must create or join a poll to place your bet. Then you can start making your guesses about each game of the World Cup.

To keep your guesses on track, sign into the mobile application using your Google account.

This application is divided in three parts: the server, web, and mobile app.


# ⚙ Backend

### Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
 </p>
 
 ### How to run it?

Clone the repository to your machine.

Enter on server folder:
```bash
$ cd server
```

Install the dependencies:

```bash
$ npm install
```

Copy the `.env.example` file and change it's content to your environment.
It contains the database file and the JWT token secret.

Now it's time to run the migration:

```bash
$ npx prisma migrate dev
```

If the configuration is ready and connected to the database, let's start the application:
```bash
$ npm run dev
```

### API routes

Inside server folder, there is a file called `Insomnia-nlw-copa.json`. This file contains all the requests provided by the API.

Import it on Insomnia and it's ready to use.

# 💻 Front-end

![web home page](https://user-images.githubusercontent.com/17517028/203183735-cff17a25-1f08-497a-9379-93f0130c4e6f.png)

### Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Next.JS-000?style=for-the-badge&logo=Next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
 </p>
 
### App purpose

- Create a poll
 
### How to run it?

Enter on web folder:
```bash
$ cd web
```

Install the dependencies:

```bash
$ npm install
```

Let's start the application:
```bash
$ npm run dev
```

# 📱 Mobile

![mobile pages](https://user-images.githubusercontent.com/17517028/203187807-cb98cb24-d7a9-452d-9b6d-fe39d26ecabe.png)

### Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/%3C/%3E_Native_Base-50BFC2?style=for-the-badge&logoColor=white" />  
 </p>

### App purpose

- Create a poll
- Share a poll
- See poll details and participants
- Make guesses inside a poll

### How to run it?

Enter on mobile folder:
```bash
$ cd mobile
```

Install the dependencies:

```bash
$ npm install
```

Let's start the application:
```bash
$ expo start
```

You can run the application directly on your phone, using the Expo Go app, or use an emulator.


# 🎨 Application layout

You can check the layout of this project clicking in the link below:

 - [Check on Figma](https://www.figma.com/file/NpZ3PsH1kNWZxeCnjDfgoM/Bol%C3%A3o-da-Copa-(Community)?node-id=0%3A1)

You must have Figma account to access it!

# 📝 License

This project is under MIT license.
