<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="container">
        <div class="site-branding">
            <?php if ( has_custom_logo() ) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></p>
            <?php endif; ?>
        </div>

        <?php if ( has_nav_menu( 'primary' ) ) : ?>
            <nav class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'sroi-calculator' ); ?>">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'depth'          => 1,
                    'fallback_cb'    => false,
                ) );
                ?>
            </nav>
        <?php endif; ?>
    </div>
</header>
