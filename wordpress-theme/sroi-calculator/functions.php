<?php
/**
 * SROI Calculator Theme Functions
 *
 * @package SROI_Calculator
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme setup
 */
function sroi_theme_setup() {
    // Let WordPress manage the document title
    add_theme_support( 'title-tag' );

    // Enable post thumbnails
    add_theme_support( 'post-thumbnails' );

    // Custom logo
    add_theme_support( 'custom-logo', array(
        'height'      => 64,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    // HTML5 support
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Register navigation menu
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'sroi-calculator' ),
    ) );
}
add_action( 'after_setup_theme', 'sroi_theme_setup' );

/**
 * Enqueue styles and scripts
 */
function sroi_enqueue_assets() {
    // Main stylesheet (style.css)
    wp_enqueue_style(
        'sroi-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get( 'Version' )
    );

    // Theme custom CSS
    wp_enqueue_style(
        'sroi-custom',
        get_template_directory_uri() . '/assets/css/custom.css',
        array( 'sroi-style' ),
        wp_get_theme()->get( 'Version' )
    );

    // Theme JS
    wp_enqueue_script(
        'sroi-scripts',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        wp_get_theme()->get( 'Version' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'sroi_enqueue_assets' );

/**
 * Customizer settings
 */
function sroi_customize_register( $wp_customize ) {

    // === Hero Section ===
    $wp_customize->add_section( 'sroi_hero', array(
        'title'    => __( 'Hero Section', 'sroi-calculator' ),
        'priority' => 30,
    ) );

    // Hero badge text
    $wp_customize->add_setting( 'sroi_hero_badge', array(
        'default'           => 'Social Return on Investment Calculator',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'sroi_hero_badge', array(
        'label'   => __( 'Badge Text', 'sroi-calculator' ),
        'section' => 'sroi_hero',
        'type'    => 'text',
    ) );

    // Hero title line 1
    $wp_customize->add_setting( 'sroi_hero_title_1', array(
        'default'           => 'Measure Your',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'sroi_hero_title_1', array(
        'label'   => __( 'Title Line 1', 'sroi-calculator' ),
        'section' => 'sroi_hero',
        'type'    => 'text',
    ) );

    // Hero title line 2 (highlighted)
    $wp_customize->add_setting( 'sroi_hero_title_2', array(
        'default'           => 'Social Impact',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'sroi_hero_title_2', array(
        'label'   => __( 'Title Line 2 (Highlighted)', 'sroi-calculator' ),
        'section' => 'sroi_hero',
        'type'    => 'text',
    ) );

    // Hero description
    $wp_customize->add_setting( 'sroi_hero_desc', array(
        'default'           => 'Transform your social initiatives into measurable outcomes. Our guided 4-step process helps you calculate and communicate the true value of your work.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );
    $wp_customize->add_control( 'sroi_hero_desc', array(
        'label'   => __( 'Description', 'sroi-calculator' ),
        'section' => 'sroi_hero',
        'type'    => 'textarea',
    ) );

    // Hero CTA text
    $wp_customize->add_setting( 'sroi_hero_cta', array(
        'default'           => 'Start Your SROI Journey',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'sroi_hero_cta', array(
        'label'   => __( 'CTA Button Text', 'sroi-calculator' ),
        'section' => 'sroi_hero',
        'type'    => 'text',
    ) );

    // Hero CTA link
    $wp_customize->add_setting( 'sroi_hero_cta_link', array(
        'default'           => '#choose-theme',
        'sanitize_callback' => 'esc_url_raw',
    ) );
    $wp_customize->add_control( 'sroi_hero_cta_link', array(
        'label'   => __( 'CTA Button Link', 'sroi-calculator' ),
        'section' => 'sroi_hero',
        'type'    => 'url',
    ) );

    // === Footer Section ===
    $wp_customize->add_section( 'sroi_footer', array(
        'title'    => __( 'Footer', 'sroi-calculator' ),
        'priority' => 90,
    ) );

    $wp_customize->add_setting( 'sroi_footer_text', array(
        'default'           => '© 2026 SROI Calculator. Helping organizations measure their social impact.',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'sroi_footer_text', array(
        'label'   => __( 'Footer Text', 'sroi-calculator' ),
        'section' => 'sroi_footer',
        'type'    => 'text',
    ) );
}
add_action( 'customize_register', 'sroi_customize_register' );
