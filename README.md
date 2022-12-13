# BlessThisMess Discord Bot
A serverless Discord bot for learning and fun. Hosted in AWS on Lambda and DynamoDB.

## 🛠️ Build & Deploy to AWS Lambda
```bash
node generate_template/generate.js && node register_commands/register.js && sam build && sam deploy
```

## 🤖 Functions
- ```/ping```: Responds with pong.
- ```/bless```: Blesses the mess.
- ```/emote [search]```: Searches for a specified emote.
- ```/emote [search] [add:True]```: Adds specified emote to Discord server.
- ```/age [name]```: Guesses the age of a specified name.
- ```/streak [stats:True]```: Keep a daily streak going. Cooldown resets at midnight.
- ```/kanye```: Print a random Kanye West quote.
- ```/csgo [username] [stat]```: Retrieve CS:GO stats.
- ```/nasa```: Return the NASA photo of the day.

## 💡 To-Do
- [x] Grab any Twitch emote
- [x] Add grabbed Twitch emote to the server
- [ ] Migrate to 7TV API v3
- [x] Guess age based on given name
- [x] Connect to NoSQL DB for stored functionality
- [x] Keep a daily streak going
- [x] Track all-time highest streak
- [x] Track current highest streak
- [x] Track personal highest streak
- [ ] Fix streak timeout error bug
- [x] Kanye Quotes
- [x] CS:GO Stats
- [x] NASA Photo of the Day
- [ ] Upload photos to DB
- [ ] Post a random photo from DB daily
- [ ] Integrate ChatGPT API
