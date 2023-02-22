# BlessThisMess Discord Bot
A serverless Discord bot for learning and fun. Hosted in AWS on Lambda and DynamoDB.

## ⚠️ Warning
Currently being migrated to Python as [MEGABOT](https://github.com/NicPWNs/MEGABOT). This is being done due to preference for python, better community support, and ability to respond to event listeners. Not serverless, though. 😞

## 🛠️ Build & Deploy to AWS Lambda
```bash
node generate_template/generate.js && node register_commands/register.js && sam build && sam deploy
```

## 🤖 Commands
- `/ping`: Responds with pong.
- `/bless`: Blesses the mess.
- `/emote <search>`: Searches for a specified emote.
- `/emote <search> [add:True]`: Adds specified emote to Discord server.
- `/ffz <search>`: Deprecated version of `/emote` using old API.
- `/age <name>`: Guesses the age of a specified name.
- `/streak [stats:True]`: Keep a daily streak going. Cooldown resets at midnight.
- `/kanye`: Print a random Kanye West quote.
- `/csgo <username> <stat>`: Retrieve CS:GO stats.
- `/nasa [details:True]`: Return the NASA photo of the day.
- `/chat <prompt>`: Converse with the bot (GPT3).
- `/math <expression>`: Evaluate a mathematical expression.

## 💡 To-Do
- [x] ~~Grab any Twitch emote~~
- [x] ~~Add grabbed Twitch emote to the server~~
- [x] ~~Migrate to 7TV API v3~~
- [x] ~~Guess age based on given name~~
- [x] ~~Connect to NoSQL DB for stored functionality~~
- [x] ~~Keep a daily streak going~~
- [x] ~~Track all-time highest streak~~
- [x] ~~Track current highest streak~~
- [x] ~~Track personal highest streak~~
- [x] ~~Kanye Quotes~~
- [x] ~~CS:GO Stats~~
- [x] ~~NASA Photo of the Day~~
- [ ] Upload photos to DB
- [ ] Post a random photo from DB daily
- [x] ~~Integrate GPT3 API~~
- [ ] Fix initial timeout error bug
- [ ] Add detailed comments to all code
- [ ] Balance 7TV emote resolution resizing
- [ ] Fix 7TV emote authentication
- [x] Evaluate basic math
- [x] Migrate to Python: [MEGABOT](https://github.com/NicPWNs/MEGABOT)
