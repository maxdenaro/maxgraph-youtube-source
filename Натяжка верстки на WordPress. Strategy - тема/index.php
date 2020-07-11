<?php 

get_header();

?>

<?php 

/* Template Name: main */

?>

    <!-- END templateux-navbar -->
    <section class="templateux-hero">
      <div class="container">
        <div class="row align-items-center justify-content-center intro">
          <div class="col-md-10" data-aos="fade-up">
            <h1>We are Strategy. A digitally minded creative agency based in NYC.</h1>
            <a href="#next" class="go-down js-smoothscroll"></a>
          </div>
        </div>
      </div>
    </section>
    <!-- END templateux-hero -->

    <section class="templateux-portfolio-overlap" id="next">
      <div class="container-fluid">
        <div class="row">
          <?php 
			
						// параметры по умолчанию
						$posts = get_posts( array(
							'numberposts' => 5,
							'category'    => 0,
							'orderby'     => 'date',
							'order'       => 'DESC',
							'include'     => array(),
							'exclude'     => array(),
							'meta_key'    => '',
							'meta_value'  =>'',
							'post_type'   => 'portfolio',
							'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
						) );

						foreach( $posts as $post ){
							setup_postdata($post);
								?>
								
								<article class="proj-article">
									<a class="project animsition-link" href="<?php the_permalink(); ?>" data-aos="fade-up">
										<figure>
											<img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="Free Template" class="img-fluid">  
										</figure>
										<div class="project-hover">
											<div class="project-hover-inner">
												<h2><?php the_title(); ?></h2>
												<span><?php the_content(); ?></span>
											</div>
										</div>
									</a>
								</article>
									
								
								
								<?php
						}

						wp_reset_postdata(); // сброс
					
					?>
        </div>
        <!-- END row -->
      </div>
    </section>

   
    <!-- END section -->
    <section class="templateux-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4" data-aos="fade-up">
            <h2 class="section-heading mt-3">What We Do</h2>
          </div>
          <div class="col-md-8" data-aos="fade-up" data-aos-delay="100">

            <div class="row">
              <div class="col-md-12">
                <h2 class="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</h2>
              </div>
            </div>
            

            <div class="row  pt-sm-0 pt-md-5 mb-5">

              

								<?php 
							
								// параметры по умолчанию
								$posts = get_posts( array(
									'numberposts' => 4,
									'category'    => 0,
									'orderby'     => 'date',
									'order'       => 'ASC',
									'include'     => array(),
									'exclude'     => array(),
									'meta_key'    => '',
									'meta_value'  =>'',
									'post_type'   => 'experts-adv',
									'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
								) );

								foreach( $posts as $post ){
									setup_postdata($post);
										?>

											<div class="col-md-6"  data-aos="fade-up" data-aos-delay="100">
												<div class="media templateux-media mb-4">
													<div class="mr-4 icon">
														<span class="<?php echo get_post_meta(get_the_ID(), 'adv-icon', true); ?> display-3"></span>
													</div>
													<div class="media-body">
														<h3 class="h5"><?php the_title(); ?></h3>
														<p><?php the_content(); ?></p>
													</div>
												</div>
											</div>						
										
										<?php
								}

								wp_reset_postdata(); // сброс
							
							?>
		

            </div>

            
          </div>
        </div>
      </div>
    </section>
    <!-- END section -->

    <!-- END section -->
    <section class="templateux-section mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4" data-aos="fade-up">
            <h2 class="section-heading mt-3">Recent Blog Posts</h2>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-lg-12">
                <?php 
			
									// параметры по умолчанию
									$posts = get_posts( array(
										'numberposts' => 3,
										'category'    => 0,
										'orderby'     => 'date',
										'order'       => 'DESC',
										'include'     => array(),
										'exclude'     => array(),
										'meta_key'    => '',
										'meta_value'  =>'',
										'post_type'   => 'post',
										'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
									) );

									foreach( $posts as $post ){
										setup_postdata($post);
											?>
											
											<div class="main-blog-wrapper" data-aos="fade-up">
												<a class="post animsition-link" href="<?php the_permalink(); ?>">
													<figure>
														<img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="Free Template" class="img-fluid">  
													</figure>
													<div class="project-hover">
														<div class="project-hover-inner">
															<h2><?php the_title(); ?></h2>
															<span><?php echo date( 'F j,  Y' ); ?></span>
														</div>
													</div>
												</a>
											</div>
												
											
											
											<?php
									}

									wp_reset_postdata(); // сброс
								
								?>
              </div>
            </div>
          </div>
        </div>
        <div class="row" data-aos="fade-up" data-aos-delay="400">
          <div class="col-md-8 ml-auto">
            <a href="/blog/" class="animsition-link">Read All Blog Posts </a>
          </div>
        </div>
      </div>
    </section>

<?php 

get_footer();

?>