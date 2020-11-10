
/*
vdict: 母音辞書 (Vowel dict)
sdict: 清音辞書 (Seione dict)
wdict: 単語辞書 (Word dict)
*/

const clist = Object.keys(sdict) // 文字リスト (Character list)

let cword = "シリトリ" // 機械側の単語 (Computer's word)
let cwend = cword.slice(-1) // 機械側の単語の最後の文字 (End of computer's word)
let used_words = [] // 使用された単語リスト (Used word list)
let num_time = 1 // 現在の回数 (Number of times)

window.addEventListener("keydown", keyDown); // キーが押された時の設定

// キーが押された時の関数
function keyDown(event) {
    // Shiftなら実行
    if (event.keyCode === 16) {
        decide()
    }
}

// 決定された時の関数
function decide() {
    let pword = document.getElementById("entry1").value // プレイヤー側の単語 (Player's word)
    let lenpw = pword.length // プレイヤー側の単語の文字数 (Length of player's word)

    // 文字数が０文字、１文字、10文字以上の時は警告を出して終了
    if (lenpw === 0) {
        alert('入力してください')
        return
    } else if (lenpw === 1) {
        alert('１文字の単語は禁止です')
        return
    } else if (lenpw > 10) {
        alert('10文字より多い単語は禁止です')
        return
    }

    // 今まで出ている単語の時は終了
    if (used_words.indexOf(pword) !== -1) {
        alert('その言葉はもう出ています')
        return
    }

    // 認識できる文字か確認
    for (let i = 0; i < lenpw; i++) {
        let char = pword[i]
        if (clist.indexOf(char) === -1) {
            if (char !== "ー") {
                alert('文字"' + char + '"は認識できません\nカタカナで入力してください')
                return
            }
        }
    }

    let pwfirst = sdict[pword.slice(0, 1)] // プレイヤー側の単語の最初の文字 (First of player's word)
    let pwend = pword.slice(-1) // プレイヤー側の単語の最後の文字 (End of player's word)

    // 最初の文字と最後の文字を確認
    if (pwfirst !== cwend) {
        alert('初めの文字を確認してください')
        return
    } else if (pwend === 'ン') {
        alert('「ン」が付きました\nあなたの負けです')
        refresh()
        return
    }

    // 最後の文字が長音符なら一文字前の母音を利用
    if (pword.slice(-1) === 'ー') {
        pwend = vdict[pword.slice(-2, -1)]
    } else {
        pwend = pword.slice(-1)
    }

    pwend = sdict[pwend] // 文字を清音に変換
    used_words.push(pword) // 単語を使用したリストに追加

    // もし機械側の単語選択リストにプレイヤーの単語があれば削除
    if (wdict[cwend].indexOf(pword)) {
        delete wdict[cwend][pword]
    }

    // 勝ち判定
    if (wdict[pwend].length === 0) {
        alert('もう言葉を思いつきません\nあなたの勝ちです')
        refresh()
        return
    }

    cword = wdict[pwend][Math.floor(Math.random() * wdict[pwend].length)] // 単語を選ぶ
    delete wdict[pwend][cword] // 選ばれた単語をリストから削除
    used_words.push(cword) // 単語を使用されたリストに追加

    document.getElementById("label1").innerText = pwend + '：' + cword // ラベルの文字列を変更

    // 最後の文字が長音符なら一文字前の母音を利用
    if (cword.slice(-1) === 'ー') {
        cwend = vdict[cword.slice(-2, -1)]
    } else {
        cwend = cword.slice(-1)
    }

    cwend = sdict[cwend] // 文字を清音に変換
    document.getElementById("label2").innerText = cwend + '：' // ラベルの文字列を変更
    document.getElementById("entry1").value = "" // ラベルの文字列を変更
    num_time += 1 // 回数を進める
    setNum() // 文字列型に変換してラベルを変更
}

// 文字列型に変換してラベルを変更
function setNum() {
    let str_time // 文字列型の数字

    // 文字列型に変換
    if (num_time === 1) {str_time = "１"}
    else if (num_time === 2) {str_time = "２"}
    else if (num_time === 3) {str_time = "３"}
    else if (num_time === 4) {str_time = "４"}
    else if (num_time === 5) {str_time = "５"}
    else if (num_time === 6) {str_time = "６"}
    else if (num_time === 7) {str_time = "７"}
    else if (num_time === 8) {str_time = "８"}
    else if (num_time === 9) {str_time = "９"}
    else {str_time = String(num_time)}

    document.getElementById("label3").innerText = str_time + "回目" // ラベルを変更
}

// データを初期化
function refresh() {
    cword = "シリトリ" // 機械側の単語を初期化
    cwend = cword.slice(-1) // 機械側の単語の最後の文字を初期化
    used_words = [] // 使用された単語リストを初期化
    num_time = 1 // 現在の回数を初期化
    document.getElementById("label1").innerText = "始：シリトリ" // ラベルの文字列を初期化
    document.getElementById("label2").innerText = "リ：" // ラベルの文字列を初期化
    document.getElementById("entry1").value = "" // ラベルの文字列を初期化
    setNum() // 文字列型に変換してラベルを初期化
}
