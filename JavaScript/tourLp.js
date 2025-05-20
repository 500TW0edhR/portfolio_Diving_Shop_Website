document.addEventListener("DOMContentLoaded", () => {

    // フォーム要素を取得
    const form = document.querySelector('form');
    // フォーム内の送信ボタン要素を取得
    const submitButton = form.querySelector('button[type="submit"]');
    // 各入力フィールドの要素をIDで取得
    const nameInput = document.getElementById('write_name');
    const kanaInput = document.getElementById('read_name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone_number');
    const divingTourInput = document.getElementById("diving_tour");
    const participantsInput = document.getElementById("participants");
    const inquiryDetailsInput = document.getElementById("inquiry_details");
    
    // ローカルストレージに保存したコンタクトフォームのキー
    const formDataKeys = [
        'contactFormName',
        'contactFormKana',
        'contactFormEmail',
        'contactFormPhone',
        'contactFormDiving',
        'contactFormParticipants',
        'contactFormInquiryDetails'
    ];
    
    // 「入力内容を消去」ボタンの要素を取得（もしHTMLに追加済みであれば）
    const clearFormDataButton = document.getElementById('clearFormData');

    // ローカルストレージから以前の入力値を読み込む関数を呼び出す
    loadFormData();


    // ボタンが存在する場合にクリックイベントリスナーを追加
    if (clearFormDataButton) {
        clearFormDataButton.addEventListener('click', () => {
            // ローカルストレージから各項目を削除
            formDataKeys.forEach(key => {
                localStorage.removeItem(key);
            });

            // フォームの入力欄をクリア
            nameInput.value = '';
            kanaInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            divingTour.value = '';
            participants.value = '';
            inquiryDetails.value = '';

            displayMessage('入力内容を消去しました。', 'info');
        });
    } else {
        console.log('「入力内容を消去」ボタンが見つかりません。');
    }

    // フォームの送信イベントに対するリスナーを追加
    form.addEventListener('submit', (e) => {
        // デフォルトのフォーム送信処理を停止（ページのリロードを防ぐ）
        e.preventDefault();

        // ----- 送信前の処理 -----
        // 送信ボタンをdisabledにして連打を防止
        submitButton.disabled = true;
        // submitButton.textContent = '送信中...'; // 送信中のテキスト表示を削除

        // ----- 入力値の取得 -----
        const nameValue = nameInput.value;
        const kanaValue = kanaInput.value;
        const emailValue = emailInput.value;
        const phoneValue = phoneInput.value;
        const divingTourValue = divingTourInput.value;
        const participantsValue = participantsInput.value;
        const inquiryDetailsValue = inquiryDetailsInput.value;


        // ----- バリデーション -----
        // 必須項目がすべて入力されているかチェック
        if (!nameValue || !kanaValue || !emailValue || !phoneValue || !divingTourValue || !participantsValue) {
            // 入力漏れがあればエラーメッセージを表示
            displayMessage('入力漏れがあります。必須項目を入力してください。', 'error');
            // 送信ボタンを再度有効化
            submitButton.disabled = false;
            // submitButton.textContent = '上記の内容で送信する'; // 送信中のテキスト表示を削除
            return; // 以降の処理を中断
        }

        // ----- 確認画面の表示 -----
        const confirmationMessage = '入力内容を確認し、送信してもよろしいですか？\n\n' +
            '名前: ' + nameValue + '\n' +
            'フリガナ: ' + kanaValue + '\n' +
            'メールアドレス: ' + emailValue + '\n' +
            '電話番号: ' + phoneValue + '\n' +
            '参加プランの選択: ' + divingTourValue + '\n' +
            'ツアー参加人数: ' + participantsValue + '\n' +
            'その他の質問や要望: ' + inquiryDetailsValue + '\n';
        // confirmダイアログを表示し、ユーザーの応答を待つ
        if (confirm(confirmationMessage)) {
            // ユーザーが「OK」を選択した場合の処理

            // ----- 送信処理（バックエンドの技術が無いのでコンソール出力とローカルストレージ保存で代替） -----
            console.log('--- 送信データ ---');
            console.log('名前:', nameValue);
            console.log('フリガナ:', kanaValue);
            console.log('メールアドレス:', emailValue);
            console.log('電話番号:', phoneValue);
            console.log('参加プランの選択:', divingTourValue);
            console.log('ツアー参加人数:', participantsValue);
            console.log('その他の質問や要望:', inquiryDetailsValue);
            console.log('-----------------');

            // ローカルストレージにフォームデータを保存する関数を呼び出す
            saveFormData({
                name: nameValue,
                kana: kanaValue,
                email: emailValue,
                phone: phoneValue,
                divingTour: divingTourValue,
                participants: participantsValue,
                inquiryDetails: inquiryDetailsValue
            });

            // 成功メッセージを表示
            displayMessage('送信が完了しました。', 'success');
            // フォームをリセット
            form.reset();
            // フォームをリセットした後の状態をローカルストレージから再読み込み（これにより入力欄が空になる）
            loadFormData();
            // 送信ボタンの状態を元に戻す (テキストは変更しない)
            submitButton.disabled = false;
        } else {
            // ユーザーが「キャンセル」を選択した場合の処理
            displayMessage('送信がキャンセルされました。', 'info');
            // 送信ボタンを再度有効化
            submitButton.disabled = false;
            // submitButton.textContent = '上記の内容で送信する'; // 送信中のテキスト表示を削除
        }
    });

    // ----- メッセージ表示関数 -----
    function displayMessage(message, type = 'info') {
        // メッセージコンテナ要素を取得
        const messageContainer = document.querySelector('.message');

        // 新しいdiv要素を作成してメッセージを表示
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add('message', type); // CSSでスタイルを調整するためのクラスを追加

        // メッセージコンテナの子要素をクリアして新しいメッセージを追加
        messageContainer.innerHTML = ''; // 既存のメッセージをクリア
        messageContainer.appendChild(messageDiv);

        // 数秒後にメッセージを自動的に消す
        setTimeout(() => {
            messageContainer.innerHTML = ''; // メッセージコンテナを空にする
        }, 3000);
    }

    // ----- フォームデータをローカルストレージに保存する関数 -----
    function saveFormData(data) {
        localStorage.setItem('contactFormName', data.name);
        localStorage.setItem('contactFormKana', data.kana);
        localStorage.setItem('contactFormEmail', data.email);
        localStorage.setItem('contactFormPhone', data.phone);
        localStorage.setItem('contactFormDiving', data.diving);
        localStorage.setItem('contactFormParticipants', data.participants);
        localStorage.setItem('contactFormInquiryDetails', data.inquiryDetails);
    }

    // ----- ローカルストレージからフォームデータを読み込む関数 -----
    function loadFormData() {
        nameInput.value = localStorage.getItem('contactFormName') || '';
        kanaInput.value = localStorage.getItem('contactFormKana') || '';
        emailInput.value = localStorage.getItem('contactFormEmail') || '';
        phoneInput.value = localStorage.getItem('contactFormPhone') || '';
        divingTourInput.value = localStorage.getItem('contactFormDiving') || '';
        participantsInput.value = localStorage.getItem('contactFormParticipants') || '';
        inquiryDetailsInput.value = localStorage.getItem('contactFormInquiryDetails') || '';
    }

});

