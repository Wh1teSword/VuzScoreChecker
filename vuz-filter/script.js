// ===== БАЗА ДАННЫХ (имитация) =====
let database = [];

// ===== КОНСТАНТЫ ОБРАЗОВАТЕЛЬНЫХ ПРОГРАММ =====
const programs = {
  PM: { name: "Прикладная математика", places: 40, code: "PM" },
  IVT: { name: "Информатика и вычислительная техника", places: 50, code: "IVT" },
  ITSS: { name: "Инфокоммуникационные технологии и системы связи", places: 30, code: "ITSS" },
  IB: { name: "Информационная безопасность", places: 20, code: "IB" },
  CS: { name: "Компьютерные науки", places: 50, code: "CS" },
  MATH: { name: "Математика", places: 40, code: "MATH" },
  SE: { name: "Программная инженерия", places: 35, code: "SE" },

  // Новые программы
  PMI: { name: "Прикладная математика и информатика", places: 45, code: "PMI" },
  PIF: { name: "Прикладная математика и физика", places: 30, code: "PIF" }
};

// ===== КОНКУРСНЫЕ СПИСКИ (пример) =====
const list_0108 = [
  {
    id: 1,
    physics: 85,
    russian: 78,
    math: 90,
    achievements: 5,
    total: 258,
    applications: [
      { program: "PM", priority: 1, consent: true },
      { program: "IVT", priority: 2, consent: false }
    ]
  },
  {
    id: 2,
    physics: 70,
    russian: 80,
    math: 75,
    achievements: 3,
    total: 228,
    applications: [
      { program: "IB", priority: 1, consent: true }
    ]
  },
  {
    id: 3,
    physics: 92,
    russian: 88,
    math: 95,
    achievements: 10,
    total: 285,
    applications: [
      { program: "PM", priority: 1, consent: true },
      { program: "IVT", priority: 2, consent: true },
      { program: "ITSS", priority: 3, consent: false }
    ]
  },
  {
    id: 4,
    physics: 80,
    russian: 85,
    math: 88,
    achievements: 4,
    total: 253,
    applications: [
      { program: "CS", priority: 1, consent: true } // ВШЭ
    ]
  },
  {
    id: 5,
    physics: 78,
    russian: 82,
    math: 85,
    achievements: 2,
    total: 247,
    applications: [
      { program: "MATH", priority: 1, consent: true } // СПбГУ
    ]
  },
  {
    id: 6,
    physics: 75,
    russian: 80,
    math: 82,
    achievements: 3,
    total: 240,
    applications: [
      { program: "SE", priority: 1, consent: true } // УрФУ
    ]
  },
  {
    id: 7,
    physics: 88,
    russian: 84,
    math: 91,
    achievements: 6,
    total: 269,
    applications: [
      { program: "PMI", priority: 1, consent: true }
    ]
  },
  {
    id: 8,
    physics: 90,
    russian: 86,
    math: 93,
    achievements: 8,
    total: 277,
    applications: [
      { program: "PIF", priority: 1, consent: true }
    ]
  },
  {
    id: 9,
    physics: 82,
    russian: 79,
    math: 85,
    achievements: 4,
    total: 250,
    applications: [
      { program: "PMI", priority: 2, consent: true }
    ]
  }
];

const data = [

  // ===== МГУ =====
  {
    vuz: "МГУ",
    city: "Москва",
    program: "Прикладная математика",
    minScore: 385,
    year: 2024
  },
  {
    vuz: "МГУ",
    city: "Москва",
    program: "Математика",
    minScore: 370,
    year: 2024
  },
  {
    vuz: "МГУ",
    city: "Москва",
    program: "Компьютерные науки",
    minScore: 380,
    year: 2024
  },

  // ===== МФТИ =====
  {
    vuz: "МФТИ",
    city: "Москва",
    program: "Информатика и вычислительная техника",
    minScore: 390,
    year: 2024
  },
  {
    vuz: "МФТИ",
    city: "Москва",
    program: "Прикладная математика и физика",
    minScore: 395,
    year: 2024
  },

  // ===== ВШЭ =====
  {
    vuz: "ВШЭ",
    city: "Москва",
    program: "Компьютерные науки",
    minScore: 360,
    year: 2024
  },
  {
    vuz: "ВШЭ",
    city: "Москва",
    program: "Программная инженерия",
    minScore: 355,
    year: 2024
  },

  // ===== СПбГУ =====
  {
    vuz: "СПбГУ",
    city: "Санкт-Петербург",
    program: "Математика",
    minScore: 350,
    year: 2024
  },
  {
    vuz: "СПбГУ",
    city: "Санкт-Петербург",
    program: "Прикладная математика и информатика",
    minScore: 345,
    year: 2024
  },

  // ===== УрФУ =====
  {
    vuz: "УрФУ",
    city: "Екатеринбург",
    program: "Программная инженерия",
    minScore: 310,
    year: 2024
  },
  {
    vuz: "УрФУ",
    city: "Екатеринбург",
    program: "Информационная безопасность",
    minScore: 300,
    year: 2024
  }

];

function filterVuz() {
  const score = Number(document.getElementById('scoreInput').value);
  const city = document.getElementById('citySelect').value;
  const vuz = document.getElementById('vuzSelect').value;
  const sort = document.getElementById('sortSelect').value;
  const resultsDiv = document.getElementById('results');

  resultsDiv.innerHTML = '';

  if (isNaN(score) || score <= 0) {
    resultsDiv.innerHTML = '<p>Введите суммарный балл</p>';
    return;
  }

  let found = false;
  let filteredData = [];

  data.forEach(item => {
    if (city !== 'all' && item.city !== city) return;
    if (vuz !== 'all' && item.vuz !== vuz) return;

    let status, color, chance;
    const diff = score - item.minScore;

    if (diff >= 20) {
      status = 'Проходишь';
      color = 'green';
      chance = 90;
    } else if (diff >= 10) {
      status = 'Проходишь';
      color = 'green';
      chance = 70;
    } else if (diff >= 0) {
      status = 'На грани';
      color = 'orange';
      chance = 55;
    } else if (diff >= -10) {
      status = 'На грани';
      color = 'orange';
      chance = 30;
    } else {
      status = 'Не проходишь';
      color = 'red';
      chance = 5;
    }

    // ===== рейтинг =====
    let rankText = "";
    // ищем код программы по названию
    const programEntry = Object.values(programs).find(p => p.name === item.program);
    
    // Если программа не найдена в базе рейтинга, не создаем рейтинг, но показываем карточку
    if (programEntry) {
      const rank = getRank(programEntry.code, score);
      const places = programEntry.places;
    
      // ===== Симуляция распределения мест =====
      const admitted = simulateAdmission(programEntry.code, score, programEntry.places);
      
      let placeText = "";
      
      if (admitted) {
        placeText = "<p style='color:green'><b>Ты проходишь на бюджет (симуляция)</b></p>";
      } else {
        placeText = "<p style='color:red'><b>Ты не проходишь на бюджет (симуляция)</b></p>";
      }
    
      rankText =
        "<p>Место в рейтинге: <b>" + rank + " / " + places + "</b></p>" +
        placeText +
        "<p style='font-size:12px;color:#666'>Оценка по конкурсным спискам прошлых лет</p>";
    } else {
      rankText = ""; // карточка будет без рейтинга
    }

    // ===== карточка =====
    const block = document.createElement('div');
    block.className = 'card';
    block.style.borderLeft = '5px solid ' + color;

    block.innerHTML =
      "<h3>" + item.vuz + "</h3>" +
      "<p><b>" + item.program + "</b></p>" +
      "<p>" + item.city + "</p>" +
      "<p>Проходной: " + item.minScore + "</p>" +
      "<p>Вероятность поступления: <b>" + chance + "%</b></p>" +
      "<p style='color:" + color + "'><b>" + status + "</b></p>" +
      rankText;

    filteredData.push({
      element: block,
      chance: chance,
      minScore: item.minScore
    });
    found = true;
  });

  // Сортировка
  if (sort === "chance") {
    filteredData.sort((a, b) => b.chance - a.chance);
  }

  if (sort === "minScore") {
    filteredData.sort((a, b) => b.minScore - a.minScore);
  }

  // Вывод после сортировки
  filteredData.forEach(item => {
    resultsDiv.appendChild(item.element);
  });

  if (!found) {
    resultsDiv.innerHTML = '<p>Ничего не найдено</p>';
  }
}

function getRank(programCode, userScore) {
  // Берём всех абитуриентов с согласием на эту программу
  const applicants = list_0108
    .filter(a =>
      a.applications.some(app => app.program === programCode && app.consent)
    )
    .map(a => a.total);

  // Добавляем пользователя
  applicants.push(userScore);

  // Сортируем по убыванию баллов
  applicants.sort((a, b) => b - a);

  // Считаем место корректно
  let rank = 1;

  for (let i = 0; i < applicants.length; i++) {
    if (applicants[i] > userScore) {
      rank++;
    }
  }

  return rank;
}

console.log("script.js загружен");

function resetFilters() {
  document.getElementById('scoreInput').value = '';
  document.getElementById('citySelect').value = 'all';
  document.getElementById('vuzSelect').value = 'all';
  document.getElementById('sortSelect').value = 'none';
  document.getElementById('results').innerHTML = '';
}

function simulateAdmission(programCode, userScore, places) {
  // Берём всех с согласием на эту программу
  const applicants = list_0108
    .filter(a =>
      a.applications.some(app => app.program === programCode && app.consent)
    )
    .map(a => a.total);

  // Добавляем пользователя
  applicants.push(userScore);

  // Сортируем по убыванию баллов
  applicants.sort((a, b) => b - a);

  // Берём только тех, кто попадает в количество мест
  const admitted = applicants.slice(0, places);

  // Проверяем, есть ли пользователь среди зачисленных
  return admitted.includes(userScore);
}