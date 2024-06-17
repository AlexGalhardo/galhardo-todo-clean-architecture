## TelegramLogger

## How to get your credentials

1. Getting `TELEGRAM_BOT_HTTP_TOKEN`
   - Find BotFather in Telegram to create new bots
   - Start a conversation with BotFather typing: `/newbot`
   - Create a name and username for your new bot
   - Save the `TELEGRAM_BOT_HTTP_TOKEN` BotFather will answer to you
   - BotFather will also give you the link to start conversation with your new bot: `t.me/YOUR_BOT_NAME`

2. Getting `TELEGRAM_BOT_CHANNEL_ID`
   - Send a aleatory message to your new bot you created previously
   - Access: `https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_HTTP_TOKEN_HERE>/getUpdates`
   - Copy and save: `chat.id` its a number

## Example

<img width="1013" alt="Screenshot 2024-06-14 at 12 54 18" src="https://github.com/AlexGalhardo/telegram-logger/assets/19540357/e1775fa5-4617-480f-a4df-f4f947c350a5">
