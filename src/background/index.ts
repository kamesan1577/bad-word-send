/*
よみがなの取得にはよみたんAPIを使用しています
https://yomi-tan.jp/man/v1
*/

export { }
const sheetData: SheetData = {
    "見出し": "",
    "読み方": "",
    "言い換え": "",
    "備考": "",
}

interface SheetData {
    "見出し": string,
    "読み方": string,
    "言い換え": string,
    "備考": string,
}

chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
    }
    chrome.storage.local.set({ "auth_token": token }, async function () {
        console.log('Token saved:', token);
    }
    );
});


async function getTokenFromStorage(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['auth_token'], function (result) {
            resolve(result.auth_token || null);
        });
    });
}

async function getPronouncement(word: string) {
    const data = word.trim();
    const apiUrl = `https://yomi-tan.jp/api/yomi.php?ic=UTF-8&oc=UTF-8&t=${data}`;
    const response = await fetch(apiUrl);
    console.log(response);
    const text = await response.text();

    return text;

}

async function appendData(data = sheetData) {
    //TODO この辺は設定ファイルに移動する
    const sheetId = '1VmmLd7JObkXyu0NKLz-ZcclLWce0VD03XXDrgWOM3Jo';
    const sheetRange = 'シート1!A1:D1';
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}:append?valueInputOption=USER_ENTERED`;
    const token = await getTokenFromStorage();
    if (!token) {
        console.error('Token not found');
        return;
    }

    const values = [
        Object.values(data)
    ];

    fetch(apiUrl, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ values })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Appended:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'send-to-spreadsheet',
        title: '道徳基盤辞書に追加',
        contexts: ['all'],
    });
});


chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId !== 'send-to-spreadsheet') {
        return;
    }
    const selectedText = info.selectionText;
    const pronouncement = await getPronouncement(selectedText);
    const data = { ...sheetData, "見出し": selectedText, "読み方": pronouncement };
    appendData(data);

    console.log(selectedText);
}
);
