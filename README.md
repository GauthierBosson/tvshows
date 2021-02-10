# TV Shows [WIP]

## What is Tv Shows

This project serves as the clone of the popular app tvtime.
It's main purpose is experimenting with the amazing react-query library (https://github.com/tannerlinsley/react-query) and TypeScript + React

## Why

The main source of data of this app is the moviedb API (https://developers.themoviedb.org/3/getting-started/introduction). The data of this source can change a lot, we're talking about shows so episodes or seasons can be added and I find react-query to be amazing in this case, you can cache queries so you don't do too much query to the API or you can invalidate them to retrieve latest data

Thanks to this, my database that just stores users and shows they're watching and the API are always sync

## Stack

Next.js + TypeScript for front and API with next-connect
Mongoose + MongoDB for Database
ChakraUI as UI kit