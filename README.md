# Spenot share

This is a work-in-progress app where you will be able to share songs on Spotify with others, by posting it on their wall, which in return will update an automatically generated playlist. I had an ugly, but working test version that used Pug as a templating engine, however I decided to completely replace the front-end with React. It is not done yet, therefore this repo is simply to show what I'm currently learning.

I am planning to implement the following:
  - A contacts list, where you can add users by their spotify ID
  - A wall, to which anyone can post music (maybe the option to have some sort of privacy settings)
  - Implement web sockets to be used on the wall, so it also functions as a kind of chat
  - Create a PWA out of it, because it might naturally be used most frequently on phones
