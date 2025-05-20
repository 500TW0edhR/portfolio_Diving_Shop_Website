document.addEventListener("DOMContentLoaded", () => {

    // 要素を取得
    const anchor = document.querySelectorAll('a.ditails');

    // 3個あるaタグを判定
    anchor.forEach(anchor => {

        // マウスが要素に乗ったらaタグに.showを付ける
        anchor.addEventListener("mouseover", () => {

            anchor.classList.add("show");

            // 確認用
            // console.log(anchor.classList.contains("show"));

        });
    });
});

