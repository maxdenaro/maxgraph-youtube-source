<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Strategy &mdash; Free Portfolio Template by Colorlib</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/aos.min.css">
    <link rel="stylesheet" href="css/hamburgers/hamburgers.min.css">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="fonts/icomoon/style.css">
    <link rel="stylesheet" href="css/animsition.min.css">
    
    
    
    <link rel="stylesheet" href="css/style.css"> -->

    <?php wp_head(); ?>
  </head>
  <body>
  
  <div class="js-animsition animsition" data-animsition-in-class="fade-in" data-animsition-out-class="fade-out">

    <header class="templateux-navbar" data-aos="fade-down">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3 col-3"><div class="site-logo"><a href="/" class="animsition-link">Strategy</a></div></div>
          <div class="col-sm-9 col-9 text-right">

            <button class="hamburger hamburger--spin toggle-menu ml-auto js-toggle-menu" type="button">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>  

            <nav class="templateux-menu js-templateux-menu" role="navigation">
							<?php 
							
								wp_nav_menu( [
									'theme_location'  => '',
									'menu'            => '', 
									'container'       => 'div', 
									'container_class' => '', 
									'container_id'    => '',
									'menu_class'      => 'menu', 
									'menu_id'         => '',
									'echo'            => true,
									'fallback_cb'     => 'wp_page_menu',
									'before'          => '',
									'after'           => '',
									'link_before'     => '',
									'link_after'      => '',
									'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
									'depth'           => 0,
									'walker'          => '',
								] );
							
							?>
            </nav>  
          </div>
        </div>
      </div>
    </header>