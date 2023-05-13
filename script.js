let words = ["Kalem", "Kitap", "Çanta", "Dostum", "Sevgim", "Elbise", "Gözlük", "Sıcak", "Kova", "Ayna",
    "Bilgi", "Cüzdan", "Dolap", "Elbise", "Fatura", "Gözlük", "Hesap", "İşlem", "Joker",
    "Kalem", "Lamba", "Mikro", "Nakit", "Otomat", "Paket", "Radyo", "Saat", "Taksi", "Uygun",
    "Vizesi", "Yatak", "Araç", "Cetvel", "Deniz", "Enerji", "Ferah", "Gösteri",
    "Hava", "İşlem", "Jilet", "Kapak", "Lazer", "Makas", "Nokta", "Ödemek", "Piknik", "Rafine",
    "Sulama", "Tabak", "Uyku", "Vize", "Yıldız", "Zaman", "Ayrılık", "Bölge", "Çevre", "Düşün",
    "Efsane", "Favori", "Gönder", "Hayvan", "İşaret", "Jargon", "Kurabiye", "Lavabo", "Makale", "Nefret"]
let filteredArray = words.filter(str => str.length <= 6);
let word = filteredArray[Math.floor(Math.random() * filteredArray.length)].toLowerCase();
let stage = 0
let current = 0;

$(document).ready(function () {
    let j = 0;
    $('#column').children('.row').each(function () {
        for (let i = 0; i < word.length; i++) {
            $(this).append(`<input maxlength="1" marked="false" id="${(j * word.length) + i}" readonly></input>`)
        }
        j++;
    });

    move()
});

function move() {

    if (current % word.length === 0 && current !== 0) {
        let trueCount = 0;
        for (let i = 0; i < word.length; i++) {
            // find trues
            if (word[i] === $(`#${(stage * word.length) + i}`).val().toLowerCase()) {
                $(`#${(stage * word.length) + i}`).css('background-color', 'green')
                $(`#${(stage * word.length) + i}`).attr('marked', 'true')
                trueCount++;
            }

            // find yellowes
            for (let j = 0; j < word.length; j++) {
                for (let p = 0; p < word.length; p++) {
                    if ($(`#${(stage * word.length) + j}`).val().toLowerCase() === word[p] && $(`#${(stage * word.length) + j}`).attr('marked') === 'false') {
                        $(`#${(stage * word.length) + j}`).css('background-color', 'yellow')
                        $(`#${(stage * word.length) + j}`).attr('marked', 'true')
                    }

                }

            }

            // find reds
            for (let j = 0; j < word.length; j++) {
                if ($(`#${(stage * word.length) + j}`).attr('marked') === 'false') {
                    $(`#${(stage * word.length) + j}`).css('background-color', 'red')
                    $(`#${(stage * word.length) + j}`).attr('marked', 'true')
                }
            }
        }


        if (trueCount === word.length) {
            endGame("That's right! Here you go...")
        }
        stage++;
        if (stage === 6) {
            endGame(`Sadly, you lose! Wanna try again? (Word: ${word})`)
        }
    }

    $(`#${current - 1}`).attr('readonly', 'true')
    $(`#${current}`).removeAttr('readonly')
    let temp = current;
    $(`#${current}`).keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            move()
            $(`#${temp + 1}`).focus();
        }
    });

    current++;
}

function endGame(text) {
    $('.text').html(text)
    $('#msgbox').css('display', 'block')
}