
const clist = Object.keys(rdict)
cwe = "リ"
cword = "シリトリ"
occur = []
num = 1

function decide() {
    let pword = document.getElementById("entry1").value
    let lenp = pword.length
    if (lenp === 0) {
        alert('入力してください')
        return
    } else if (lenp === 1) {
        alert('１文字の単語は禁止です')
        return
    } else if (lenp > 10) {
        alert('10文字より多い単語は禁止です')
    }
    for (let i = 0; i < lenp; i++) {
        let char = pword[i]
        if (clist.indexOf(char) === -1) {
            if (char !== "ー") {
                alert('文字"' + char + '"は認識できません\nカタカナで入力してください')
                return
            }
        }
    }
    pwf = rdict[pword.slice(0, 1)]
    let pwe = pword.slice(-1)
    if (pwf != cwe) {
        alert('初めの文字を確認してください')
    } else if (pwe === 'ン') {
        alert('「ン」が付きました\nあなたの負けです')
        refresh()
        return
    }
    if (pword.slice(-1) === 'ー') {
        pwe = vdict[pword.slice(-2, -1)]
    } else {
        pwe = pword.slice(-1)
    }
    pwe = rdict[pwe]
    if (occur.indexOf(pword) !== -1) {
        alert('その言葉はもう出ています')
    } else if (pwf === cwe) {
        occur.push(pword)
        if (wdict[cwe].indexOf(pword)) {
            delete wdict[cwe][pword]
        }
        if (wdict[pwe].length === 0) {
            alert('もう言葉を思いつきません\nあなたの勝ちです')
            refresh()
            return
        }
        cword = wdict[pwe][Math.floor(Math.random() * wdict[pwe].length)]
        delete wdict[pwe][cword]
        occur.push(cword)
        document.getElementById("label1").innerText = pwe + '：' + cword
        if (cword.slice(-1) === 'ー') {
            cwe = vdict[cword.slice(-2, -1)]
        } else {
            cwe = cword.slice(-1)
        }
        cwe = rdict[cwe]
        document.getElementById("label2").innerText = cwe + '：'
        document.getElementById("entry1").value = ""
        num += 1
        numset()
    } else {
        alert('確認してください')
    }
}

function numset() {
    let strnum
    if (num === 1) {strnum = "１"}
    else if (num === 2) {strnum = "２"}
    else if (num === 3) {strnum = "３"}
    else if (num === 4) {strnum = "４"}
    else if (num === 5) {strnum = "５"}
    else if (num === 6) {strnum = "６"}
    else if (num === 7) {strnum = "７"}
    else if (num === 8) {strnum = "８"}
    else if (num === 9) {strnum = "９"}
    else {strnum = String(num)}
    document.getElementById("label3").innerText = strnum + "回目"
}

function refresh() {
    cwe = "リ"
    cword = "シリトリ"
    occur = []
    num = 1
    document.getElementById("label1").innerText = "始：シリトリ"
    document.getElementById("label2").innerText = "リ："
    document.getElementById("entry1").value = ""
    numset()
}
