const DATA_URL = 'data/indicadores.json';

const SVG_NS = 'http://www.w3.org/2000/svg';

const ICON_BY_ID = {
  'oportunidad-dispensacion': 'ic-clipboard-check',
  'satisfaccion-usuario': 'ic-smile',
  'tiempo-atencion': 'ic-timer',
  'farmacovigilancia-invima': 'ic-shield-alert',
  'bioseguridad-inyectologia': 'ic-syringe',
  'temperatura-humedad': 'ic-thermometer',
  'medicamentos-vencidos': 'ic-calendar-check'
};

function keepUnitsTogether(text) {
  return String(text || '').replace(/\s+(%|min\b)/g, '\u00A0$1');
}

function createUseIcon(symbolId) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'ic');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#${symbolId}`);
  svg.appendChild(use);
  return svg;
}

function buildIndicatorRow(item) {
  const li = document.createElement('li');

  const nameSpan = document.createElement('span');
  nameSpan.className = 'rows__name';

  const symbolId = ICON_BY_ID[item.id] || 'ic-badge-check';
  nameSpan.appendChild(createUseIcon(symbolId));
  nameSpan.appendChild(document.createTextNode(String(item.nombre || '')));

  const detailSmall = document.createElement('small');
  const metaClean = keepUnitsTogether(item.meta || '');
  detailSmall.textContent = metaClean ? `Meta: ${metaClean}` : '';
  nameSpan.appendChild(detailSmall);

  const valueSpan = document.createElement('span');
  valueSpan.className = 'rows__value';
  valueSpan.textContent = keepUnitsTogether(item.resultado ?? '');

  li.appendChild(nameSpan);
  li.appendChild(valueSpan);
  return li;
}

async function loadIndicators() {
  const listEl = document.getElementById('indicadores-list');
  if (!listEl) return;

  try {
    const response = await fetch(DATA_URL, { cache: 'no-cache' });
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload || !Array.isArray(payload.indicadores) || !payload.indicadores.length) return;

    const fragment = document.createDocumentFragment();
    for (const item of payload.indicadores) {
      fragment.appendChild(buildIndicatorRow(item));
    }
    listEl.replaceChildren(fragment);
  } catch {
    // Mantiene las filas base renderizadas en HTML ante apertura directa file:// o fallo de red.
  }
}

function setupSectionSpy() {
  const links = [...document.querySelectorAll('.nav__links a[href^="#"]')];
  if (!links.length) return;

  const pairs = links
    .map(link => ({ link, target: document.getElementById(link.getAttribute('href').slice(1)) }))
    .filter(p => p.target);

  const updateCurrent = () => {
    const markY = window.scrollY + window.innerHeight * 0.35;
    let active = null;
    for (const pair of pairs) {
      const top = pair.target.offsetTop;
      const bottom = top + pair.target.offsetHeight;
      if (markY >= top && markY < bottom) {
        active = pair.link;
        break;
      }
    }
    for (const { link } of pairs) {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  window.addEventListener('scroll', updateCurrent, { passive: true });
  window.addEventListener('resize', updateCurrent, { passive: true });
  updateCurrent();
}

loadIndicators();
setupSectionSpy();
