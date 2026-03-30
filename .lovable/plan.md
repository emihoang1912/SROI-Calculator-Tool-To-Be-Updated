

# Diagnosis & Fix: Home Page → Calculator Navigation

## What Is Broken

Two links in `front-page.php` are broken:

1. **Hero CTA ("Start Your SROI Journey")** — line 41: Uses `get_theme_mod('sroi_hero_cta_link', '#choose-theme')`, defaulting to an anchor scroll, not the calculator page. Even if changed via Customizer, the user would need to know the exact URL.

2. **"Get Started" button** — line 177: Uses `home_url('/?page_id=')` with an **empty page ID**. This resolves to the home page itself.

Both links have no mechanism to dynamically find the Calculator page.

## The Fix

### 1. Add a helper function in `functions.php`

Create a function that finds the page using the `page-calculator.php` template and returns its permalink. This is Multisite-safe and works with any permalink structure:

```php
function sroi_get_calculator_url() {
    $pages = get_pages(array(
        'meta_key'   => '_wp_page_template',
        'meta_value' => 'page-calculator.php',
        'number'     => 1,
    ));
    if ( ! empty( $pages ) ) {
        return get_permalink( $pages[0]->ID );
    }
    // Fallback: look for a page with slug 'calculator'
    $page = get_page_by_path( 'calculator' );
    if ( $page ) {
        return get_permalink( $page->ID );
    }
    return home_url( '/calculator/' );
}
```

### 2. Fix the Hero CTA in `front-page.php` (line 41)

Replace:
```php
<a href="<?php echo esc_url( get_theme_mod( 'sroi_hero_cta_link', '#choose-theme' ) ); ?>" ...>
```
With:
```php
<a href="<?php echo esc_url( sroi_get_calculator_url() ); ?>" ...>
```

### 3. Fix the "Get Started" link in `front-page.php` (line 177)

Replace:
```php
<a href="<?php echo esc_url( home_url( '/?page_id=' ) ); ?>" ...>
```
With:
```php
<a href="<?php echo esc_url( sroi_get_calculator_url() ); ?>" ...>
```

### 4. Update Customizer default (optional cleanup)

Change the `sroi_hero_cta_link` default in `functions.php` from `#choose-theme` to the calculator page URL, or remove the Customizer setting for the CTA link entirely since it's now dynamically resolved.

## Why This Works on Multisite

- `get_pages()` and `get_permalink()` are site-scoped in Multisite — they query the current site's tables automatically.
- No hardcoded URLs or page IDs; the link is resolved by template assignment or slug lookup.
- Compatible with any permalink structure (pretty or `?page_id=`).

## Setup Requirement

The user must create a WordPress Page (e.g. titled "Calculator" with slug `calculator`) and assign it the **"SROI Calculator"** page template. The theme code will then find it automatically.

## Files Modified

| File | Change |
|------|--------|
| `functions.php` | Add `sroi_get_calculator_url()` helper |
| `front-page.php` | Fix Hero CTA link (line 41) and "Get Started" link (line 177) |

