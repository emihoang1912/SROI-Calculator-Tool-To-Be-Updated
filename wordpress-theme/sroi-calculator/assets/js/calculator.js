/**
 * SROI Calculator — Multi-step wizard logic
 */
(function () {
  'use strict';

  /* ===== Data ===== */
  var STAKEHOLDERS = [
    { id: 'staff', name: 'Staff/Employees', description: 'Paid staff and employees working in the organization' },
    { id: 'partners', name: 'Partners/Collaborators', description: 'Partner organizations and collaborative stakeholders' },
    { id: 'volunteers', name: 'Volunteers', description: 'Individuals who contribute their time and skills to the museum' },
    { id: 'community', name: 'Community/Public', description: 'Local community members and the general public' },
    { id: 'donors', name: 'Donors/Funders', description: 'Financial supporters and funding organizations' },
    { id: 'beneficiaries', name: 'Beneficiaries/Clients', description: 'Direct recipients of services or programs' },
    { id: 'visitors', name: 'Visitors', description: 'People visiting the Museum of Making' },
  ];

  var OUTCOMES = {
    staff: [
      { id: 'staff-skills', name: 'Improved professional skills', description: 'Staff develop new competencies and professional capabilities', stakeholderName: 'Staff/Employees' },
      { id: 'staff-wellbeing', name: 'Enhanced employee wellbeing', description: 'Staff experience improved mental health and job satisfaction', stakeholderName: 'Staff/Employees' },
    ],
    partners: [
      { id: 'partner-networks', name: 'Strengthened partnership networks', description: 'Partners develop stronger collaborative relationships and networks', stakeholderName: 'Partners/Collaborators' },
      { id: 'partner-capacity', name: 'Increased organizational capacity', description: 'Partner organizations build stronger internal capabilities', stakeholderName: 'Partners/Collaborators' },
    ],
    volunteers: [
      { id: 'vol-skills', name: 'New skills and experience', description: 'Volunteers gain valuable skills and work experience', stakeholderName: 'Volunteers' },
      { id: 'vol-wellbeing', name: 'Improved wellbeing and purpose', description: 'Volunteers experience enhanced sense of purpose and mental health', stakeholderName: 'Volunteers' },
    ],
    community: [
      { id: 'comm-cohesion', name: 'Enhanced social cohesion', description: 'Community experiences strengthened social bonds and connections', stakeholderName: 'Community/Public' },
      { id: 'comm-access', name: 'Improved access to services', description: 'Community members gain better access to local services and resources', stakeholderName: 'Community/Public' },
    ],
    donors: [
      { id: 'donor-confidence', name: 'Increased funding confidence', description: 'Donors gain evidence of impact to support funding decisions', stakeholderName: 'Donors/Funders' },
    ],
    beneficiaries: [
      { id: 'ben-quality', name: 'Improved quality of life', description: 'Beneficiaries experience measurable improvements in daily life', stakeholderName: 'Beneficiaries/Clients' },
      { id: 'ben-empowerment', name: 'Greater empowerment', description: 'Beneficiaries gain autonomy and self-determination', stakeholderName: 'Beneficiaries/Clients' },
    ],
    visitors: [
      { id: 'vis-learning', name: 'Enhanced learning experience', description: 'Visitors gain educational value and new knowledge', stakeholderName: 'Visitors' },
      { id: 'vis-engagement', name: 'Increased cultural engagement', description: 'Visitors develop deeper connection with cultural heritage', stakeholderName: 'Visitors' },
    ],
  };

  var EVIDENCE_LABELS = {
    bronze: { label: 'Bronze', icon: '🏅' },
    silver: { label: 'Silver', icon: '🛡️' },
    gold: { label: 'Gold', icon: '👑' },
    diamond: { label: 'Diamond', icon: '💎' },
  };

  var TEMPLATES = {
    bronze: {
      method: 'Partner survey and network analysis',
      questions: [
        { question: 'Has our partnership strengthened your network?', options: ['Significantly strengthened', 'Somewhat strengthened', 'No change', 'Weakened'] },
        { question: 'Have you formed new collaborative relationships?', options: ['Significantly strengthened', 'Somewhat strengthened', 'No change', 'Weakened'] },
      ],
      sampling: 'Bronze: Anecdotal evidence or basic output statistics',
      additionality: { deadweight: 'Some network growth would occur organically', attribution: 'Other networking opportunities exist', displacement: 'May reduce engagement with other networks', dropOff: 'Networks require maintenance' },
      timing: 'Post: 24-72h after activity',
    },
    silver: {
      method: 'Structured survey with sample selection',
      questions: [
        { question: 'Rate the quality of collaboration achieved', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
        { question: 'How has the partnership affected your work?', options: ['Major positive impact', 'Minor positive impact', 'No impact', 'Negative impact'] },
      ],
      sampling: 'Silver: Non-representative or representative sample with recommended measures',
      additionality: { deadweight: 'Moderate organic change expected', attribution: 'Limited alternative sources', displacement: 'Minimal displacement effects', dropOff: 'Gradual decline expected' },
      timing: 'Pre and post: Baseline + 3 months',
    },
    gold: {
      method: 'Longitudinal study with control comparison',
      questions: [
        { question: 'Describe specific changes in your network capacity', options: ['Significant growth', 'Moderate growth', 'No change', 'Decline'] },
        { question: 'Rate the sustainability of partnerships formed', options: ['Highly sustainable', 'Moderately sustainable', 'Uncertain', 'Unsustainable'] },
      ],
      sampling: 'Gold: Acceptable sample with additionality indication',
      additionality: { deadweight: 'Controlled comparison shows limited organic change', attribution: 'Attribution analysis completed', displacement: 'Displacement assessment conducted', dropOff: 'Long-term tracking planned' },
      timing: 'Pre, post, and follow-up: Baseline + 6 months + 12 months',
    },
    diamond: {
      method: 'Randomized controlled trial with comprehensive analysis',
      questions: [
        { question: 'Comprehensive network mapping assessment', options: ['Complete expansion', 'Partial expansion', 'Stable', 'Contraction'] },
        { question: 'Multi-stakeholder impact validation', options: ['Fully validated', 'Partially validated', 'Inconclusive', 'Not validated'] },
      ],
      sampling: 'Diamond: Representative sample with additionality estimate',
      additionality: { deadweight: 'RCT-based deadweight calculation', attribution: 'Full attribution modeling completed', displacement: 'Comprehensive displacement analysis', dropOff: 'Multi-year tracking with adjustment' },
      timing: 'Continuous: Baseline + quarterly for 24 months',
    },
  };

  /* ===== State ===== */
  var state = {
    currentStep: 1,
    projectSummary: '',
    uploadedFileName: '',
    selectedStakeholders: [],
    selectedOutcomes: [],
    evidenceLevels: {},
  };

  /* ===== DOM Ready ===== */
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('calculator-app')) return;

    buildStakeholderGrid();
    bindStep1();
    bindStep2();
    bindStep3();
    bindStep4();
    showStep(1);
  });

  /* ===== Step Navigation ===== */
  function showStep(n) {
    state.currentStep = n;
    document.querySelectorAll('.calc-panel').forEach(function (el) {
      el.classList.remove('calc-panel--active');
    });
    var panel = document.getElementById('calc-step-' + n);
    if (panel) panel.classList.add('calc-panel--active');

    // Update progress indicators
    document.querySelectorAll('.calc-step').forEach(function (el) {
      var s = parseInt(el.getAttribute('data-step'), 10);
      el.classList.remove('calc-step--completed', 'calc-step--active', 'calc-step--upcoming');
      if (s < n) el.classList.add('calc-step--completed');
      else if (s === n) el.classList.add('calc-step--active');
      else el.classList.add('calc-step--upcoming');
    });
    document.querySelectorAll('.calc-step__line').forEach(function (el) {
      var after = parseInt(el.getAttribute('data-after-step'), 10);
      el.classList.toggle('calc-step__line--done', after < n);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ===== Step 1 ===== */
  function bindStep1() {
    var textarea = document.getElementById('project-summary');
    var btn = document.getElementById('btn-to-step-2');
    var uploadZone = document.getElementById('upload-zone');
    var fileInput = document.getElementById('file-input');

    textarea.addEventListener('input', function () {
      state.projectSummary = this.value;
      btn.disabled = !this.value.trim();
    });

    uploadZone.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        state.uploadedFileName = this.files[0].name;
        document.getElementById('upload-text').textContent = this.files[0].name;
      }
    });

    btn.addEventListener('click', function () { showStep(2); });
  }

  /* ===== Step 2 ===== */
  function buildStakeholderGrid() {
    var grid = document.getElementById('stakeholder-grid');
    if (!grid) return;
    STAKEHOLDERS.forEach(function (s) {
      var card = document.createElement('button');
      card.className = 'calc-stakeholder-card';
      card.setAttribute('data-id', s.id);
      card.innerHTML = '<h3>' + s.name + '</h3><p>' + s.description + '</p>';
      card.addEventListener('click', function () { toggleStakeholder(s.id); });
      grid.appendChild(card);
    });
  }

  function toggleStakeholder(id) {
    var idx = state.selectedStakeholders.indexOf(id);
    if (idx > -1) {
      state.selectedStakeholders.splice(idx, 1);
      // Remove related outcomes
      var outs = OUTCOMES[id] || [];
      outs.forEach(function (o) {
        var oi = state.selectedOutcomes.indexOf(o.id);
        if (oi > -1) state.selectedOutcomes.splice(oi, 1);
      });
    } else {
      state.selectedStakeholders.push(id);
    }
    refreshStakeholderUI();
    refreshOutcomesUI();
    updateStep2Btn();
  }

  function refreshStakeholderUI() {
    document.querySelectorAll('.calc-stakeholder-card').forEach(function (el) {
      var id = el.getAttribute('data-id');
      el.classList.toggle('calc-stakeholder-card--selected', state.selectedStakeholders.indexOf(id) > -1);
    });
    document.getElementById('stakeholder-count').textContent = state.selectedStakeholders.length;
  }

  function refreshOutcomesUI() {
    var section = document.getElementById('outcomes-section');
    var list = document.getElementById('outcomes-list');
    var allOutcomes = [];
    state.selectedStakeholders.forEach(function (sId) {
      (OUTCOMES[sId] || []).forEach(function (o) { allOutcomes.push(o); });
    });

    if (allOutcomes.length === 0) {
      section.style.display = 'none';
      return;
    }
    section.style.display = '';
    list.innerHTML = '';

    allOutcomes.forEach(function (o) {
      var selected = state.selectedOutcomes.indexOf(o.id) > -1;
      var btn = document.createElement('button');
      btn.className = 'calc-outcome-btn' + (selected ? ' calc-outcome-btn--selected' : '');
      btn.setAttribute('data-id', o.id);
      btn.innerHTML =
        '<div><h3>' + o.name + '</h3><p>' + o.description + '</p></div>' +
        '<span class="calc-outcome-badge">' + o.stakeholderName + '</span>';
      btn.addEventListener('click', function () { toggleOutcome(o.id); });
      list.appendChild(btn);
    });

    document.getElementById('outcome-count').textContent = state.selectedOutcomes.length;
  }

  function toggleOutcome(id) {
    var idx = state.selectedOutcomes.indexOf(id);
    if (idx > -1) state.selectedOutcomes.splice(idx, 1);
    else state.selectedOutcomes.push(id);
    refreshOutcomesUI();
    updateStep2Btn();
  }

  function updateStep2Btn() {
    document.getElementById('btn-to-step-3').disabled = state.selectedOutcomes.length === 0;
  }

  function bindStep2() {
    document.getElementById('btn-back-1').addEventListener('click', function () { showStep(1); });
    document.getElementById('btn-to-step-3').addEventListener('click', function () {
      buildEvidenceTable();
      showStep(3);
    });
  }

  /* ===== Step 3 ===== */
  function getSelectedOutcomeObjects() {
    var result = [];
    state.selectedStakeholders.forEach(function (sId) {
      (OUTCOMES[sId] || []).forEach(function (o) {
        if (state.selectedOutcomes.indexOf(o.id) > -1) result.push(o);
      });
    });
    return result;
  }

  function buildEvidenceTable() {
    var tbody = document.getElementById('evidence-tbody');
    tbody.innerHTML = '';
    var outcomes = getSelectedOutcomeObjects();
    var levels = ['bronze', 'silver', 'gold', 'diamond'];

    outcomes.forEach(function (o) {
      var tr = document.createElement('tr');
      // Outcome cell
      var td1 = document.createElement('td');
      td1.innerHTML = '<p class="calc-table__outcome-name">' + o.name + '</p><span class="calc-table__outcome-badge">' + o.stakeholderName + '</span>';
      tr.appendChild(td1);

      levels.forEach(function (level) {
        var td = document.createElement('td');
        td.className = 'calc-table__center';
        var cb = document.createElement('input');
        cb.type = 'radio';
        cb.name = 'evidence-' + o.id;
        cb.value = level;
        cb.className = 'calc-radio';
        if (state.evidenceLevels[o.id] === level) cb.checked = true;
        cb.addEventListener('change', function () {
          state.evidenceLevels[o.id] = level;
          updateStep3Btn();
        });
        td.appendChild(cb);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    updateStep3Btn();
  }

  function updateStep3Btn() {
    var outcomes = getSelectedOutcomeObjects();
    var allSet = outcomes.every(function (o) { return !!state.evidenceLevels[o.id]; });
    document.getElementById('btn-to-step-4').disabled = !allSet;
  }

  function bindStep3() {
    document.getElementById('btn-back-2').addEventListener('click', function () { showStep(2); });
    document.getElementById('btn-to-step-4').addEventListener('click', function () {
      buildPlanCards();
      showStep(4);
    });
  }

  /* ===== Step 4 ===== */
  function buildPlanCards() {
    var container = document.getElementById('plan-cards');
    container.innerHTML = '';
    var outcomes = getSelectedOutcomeObjects();

    outcomes.forEach(function (o) {
      var level = state.evidenceLevels[o.id] || 'bronze';
      var tpl = TEMPLATES[level];
      var lvl = EVIDENCE_LABELS[level];

      var html = '<div class="plan-card">';
      html += '<div class="plan-card__header"><div><h2>' + o.name + '</h2><span class="plan-card__level">' + lvl.label.toUpperCase() + ' Level</span></div><span class="plan-card__stakeholder">' + o.stakeholderName + '</span></div>';

      // What to Collect
      html += '<div class="plan-card__section"><h3>🎯 What to Collect</h3><p class="plan-card__sublabel">Target Outputs:</p><p>· Number of ' + o.name.toLowerCase() + '</p></div>';

      // How to Collect
      html += '<div class="plan-card__section"><h3>📋 How to Collect</h3>';
      html += '<p class="plan-card__sublabel">Data Collection Method:</p><div class="plan-card__box">' + tpl.method + '</div>';
      html += '<p class="plan-card__sublabel">Suggested Questions:</p>';
      tpl.questions.forEach(function (q) {
        html += '<div class="plan-card__question"><p>' + q.question + '</p><div class="plan-card__options">';
        q.options.forEach(function (opt) { html += '<span>' + opt + '</span>'; });
        html += '</div></div>';
      });
      html += '<p class="plan-card__sublabel">Sampling Strategy:</p><div class="plan-card__box">' + tpl.sampling + '</div>';
      html += '<p class="plan-card__sublabel">Additionality Assessment:</p><div class="plan-card__additionality">';
      Object.keys(tpl.additionality).forEach(function (key) {
        html += '<div><strong>' + key.charAt(0).toUpperCase() + key.slice(1) + ':</strong> ' + tpl.additionality[key] + '</div>';
      });
      html += '</div></div>';

      // When to Collect
      html += '<div class="plan-card__section"><h3>📅 When to Collect</h3><span class="plan-card__timing">📋 ' + tpl.timing + '</span></div>';
      html += '</div>';

      container.innerHTML += html;
    });
  }

  function bindStep4() {
    document.getElementById('btn-back-3').addEventListener('click', function () { showStep(3); });
    document.getElementById('btn-download').addEventListener('click', downloadPDF);
  }

  /* ===== PDF Download ===== */
  function downloadPDF() {
    /* jsPDF loaded via CDN in functions.php */
    if (typeof window.jspdf === 'undefined') {
      alert('PDF library loading. Please wait a moment and try again.');
      return;
    }
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    var outcomes = getSelectedOutcomeObjects();

    doc.setFontSize(20);
    doc.text('Data Collection Plan', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('Comprehensive plan for collecting impact data and measuring outcomes', 14, 30);

    var y = 40;

    outcomes.forEach(function (outcome) {
      var level = state.evidenceLevels[outcome.id] || 'bronze';
      var tpl = TEMPLATES[level];
      var lvl = EVIDENCE_LABELS[level];

      if (y > 240) { doc.addPage(); y = 20; }

      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text(outcome.name, 14, y);
      y += 6;
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(outcome.stakeholderName + ' | ' + lvl.label.toUpperCase() + ' Level', 14, y);
      y += 10;

      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text('What to Collect', 14, y); y += 6;
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text('Target Outputs: Number of ' + outcome.name.toLowerCase(), 18, y); y += 8;

      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text('How to Collect', 14, y); y += 6;
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text('Data Collection Method: ' + tpl.method, 18, y); y += 8;

      tpl.questions.forEach(function (q) {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text('Q: ' + q.question, 18, y); y += 5;
        doc.text('Options: ' + q.options.join(' | '), 22, y); y += 6;
      });

      doc.text('Sampling Strategy: ' + tpl.sampling, 18, y); y += 6;
      Object.keys(tpl.additionality).forEach(function (key) {
        if (y > 275) { doc.addPage(); y = 20; }
        doc.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + tpl.additionality[key], 18, y);
        y += 5;
      });
      y += 3;
      doc.text('When to Collect: ' + tpl.timing, 18, y);
      y += 14;
    });

    doc.save('data-collection-plan.pdf');
  }
})();
