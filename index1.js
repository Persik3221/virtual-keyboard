(function () {
    let keysEn = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650', 'Shift'],
        ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '&#9668', '&#9660', '&#9658', 'Ctrl']
    ];
    let keysEnUp = [
        ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
        ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
        ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
        ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '&#9650', 'Shift'],
        ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '&#9668', '&#9660', '&#9658', 'Ctrl']
    ];
    let keysRu = [
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
        ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
        ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650', 'Shift'],
        ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '&#9668', '&#9660', '&#9658', 'Ctrl']
    ];
    let keysRuUp = [
        ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
        ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/'],
        ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
        ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '&#9650', 'Shift'],
        ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '&#9668', '&#9660', '&#9658', 'Ctrl']
    ]
    let codes = [
        ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
        ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
        ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
    ]
    let systemKeys = ['Backspace', 'Tab', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'Enter', 'ControlRight', 'AltRight', 'AltLeft', 'ControlLeft', 'MetaLeft', 'Shift', 'Ctrl', 'Alt', 'Win'];
    let lang;
    if (sessionStorage.getItem('lang')) lang = sessionStorage.getItem('lang');
    else lang = 'en';

    let isAlt = 0;
    let isShift = 0;
    let isShiftKeyboard = 0; //flag for shift + more than 1 key
    let isCtrl = 0;
    let isCaps = 0;
    let textarea = document.createElement('textarea'); //add textarea
    textarea.setAttribute('id', 'res');
    document.body.append(textarea);
    textarea.focus;
    textarea.setActive;
    textarea.select();

    let keyboard = document.createElement('div'); // add keyboard div
    keyboard.className = "keyboard";
    document.body.append(keyboard);

    for (let i = 0; i < keysEn.length; i++) { // fill keyboard div
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < keysEn[i].length; j++) {
            let key = document.createElement('div');
            key.innerHTML = '<span class="' + codes[i][j] + ' On">\n<span class="hide">' + keysEnUp[i][j] + '</span>\n<span class="show">' + keysEn[i][j] + '</span>\n</span>\n<span class="' + codes[i][j] + ' Off"><span class="show">' + keysRu[i][j] + '</span><span class="hide">' + keysRuUp[i][j] + '</span></span></span>';
            key.classList.add('key');
            key.addEventListener('mousedown', mouseDown);
            row.append(key);
        }
        keyboard.append(row);
    }

    if (lang === 'ru') changeLang('start'); //change language if it needed

    let caps_check = document.createElement('div'); //add feature for showing capsLock active
    caps_check.className = 'caps_check';
    document.querySelector('.CapsLock').append(caps_check);
    caps_check = document.createElement('div');
    caps_check.className = 'caps_check';
    document.querySelector('.CapsLock:nth-child(2)').append(caps_check);

    document.addEventListener('keydown', keyDown); // add some eventListeners )))
    document.addEventListener('keyup', keyUp);
    document.addEventListener('mouseup', mouseUp);

    function keyDown(e) {
        e.preventDefault();
        setCaretPosEnd(textarea);
        let key = document.querySelectorAll("." + e.code);
        for (let i = 0; i < key.length; i++) {
            if (key[i].classList[1] === 'On') {
                key[i].parentElement.classList.add('selected');
                if (systemKeys.includes(e.code)) {
                    systemKey(e.code);
                } else {
                    if (key[i].children[0].className === 'show') textarea.value += key[i].children[0].innerHTML;
                    else textarea.value += key[i].children[1].innerHTML;
                }
            }
        }

    }

    function mouseDown(e) {
        let parent = e.target.parentElement;
        let res;
        if (parent.tagName === 'DIV') {
            parent.classList.add('selected');
            if (e.target.children[0].className === 'show') res = e.target.children[0].innerHTML;
            else res = e.target.children[1].innerHTML;
        } else {
            parent.parentElement.classList.add('selected');
            res = e.target.innerHTML;
        }
        if (systemKeys.includes(res)) systemKey(res);
        else textarea.value += res;
    }

    function mouseUp() {
        document.querySelectorAll(".key").forEach(element => element.classList.remove('selected'));
        if (isShift === 1) {
            if (isShiftKeyboard != 0) {
                if (isShiftKeyboard === 1) document.querySelector(".ShiftLeft").parentElement.classList.add('selected');
                if (isShiftKeyboard === 2) document.querySelector(".ShiftRight").parentElement.classList.add('selected');
            } else {
                changeCase();
                isShift = 0;
            }
        }
    }

    function keyUp(e) {
        document.querySelectorAll(".key").forEach(element => element.classList.remove('selected'));
        if (isAlt === 1 || isCtrl === 1) {
            if (isAlt === 1 && isShift === 1) {
                changeLang();
                changeCase(); // этого не должно тут быть. Но если не вызывать эту фунцию, то вместе с языком поменяется и регистр... Так что поставил так чтобы сразу возвращался назад... 
            }
            if (isCtrl === 1 && isShift === 1) {
                changeLang();
                changeCase(); // тут тоже самое что и выше... видимо проблема в шифте, но в чем именно не могу понять... 
            }
            if (isAlt === 1 && isCtrl === 1) {
                changeLang(); // о вот тут нормас работает)))
            }
            isShift = 0;
            isShiftKeyboard = 0;
        } else {
            if (isShiftKeyboard != 0 && e.code != 'ShiftRight' && e.code != 'ShiftLeft') {
                if (isShiftKeyboard === 1) document.querySelector(".ShiftLeft").parentElement.classList.add('selected');
                if (isShiftKeyboard === 2) document.querySelector(".ShiftRight").parentElement.classList.add('selected');
            } else {
                isShiftKeyboard = 0;
                if (isShift === 1) {
                    isShift = 0;
                    changeCase();
                }
            }
        }
        isCtrl = 0;
        isAlt = 0;
    }

    function systemKey(key) {
        if (key === 'ShiftLeft' || key === 'ShiftRight') {
            if (key === 'ShiftLeft') isShiftKeyboard = 1;
            if (key === 'ShiftRight') isShiftKeyboard = 2;
            if (isShift === 0) {
                isShift = 1;
                changeCase();
            }
        }
        if (key === 'Shift') {
            if (isCtrl === 1) {
                changeLang();
                isCtrl = 0;
            } else if (isAlt === 1) {
                changeLang();
                isAlt = 0;
            } else {
                changeCase();
                isShift = 1;
            }
        }
        if (key === 'Tab') {
            textarea.value += '   ';
        }
        if (key === 'Backspace') {
            textarea.value = textarea.value.substr(0, textarea.value.length - 1);
        }
        if (key === 'CapsLock') {
            caps_check = document.querySelectorAll('.caps_check');
            if (isCaps === 0) {
                caps_check.forEach(element => element.classList.add('active'));
                isCaps = 1;
            } else {
                isCaps = 0;
                caps_check.forEach(element => element.classList.remove('active'));
            }
            changeCase();
        }
        if (key === 'Enter') {
            textarea.value += '\n';
            changeLang();
        }

        if (key === 'ControlRight' || key === 'ControlLeft' || key === 'Ctrl') {
            isCtrl = 1;
        }
        if (key === 'AltRight' || key === 'AltLeft' || key === 'Alt') {
            isAlt = 1;
        }
        
    }

    function changeCase() {
        let keyS = document.querySelectorAll(".On");
        let activeChild = 0,
            notActiveChild = 0;
        if (keyS[0].children[0].className === 'show') {
            activeChild = 0;
            notActiveChild = 1;
        } else {
            activeChild = 1;
            notActiveChild = 0;
        }
        keyS.forEach(function (element) {
            element.children[activeChild].classList.remove('show');
            element.children[activeChild].classList.add('hide');
            element.children[notActiveChild].classList.add('show');
            element.children[notActiveChild].classList.remove('hide')
        });
    }

    function changeLang(place) {
        let keyS = document.querySelectorAll(".key");
        let activeChild, notActiveChild;
        if (keyS[0].children[0].classList[1] === 'On') {
            activeChild = 0;
            notActiveChild = 1;
        } else {
            activeChild = 1;
            notActiveChild = 0;
        }
        keyS.forEach(function (element) {
            element.children[activeChild].classList.remove('On');
            element.children[activeChild].classList.add('Off');
            element.children[notActiveChild].classList.add('On');
            element.children[notActiveChild].classList.remove('Off')
        });
        if (place === 'start') {} else {
            if (isCaps) changeCase();
            if (lang === 'en') {
                sessionStorage.setItem('lang', 'ru');
                lang = 'ru';
            } else {
                sessionStorage.setItem('lang', 'en');
                lang = 'en';
            }
        }
    }



    function setCaretPosEnd(area) { //put cursor in textarea
        var length = area.value.length;
        if (area.setSelectionRange) {
            area.focus();
            area.setSelectionRange(length, length);
        } else if (area.createTextRange) {
            var range = area.createTextRange();
            range.collapse(true);
            range.moveEnd('character', length);
            range.moveStart('character', length);
            range.select();
        }
    }
})()