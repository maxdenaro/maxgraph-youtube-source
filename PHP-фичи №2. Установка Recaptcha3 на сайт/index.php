<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Captcha test</title>
</head>
<body>
	<div class="container">
		<form action="#" method="post">
			<input type="text" name="name" placeholder="Введите имя">
			<input type="email" name="email" placeholder="Введите email">
			<input type="hidden" id="token" name="token">
			<button type="submit" name="post">Отправить</button>
		</form>
	</div>
	<script src="https://www.google.com/recaptcha/api.js?render="></script>
	<script>
	
		document.querySelector('form').addEventListener('submit', (e) => {
			e.preventDefault();

			let tk = '';

			grecaptcha.ready(function() {
          grecaptcha.execute('', {action: 'homepage'}).then(function(token) {
            tk = token;
						document.getElementById('token').value = token;

						const data = new URLSearchParams();
						for (const pair of new FormData(document.querySelector('form'))) {
								data.append(pair[0], pair[1]);
						}

						fetch('send.php', {
							method: 'post',
							body: data,
						})
						.then(response => response.json())
						.then(result => {
							if (result['om_score'] >= 0.5) {
								console.log('Человек')
								// отправка данных на почту
							} else {
								console.log('Бот')
							}
						});
          });
        });
		});
	
	</script>
</body>
</html>