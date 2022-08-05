# BlessThisMess Discord Server Bot

A basic Discord bot for learning and fun.

## 🛠️ Build & Deploy to AWS Lambda
```bash
node generate_template/generate.js && node register_commands/register.js && sam build && sam deploy
```

## 🤖 Functions
- ```/ping```: Responds with pong.
- ```/bless```: Blesses the mess.
- ```/emote [search]```: Searches for a specified emote.
- ```/emote [search] [add:True]```: Adds specified emote to Discord server.

## 💡 To-Do
- [x] Grab any Twitch emote
- [X] Add grabbed Twitch emote to the server
- [ ] Guess age based on given name
- [ ] Migrate to 7TV API v3 ([waiting for 7TV Emote Search API Endpoint](https://github.com/SevenTV/API/blob/dev/internal/rest/v3/routes/emotes/emotes.go))
