const grid = document.getElementById("seating-grid");
const layoutWrapper = document.getElementById("layout-wrapper");

const students = [
  { "number": 1, "name": "相坂美怜", "kana": "アイサカ ミサト" },
  { "number": 2, "name": "浅川優希", "kana": "アサカワ ユウキ" },
  { "number": 3, "name": "市川右馨", "kana": "イチカワ ウキョウ" },
  { "number": 4, "name": "江口結唯", "kana": "エグチ ユイ" },
  { "number": 5, "name": "奥田千尋", "kana": "オクダ チヒロ" },
  { "number": 6, "name": "奥野尚", "kana": "オクノ ナオ" },
  { "number": 7, "name": "尾澤佑真", "kana": "オザワ ユウマ" },
  { "number": 8, "name": "春日琉希", "kana": "カスガ リュウキ" },
  { "number": 9, "name": "片倉仁美", "kana": "カタクラ ヒトミ" },
  { "number": 10, "name": "加藤結愛", "kana": "カトウ ユメ" },
  { "number": 11, "name": "金谷駿", "kana": "カナヤ シュン" },
  { "number": 12, "name": "郷原緒", "kana": "ゴウハラ イトハ" },
  { "number": 13, "name": "小林芽以", "kana": "コバヤシ メイ" },
  { "number": 14, "name": "齋藤旭", "kana": "サイトウ アサヒ" },
  { "number": 15, "name": "酒寄克典", "kana": "サカヨリ カツノリ" },
  { "number": 16, "name": "佐川怜", "kana": "サガワ レイ" },
  { "number": 17, "name": "櫻井陸翔", "kana": "サクライ リクト" },
  { "number": 18, "name": "佐藤直紀", "kana": "サトウ ナオキ" },
  { "number": 19, "name": "鈴木ほの", "kana": "スズキ ホノ" },
  { "number": 20, "name": "関桃香", "kana": "セキ モモカ" },
  { "number": 21, "name": "関根香穂", "kana": "セキネ カホ" },
  { "number": 22, "name": "竹内捺姫", "kana": "タケウチ ナツキ" },
  { "number": 23, "name": "塚谷柊斗", "kana": "ツカタニ シュウト" },
  { "number": 24, "name": "土田龍虎", "kana": "ツチダ リュウト" },
  { "number": 25, "name": "中泉佑悠", "kana": "ナカイズミ ユウリ" },
  { "number": 26, "name": "中田桜輔", "kana": "ナカダ オウスケ" },
  { "number": 27, "name": "中野来瑠美", "kana": "ナカノ クルミ" },
  { "number": 28, "name": "仁科梨菜", "kana": "ニシナ リナ" },
  { "number": 29, "name": "端山日々萌", "kana": "ハヤマ ヒビキ" },
  { "number": 30, "name": "舩張蒼良", "kana": "フナバリ ソラ" },
  { "number": 31, "name": "古谷優歩", "kana": "フルタニ ユウホ" },
  { "number": 32, "name": "松島好希", "kana": "マツシマ コウキ" },
  { "number": 33, "name": "松本瑠唯", "kana": "マツモト ルイ" },
  { "number": 34, "name": "横川遥城", "kana": "ヨコカワ ハルキ" }
];

const layout = [5, 6, 6, 6, 6, 5];
const maxRows = Math.max(...layout);

for (let row = 0; row < maxRows; row++) {
  for (let col = 0; col < layout.length; col++) {
    if (row < layout[col]) {
      const seat = document.createElement("div");
      seat.className = "seat";

      const numberInput = document.createElement("input");
      numberInput.type = "text";
      numberInput.className = "number-input";
      numberInput.placeholder = "#";

      const nameDisplay = document.createElement("div");
      nameDisplay.className = "name-display";
      const nameLine = document.createElement("div");
      nameLine.className = "name";
      const kanaLine = document.createElement("div");
      kanaLine.className = "kana";

      nameDisplay.appendChild(nameLine);
      nameDisplay.appendChild(kanaLine);

      numberInput.addEventListener("input", () => {
        const n = parseInt(numberInput.value);
        const student = students.find(s => s.number === n);
        if (student) {
          nameLine.textContent = student.name;
          kanaLine.textContent = student.kana;
        } else {
          nameLine.textContent = "";
          kanaLine.textContent = "";
        }
      });

      seat.appendChild(numberInput);
      seat.appendChild(nameDisplay);
      grid.appendChild(seat);
    } else {
      const empty = document.createElement("div");
      empty.className = "seat";
      empty.style.visibility = "hidden";
      grid.appendChild(empty);
    }
  }
}

const seats = document.querySelectorAll(".seat input.number-input");
let originalAssignments = [];

function saveOriginalSeats() {
  originalAssignments = Array.from(seats).map(input => input.value);
}

function restoreOriginalSeats() {
  seats.forEach((input, index) => {
    input.value = originalAssignments[index] || "";
    input.dispatchEvent(new Event("input"));
  });
}

function saveSeatAssignment() {
  const assignment = Array.from(seats).map(input => input.value);
  localStorage.setItem("savedSeatAssignment", JSON.stringify(assignment));
  alert("座席の割り当てを保存しました。");
}

function loadSeatAssignment() {
  const saved = JSON.parse(localStorage.getItem("savedSeatAssignment") || "[]");
  if (saved.length > 0) {
    seats.forEach((input, index) => {
      input.value = saved[index] || "";
      input.dispatchEvent(new Event("input"));
    });
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function assignRandomSeats() {
  saveOriginalSeats();
  const shuffled = shuffleArray([...students]);

  for (let i = 0; i < seats.length; i++) {
    const input = seats[i];
    const nameDisplay = input.parentElement.querySelector(".name-display");

    input.value = "";
    nameDisplay.classList.remove("highlight");

    if (i < shuffled.length) {
      for (let t = 0; t < 5; t++) {
        const fakeNum = Math.floor(Math.random() * students.length) + 1;
        input.value = fakeNum;
        input.dispatchEvent(new Event("input"));
        await new Promise(resolve => setTimeout(resolve, 60));
      }

      input.value = shuffled[i].number;
      input.dispatchEvent(new Event("input"));
      nameDisplay.classList.add("highlight");
    } else {
      input.value = "";
      input.dispatchEvent(new Event("input"));
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  setTimeout(() => {
    alert("🎉 座席が決まりました！");
  }, 300);
}

function rotateLayout() {
  document.body.classList.toggle("rotated");
}

window.addEventListener("DOMContentLoaded", () => {
  loadSeatAssignment();
});
