const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');
menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', sidebar.classList.toggle('open'));
});
const sections = document.querySelectorAll('[data-page]');
sections.forEach(button => button.addEventListener('click', () => {
  sections.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    if (selected) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
    document.getElementById(item.dataset.page).hidden = !selected;
  });
  document.querySelector('#crumb').textContent = button.lastChild.textContent.trim().toUpperCase();
  sidebar.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
const periods = {
  day: { values: [124,110,118,94,101,64,75,95,48,58,29,61,44,16], labels: ['00:00','06:00','12:00','18:00','24:00'] },
  week: { values: [111,91,126,65,86,53,79,58,63,49,78,42,55,28], labels: ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'] }
};
function draw(period) {
  const {values, labels} = periods[period];
  const points = values.map((value, index) => [500 * index / (values.length - 1), value]);
  const path = 'M' + points.map(point => point.join(' ')).join('L');
  document.querySelector('#line').setAttribute('d', path);
  document.querySelector('#area').setAttribute('d', path + 'V145H0Z');
  document.querySelector('#ticks').replaceChildren(...labels.map(label => {
    const tick = document.createElement('span');
    tick.textContent = label;
    return tick;
  }));
}
const periodButtons = document.querySelectorAll('[data-period]');
periodButtons.forEach(button => button.addEventListener('click', () => {
  periodButtons.forEach(item => item.setAttribute('aria-pressed', item === button));
  draw(button.dataset.period);
}));
draw('day');
const events = [
  ['SEC','Подозрительный вход','03:17'],
  ['SYS','Снимок базы сохранён','03:04'],
  ['AUTH','KANEKI_07 вошёл в систему','02:53'],
  ['NET','Узел TOKYO-20 в сети','02:41'],
  ['SYS','Началась ночная смена','02:00']
];
for (const [id, count] of [['recent',4], ['full-log',5]]) {
  const list = document.getElementById(id);
  for (const [type, message, time] of events.slice(0,count)) {
    const row = document.createElement('li');
    const badge = document.createElement('span');
    badge.className = 'pill';
    badge.textContent = type;
    const timestamp = document.createElement('time');
    timestamp.textContent = time;
    row.append(badge, message, timestamp);
    list.append(row);
  }
}
