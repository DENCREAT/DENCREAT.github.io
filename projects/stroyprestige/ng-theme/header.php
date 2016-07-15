<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<meta name="description" content="<?php bloginfo('description'); ?>">
	<title>
		<?php
			wp_title('|', 'true', 'right');
			bloginfo('name');
		?>
	</title>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/build/css/style.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	<?php wp_head(); ?>
</head>
<body <?php body_class($class); ?>>

<header class="header">
	<div class="container">
		<a href="/" class="header__logo">
			<img src="<?php echo get_template_directory_uri(); ?>/build/images/logo.svg" alt="">
		</a>
		<nav class="header-nav">
			<ul class="header-nav__list">
				<li class="header-nav__item">
					<a href="#" class="header-nav__link">О компании</a>
					<ul class="header-nav-drop__list">
						<li class="header-nav-drop__item">
							<a href="#" class="header-nav-drop__link">Юр. лицам</a>
						</li>
						<li class="header-nav-drop__item">
							<a href="#" class="header-nav-drop__link">Сертификаты</a>
						</li>
						<li class="header-nav-drop__item">
							<a href="#" class="header-nav-drop__link">Цены</a>
						</li>
					</ul>
				</li>
				<li class="header-nav__item">
					<a href="#" class="header-nav__link">Услуги</a>
				</li>
				<li class="header-nav__item">
					<a href="#" class="header-nav__link active">Проекты</a>
				</li>
				<li class="header-nav__item">
					<a href="#" class="header-nav__link">Отзывы</a>
				</li>
				<li class="header-nav__item">
					<a href="#" class="header-nav__link">Контакты</a>
				</li>
			</ul>
		</nav>
		<span class="btn btn_yellow header__call"><i class="fa fa-phone"></i><span>Заказать звонок</span></span>
	</div>
</header>