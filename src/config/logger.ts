import TelegramLogger from "@alexgalhardo/telegram-logger";

const logger = new TelegramLogger(Bun.env.TELEGRAM_BOT_HTTP_TOKEN as string, Number(Bun.env.TELEGRAM_BOT_CHANNEL_ID));

export default logger;
