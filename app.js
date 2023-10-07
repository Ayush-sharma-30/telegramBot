const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot('6555021736:AAHOZX0ywyoqOWSzo51XFubVXS1wIF2u7go', {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! I am your assistant to trigger Jenkins Jobs. Please type /options to see the list of options.');
});

bot.onText(/\/options/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Please choose an option:', {
    reply_markup: {
      keyboard: [
          ['Automation Sanity Suite', 'Generate Report']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

async function postData(text) {
    try {
        const payload = {
            token: '119afd49520031e5cff545a6d847119459%27'
        };

        const headers = {
            Authorization: 'Basic c3VyZW5kcmFuYXRoOjExOWFmZDQ5NTIwMDMxZTVjZmY1NDVhNmQ4NDcxMTk0NTk='
        };

        const response = await axios.post(`https://jenkins.zwayam.com/job/${text}/build`, payload, {
            headers: headers
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  switch (messageText) {
    case 'Automation Sanity Suite':
      bot.sendMessage(chatId, 'You chose Automation Sanity Suite');
      const temp = postData(Reportforclustr3);
      console.log(temp);
      break;
    case 'Generate Report':
      bot.sendMessage(chatId, 'You chose Generate Report');
      break;
  }
});
