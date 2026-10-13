/* ============================================================
   Милый уголок — логика
   Комплименты · прогресс · тамагочи · уведомления · RU/DE
   ============================================================ */

"use strict";

/* ---------- хранилище ---------- */

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (_) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      /* приватный режим — работаем без сохранения */
    }
  },
};

const KEYS = {
  lang: "cute.lang",
  pet: "cute.pet.v2",
  sound: "cute.sound",
  complimentsMonth: "cute.compliments.month",
  complimentsLog: "cute.compliments.log",
  notify: "cute.notify",
};

/* ---------- тексты ---------- */

const I18N = {
  ru: {
    app_title: "Милый уголок",
    hero_kicker: "специально для тебя",
    hero_hi: "Привет,",
    hero_text: "Тут немного тепла: комплименты и один очень скучающий хомячок.",
    btn_to_compliment: "Комплимент",
    btn_to_pet: "К хомячку",
    compliment_title: "💌 Комплимент по кнопке",
    compliment_sub: "Нажимай, пока не станет теплее.",
    compliment_placeholder: "Твой комплимент появится здесь…",
    btn_compliment: "Дай комплимент",
    btn_copy: "Скопировать",
    btn_share: "Скинуть",
    copied: "Скопировано 💗",
    copied_share: "Скопировано — вставляй в чат 💗",
    share_empty: "Пока нет комплиментов — сначала нажми «Дай комплимент»",
    copy_hint: (n) => `В копилке ${n} тёплых слов — хватит на целый месяц`,

    pet_title: "🐹 Хомячок Бублик",
    pet_sub: "Он скучает, когда тебя нет. Загляни к нему — и он напишет тебе.",
    stat_hunger: "Сытость",
    stat_happy: "Настроение",
    stat_energy: "Энергия",
    btn_feed: "Накормить",
    btn_play: "Поиграть",
    btn_sleep: "Спать",
    btn_wake: "Просыпайся",
    btn_pet: "Погладить",
    btn_reset: "Начать заново",
    btn_notify_on: "Включить уведомления",
    btn_notify_off: "Уведомления включены ✓",
    notify_denied: "Браузер не разрешил уведомления — но Бублик всё равно ждёт",
    notify_blocked: "Уведомления заблокированы в настройках браузера",
    mood_happy: "Бублик на седьмом небе ☀️",
    mood_ok: "Бублик просто рядом, и это уже хорошо",
    mood_sad: "Бублику грустно без тебя… 🥺",
    mood_sleep: "Бублик спит и видит тебя 💤",
    welcome_back: (mins) =>
      mins >= 60
        ? `Ты не была ${Math.round(mins / 60)} ч! Я уже соскучился 🥺`
        : `Ты вернулась! Я ждал ${Math.round(mins)} мин 💗`,

    footer_made: "Сделано с любовью, для тебя",
    footer_note: "Работает офлайн, ничего никуда не отправляется.",
  },

  de: {
    app_title: "Kuschel-Ecke",
    hero_kicker: "nur für dich",
    hero_hi: "Hallo,",
    hero_text: "Ein bisschen Wärme: Komplimente und ein Hamster, der dich vermisst.",
    btn_to_compliment: "Kompliment",
    btn_to_pet: "Zum Hamster",

    compliment_title: "💌 Kompliment auf Knopfdruck",
    compliment_sub: "Drück so lange, bis es wärmer wird.",
    compliment_placeholder: "Dein Kompliment erscheint hier…",
    btn_compliment: "Gib mir ein Kompliment",
    btn_copy: "Kopieren",
    btn_share: "Teilen",
    copied: "Kopiert 💗",
    copied_share: "Kopiert — in den Chat einfügen 💗",
    share_empty: "Noch keine Komplimente — drück zuerst 'Gib mir ein Kompliment'",
    copy_hint: (n) => `${n} liebe Worte in der Sammlung — reicht für einen ganzen Monat`,

    pet_title: "🐹 Hamster Krümel",
    pet_sub: "Er vermisst dich, wenn du weg bist. Schau vorbei — er schreibt dir.",
    stat_hunger: "Sättigung",
    stat_happy: "Laune",
    stat_energy: "Energie",
    btn_feed: "Füttern",
    btn_play: "Spielen",
    btn_sleep: "Schlafen",
    btn_wake: "Aufwachen",
    btn_pet: "Streicheln",
    btn_reset: "Neu anfangen",
    btn_notify_on: "Benachrichtigungen an",
    btn_notify_off: "Benachrichtigungen an ✓",
    notify_denied: "Der Browser erlaubt keine Meldungen — Krümel wartet trotzdem",
    notify_blocked: "Meldungen sind im Browser gesperrt",
    mood_happy: "Krümel schwebt auf Wolke sieben ☀️",
    mood_ok: "Krümel ist einfach da, und das ist schon schön",
    mood_sad: "Krümel ist traurig ohne dich… 🥺",
    mood_sleep: "Krümel schläft und träumt von dir 💤",
    welcome_back: (mins) =>
      mins >= 60
        ? `Du warst ${Math.round(mins / 60)} Std. weg! Ich hab dich vermisst 🥺`
        : `Du bist zurück! Ich wartete ${Math.round(mins)} Min 💗`,

    footer_made: "Mit Liebe gemacht, für dich",
    footer_note: "Läuft offline, es wird nichts irgendwohin geschickt.",
  },
};

const CONTENT = {
  compliments: {
    ru: [
      "Твоя улыбка — причина, по которой у меня сбивается дыхание.",
      "Ты умеешь делать обычный вторник праздником.",
      "Рядом с тобой я забываю, что собирался сказать.",
      "Ты теплее, чем плед, какао и три одеяла вместе.",
      "Твой смех — мой любимый звук в мире.",
      "Ты красивая даже когда хмуришься в телефон.",
      "Мне нравится, как ты произносишь моё имя.",
      "Ты делаешь даже очередь в магазине чуть менее скучной.",
      "У тебя самые заботливые руки на свете.",
      "Ты сильнее, чем думаешь, и милее, чем кажешься.",
      "С тобой хочется гулять дольше, чем нужно.",
      "Ты пахнешь так, что хочется обнять подольше.",
      "Ты — единственное уведомление, которое я жду.",
      "Ты умная, и это так идёт к тебе.",
      "Даже твой голос в аудио-кружочке делает день лучше.",
      "Ты украшаешь собой любое место, где появляешься.",
      "Мне нравится твоя странность — она самая милая на свете.",
      "Ты заставляешь меня улыбаться в экран телефона как дурак.",
      "Ты — лучшее, что случилось с моим расписанием.",
      "Рядом с тобой тихо и спокойно, и это редкость.",
      "Ты готовишь так, что хочется переехать к тебе.",
      "Твои сообщения я перечитываю по три раза.",
      "Ты красивая в своих очках и без очков — в любом случае.",
      "Ты умеешь извиняться честно, и это очень взрослое.",
      "С тобой даже дождь — это просто атмосфера.",
      "Ты — мой любимый человек в часовом поясе +1.",
      "Ты делаешь меня лучше, ничего не делая.",
    ],
    de: [
      "Dein Lachen ist mein Lieblingssound auf der ganzen Welt.",
      "Du machst aus einem normalen Dienstag ein kleines Fest.",
      "Neben dir vergesse ich, was ich gerade sagen wollte.",
      "Du bist wärmer als Decke, Kakao und drei Kissen zusammen.",
      "Du bist schön, sogar wenn du genervt aufs Handy schaust.",
      "Ich liebe, wie du meinen Namen aussprichst.",
      "Du bist klüger, als du denkst, und süßer, als du tust.",
      "Mit dir will ich länger spazieren gehen, als nötig wäre.",
      "Du riechst so gut, dass man dich länger festhalten will.",
      "Du bist die einzige Benachrichtigung, auf die ich warte.",
      "Deine Stimme in Sprachnachrichten macht alles besser.",
      "Du machst jeden Ort schöner, an dem du auftauchst.",
      "Ich mag deine Schrulligkeit — sie ist die süßeste überhaupt.",
      "Du bringst mich dazu, wie ein Idiot aufs Handy zu lächeln.",
      "Mit dir ist selbst Regen nur schöne Atmosphäre.",
      "Du bist das Beste, was meinem Tagesplan passiert ist.",
      "Deine Umarmung ist mein Lieblingsort.",
      "Ich lese deine Nachrichten dreimal, weil sie so schön sind.",
      "Du bist klug, und das steht dir unglaublich gut.",
      "Bei dir ist es ruhig und gemütlich — das kann kaum jemand.",
      "Du kochst, dass man sofort bei dir einziehen möchte.",
      "Deine Augen sind heller als Berliner Straßenlaternen.",
      "Du bist mein Mensch in einer anderen Zeitzone.",
      "Du machst mich besser, ohne etwas zu tun.",
      "Wenn du „Guten Morgen“ schreibst, ist der Tag schon gerettet.",
      "Ich vermisse dich auf eine sehr ruhige, hartnäckige Art.",
      "Du bist mein Lieblingsmensch — einfach so.",
    ],
  },

  pet: {
    feed: {
      ru: ["Ням! Спасибо 🍎", "Ещё семечку?", "Вкусно! Ты лучшая"],
      de: ["Mampf! Danke 🍎", "Noch ein Kern?", "Lecker! Du bist die Beste"],
    },
    play: {
      ru: ["Ура! Бегаю в колесе!", "Ещё-ещё!", "Со мной весело, да?"],
      de: ["Juhu! Rad-Rad-Rad!", "Nochmal!", "Macht das Spaß, oder?"],
    },
    sleep: {
      ru: ["Только 5 минууут…", "Спокойной ночи 💤", "Приходи, когда проснусь"],
      de: ["Nur 5 Minütchen…", "Gute Nacht 💤", "Komm wieder, wenn ich wach bin"],
    },
    wake: {
      ru: ["Я выспался! Ого", "Сколько я спал?", "Бодр и готов к семечкам"],
      de: ["Ich bin wach! Oh", "Wie lange hab ich geschlafen?", "Fit und kernbereit"],
    },
    petting: {
      ru: ["Мур… то есть хрум 💗", "Щеку! Ещё щеку!", "Так приятно"],
      de: ["Murr… ähm, mampf 💗", "Wange! Noch eine Wange!", "So schön"],
    },
    idle: {
      ru: [
        "Ты как там? Я вот сижу, ем.",
        "Я придумал план: гуляем, потом какао.",
        "У меня щёки стали в два раза больше.",
        "Ты сегодня пила воду?",
        "Мне снилось, что ты приехала.",
        "Скучаю. Можно просто так, без повода.",
        "Расскажи, что было хорошего сегодня?",
      ],
      de: [
        "Wie geht's dir? Ich sitze hier und mampfe.",
        "Mein Plan: spazieren, dann Kakao.",
        "Meine Backen sind doppelt so groß geworden.",
        "Hast du heute Wasser getrunken?",
        "Ich hab geträumt, du warst hier.",
        "Vermisse dich. Einfach so, ohne Grund.",
        "Erzähl mir, was heute schön war?",
      ],
    },
    hungry: {
      ru: ["Урчит в животике… 🥺", "Там яблочко не завалялось?"],
      de: ["Mein Bauch rollt… 🥺", "Hast du einen Apfel für mich?"],
    },
    tired: {
      ru: ["Глазки закрываются…", "Может, спать?"],
      de: ["Mir fallen die Augen zu…", "Dürfte ich schlafen?"],
    },
    sad: {
      ru: ["Без тебя колесо не крутится…", "Погладь меня, пожалуйста 🥺"],
      de: ["Ohne dich dreht sich das Rad nicht…", "Streichel mich, bitte 🥺"],
    },
  },
};

/* ---------- утилиты ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

let lang = store.get(KEYS.lang, "ru");
if (!I18N[lang]) lang = "ru";

const t = (key, ...args) => {
  const value = I18N[lang][key] ?? I18N.ru[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
};

/* ---------- звук ---------- */

let audioCtx = null;
let soundOn = store.get(KEYS.sound, false);

function blip(freq = 660, dur = 0.09, type = "sine") {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur + 0.02);
  } catch (_) {
    /* звук не критичен */
  }
}

/* ---------- тост ---------- */

let toastTimer = null;
function toast(text) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = text;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 1900);
}

/* ============================================================
   ПРИМЕНЕНИЕ ЯЗЫКА
   ============================================================ */

function applyLang(next) {
  if (next) {
    lang = next;
    store.set(KEYS.lang, lang);
  }

  document.documentElement.lang = lang;

  $$("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  $$("[data-lang-btn]").forEach((b) =>
    b.classList.toggle("is-active", b.dataset.langBtn === lang)
  );

  $("#complimentCount").textContent = t("copy_hint", CONTENT.compliments[lang].length);

  if (!complimentText.dataset.hasValue) {
    complimentText.textContent = t("compliment_placeholder");
  }

  updateNotifyLabel();
  updatePetMoodLine();
  renderPetActionLabels();
}

/* ============================================================
   КОМПЛИМЕНТЫ + ПРОГРЕСС
   ============================================================ */

const complimentText = $("#complimentText");
let lastComplimentIndex = -1;

/* ключ текущего месяца, например "2026-10" */
function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/* если наступил новый месяц — обнуляем счётчик и историю */
function resetCountersIfNewMonth() {
  const current = monthKey();
  if (store.get(KEYS.complimentsMonth, null) !== current) {
    store.set(KEYS.complimentsMonth, current);
    store.set(KEYS.complimentsLog, []);
  }
}

function logCompliment(text) {
  const log = store.get(KEYS.complimentsLog, []);
  log.push(text);
  store.set(KEYS.complimentsLog, log);
}

function showCompliment() {
  const list = CONTENT.compliments[lang];
  let index;
  do {
    index = Math.floor(Math.random() * list.length);
  } while (index === lastComplimentIndex && list.length > 1);
  lastComplimentIndex = index;

  complimentText.dataset.hasValue = "1";
  complimentText.textContent = list[index];
  complimentText.classList.remove("pop");
  void complimentText.offsetWidth;
  complimentText.classList.add("pop");

  sparkles(complimentText);
  blip(720);

  resetCountersIfNewMonth();
  logCompliment(list[index]);
}

function sparkles(anchor) {
  const box = anchor.closest(".compliment-box") || anchor;
  const rect = box.getBoundingClientRect();
  const size = Math.max(20, Math.min(rect.width, rect.height));
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.style.left = `${Math.random() * rect.width}px`;
    s.style.top = `${Math.random() * rect.height}px`;
    s.style.setProperty("--dx", `${(Math.random() - 0.5) * size}px`);
    s.style.setProperty("--dy", `${-(20 + Math.random() * size * 0.9)}px`);
    s.style.animationDelay = `${Math.random() * 0.18}s`;
    box.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}

$("#btnCompliment").addEventListener("click", showCompliment);

$("#btnCopy").addEventListener("click", async () => {
  const text = complimentText.textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch (_) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast(t("copied"));
  blip(880);
});

$("#btnShare")?.addEventListener("click", async () => {
  const log = store.get(KEYS.complimentsLog, []);
  if (!log.length) {
    toast(t("share_empty"));
    return;
  }
  const text = log.map((s, i) => `${i + 1}. ${s}`).join("\n");

  if (navigator.share) {
    try {
      await navigator.share({ title: t("app_title"), text });
      blip(880);
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return;
      /* остальное — падаем в копирование */
    }
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (_) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  toast(t("copied_share"));
  blip(880);
});

/* ============================================================
   ТАМАГОЧИ
   ============================================================ */

const PET_DEFAULTS = { hunger: 80, happy: 80, energy: 85, asleep: false, lastSeen: Date.now() };
let pet = Object.assign({}, PET_DEFAULTS, store.get(KEYS.pet, {}));

/* скорость изменения за минуту */
const DECAY = { hunger: 0.055, happy: 0.04, energyAwake: 0.035, energySleep: 0.9 };

const petWrap = $("#petWrap");
const petBubble = $("#petBubble");
const petMouth = $("#petMouth");
const petMoodText = $("#petMoodText");
const petWheel = $(".pet-wheel");

const MOUTHS = {
  happy: "M86 126 q14 16 28 0",
  ok: "M88 132 h24",
  sad: "M86 138 q14 -14 28 0",
  sleep: "M90 132 q10 8 20 0",
};

function savePet() {
  store.set(KEYS.pet, pet);
}

function applyDecay(minutes) {
  if (minutes <= 0) return;
  pet.hunger = clamp(pet.hunger - DECAY.hunger * minutes, 0, 100);
  pet.happy = clamp(pet.happy - DECAY.happy * minutes, 0, 100);
  pet.energy = pet.asleep
    ? clamp(pet.energy + DECAY.energySleep * minutes, 0, 100)
    : clamp(pet.energy - DECAY.energyAwake * minutes, 0, 100);
}

function petMood() {
  if (pet.asleep) return "sleep";
  const avg = (pet.hunger + pet.happy + pet.energy) / 3;
  if (avg >= 68) return "happy";
  if (avg >= 38) return "ok";
  return "sad";
}

function updatePetMoodLine() {
  const map = { happy: "mood_happy", ok: "mood_ok", sad: "mood_sad", sleep: "mood_sleep" };
  if (petMoodText) petMoodText.textContent = t(map[petMood()]);
}

function renderPet() {
  $("#barHunger").style.width = pet.hunger.toFixed(0) + "%";
  $("#barHappy").style.width = pet.happy.toFixed(0) + "%";
  $("#barEnergy").style.width = pet.energy.toFixed(0) + "%";

  $("#statHunger").textContent = pet.hunger.toFixed(0) + "%";
  $("#statHappy").textContent = pet.happy.toFixed(0) + "%";
  $("#statEnergy").textContent = pet.energy.toFixed(0) + "%";

  const mood = petMood();
  petWrap.classList.toggle("is-sleepy", mood === "sleep");
  petWrap.classList.toggle("is-sad", mood === "sad");
  if (mood !== "sleep" && mood !== "sad") {
    petWrap.classList.remove("is-eating", "is-happy");
  }
  petMouth.setAttribute("d", MOUTHS[mood]);

  updatePetMoodLine();
  renderPetActionLabels();
}

function renderPetActionLabels() {
  $$("[data-pet-action]").forEach((btn) => {
    const span = btn.querySelector("span");
    if (!span) return;
    const ACTION_LABEL = { feed: "btn_feed", play: "btn_play", pet: "btn_pet" };
    span.textContent =
      btn.dataset.petAction === "sleep"
        ? t(pet.asleep ? "btn_wake" : "btn_sleep")
        : t(ACTION_LABEL[btn.dataset.petAction] || btn.dataset.petAction);
  });
}

let bubbleTimer = null;
function say(text, ms = 3600) {
  petBubble.textContent = text;
  petBubble.classList.add("is-on");
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => petBubble.classList.remove("is-on"), ms);
}

function anim(cls, ms) {
  petWrap.classList.remove("is-eating", "is-happy");
  void petWrap.offsetWidth;
  petWrap.classList.add(cls);
  setTimeout(() => {
    if (petMood() !== "sleep" && petMood() !== "sad") petWrap.classList.remove(cls);
  }, ms);
}

function spinWheel() {
  if (!petWheel) return;
  petWheel.classList.remove("is-spin");
  void petWheel.offsetWidth;
  petWheel.classList.add("is-spin");
}

function petReact(kind) {
  say(pick(CONTENT.pet[kind][lang]));
  blip(kind === "sleep" ? 320 : 780, 0.1, kind === "play" ? "triangle" : "sine");
  renderPet();
  savePet();
}

function doPetAction(action) {
  if (pet.asleep && action !== "sleep" && action !== "pet") {
    say(pick(CONTENT.pet.sleep[lang]));
    return;
  }
  if (pet.asleep && action === "pet") wakeUp();

  switch (action) {
    case "feed":
      pet.hunger = clamp(pet.hunger + 24, 0, 100);
      pet.happy = clamp(pet.happy + 5, 0, 100);
      anim("is-eating", 1700);
      petReact(pet.hunger > 96 ? "hungry" : "feed");
      break;
    case "play":
      if (pet.energy < 15) {
        say(pick(CONTENT.pet.tired[lang]));
        renderPet();
        return;
      }
      pet.happy = clamp(pet.happy + 18, 0, 100);
      pet.energy = clamp(pet.energy - 12, 0, 100);
      pet.hunger = clamp(pet.hunger - 6, 0, 100);
      anim("is-happy", 1300);
      spinWheel();
      petReact("play");
      break;
    case "sleep":
      pet.asleep ? wakeUp() : fallAsleep();
      break;
    case "pet":
      pet.happy = clamp(pet.happy + 9, 0, 100);
      anim("is-happy", 900);
      petReact("petting");
      break;
  }
}

function fallAsleep() {
  pet.asleep = true;
  petReact("sleep");
}

function wakeUp() {
  pet.asleep = false;
  petReact("wake");
}

$$("[data-pet-action]").forEach((btn) =>
  btn.addEventListener("click", () => doPetAction(btn.dataset.petAction))
);

petWrap.addEventListener("click", () => doPetAction("pet"));

$("#btnReset").addEventListener("click", () => {
  pet = Object.assign({}, PET_DEFAULTS, { lastSeen: Date.now() });
  savePet();
  renderPet();
  say(lang === "de" ? "Neues Leben! Juhu" : "Новая жизнь! Ура");
});

/* главный цикл: раз в 3 секунды пересчитываем по реальному времени */
setInterval(() => {
  const now = Date.now();
  const minutes = (now - pet.lastSeen) / 60000;
  if (minutes < 0.05) return;
  applyDecay(minutes);
  pet.lastSeen = now;
  if (pet.asleep && pet.energy >= 100) wakeUp();
  savePet();
  renderPet();
}, 3000);

/* питомец сам иногда «пишет» */
function scheduleIdleChat() {
  const delay = 22000 + Math.random() * 25000;
  setTimeout(() => {
    if (!document.hidden && !pet.asleep) {
      const mood = petMood();
      let kind = "idle";
      if (mood === "sad") kind = "sad";
      else if (pet.hunger < 30) kind = "hungry";
      else if (pet.energy < 25) kind = "tired";
      say(pick(CONTENT.pet[kind][lang]));
      blip(520, 0.07);
    }
    scheduleIdleChat();
  }, delay);
}

/* возвращение: считаем, сколько нас не было */
function checkWelcomeBack() {
  const awayMin = (Date.now() - pet.lastSeen) / 60000;
  if (awayMin > 25) {
    setTimeout(() => say(t("welcome_back", awayMin), 5200), 900);
  }
  applyDecay(Math.min(awayMin, 720));
  pet.lastSeen = Date.now();
  savePet();
  renderPet();
}

/* ============================================================
   УВЕДОМЛЕНИЯ
   ============================================================ */

const btnNotify = $("#btnNotify");
let notifyTimer = null;
let notifyOn = store.get(KEYS.notify, false);

function updateNotifyLabel() {
  if (!btnNotify) return;
  const granted = "Notification" in window && Notification.permission === "granted";
  const span = btnNotify.querySelector("span");
  if (span) span.textContent = t(granted && notifyOn ? "btn_notify_off" : "btn_notify_on");
  btnNotify.classList.toggle("is-active", granted && notifyOn);
}

function sendPetNotification() {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const mood = petMood();
  const pool = mood === "sad" ? CONTENT.pet.sad : CONTENT.pet.idle;
  const body = pick(pool[lang]);
  try {
    new Notification("🐹 " + t("pet_title"), { body, tag: "cute-pet" });
  } catch (_) {
    /* на некоторых мобильных без сервиса — тихо игнорируем */
  }
}

btnNotify?.addEventListener("click", async () => {
  if (!("Notification" in window)) {
    toast(t("notify_blocked"));
    return;
  }
  if (Notification.permission === "granted") {
    notifyOn = !notifyOn;
    store.set(KEYS.notify, notifyOn);
    updateNotifyLabel();
    toast(notifyOn ? "🔔" : "🔕");
    if (notifyOn) sendPetNotification();
    return;
  }
  const result = await Notification.requestPermission();
  if (result === "granted") {
    notifyOn = true;
    store.set(KEYS.notify, true);
    updateNotifyLabel();
    sendPetNotification();
  } else {
    toast(t("notify_denied"));
  }
});

/* когда уходим со страницы — питомец зовёт обратно */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (notifyOn && "Notification" in window && Notification.permission === "granted") {
      clearTimeout(notifyTimer);
      notifyTimer = setTimeout(sendPetNotification, 120000);
    }
  } else {
    clearTimeout(notifyTimer);
    checkWelcomeBack();
  }
});

/* ============================================================
   ИМЯ, ФОН, СТАРТ
   ============================================================ */

function buildBgHearts() {
  const box = $("#bgHearts");
  if (!box) return;
  const glyphs = ["💗", "🌸", "🤍", "🍓", "✨", "🫧"];
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("span");
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 14 + Math.random() * 22 + "px";
    s.style.animationDuration = 16 + Math.random() * 18 + "s";
    s.style.animationDelay = -Math.random() * 24 + "s";
    box.appendChild(s);
  }
}

$("#btnSound").addEventListener("click", () => {
  soundOn = !soundOn;
  store.set(KEYS.sound, soundOn);
  $("#btnSound").textContent = soundOn ? "🔊" : "🔇";
  blip(700);
});

$$("[data-lang-btn]").forEach((btn) =>
  btn.addEventListener("click", () => applyLang(btn.dataset.langBtn))
);

/* плавный скролл по якорям */
$$("[data-scroll]").forEach((a) =>
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  })
);

/* старт */
buildBgHearts();
$("#btnSound").textContent = soundOn ? "🔊" : "🔇";
applyLang();
checkWelcomeBack();
renderPet();
scheduleIdleChat();
resetCountersIfNewMonth();
