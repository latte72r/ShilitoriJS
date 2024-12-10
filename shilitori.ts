
// (c) 2020-2024 Latte72.

/*
vdict: 母音辞書 (Vowel dict)
sdict: 清音辞書 (Seione dict)
wdict: 単語辞書 (Word dict)
*/

const clist: Array<string> = Object.keys(sdict); // 文字リスト (Character list)

let cword: string = "シリトリ"; // 機械側の単語 (Computer's word)
let cwend: string = cword.slice(-1); // 機械側の単語の最後の文字 (End of computer's word)
let used_words: Array<string> = []; // 使用された単語リスト (Used word list)
let num_time: number = 1; // 現在の回数 (Number of times)

window.addEventListener("keydown", keyDown); // キーが押された時の設定

// キーが押された時の関数
function keyDown(event: any) {
    // Shiftなら実行
    if (event.keyCode === 16) {
        decide();
    }
}

// 決定された時の関数
function decide() {
    let pword = (document.getElementById("entry1") as HTMLInputElement).value; // プレイヤー側の単語 (Player's word)
    let lenpw = pword.length; // プレイヤー側の単語の文字数 (Length of player's word)

    // 文字数が0文字、1文字、10文字以上の時は警告を出して終了
    if (lenpw <= 0) {
        alert('入力してください');
        return;
    }

    // 今まで出ている単語の時は終了
    if (used_words.indexOf(pword) !== -1) {
        alert('その言葉はもう出ています');
        return;
    }

    // 認識できる文字か確認
    for (let i = 0; i < lenpw; i++) {
        let char = pword[i];
        if (clist.indexOf(char) === -1) {
            if (char !== "ー") {
                alert('文字"' + char + '"は認識できません\nカタカナで入力してください');
                return;
            }
        }
    }

    let pwfirst = sdict[pword.slice(0, 1)]; // プレイヤー側の単語の最初の文字 (First of player's word)
    let pwend = pword.slice(-1); // プレイヤー側の単語の最後の文字 (End of player's word)

    // 最初の文字と最後の文字を確認
    if (pwfirst !== cwend) {
        alert('初めの文字を確認してください');
        return;
    } else if (pwend === 'ン') {
        alert('「ン」が付きました\nあなたの負けです');
        refresh();
        return;
    }

    // 最後の文字が長音符なら一文字前の母音を利用
    if (pword.slice(-1) === 'ー') {
        pwend = vdict[pword.slice(-2, -1)];
    } else {
        pwend = pword.slice(-1);
    }

    pwend = sdict[pwend]; // 文字を清音に変換
    used_words.push(pword); // 単語を使用したリストに追加

    // もし機械側の単語選択リストにプレイヤーの単語があれば削除
    let index = wdict[cwend].indexOf(pword);
    if (index != 0) {
        wdict[cwend].splice(index, 1);
    }

    // 勝ち判定
    if (wdict[pwend].length === 0) {
        alert('もう言葉を思いつきません\nあなたの勝ちです');
        refresh();
        return;
    }

    // 単語を選ぶ
    cword = wdict[pwend][Math.floor(Math.random() * wdict[pwend].length)];

    // 選ばれた単語をリストから削除
    index = wdict[pwend].indexOf(cword);
    wdict[pwend].splice(index, 1);;

    let copy = wdict[pwend];
    copy.splice(copy.indexOf(cword), 1);
    wdict[pwend] = copy;

    // 単語を使用されたリストに追加
    used_words.push(cword);

    // ラベルの文字列を変更
    (document.getElementById("label1") as HTMLSpanElement).innerText = pwend + '：' + cword;

    // 最後の文字が長音符なら一文字前の母音を利用
    if (cword.slice(-1) === 'ー') {
        cwend = vdict[cword.slice(-2, -1)];
    } else {
        cwend = cword.slice(-1);
    }

    cwend = sdict[cwend]; // 文字を清音に変換
    (document.getElementById("label2") as HTMLSpanElement).innerText = cwend + '：'; // ラベルの文字列を変更
    (document.getElementById("entry1") as HTMLInputElement).value = ""; // ラベルの文字列を変更
    num_time += 1; // 回数を進める
    setNum(); // 回数の表示を更新
}

// 回数の表示を更新
function setNum() {
    (document.getElementById("label3") as HTMLSpanElement).innerText = String(num_time) + " 回目"; // ラベルを変更
}

// データを初期化
function refresh() {
    cword = "シリトリ"; // 機械側の単語を初期化
    cwend = cword.slice(-1); // 機械側の単語の最後の文字を初期化
    used_words = []; // 使用された単語リストを初期化
    num_time = 1; // 現在の回数を初期化
    (document.getElementById("label1") as HTMLSpanElement).innerText = "始：シリトリ"; // ラベルの文字列を初期化
    (document.getElementById("label2") as HTMLSpanElement).innerText = "リ："; // ラベルの文字列を初期化
    (document.getElementById("entry1") as HTMLInputElement).value = ""; // ラベルの文字列を初期化
    setNum() // 回数の表示を更新
}
