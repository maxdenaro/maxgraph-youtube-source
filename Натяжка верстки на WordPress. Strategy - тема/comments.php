<?php
function mytheme_comment( $comment, $args, $depth ) {
	if ( 'div' === $args['style'] ) {
		$tag       = 'div';
		$add_below = 'comment';
	} else {
		$tag       = 'li';
		$add_below = 'div-comment';
	}

	$classes = ' ' . comment_class( 'special', null, null, false );
	?>

	<<?php echo $tag, $classes; ?> id="comment-<?php comment_ID() ?>">
	

	<div class="comment-author vcard bio">
		<?php
		if ( $args['avatar_size'] != 0 ) {
			echo get_avatar( $comment, $args['avatar_size'] );
		}
		?>
	</div>

	<div class="comment-body">
		<h3>
			<?php echo  get_comment_author( $comment_ID ); // Вернет: Евгений ?>
		</h3>
		<?php if ( $comment->comment_approved == '0' ) { ?>
			<em class="comment-awaiting-moderation">
				<?php _e( 'Your comment is awaiting moderation.' ); ?>
			</em><br/>
		<?php } ?>

		<div class="meta">
			<a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ); ?>">
				<?php
				printf(
					__( '%1$s at %2$s' ),
					get_comment_date(),
					get_comment_time()
				); ?>
			</a>
		</div>

		<?php comment_text(); ?>

		<div class="reply">
			<?php
			comment_reply_link(
				array_merge(
					$args,
					array(
						'add_below' => $add_below,
						'depth'     => $depth,
						'max_depth' => $args['max_depth']
					)
				)
			); ?>
		</div>
	</div>

	<?php if ( 'div' != $args['style'] ) { ?>
		
	<?php }
}

?>


<ul class="comment-list">
	  <?php wp_list_comments('type=comment&callback=mytheme_comment'); ?>
</ul>