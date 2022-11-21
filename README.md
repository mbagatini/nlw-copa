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

We need to save the records in the database, so in order to do it correctly, check the .env file wich contains the URL for the database file connection. We are using SQLite. 

```env
$ DATABASE_URL="file:./dev.db"
```

Change it to the database you want to connect. After that, it's time to run the migration:

```bash
$ npx prisma migrate dev
```

If the configuration is ready and connected to the database, let's start the application:
```bash
$ npm run dev
```

### API routes

Inside server folder, there is a file called `Insomnia-nlw-copa.json`. This file contains all the requests provided by the API.

You can import it on Insomnia and it's ready.

# 💻 Front-end

![brandbird (1)](url)


### Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/NextJS-B73BFE?style=for-the-badge&logo=next&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
 </p>
 
 
 Other libraries used:
 - [React Hook Form](https://react-hook-form.com): form validation
 - [Keen-Slider](https://keen-slider.io): carousel
 - [Radix UI](https://www.radix-ui.com): accessible unstyled components
 - [Mirage JS](https://miragejs.com/): fake API
 
 ### App purpose

- Create an ad to a game
 
 ### How to run it?

Clone the repository to your machine.

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

### Important note

In order to deploy the application without deploying the backend server, [Mirage JS ](https://miragejs.com/) was used to mock the backend API.

If you want to connect to the backend project, comment the call to the function `createFakeAPI` on `App.tsx`.

# 📱 Mobile

![mobile](https://user-images.githubusercontent.com/17517028/194978201-38bd9ce1-0fe8-4583-9a3e-32a7cad7a910.png)

### Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" />
 </p>

### App purpose

- Visualize ads created
- Get ad's user Discord to connect with him

### How to run it?

Clone the repository to your machine.

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

# 🚀 Online app

Wanna see the application online? 

- [https://nlw-esports-morgs.vercel.app](https://nlw-esports-morgs.vercel.app)


# 📝 License

This project is under MIT license.
