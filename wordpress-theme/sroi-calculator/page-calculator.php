<?php
/**
 * Template Name: SROI Calculator
 * Single-page calculator with 4 steps managed via JavaScript.
 *
 * @package SROI_Calculator
 */

get_header();
?>

<main id="calculator-app" class="calc-app">

  <!-- Top Bar -->
  <div class="calc-topbar">
    <div class="calc-topbar__inner">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="calc-topbar__exit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <?php esc_html_e( 'Exit', 'sroi-calculator' ); ?>
      </a>
      <div class="calc-topbar__title">
        <span class="calc-topbar__theme-label"><?php esc_html_e( 'Theme', 'sroi-calculator' ); ?></span>
        <span class="calc-topbar__theme-name"><?php esc_html_e( 'Community Volunteering', 'sroi-calculator' ); ?></span>
      </div>
      <div class="calc-topbar__spacer"></div>
    </div>
  </div>

  <!-- Progress Steps -->
  <div class="calc-progress">
    <div class="calc-progress__inner">
      <?php
      $calc_steps = array(
        array( 'num' => 1, 'label' => __( 'Describe', 'sroi-calculator' ) ),
        array( 'num' => 2, 'label' => __( 'Scope', 'sroi-calculator' ) ),
        array( 'num' => 3, 'label' => __( 'Evidence', 'sroi-calculator' ) ),
        array( 'num' => 4, 'label' => __( 'Plan', 'sroi-calculator' ) ),
      );
      foreach ( $calc_steps as $i => $step ) :
      ?>
        <div class="calc-step" data-step="<?php echo esc_attr( $step['num'] ); ?>">
          <div class="calc-step__circle">
            <span class="calc-step__num"><?php echo esc_html( $step['num'] ); ?></span>
            <svg class="calc-step__check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="calc-step__label"><?php echo esc_html( $step['label'] ); ?></span>
        </div>
        <?php if ( $i < count( $calc_steps ) - 1 ) : ?>
          <div class="calc-step__line" data-after-step="<?php echo esc_attr( $step['num'] ); ?>"></div>
        <?php endif; ?>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Content Area -->
  <div class="calc-content">

    <!-- ===== STEP 1: Describe ===== -->
    <section id="calc-step-1" class="calc-panel calc-panel--active">
      <h1 class="calc-panel__title"><?php esc_html_e( 'Describe Your Project', 'sroi-calculator' ); ?></h1>
      <p class="calc-panel__desc"><?php esc_html_e( "Tell us about your project. We'll help identify relevant stakeholders and outcomes for impact measurement.", 'sroi-calculator' ); ?></p>

      <div class="calc-card">
        <label class="calc-label"><?php esc_html_e( 'Project Summary', 'sroi-calculator' ); ?> <span class="calc-required">*</span></label>
        <textarea id="project-summary" class="calc-textarea" rows="7" placeholder="<?php esc_attr_e( 'Describe your project...', 'sroi-calculator' ); ?>"></textarea>
      </div>

      <div class="calc-card">
        <label class="calc-label"><?php esc_html_e( 'Upload Project Report (Optional)', 'sroi-calculator' ); ?></label>
        <div class="calc-upload" id="upload-zone">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
          <p class="calc-upload__text" id="upload-text"><?php esc_html_e( 'Upload existing project report', 'sroi-calculator' ); ?></p>
          <p class="calc-upload__hint"><?php esc_html_e( 'PDF, DOC, DOCX, or TXT', 'sroi-calculator' ); ?></p>
          <input type="file" id="file-input" accept=".pdf,.doc,.docx,.txt" style="display:none">
        </div>
      </div>

      <div class="calc-actions calc-actions--center">
        <button class="calc-btn calc-btn--primary" id="btn-to-step-2" disabled>
          <?php esc_html_e( 'Analyze Stakeholders', 'sroi-calculator' ); ?>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </section>

    <!-- ===== STEP 2: Scope ===== -->
    <section id="calc-step-2" class="calc-panel">
      <h1 class="calc-panel__title"><?php esc_html_e( 'Define Stakeholders & Outcomes', 'sroi-calculator' ); ?></h1>
      <p class="calc-panel__desc"><?php esc_html_e( 'Select relevant stakeholders and the outcomes you want to measure.', 'sroi-calculator' ); ?></p>

      <div class="calc-badges">
        <span class="calc-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span id="stakeholder-count">0</span> <?php esc_html_e( 'Stakeholders', 'sroi-calculator' ); ?>
        </span>
        <span class="calc-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          <span id="outcome-count">0</span> <?php esc_html_e( 'Outcomes', 'sroi-calculator' ); ?>
        </span>
      </div>

      <h2 class="calc-section-title"><?php esc_html_e( 'Stakeholders', 'sroi-calculator' ); ?></h2>
      <div class="calc-stakeholder-grid" id="stakeholder-grid"></div>

      <div id="outcomes-section" style="display:none">
        <div class="calc-outcomes-header">
          <div>
            <h2 class="calc-section-title" style="margin-top:0"><?php esc_html_e( 'Outcomes', 'sroi-calculator' ); ?></h2>
            <p class="calc-panel__desc" style="margin-top:0.25rem"><?php esc_html_e( 'Select the outcomes you want to measure. Outcomes are automatically linked to their stakeholders.', 'sroi-calculator' ); ?></p>
          </div>
        </div>
        <div id="outcomes-list" class="calc-outcomes-list"></div>
      </div>

      <div class="calc-actions calc-actions--between">
        <button class="calc-btn calc-btn--outline" id="btn-back-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <?php esc_html_e( 'Back', 'sroi-calculator' ); ?>
        </button>
        <button class="calc-btn calc-btn--primary" id="btn-to-step-3" disabled>
          <?php esc_html_e( 'Continue to Measuring', 'sroi-calculator' ); ?>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </section>

    <!-- ===== STEP 3: Evidence ===== -->
    <section id="calc-step-3" class="calc-panel">
      <h1 class="calc-panel__title"><?php esc_html_e( 'Level of Evidence', 'sroi-calculator' ); ?></h1>
      <p class="calc-panel__desc"><?php esc_html_e( 'Select the evidence level for each outcome based on available data quality.', 'sroi-calculator' ); ?></p>

      <div class="calc-evidence-cards">
        <div class="calc-evidence-card">
          <div class="calc-evidence-card__head"><span>🏅</span><strong><?php esc_html_e( 'Bronze', 'sroi-calculator' ); ?></strong></div>
          <p><?php esc_html_e( 'Relevant output statistics or anecdotal evidence', 'sroi-calculator' ); ?></p>
          <ul><li><?php esc_html_e( 'L1: Relevant output statistics', 'sroi-calculator' ); ?></li><li><?php esc_html_e( 'L2: Anecdotal evidence', 'sroi-calculator' ); ?></li></ul>
        </div>
        <div class="calc-evidence-card">
          <div class="calc-evidence-card__head"><span>🛡️</span><strong><?php esc_html_e( 'Silver', 'sroi-calculator' ); ?></strong></div>
          <p><?php esc_html_e( 'Data measured by recommended measures with acceptable sample coverage but no proof of additionality', 'sroi-calculator' ); ?></p>
          <ul><li><?php esc_html_e( 'L3.a: Non-representative data', 'sroi-calculator' ); ?></li><li><?php esc_html_e( 'L3.b: Representative data', 'sroi-calculator' ); ?></li></ul>
        </div>
        <div class="calc-evidence-card">
          <div class="calc-evidence-card__head"><span>👑</span><strong><?php esc_html_e( 'Gold', 'sroi-calculator' ); ?></strong></div>
          <p><?php esc_html_e( 'Data with acceptable sample coverage and reasonable indication of additionality', 'sroi-calculator' ); ?></p>
          <ul><li><?php esc_html_e( 'L4.a: Non-representative data with additionality indication', 'sroi-calculator' ); ?></li><li><?php esc_html_e( 'L4.b: Representative data with additionality indication', 'sroi-calculator' ); ?></li></ul>
        </div>
        <div class="calc-evidence-card">
          <div class="calc-evidence-card__head"><span>💎</span><strong><?php esc_html_e( 'Diamond', 'sroi-calculator' ); ?></strong></div>
          <p><?php esc_html_e( 'Data with acceptable sample coverage and reasonable indication of the estimate of additionality', 'sroi-calculator' ); ?></p>
          <ul><li><?php esc_html_e( 'L5.a: Non-representative data with additionality estimate', 'sroi-calculator' ); ?></li><li><?php esc_html_e( 'L5.b: Representative data with additionality estimate', 'sroi-calculator' ); ?></li></ul>
        </div>
      </div>

      <div class="calc-table-wrap">
        <table class="calc-table" id="evidence-table">
          <thead>
            <tr>
              <th><?php esc_html_e( 'Outcome', 'sroi-calculator' ); ?></th>
              <th class="calc-table__center">🏅 <?php esc_html_e( 'Bronze', 'sroi-calculator' ); ?></th>
              <th class="calc-table__center">🛡️ <?php esc_html_e( 'Silver', 'sroi-calculator' ); ?></th>
              <th class="calc-table__center">👑 <?php esc_html_e( 'Gold', 'sroi-calculator' ); ?></th>
              <th class="calc-table__center">💎 <?php esc_html_e( 'Diamond', 'sroi-calculator' ); ?></th>
            </tr>
          </thead>
          <tbody id="evidence-tbody"></tbody>
        </table>
      </div>

      <!-- Calculate SROI checkbox -->
      <div class="calc-sroi-option">
        <label class="calc-sroi-option__label">
          <input type="checkbox" id="calculate-sroi-checkbox">
          <div>
            <strong>📊 <?php esc_html_e( 'Calculate Social Return on Investment (SROI)', 'sroi-calculator' ); ?></strong>
            <p><?php esc_html_e( 'Generate a comprehensive SROI analysis including financial proxies, input costs, and return calculations. This will add an additional step to your measurement plan.', 'sroi-calculator' ); ?></p>
          </div>
        </label>
      </div>

      <div class="calc-actions calc-actions--between">
        <button class="calc-btn calc-btn--outline" id="btn-back-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <?php esc_html_e( 'Back', 'sroi-calculator' ); ?>
        </button>
        <button class="calc-btn calc-btn--primary" id="btn-to-step-4" disabled>
          <?php esc_html_e( 'Continue to Data Collection', 'sroi-calculator' ); ?>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </section>

    <!-- ===== STEP 4: Plan ===== -->
    <section id="calc-step-4" class="calc-panel">
      <h1 class="calc-panel__title"><?php esc_html_e( 'Data Collection Plan', 'sroi-calculator' ); ?></h1>
      <p class="calc-panel__desc"><?php esc_html_e( 'Comprehensive plan for collecting impact data and measuring outcomes', 'sroi-calculator' ); ?></p>

      <div id="plan-cards"></div>

      <div class="calc-actions calc-actions--between">
        <button class="calc-btn calc-btn--outline" id="btn-back-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <?php esc_html_e( 'Back', 'sroi-calculator' ); ?>
        </button>
        <button class="calc-btn calc-btn--primary" id="btn-download">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          <?php esc_html_e( 'Download Templates', 'sroi-calculator' ); ?>
        </button>
      </div>
    </section>

  </div>

</main>

<?php get_footer(); ?>
