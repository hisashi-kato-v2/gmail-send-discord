const WEBHOOK_URL = ''; // discordのチャンネルのトークンを設定してください

const SUBJECT_MAPPINGS = {
  '支部に問い合わせが入りました': { title: 'お問い合わせ', color: 0xFFA500, isTarget: true },
  'ご家庭から申し込みがありました': { title: 'ご家庭申し込み', color: 0x0000FF, isTarget: true },
  'ボランティアの応募がありました': { title: 'ボランティア申し込み', color: 0xFF0000, isTarget: true },
  'Asana': { title: 'Asana', color: 0x9ACD32, isTarget: false },
  'サンタを呼ぶ応募フォーム変更': { title: 'フォーム変更', color: 0x9A0000, isTarget: false },
  'アンケート': { title: 'ルドルフアンケート', color: 0xFFFF00, isTarget: true },
  'default': { title: '', color: 0x800080, isTarget: true }
};

const getSubjectMapping = (subject) => {
  return Object
    .entries(SUBJECT_MAPPINGS)
    .find(([key, _]) => subject.includes(key))?.[1] || SUBJECT_MAPPINGS['default'];
};

const extractMessageInfo = (message) => {
  const subject = message.getSubject();
  const { title, color, isTarget } = getSubjectMapping(subject);

  if (isTarget) {
    return {
      embeds: [{ 
        subject: title || subject.replace("Fwd: ", "") || 'その他',
        date: message.getDate().toLocaleString(),
        description: message.getBody().slice(0, 700),
        color
      }]
    };
  }
  return undefined;
};

const checkNewEmails = () => {
  const threads = GmailApp.search('is:unread');

  for (const thread of threads) {
    const messageList = thread.getMessages();
    for (const message of messageList) {
      const extractedMessage = extractMessageInfo(message);
      if (extractedMessage) {
        const options = {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify(extractedMessage),
          muteHttpExceptions: true
        };
        UrlFetchApp.fetch(WEBHOOK_URL, options);
      }
      message.markRead(); // メールを既読にする
    }
  }
};
