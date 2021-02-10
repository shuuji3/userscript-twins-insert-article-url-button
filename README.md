# userscript-twins-insert-article-url-button

筑波大学のtwinsに「個別のお知らせページを開くボタン」と「他人と共有できるURLをコピーするボタン」を追加するスクリプトです。

## 使用方法

1. ブラウザの拡張機能Tampermonkeyをインストールします。
1. [twins-insert-article-url-button.user.js](https://github.com/shuuji3/userscript-twins-insert-article-url-button/raw/main/twins-insert-article-url-button.user.js)をクリックすると、スクリプトのインストール画面が表示されます。コードの内容を確認してインストールします。
1. 特定のお知らせを表示すると、上部に「記事リンク」ボタンと「📋」ボタンが追加されます。
    - 「記事リンク」ボタンをクリックすると、新規タブで特定の記事だけが表示されるページが表示されます。
    - 「📋」ボタンをクリックすると、特定の記事だけが表示されるページのURLがクリップボードにコピーされます。
    - ⚠ **注意:** 「記事リンク」をクリックしてページを表示すると、URLが強制的に壊れたリンクに書き換えられてしまうため、URLを他の人と共有したい場合には「📋」ボタンを活用してください。

## スクリーンショット

![screenshot](screenshot.png)

スクリーンショットのページは[パブリックに公開されているお知らせ](https://twins.tsukuba.ac.jp/campusweb/campussquare.do?_flowId=POW1200000-flow&_campus_new_portal=true&_action_id=displayPortletRequest&calledFlow=keiji&keijitype=4&genrecd=281&seqNo=2052)です。大学内の内部限定公開の情報は含まれません。

## ライセンス

- GNU GPLv3
- ただし、スクリーンショットの画像ファイルを除きます。
