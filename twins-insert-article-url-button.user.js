// ==UserScript==
// @name         筑波大学のtwinsに「記事リンク」ボタンを追加するスクリプト
// @namespace    https://github.com/shuuji3/userscript-twins-insert-article-url-button
// @version      0.2
// @description  📋 筑波大学のtwinsに「個別のお知らせページを開くボタン」と「他人と共有できるURLをコピーするボタン」を追加します。
// @author       TAKAHASHI Shuuji <shuuji3@gmail.com>
// @match        https://twins.tsukuba.ac.jp/campusweb/*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    // const
    const buttonStyle = 'padding: 0.5rem 0.75rem; margin: 0.5rem; margin-right: 0; background: #e6ee9c /* material light green */; border: none; border-radius: 0.25rem; cursor: pointer;';
    const articleIframeID = '#main-frame-if';

    /**
     * sleepのPromiseを生成する関数
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * ニュース記事へのURLを取得します。
     * 記事名をクリックしたときに初めてiframeが非同期に読み込まれるため、pollingを行っています。
     */
    async function getArticleURL() {
        let buttonInserted = false;
        while (!buttonInserted) {
            const iframe = document.querySelector(articleIframeID);
            if (iframe == null || iframe.src == '') {
                await sleep(100);
                continue
            }
            return iframe.src;
        }
    }

    /**
     * 単独の記事へのURLが設定された「記事リンク」ボタンを追加します。
     * ボタンをクリックして遷移するとURLは書き換えられてしまうため、URLを取得したい場合はクリップボードにコピーするボタンを使用します。
     */
    function createLinkButton(url) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.classList.add('tabcell');

        const button = document.createElement('button');
        button.textContent = '記事リンク';
        button.style = buttonStyle;
        a.appendChild(button);
        return a;
    }

    /**
     * 記事のURLをクリップボードにコピーするボタンを追加します。
     */
    function createCopyButton(url) {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = '📋';
        button.alt = 'Copy URL'
        button.title = 'Copy URL'
        button.style = buttonStyle;
        button.dataset.clipboardText = url;
        return button
    }

    function isClipboardJSLoaded() {
        try {
            // Before loaded clipboard.js, instantiate Clipboard should be failed.
            new Clipboard();
        } catch (e) {
            if (e.name === 'TypeError') {
                return false;
            }
        }
        return true;
    }

    /**
     * clipboard.jsを読み込んで初期化します。
     */
    async function initClipboardJS() {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.4.0/clipboard.min.js';
        document.body.appendChild(script);
        while (!isClipboardJSLoaded()) {
            await sleep(100);
        }
        new Clipboard('.btn');
    }

    // main
    async function main() {
        const url = await getArticleURL();
        const linkButton = createLinkButton(url);
        const copyButton = createCopyButton(url);

        const target = document.querySelector(articleIframeID);
        target.parentNode.insertBefore(linkButton, target);
        target.parentNode.insertBefore(copyButton, target);

        initClipboardJS();
    }

    await main();

})();
