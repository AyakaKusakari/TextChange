//ページが読み込まれてからボタンのイベントを開始する
document.addEventListener("DOMContentLoaded", function () {
    formChange();
}, false);

function formChange() {

    //rawtextに貼り付けか、書き込まれたらイベント発生
    document.getElementById('rawtext').addEventListener('input', function () {

        //改行記号を統一する
        var rawText = document.getElementById('rawtext').value;
        var text = rawText.replace(/\r\n|\r/g, "\n");

        //文字列を出力
        text = htmlReplace(text);

        document.getElementById('result').value = text;

        function htmlReplace(textChange) {

            //h2タグへ変換
            textChange = textChange.replace(/^■ *(.+?)$/gm, "<h2>$1</h2>");
            //h3タグへ変換
            textChange = textChange.replace(/^□ *(.+?)$/gm, "<h3>$1</h3>");
            //h4タグへ変換
            textChange = textChange.replace(/^● *(.+?)$/gm, "<h4>$1</h4>");
            //blockquoteタグへ変換
            textChange = textChange.replace(/^＞ *(.+?)$/gm, "<blockquote>$1</blockquote>");
            //aタグへの変換
            textChange = textChange.replace(/^http *(.+?)$/gm, '<a href="http$1">http$1</a>');
            //改行の後に空の改行を追加
            textChange = textChange.replace(/。/gm, "。\n");
            textChange = textChange.replace(/！/gm, "！\n");
            textChange = textChange.replace(/？/gm, "？\n");
            //（）を半角に変換
            textChange = textChange.replace(/（/gm, "(");
            textChange = textChange.replace(/）/gm, ")");
            //数字を半角に変換
            textChange = textChange.replace(/[０-９]/g,
                function (s) {
                    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                });
            //ulタグへの変換
            textChange = textChange.replace(/◆/gm, "<ul>");
            textChange = textChange.replace(/◇/gm, "</ul>");
            //olタグへの変換
            textChange = textChange.replace(/★/gm, "<ol>");
            textChange = textChange.replace(/☆/gm, "</ol>");
            //・をリストタグに変換
            textChange = textChange.replace(/^・ *(.+?)$/gm, "<li>$1</li>");

            return textChange;
        }

        //プレビュー用br調整
        var previewText = text;
        function previewBr(previewText) {
            previewText = previewText.replace(/\n/g, "<br>");
            return previewText;
        }
        //プレビュー欄に表示
        document.getElementById('preview').textContent = previewText;

        //何らかの動作を行った後も入力値を保持する
        return false;

    }, false);
}

//文字数カウント
function countLength(text, field) {
    document.getElementById(field).innerHTML = text.length + "文字";
}

//コピー用関数（https://qiita.com/simiraaaa/items/2e7478d72f365aa48356）
function execCopy(string) {
    var temp = document.createElement('textarea');

    temp.value = string;
    temp.selectionStart = 0;
    temp.selectionEnd = temp.value.length;

    var s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';

    document.body.appendChild(temp);
    temp.focus();
    var result = document.execCommand('copy');
    temp.blur();
    document.body.removeChild(temp);
    // true なら実行できている falseなら失敗か対応していないか
    return result;
}

//コピーボタンが押されたらコピーしたことをwindow.alartで表示する（https://qiita.com/RAWSEQ/items/fec6cef0cab3e50fa07d）
function splash(msg, custom_set) {
    //Default
    var set = {
        message_class: 'splashmsg default',
        fadein_sec: 0.1,
        wait_sec: 0.5,
        fadeout_sec: 1.5,
        opacity: 0.9,
        trans_in: 'ease-in',
        trans_out: 'ease-out',
        outer_style: 'top: 0px;left: 0px;position: fixed;z-index: 1000;width: 100%;height: 100%;',
        message_style: 'padding:0.5em;font-size:2em;color:white;background-color:gray; position: absolute;top: 50%; left: 50%;transform: translateY(-50%) translateX(-50%);-webkit-transform: translateY(-50%) translateX(-50%);',
        style_id: 'append_splash_msg_style',
        outer_id: 'append_splash_msg',
        message_id: 'append_splash_msg_inner',
        on_splash_vanished: null //callback function
    };
    //Override custom_set
    for (var key in custom_set) {
        if (custom_set.hasOwnProperty(key)) {
            set[key] = custom_set[key];
        }
    }
    //Style
    if (!document.getElementById(set.style_id)) {
        var style = document.createElement('style');
        style.id = set.style_id;
        style.innerHTML =
            "#" + set.outer_id + " { " + set.outer_style + " } " +
            "#" + set.outer_id + " > #" + set.message_id + " {opacity: 0;transition: opacity " + set.fadeout_sec + "s " + set.trans_out + ";-webkit-transition: opacity " + set.fadeout_sec + "s " + set.trans_out + ";} " +
            "#" + set.outer_id + ".show > #" + set.message_id + " {opacity: " + set.opacity + ";transition: opacity " + set.fadein_sec + "s " + set.trans_in + ";-webkit-transition: opacity " + set.fadein_sec + "s " + set.trans_in + ";}" +
            "#" + set.message_id + " { " + set.message_style + " } ";
        document.body.appendChild(style);
    }
    //Element (Outer, Inner)
    if ((e = document.getElementById(set.outer_id))) { e.parentNode.removeChild(e); if (set.on_splash_vanished) set.on_splash_vanished(); }
    var splash = document.createElement('div');
    splash.id = set.outer_id;
    splash.onclick = function () {
        if ((e = document.getElementById(set.outer_id))) e.parentNode.removeChild(e);
        if (set.on_splash_vanished) set.on_splash_vanished();
    };
    splash.innerHTML = '<div id="' + set.message_id + '" class="' + set.message_class + '">' + msg + '</div>';
    document.body.appendChild(splash);
    //Timer
    setTimeout(function () { if (splash) splash.classList.add('show'); }, 0);
    setTimeout(function () { if (splash) splash.classList.remove('show'); }, set.wait_sec * 1000);
    setTimeout(function () { if (splash && splash.parentNode) splash.parentNode.removeChild(splash); if (set.on_splash_vanished) set.on_splash_vanished(); }, (set.fadeout_sec + set.wait_sec) * 1000);
}

//コピーボタンを押したらクリップボードに結果をコピーする
function copy() {
    var result = document.getElementById('result');
    if (execCopy(result.value)) {
        splash('コピーしました！');
    }
};

//リセット
function reset() {
    document.getElementById('rawtext').value = null;
    document.getElementById('result').value = null;
    document.getElementById('preview').innerHTML = null;
}

