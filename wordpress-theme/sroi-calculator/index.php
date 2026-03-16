<?php
/**
 * The main template file (fallback).
 *
 * @package SROI_Calculator
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="container section">
                    <h2><?php the_title(); ?></h2>
                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </div>
            </article>
        <?php endwhile; ?>
    <?php else : ?>
        <div class="container section section--center">
            <p><?php esc_html_e( 'No content found.', 'sroi-calculator' ); ?></p>
        </div>
    <?php endif; ?>
</main>

<?php
get_footer();
