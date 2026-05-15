const PORTAL_ID = '50721498';
const FORM_ID   = '85240154-6e91-4240-83ed-b4b57a8d8205';
const REGION    = 'na1';

const ENDPOINT =
  REGION === 'na1'
    ? `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`
    : `https://api-${REGION}.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

const CONTACT = '0-1';
const COMPANY = '0-2';

const FIELD_MAP = {
  firstName:      { objectTypeId: CONTACT, name: 'firstname' },
  role:           { objectTypeId: CONTACT, name: 'qual_o_seu_cargo' },
  email:          { objectTypeId: CONTACT, name: 'email' },
  whatsapp:       { objectTypeId: CONTACT, name: 'hs_whatsapp_phone_number' },
  palestras:      { objectTypeId: CONTACT, name: 'palestras' },
  companyName:    { objectTypeId: CONTACT, name: 'company' },
  companyNameObj: { objectTypeId: COMPANY, name: 'name' },
  employeesRange: { objectTypeId: COMPANY, name: 'numberofemployees' },
  revenueRange:   { objectTypeId: COMPANY, name: 'faturamento_anual_estimado_' },
  sector:         { objectTypeId: COMPANY, name: 'setor' },
  mainChallenge:  { objectTypeId: COMPANY, name: 'maior_desafio' },
  priorityArea:   { objectTypeId: COMPANY, name: 'area_prioritaria_ia' },
};

function readHubspotutk() {
  const m = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return m ? m[1] : undefined;
}

export async function submitToHubspot(form) {
  const getValue = (k) => {
    if (k === 'palestras')      return 'AI Talks';
    if (k === 'companyNameObj') return form.companyName;
    return form[k];
  };

  const fields = Object.entries(FIELD_MAP)
    .filter(([k]) => {
      const v = getValue(k);
      return v != null && v !== '';
    })
    .map(([k, { objectTypeId, name }]) => ({ objectTypeId, name, value: getValue(k) }));

  const context = { pageUri: window.location.href, pageName: document.title };
  const hutk = readHubspotutk();
  if (hutk) context.hutk = hutk;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields, context }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HubSpot submit failed: ${res.status} ${body}`);
  }
  return res.json();
}
