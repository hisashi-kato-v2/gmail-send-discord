# gmail-send-discord

このコードは、Gmailに届いたメールをDiscordの指定されたチャンネルに投稿するGASのコードです。

**コードの流れ**

1. `WEBHOOK_URL` 変数に、DiscordのウェブフックURLを設定します。
2. `SUBJECT_MAPPINGS` オブジェクトに、メールの件名とそのメールをDiscordに投稿するかどうかの設定を定義します。
3. `getSubjectMapping()` 関数で、メールの件名から `SUBJECT_MAPPINGS` オブジェクトの対応する値を取得します。
4. `convertHtmlToDiscordFormat()` 関数で、メールの本文からDiscordのフォーマットに変換します。
5. `extractMessageInfo()` 関数で、メールの件名、日付、本文、色を取得します。
6. `checkNewEmails()` 関数で、未読のメールすべてを取得します。
7. `checkNewEmails()` 関数のループ内で、取得したメールすべてについて、`extractMessageInfo()` 関数でメールの情報を取得します。
8. `extractMessageInfo()` 関数で取得したメールの情報を、Discordのウェブフックに投稿します。
9. メールを既読にします。

**コードの詳細**

* `WEBHOOK_URL` 変数は、DiscordのウェブフックURLを設定します。ウェブフックURLは、Discordのサーバーの設定画面から取得できます。
* `SUBJECT_MAPPINGS` オブジェクトは、メールの件名とそのメールをDiscordに投稿するかどうかの設定を定義します。オブジェクトのキーはメールの件名、値は次の3つの属性を持つオブジェクトです。
    * `title`: Discordのチャンネルに表示するタイトル
    * `color`: Discordのチャンネルに表示する色
    * `isTarget`: メールをDiscordに投稿するかどうか
    この例では、`お問い合わせ`、`ご家庭申し込み`、`ボランティア申し込み`、`ルドルフアンケート` のメール件名については、Discordに投稿するように設定しています。
* `getSubjectMapping()` 関数は、メールの件名から `SUBJECT_MAPPINGS` オブジェクトの対応する値を取得します。
* `convertHtmlToDiscordFormat()` 関数は、メールの本文からDiscordのフォーマットに変換します。Discordのフォーマットでは、HTMLの改行やタグは表示されません。この関数では、改行を `\n` に、タグを空文字列に置換します。
* `extractMessageInfo()` 関数で、メールの件名、日付、本文、色を取得します。
* `checkNewEmails()` 関数で、未読のメールすべてを取得します。
* `checkNewEmails()` 関数のループ内で、取得したメールすべてについて、`extractMessageInfo()` 関数でメールの情報を取得します。
* `extractMessageInfo()` 関数で取得したメールの情報を、Discordのウェブフックに投稿します。
* メールを既読にします。

**使い方**

このコードを実行するには、次の手順を実行します。

1. GASプロジェクトを作成し、コードを貼り付けます。
2. `WEBHOOK_URL` 変数に、DiscordのウェブフックURLを設定します。
3. トリガーを設定します。

トリガーは、一定期間ごとにこのコードを実行するように設定します。例えば、1分に1回実行するように設定するには、次の手順を実行します。

1. 編集 > 現在のプロジェクトのトリガーからトリガーの設定画面を開きます。
2. トリガーの追加から時間主導型を選択します。
3. チェック間隔を 1 分に設定します。
4. トリガーの名前を入力し、チェックする関数を `checkNewEmails()` に設定します。
5. 保存します。

この設定で、1分に1回、未読のメールすべてを取得してDiscordに投稿するようになります。