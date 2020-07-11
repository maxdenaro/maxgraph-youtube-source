<?php


function strategy_assets() {

    wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.min.css' );

    wp_enqueue_style( 'aos', get_template_directory_uri() . '/assets/css/aos.min.css' );

    wp_enqueue_style( 'hamb', get_template_directory_uri() . '/assets/css/hamburgers/hamburgers.min.css' );

    wp_enqueue_style( 'owl', get_template_directory_uri() . '/assets/css/owl.carousel.min.css' );

    wp_enqueue_style( 'icomoon', get_template_directory_uri() . '/assets/fonts/icomoon/style.css' );
    
    wp_enqueue_style( 'anim', get_template_directory_uri() . '/assets/css/animsition.min.css' );

	wp_enqueue_style( 'maincss', get_template_directory_uri() . '/assets/css/style.css' );

    wp_enqueue_script( 'script-all', get_template_directory_uri() . '/assets/js/scripts-all.js', array(), '20151215', true );
    
    wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/main.js', array(), '20151215', true );
}

add_action( 'wp_enqueue_scripts', 'strategy_assets' );

show_admin_bar(false);

add_theme_support( 'post-thumbnails' );
		
add_theme_support( 'post-thumbnails', array( 'portfolio' ) );

add_theme_support( 'menus' );

add_action('wp_ajax_callback_mail', 'callback_mail');
add_action('wp_ajax_nopriv_callback_mail', 'callback_mail');

function callback_mail() {
	$name = $POST['name'];
	$email = $POST['email'];
	$phone = $POST['phone'];
	$zone = $POST['zone'];
	$budget = $POST['budget'];
	$type = $POST['type'];

	$to = 'maxgraph23@gmail.com';
	$subject = 'asd';
	$message = 'asd';

	remove_all_filters( 'wp_mail_from' );
	remove_all_filters( 'wp_mail_from_name' );
	 
	$headers = array(
		'From: Me Myself <me@example.net>',
		'content-type: text/html',
		'Cc: John Q Codex <jqc@wordpress.org>',
		'Cc: iluvwp@wordpress.org', // тут можно использовать только простой email адрес
	);

	wp_mail( $to, $subject, $message, $headers );
	wp_die();
}