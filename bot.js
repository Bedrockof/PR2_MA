import { Bot, Context } from 'grammy';
const bot = new Bot('7676320409:AAEJ8fNmvHbtNK-qUnc0Ruk-wSWKDjBf_tc');
const games = new Map();

bot.command('play', async (ctx) => {
    const userId = ctx.from?.id;
    if (!userId) return;
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    games.set(userId, secretNumber);
    await ctx.reply('Я загадал число от 1 до 100! Игра началась! Попробуй угадать.');
});

bot.on('message:text', async (ctx) => {
    const userId = ctx.from?.id;
    if (!userId) return;
    if (!games.has(userId)) return;
    const secretNumber = games.get(userId);
    const userGuess = parseInt(ctx.message.text);
    if (isNaN(userGuess)) {
        await ctx.reply('Пожалуйста, введите число!');
        return;
    }
    if (userGuess < secretNumber) {
        await ctx.reply('Больше!');
    } else if (userGuess > secretNumber) {
        await ctx.reply('Меньше!');
    } else {
        await ctx.reply('Вы угадали! Поздравляю!');
        games.delete(userId);
    }
});

bot.start();
console.log('Бот запущен');