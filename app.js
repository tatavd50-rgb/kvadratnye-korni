/* Квадратные корни — клиентская логика.
 * Весь контент задач и теста статический (описан ниже в этом файле).
 * Проверка ответов выполняется только в текущем открытом сеансе страницы.
 * Никакие результаты и ответы не сохраняются в браузере.
 */
(function () {
  "use strict";

  /* ============================= ДАННЫЕ ============================= */

  var TASKS = {
    properties: [
      { type: "number", prompt: "Вычислите: √(16 · 25)", answer: 20,
        solution: "√(16·25) = √16 · √25 = 4 · 5 = 20" },
      { type: "number", prompt: "Вычислите: √(36 · 4)", answer: 12,
        solution: "√(36·4) = √36 · √4 = 6 · 2 = 12" },
      { type: "number", prompt: "Вычислите: (√13)²", answer: 13,
        solution: "(√13)² = 13" },
      { type: "number", prompt: "Вычислите: √(100 ⁄ 4)", answer: 5,
        solution: "√(100⁄4) = √100 ⁄ √4 = 10 ⁄ 2 = 5" }
    ],
    equations: [
      { type: "roots", prompt: "Решите уравнение: x² = 49", answers: [7, -7],
        solution: "49 > 0, значит корней два: x = √49 = 7 и x = −7" },
      { type: "roots", prompt: "Решите уравнение: x² = 0", answers: [0],
        solution: "a = 0 — уравнение имеет единственный корень x = 0" },
      { type: "roots", prompt: "Решите уравнение: x² = −16", answers: [],
        solution: "−16 < 0, а квадрат числа не может быть отрицательным — решений нет" },
      { type: "roots", prompt: "Решите уравнение: x² = 0,25", answers: [0.5, -0.5],
        solution: "0,25 > 0, x = √0,25 = 0,5 и x = −0,5" }
    ],
    "function": [
      { type: "number", prompt: "Найдите y = √x при x = 25", answer: 5,
        solution: "√25 = 5, так как 5² = 25" },
      { type: "number", prompt: "Найдите y = √x при x = 169", answer: 13,
        solution: "√169 = 13, так как 13² = 169" },
      { type: "number", prompt: "При каком x значение y = √x равно 9?", answer: 81,
        solution: "√x = 9 ⇒ x = 9² = 81" }
    ],
    "factor-out": [
      { type: "coef_radical", prompt: "Вынесите множитель из-под корня: √98 = ___ · √___", coef: 7, radicand: 2,
        solution: "98 = 49·2, √98 = √49 · √2 = 7√2" },
      { type: "coef_radical", prompt: "Вынесите множитель из-под корня: √200 = ___ · √___", coef: 10, radicand: 2,
        solution: "200 = 100·2, √200 = √100 · √2 = 10√2" },
      { type: "coef_radical", prompt: "Вынесите множитель из-под корня: √108 = ___ · √___", coef: 6, radicand: 3,
        solution: "108 = 36·3, √108 = √36 · √3 = 6√3" },
      { type: "coef_radical", prompt: "Вынесите множитель из-под корня: √75 = ___ · √___", coef: 5, radicand: 3,
        solution: "75 = 25·3, √75 = √25 · √3 = 5√3" }
    ],
    "factor-in": [
      { type: "number", prompt: "Внесите множитель под знак корня: 5√3 = √___", answer: 75,
        solution: "5√3 = √(5²·3) = √(25·3) = √75" },
      { type: "number", prompt: "Внесите множитель под знак корня: 4√5 = √___", answer: 80,
        solution: "4√5 = √(4²·5) = √(16·5) = √80" },
      { type: "number", prompt: "Внесите множитель под знак корня: 3√7 = √___", answer: 63,
        solution: "3√7 = √(3²·7) = √(9·7) = √63" },
      { type: "number", prompt: "Внесите множитель под знак корня: 6√2 = √___", answer: 72,
        solution: "6√2 = √(6²·2) = √(36·2) = √72" }
    ],
    transform: [
      { type: "number", prompt: "Вычислите: (√5 − 2)(√5 + 2)", answer: 1,
        solution: "Разность квадратов: (√5)² − 2² = 5 − 4 = 1" },
      { type: "number", prompt: "Вычислите: (√11 + 4)(√11 − 4)", answer: -5,
        solution: "(√11)² − 4² = 11 − 16 = −5" },
      { type: "coef_radical", prompt: "Упростите: √50 + √8 = ___ · √___", coef: 7, radicand: 2,
        solution: "√50 = 5√2, √8 = 2√2, поэтому 5√2 + 2√2 = 7√2" },
      { type: "coef_radical", prompt: "Упростите: 3√12 − √27 = ___ · √___", coef: 3, radicand: 3,
        solution: "3√12 − √27 = 3·2√3 − 3√3 = 3√3" }
    ]
  };

  var QUIZ_POOL = [
    { prompt: "√(9 · 16) = ?", options: ["12", "144", "25", "6"], correct: 0 },
    { prompt: "√(49 ⁄ 4) = ?", options: ["3,5", "7", "12,25", "24,5"], correct: 0 },
    { prompt: "Чему равно √(x²) при x = −5?", options: ["−5", "5", "25", "−25"], correct: 1 },
    { prompt: "Сколько корней имеет уравнение x² = 36?", options: ["один", "два", "ни одного", "бесконечно много"], correct: 1 },
    { prompt: "Уравнение x² = −4:", options: ["x = 2, x = −2", "x = 4, x = −4", "не имеет решений", "x = 0"], correct: 2 },
    { prompt: "Область определения функции y = √x — это:", options: ["все числа", "x ≥ 0", "x > 0", "x ≤ 0"], correct: 1 },
    { prompt: "Вынесите множитель из-под корня: √32 = ?", options: ["4√2", "2√8", "8√4", "16√2"], correct: 0 },
    { prompt: "Внесите множитель под знак корня: 2√7 = ?", options: ["√14", "√28", "√9", "√49"], correct: 1 },
    { prompt: "√(100 ⁄ 25) = ?", options: ["2", "4", "5", "20"], correct: 0 },
    { prompt: "Решите: x² = 81", options: ["x = 9", "x = −9", "x = 9 и x = −9", "решений нет"], correct: 2 },
    { prompt: "При каком x значение √x равно 6?", options: ["6", "12", "18", "36"], correct: 3 },
    { prompt: "√72 после вынесения множителя равен:", options: ["6√2", "8√2", "3√8", "9√2"], correct: 0 },
    { prompt: "3√5 после внесения множителя под корень:", options: ["√15", "√45", "√75", "√125"], correct: 1 },
    { prompt: "√18 + √8 = ?", options: ["5√2", "6√2", "7√2", "8√2"], correct: 0 },
    { prompt: "(√7 − 2)(√7 + 2) = ?", options: ["3", "5", "7", "9"], correct: 0 },
    { prompt: "1⁄√5 после рационализации знаменателя равно:", options: ["√5", "√5⁄5", "5√5", "1⁄5"], correct: 1 },
    { prompt: "Какая область значений у функции y = √x?", options: ["y < 0", "y ≥ 0", "все y", "y ≤ 0"], correct: 1 },
    { prompt: "√(a²) при любом действительном a равно:", options: ["a", "−a", "|a|", "a²"], correct: 2 },
    { prompt: "Если a < 0, уравнение x² = a:", options: ["имеет два корня", "имеет один корень", "не имеет действительных решений", "имеет бесконечно много корней"], correct: 2 },
    { prompt: "4√3 = √?", options: ["12", "24", "36", "48"], correct: 3 },
    { prompt: "√27 = ?", options: ["3√3", "9√3", "3√9", "27√3"], correct: 0 },
    { prompt: "√50 = ?", options: ["5√2", "2√5", "10√5", "25√2"], correct: 0 },
    { prompt: "√12 + √27 = ?", options: ["5√3", "7√3", "9√3", "39√3"], correct: 1 },
    { prompt: "√48 − √12 = ?", options: ["2√3", "3√3", "4√3", "6√3"], correct: 0 },
    { prompt: "Решите: x² = 25", options: ["x = 5", "x = −5", "x = 5 и x = −5", "решений нет"], correct: 2 },
    { prompt: "Решите: x² = 0,09", options: ["x = 0,3", "x = −0,3", "x = 0,3 и x = −0,3", "x = 0,09"], correct: 2 },
    { prompt: "Если x = −7, то √(x²) = ?", options: ["−7", "7", "49", "−49"], correct: 1 },
    { prompt: "Какова область определения y = √(x − 3)?", options: ["x ≥ 3", "x > 3", "x ≤ 3", "все x"], correct: 0 },
    { prompt: "Вынесите множитель из-под корня: √108 = ?", options: ["3√12", "6√3", "9√2", "12√3"], correct: 1 },
    { prompt: "Внесите множитель под знак корня: 3√2 = ?", options: ["√6", "√9", "√18", "√27"], correct: 2 },
    { prompt: "(√11 − 3)(√11 + 3) = ?", options: ["2", "3", "9", "11"], correct: 0 },
    { prompt: "√5 · √20 = ?", options: ["5", "10", "√25", "2√5"], correct: 1 }
  ];

  var SECTION_TITLES = {
    properties: "Свойства корня",
    equations: "Уравнения x²=a",
    "function": "Функция y=√x",
    "factor-out": "Вынесение множителя",
    "factor-in": "Внесение множителя",
    transform: "Преобразования"
  };


  /* ============================= МАТЕМАТИЧЕСКАЯ ЗАПИСЬ =============================
   * MathJax: надёжный вывод корней и дробей с настоящей математической вёрсткой.
   */
  function texEscapeText(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/([{}])/g, '\\$1');
  }

  function supersToTex(s) {
    var map = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9'};
    return String(s).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, function(m){
      return '^{' + m.split('').map(function(c){ return map[c]; }).join('') + '}';
    });
  }

  function radicalToTex(s) {
    s = String(s).replace(/−/g,'-').replace(/⁄/g,'/');
    s = supersToTex(s);

    // Radicals with parentheses: √(a·b) -> \\sqrt{a\\cdot b}
    var prev;
    do {
      prev = s;
      s = s.replace(/√\(([^()]*)\)/g, function(_, inner){
        inner = inner.replace(/([A-Za-zА-Яа-я0-9]+)\s*\/\s*([A-Za-zА-Яа-я0-9]+)/g, '\\frac{$1}{$2}');
        return '\\sqrt{' + inner + '}';
      });
    } while (s !== prev);

    // Remaining simple radicals: √a, √12, √{...}
    s = s.replace(/√\{([^{}]*)\}/g, '\\sqrt{$1}');
    s = s.replace(/√([A-Za-zА-Яа-я0-9]+)/g, '\\sqrt{$1}');

    // Absolute value.
    s = s.replace(/\|([^|]+)\|/g, '\\left|$1\\right|');

    // Convert simple fractions. Repeatedly handles expressions such as
    // √a/√b and √(a/b) after the radical conversion above.
    for (var k=0;k<4;k++) {
      var old=s;
      s=s.replace(/(\\sqrt\{[^{}]*\}|\\left\|[^|]*\\right\}|[A-Za-zА-Яа-я0-9]+(?:\^\{[^{}]+\})?|\([^()]+\))\s*\/\s*(\\sqrt\{[^{}]*\}|[A-Za-zА-Яа-я0-9]+(?:\^\{[^{}]+\})?|\([^()]+\))/g,
        '\\frac{$1}{$2}');
      if(s===old) break;
    }

    s = s.replace(/·/g,'\\cdot ')
         .replace(/×/g,'\\times ')
         .replace(/≥/g,'\\ge ')
         .replace(/≤/g,'\\le ')
         .replace(/→/g,'\\to ')
         .replace(/−/g,'-');
    return s;
  }

  function mathNode(expr) {
    return '<span class="math-inline">\\(' + radicalToTex(expr) + '\\)</span>';
  }

  function isMathStart(text, i) {
    return text[i] === '√' && i + 1 < text.length;
  }

  function typesetTextNodes(root) {
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT), nodes=[], n;
    while((n=walker.nextNode())) {
      if(!n.parentElement || ['SCRIPT','STYLE','TEXTAREA','INPUT','OPTION','MATH'].includes(n.parentElement.tagName)) continue;
      if(/[√⁄]/.test(n.nodeValue)) nodes.push(n);
    }

    nodes.forEach(function(node){
      var text=node.nodeValue;
      var frag=document.createDocumentFragment();
      var pos=0;

      // Formula chunks are deliberately kept whole. This avoids splitting
      // √a/√b into several independent math elements.
      var re=/√(?:\([^()]*\)|[A-Za-zА-Яа-я0-9]+)(?:\s*⁄\s*(?:√(?:\([^()]*\)|[A-Za-zА-Яа-я0-9]+)|[A-Za-zА-Яа-я0-9]+))?|[A-Za-zА-Яа-я0-9]+\s*⁄\s*(?:√(?:\([^()]*\)|[A-Za-zА-Яа-я0-9]+)|[A-Za-zА-Яа-я0-9]+)/g;
      var m;
      var found=false;
      while((m=re.exec(text))){
        var start=m.index;
        if(start>pos) frag.appendChild(document.createTextNode(text.slice(pos,start)));
        var end=m.index+m[0].length;
        // Extend the formula through an equation/short expression.
        var tail=text.slice(end);
        var tm=tail.match(/^\s*(?:=|\+|-|·)\s*(?:√(?:\([^()]*\)|[A-Za-zА-Яа-я0-9]+)|[A-Za-zА-Яа-я0-9]+(?:²|³|⁴|⁵|⁶|⁷|⁸|⁹)?)(?:\s*⁄\s*(?:√(?:\([^()]*\)|[A-Za-zА-Яа-я0-9]+)|[A-Za-zА-Яа-я0-9]+))?/);
        if(tm) end += tm[0].length;
        frag.appendChild(document.createRange().createContextualFragment(mathNode(text.slice(start,end).trim())));
        pos=end; re.lastIndex=end; found=true;
      }
      if(found){
        if(pos<text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
        node.parentNode.replaceChild(frag,node);
      }
    });

    // Formula-only blocks may contain fractions without a leading radical,
    // e.g. 1⁄√5. Convert the remaining fraction nodes as a whole.
    root.querySelectorAll('.rule__formula,.ex-task,.ex-step,.ex-res').forEach(function(el){
      if(el.dataset.mathDone) return;
      var t=el.textContent.trim();
      if(/[√⁄]/.test(t)){
        el.innerHTML=mathNode(t);
        el.dataset.mathDone='1';
      }
    });

    if(window.MathJax && MathJax.typesetPromise){
      MathJax.typesetPromise([root]).catch(function(){});
    }
  }

  /* ============================= ПРОВЕРКА ОТВЕТОВ ============================= */

  function parseNumber(str) {
    if (str == null) return NaN;
    var s = String(str).trim().replace(",", ".");
    if (s === "") return NaN;
    return parseFloat(s);
  }

  function numbersClose(a, b, eps) {
    return Math.abs(a - b) < (eps || 0.01);
  }

  function extractNumbers(str) {
    var m = String(str).match(/-?\d+(?:[.,]\d+)?/g);
    if (!m) return [];
    return m.map(function (x) { return parseFloat(x.replace(",", ".")); });
  }

  function checkTask(task, card) {
    var ok = false;
    if (task.type === "number") {
      var v = parseNumber(card.querySelector("[data-answer]").value);
      ok = !isNaN(v) && numbersClose(v, task.answer);
    } else if (task.type === "coef_radical") {
      var c = parseNumber(card.querySelector("[data-coef]").value);
      var r = parseNumber(card.querySelector("[data-radicand]").value);
      ok = !isNaN(c) && !isNaN(r) && numbersClose(c, task.coef) && numbersClose(r, task.radicand);
    } else if (task.type === "roots") {
      var raw = card.querySelector("[data-answer]").value.trim();
      if (task.answers.length === 0) {
        ok = /нет/i.test(raw);
      } else {
        var nums = extractNumbers(raw).sort(function (a, b) { return a - b; });
        var expected = task.answers.slice().sort(function (a, b) { return a - b; });
        ok = nums.length === expected.length && expected.every(function (e, i) { return numbersClose(e, nums[i]); });
      }
    }
    return ok;
  }

  function renderTaskInputs(task) {
    if (task.type === "number") {
      return '<input type="text" inputmode="decimal" data-answer placeholder="ответ">';
    }
    if (task.type === "coef_radical") {
      return '<input type="text" inputmode="decimal" data-coef placeholder="коэфф." style="width:4.5em">' +
        '<span class="radical-input">· <span class="radical-input__sign">√</span><input type="text" inputmode="decimal" data-radicand placeholder="число" style="width:4.5em"></span>';
    }
    if (task.type === "roots") {
      return '<input type="text" data-answer placeholder="напр. 4, -4" style="width:11em">';
    }
    return "";
  }

  function buildTaskCard(sectionKey, index, task) {
    var id = sectionKey + "-" + index;
    var card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML =
      '<p class="task-card__prompt">' + (index + 1) + ". " + task.prompt + "</p>" +
      '<div class="task-card__row">' + renderTaskInputs(task) + "</div>" +
      '<div class="task-card__actions">' +
        '<button type="button" class="mini-btn" data-check>Проверить</button>' +
        '<button type="button" class="mini-btn" data-reveal>Показать решение</button>' +
      "</div>" +
      '<p class="task-card__feedback" data-feedback></p>' +
      '<p class="task-card__solution" data-solution>' + task.solution + "</p>";
    typesetTextNodes(card);

    var fb = card.querySelector("[data-feedback]");

    card.querySelector("[data-check]").addEventListener("click", function () {
      var ok = checkTask(task, card);
      fb.textContent = ok ? "Верно!" : "Пока не совпадает — попробуйте ещё раз.";
      fb.classList.toggle("is-ok", ok);
      fb.classList.toggle("is-bad", !ok);
    });
    card.querySelector("[data-reveal]").addEventListener("click", function (e) {
      var sol = card.querySelector("[data-solution]");
      sol.classList.toggle("is-open");
      e.target.textContent = sol.classList.contains("is-open") ? "Скрыть решение" : "Показать решение";
    });
    return card;
  }

  function renderAllTasks() {
    Object.keys(TASKS).forEach(function (key) {
      var host = document.querySelector('.tasks[data-section="' + key + '"] [data-task-list]');
      if (!host) return;
      TASKS[key].forEach(function (task, i) {
        host.appendChild(buildTaskCard(key, i, task));
      });
    });
  }


  /* ============================= УДАЛЕНИЕ ОТВЕТОВ В ЗАДАЧАХ ============================= */

  function clearTaskAnswers(tasksBox) {
    if (!tasksBox) return;
    tasksBox.querySelectorAll("[data-answer], [data-coef], [data-radicand]").forEach(function (input) {
      input.value = "";
    });
    tasksBox.querySelectorAll("[data-feedback]").forEach(function (fb) {
      fb.textContent = "";
      fb.classList.remove("is-ok", "is-bad");
    });
    tasksBox.querySelectorAll("[data-solution]").forEach(function (sol) {
      sol.classList.remove("is-open");
    });
    tasksBox.querySelectorAll("[data-reveal]").forEach(function (btn) {
      btn.textContent = "Показать решение";
    });
  }

  function initTaskClearButtons() {
    document.querySelectorAll("[data-clear-tasks]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tasksBox = btn.closest(".tasks");
        clearTaskAnswers(tasksBox);
      });
    });
  }

  /* ============================= ИТОГОВЫЙ ТЕСТ ============================= */

  function shuffle(arr) {
    var a = arr.slice();
    for (var i=a.length-1;i>0;i--) {
      var j=Math.floor(Math.random()*(i+1));
      var tmp=a[i]; a[i]=a[j]; a[j]=tmp;
    }
    return a;
  }

  var currentQuiz = [];
  var quizRound = 0;

  function pickQuizQuestions() {
    var previousIds = currentQuiz.map(function(q){ return q.id; });
    var pool = QUIZ_POOL.map(function(q, i){
      var copy = Object.assign({}, q);
      copy.id = "q" + i;
      return copy;
    });
    var available = pool.filter(function(q){ return previousIds.indexOf(q.id) === -1; });
    // При повторном прохождении сначала берём только новые вопросы.
    // Если банк когда-нибудь станет меньше 8 вопросов, разрешаем повтор.
    if (available.length < 8) available = pool;
    return shuffle(available).slice(0, 8);
  }

  function renderQuiz() {
    var form = document.getElementById("quiz-form");
    if (!form) return;
    form.innerHTML = "";
    currentQuiz = pickQuizQuestions();
    quizRound++;

    currentQuiz.forEach(function (q, qi) {
      var block = document.createElement("div");
      block.className = "quiz-q";
      block.dataset.qi = qi;
      var opts = q.options.map(function (opt, oi) {
        return '<label><input type="radio" name="q' + qi + '" value="' + oi + '"> ' + opt + "</label>";
      }).join("");
      block.innerHTML = '<p class="quiz-q__prompt">' + (qi + 1) + ". " + q.prompt + '</p><div class="quiz-q__opts">' + opts + "</div>";
      typesetTextNodes(block);
      form.appendChild(block);
    });

    var resultEl = document.getElementById("quiz-result");
    var retryBtn = document.getElementById("quiz-retry");
    if (retryBtn) retryBtn.hidden = true;
    resultEl.textContent = "";

    var submit = document.getElementById("quiz-submit");
    if (submit) submit.onclick = function () {
      var score = 0;
      currentQuiz.forEach(function (q, qi) {
        var block = form.querySelector('[data-qi="' + qi + '"]');
        var picked = form.querySelector('input[name="q' + qi + '"]:checked');
        var correct = !!picked && Number(picked.value) === Number(q.correct);
        block.classList.toggle("is-correct", correct);
        block.classList.toggle("is-wrong", !correct);
        if (correct) score++;
      });
      var total = currentQuiz.length;
      var verdict = score === total ? "Отлично! Тема усвоена." : score >= total * 0.6 ? "Неплохо, но стоит повторить отдельные разделы." : "Повторите теорию и попробуйте ещё раз.";
      resultEl.textContent = "Результат: " + score + " из " + total + ". " + verdict;
      if (retryBtn) retryBtn.hidden = false;
    };

    var reset = document.getElementById("quiz-reset");
    if (reset) reset.onclick = function () {
      form.reset();
      form.querySelectorAll(".quiz-q").forEach(function (b) { b.classList.remove("is-correct", "is-wrong"); });
      resultEl.textContent = "";
      if (retryBtn) retryBtn.hidden = true;
    };

    if (retryBtn) retryBtn.onclick = function () {
      renderQuiz();
      document.getElementById("quiz-form").scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  /* ============================= ГРАФИК y = √x ============================= */

  var NS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  function initGraph() {
    var svg = document.getElementById("sqrt-graph");
    if (!svg) return;
    var originX = 40, originY = 160, scaleX = 25, scaleY = 34, xMax = 12, yMax = 4;

    for (var gx = 0; gx <= xMax; gx += 2) {
      svg.appendChild(svgEl("line", { x1: originX + gx * scaleX, y1: 10, x2: originX + gx * scaleX, y2: originY, class: "graph-grid" }));
      svg.appendChild(svgEl("text", { x: originX + gx * scaleX, y: originY + 14, class: "graph-tick", "text-anchor": "middle" })).textContent = gx;
    }
    for (var gy = 0; gy <= yMax; gy += 1) {
      var yy = originY - gy * scaleY;
      svg.appendChild(svgEl("line", { x1: originX, y1: yy, x2: originX + xMax * scaleX, y2: yy, class: "graph-grid" }));
      var t = svgEl("text", { x: originX - 8, y: yy + 3, class: "graph-tick", "text-anchor": "end" });
      t.textContent = gy;
      svg.appendChild(t);
    }
    svg.appendChild(svgEl("line", { x1: originX, y1: originY, x2: originX + xMax * scaleX, y2: originY, class: "graph-axis" }));
    svg.appendChild(svgEl("line", { x1: originX, y1: 10, x2: originX, y2: originY, class: "graph-axis" }));

    var d = "";
    for (var x = 0; x <= xMax; x += 0.25) {
      var px = originX + x * scaleX;
      var py = originY - Math.sqrt(x) * scaleY;
      d += (x === 0 ? "M " : "L ") + px + " " + py + " ";
    }
    svg.appendChild(svgEl("path", { d: d, class: "graph-curve" }));

    var point = svgEl("circle", { r: 6, class: "graph-point", tabindex: "0", role: "slider",
      "aria-label": "Точка на графике y = корень из x", "aria-valuemin": "0", "aria-valuemax": String(xMax) });
    svg.appendChild(point);

    var xOut = document.getElementById("graph-x");
    var yOut = document.getElementById("graph-y");

    function setX(xVal) {
      xVal = Math.max(0, Math.min(xMax, xVal));
      var yVal = Math.sqrt(xVal);
      point.setAttribute("cx", originX + xVal * scaleX);
      point.setAttribute("cy", originY - yVal * scaleY);
      point.setAttribute("aria-valuenow", xVal.toFixed(2));
      xOut.textContent = xVal.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
      yOut.textContent = yVal.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
    }
    setX(4);

    function clientToX(evt) {
      var pt = svg.createSVGPoint();
      pt.x = evt.clientX; pt.y = evt.clientY;
      var loc = pt.matrixTransform(svg.getScreenCTM().inverse());
      return (loc.x - originX) / scaleX;
    }

    var dragging = false;
    point.addEventListener("pointerdown", function (e) { dragging = true; point.setPointerCapture(e.pointerId); });
    point.addEventListener("pointermove", function (e) { if (dragging) setX(clientToX(e)); });
    point.addEventListener("pointerup", function () { dragging = false; });
    point.addEventListener("keydown", function (e) {
      var current = parseFloat(point.getAttribute("aria-valuenow"));
      if (e.key === "ArrowRight") { setX(current + 0.5); e.preventDefault(); }
      if (e.key === "ArrowLeft") { setX(current - 0.5); e.preventDefault(); }
    });
  }

  /* ============================= СПИРАЛЬ: анимация появления ============================= */

  function initSpiralReveal() {
    var path = document.getElementById("spiral-path");
    if (!path || typeof path.getTotalLength !== "function") return;
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.setProperty("--spiral-len", len);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = 0;
      return;
    }
    requestAnimationFrame(function () { path.classList.add("is-drawing"); });
  }

  /* ============================= SCROLLSPY ============================= */

  function initScrollspy() {
    var links = document.querySelectorAll("#quicknav a");
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-topic], #sec-test"));
    if (!sections.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("is-active", l.dataset.nav === entry.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAllTasks();
    initTaskClearButtons();
    renderQuiz();
    initGraph();
    initSpiralReveal();
    initScrollspy();
    function finishMathTypeset(){
      typesetTextNodes(document.body);
      if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([document.body]).catch(function(){});
    }
    if(window.MathJax && MathJax.startup && MathJax.startup.promise){
      MathJax.startup.promise.then(finishMathTypeset);
    } else {
      var tries=0, timer=setInterval(function(){
        tries++;
        if(window.MathJax && MathJax.startup && MathJax.startup.promise){
          clearInterval(timer);
          MathJax.startup.promise.then(finishMathTypeset);
        } else if(tries>80){ clearInterval(timer); finishMathTypeset(); }
      },100);
    }
  });
})();
