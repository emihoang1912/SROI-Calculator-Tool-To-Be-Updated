<?php
/**
 * Front Page Template — Single Page Layout
 *
 * @package SROI_Calculator
 */

get_header();
?>

<main id="primary" class="site-main" style="position: relative; overflow: hidden;">

    <!-- Background gradient blobs -->
    <div class="bg-blobs">
        <div class="bg-blobs__blob bg-blobs__blob--1"></div>
        <div class="bg-blobs__blob bg-blobs__blob--2"></div>
    </div>

    <!-- ========== HERO SECTION ========== -->
    <section id="hero" class="hero">
        <div class="hero__inner">

            <!-- Badge -->
            <div class="hero-badge animate-fade-in-up">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
                <?php echo esc_html( get_theme_mod( 'sroi_hero_badge', 'Social Return on Investment Calculator' ) ); ?>
            </div>

            <!-- Title -->
            <h1 class="hero__title animate-fade-in-up animate-delay-1">
                <?php echo esc_html( get_theme_mod( 'sroi_hero_title_1', 'Measure Your' ) ); ?><br>
                <span><?php echo esc_html( get_theme_mod( 'sroi_hero_title_2', 'Social Impact' ) ); ?></span>
            </h1>

            <!-- Description -->
            <p class="hero__description animate-fade-in-up animate-delay-2">
                <?php echo esc_html( get_theme_mod( 'sroi_hero_desc', 'Transform your social initiatives into measurable outcomes. Our guided 4-step process helps you calculate and communicate the true value of your work.' ) ); ?>
            </p>

            <!-- CTA -->
            <a href="<?php echo esc_url( sroi_get_calculator_url() ); ?>" class="btn-cta animate-fade-in-up animate-delay-3" id="hero-cta">
                <?php echo esc_html( get_theme_mod( 'sroi_hero_cta', 'Start Your SROI Journey' ) ); ?>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>

            <!-- Step Indicators -->
            <div class="steps animate-fade-in-up animate-delay-5">
                <?php
                $steps = array(
                    array( 'number' => 1, 'label' => __( 'Describe', 'sroi-calculator' ) ),
                    array( 'number' => 2, 'label' => __( 'Scope', 'sroi-calculator' ) ),
                    array( 'number' => 3, 'label' => __( 'Measure', 'sroi-calculator' ) ),
                    array( 'number' => 4, 'label' => __( 'Claim', 'sroi-calculator' ) ),
                );
                foreach ( $steps as $step ) : ?>
                    <div class="step">
                        <div class="step__number"><?php echo esc_html( $step['number'] ); ?></div>
                        <span class="step__label"><?php echo esc_html( $step['label'] ); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>

    <!-- ========== WHAT IS SROI SECTION ========== -->
    <section id="what-is-sroi" class="section section--center">
        <div class="container">
            <h2 class="section__title">What is <strong>SROI</strong>?</h2>
            <p class="section__subtitle">
                Social Return on Investment (SROI) is a framework for measuring the social, environmental, and economic value created by your activities.
            </p>

            <div class="features-grid">
                <?php
                $features = array(
                    array(
                        'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
                        'title' => __( 'Quantify Impact', 'sroi-calculator' ),
                        'desc'  => __( 'Convert social outcomes into monetary values to demonstrate return on investment', 'sroi-calculator' ),
                    ),
                    array(
                        'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
                        'title' => __( 'Stakeholder Focus', 'sroi-calculator' ),
                        'desc'  => __( 'Identify and measure outcomes for everyone affected by your project', 'sroi-calculator' ),
                    ),
                    array(
                        'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
                        'title' => __( 'Evidence-Based', 'sroi-calculator' ),
                        'desc'  => __( 'Use validated indicators and financial proxies from established research', 'sroi-calculator' ),
                    ),
                    array(
                        'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
                        'title' => __( 'Report Ready', 'sroi-calculator' ),
                        'desc'  => __( 'Generate professional SROI reports with data collection templates', 'sroi-calculator' ),
                    ),
                );
                foreach ( $features as $feature ) : ?>
                    <div class="feature-card">
                        <div class="feature-card__icon">
                            <?php echo $feature['icon']; ?>
                        </div>
                        <h3 class="feature-card__title"><?php echo esc_html( $feature['title'] ); ?></h3>
                        <p class="feature-card__desc"><?php echo esc_html( $feature['desc'] ); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- ========== SROI RATIO SECTION ========== -->
    <section id="sroi-ratio" class="sroi-ratio">
        <div class="sroi-ratio__card">
            <p class="sroi-ratio__label"><?php esc_html_e( 'The SROI Ratio', 'sroi-calculator' ); ?></p>

            <div class="sroi-ratio__formula">
                <span class="sroi-ratio__name">SROI</span>
                <span class="sroi-ratio__equals">=</span>
                <div class="sroi-ratio__fraction">
                    <span class="sroi-ratio__numerator"><?php esc_html_e( 'Net Social Value', 'sroi-calculator' ); ?></span>
                    <div class="sroi-ratio__divider"></div>
                    <span class="sroi-ratio__denominator"><?php esc_html_e( 'Total Investment', 'sroi-calculator' ); ?></span>
                </div>
            </div>

            <p class="sroi-ratio__example">
                <?php esc_html_e( 'For example, an SROI ratio of 3:1 means that for every £1 invested, £3 of social value is created.', 'sroi-calculator' ); ?>
            </p>
        </div>
    </section>

    <!-- ========== CHOOSE YOUR THEME SECTION ========== -->
    <section id="choose-theme" class="section section--center">
        <div class="container">
            <h2 class="section__title">Choose Your <strong>Theme</strong></h2>
            <p class="section__subtitle">
                <?php esc_html_e( "Select the type of social initiative you want to measure. We'll guide you through the SROI calculation process.", 'sroi-calculator' ); ?>
            </p>

            <div class="themes-grid">
                <?php
                $themes = array(
                    array(
                        'title'  => __( 'Community Volunteering', 'sroi-calculator' ),
                        'desc'   => __( 'Measure the social impact of volunteer programs on communities, volunteers, and organizations', 'sroi-calculator' ),
                        'active' => true,
                    ),
                    array(
                        'title'  => __( 'Youth Development', 'sroi-calculator' ),
                        'desc'   => __( 'Measure outcomes for youth mentoring, education, and skills programs', 'sroi-calculator' ),
                        'active' => false,
                    ),
                    array(
                        'title'  => __( 'Environmental Impact', 'sroi-calculator' ),
                        'desc'   => __( 'Calculate the social value of environmental and sustainability initiatives', 'sroi-calculator' ),
                        'active' => false,
                    ),
                );
                foreach ( $themes as $theme ) : ?>
                    <div class="theme-card <?php echo $theme['active'] ? 'theme-card--active' : 'theme-card--locked'; ?>">

                        <?php if ( ! $theme['active'] ) : ?>
                            <div class="theme-card__badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <?php esc_html_e( 'Coming Soon', 'sroi-calculator' ); ?>
                            </div>
                        <?php endif; ?>

                        <div class="theme-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </div>

                        <h3 class="theme-card__title"><?php echo esc_html( $theme['title'] ); ?></h3>
                        <p class="theme-card__desc"><?php echo esc_html( $theme['desc'] ); ?></p>

                        <?php if ( $theme['active'] ) : ?>
                            <a href="<?php echo esc_url( home_url( '/?page_id=' ) ); ?>" class="theme-card__link theme-card__calculator-link">
                                <?php esc_html_e( 'Get Started', 'sroi-calculator' ); ?>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </a>
                        <?php endif; ?>

                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
