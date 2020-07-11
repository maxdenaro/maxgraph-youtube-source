<?php get_header(); ?>


<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>
	

		<section class="templateux-hero"  data-scrollax-parent="true">
			<!-- <div class="cover" data-scrollax="properties: { translateY: '30%' }"><img src="images/hero_2.jpg" /></div> -->

			<div class="container">
				<div class="row align-items-center justify-content-center intro">
					<div class="col-md-12" data-aos="fade-up">
						<div class="post-meta">
							<span>Posted in <?php echo date( 'F j,  Y' ); ?></span> 
							<span class="sep">&bullet;</span>
							<span>Posted by <?php the_author(); ?></span>  
						</div>
						<h1><?php the_title(); ?></h1>
						
						<a href="#next" class="go-down js-smoothscroll"></a>
						

						
					</div>
				</div>
			</div>
		</section>
		<!-- END templateux-hero -->


		<section class="templateux-portfolio-overlap mb-5" id="next">
			<div id="blog" class="site-section">
			<div class="container">
				
						<div class="row">

							<div class="col-md-8">
								<div>

										<?php the_content('', true ); ?>
									
								</div>
								

								<div class="pt-5 mt-5">
									<?php 

										$post_id = get_the_ID();
									
										$comments_count = wp_count_comments($post_id);

										?>
											<h3 class="mb-5"><?php echo "Всего комментариев: " . $comments_count->total_comments; ?></h3>
										<?php
										
									
									?>
									<?php comments_template(); ?>
									<?php comment_form(); ?>
								</div>

							</div> <!-- .col-md-8 -->
							<div class="col-md-4 sidebar pl-md-5">
								<div class="sidebar-box">
									<?php echo get_avatar(1); ?>
									<h3>About The Author</h3>
									<p>
										<?php 

											the_author_meta('description');
										
										?></p>
								</div>

								<div class="sidebar-box">
									<h3>Tags</h3>
									<div class="tagcloud">
										<?php the_tags(__('Tags: '), ' '); ?>
									</div>
								</div>
							</div>

						</div>

						
					</div>
			</div>

		</section>


<?php } } else { ?>
	
<?php } ?>


<?php get_footer(); ?>