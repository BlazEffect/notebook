let gulp = require("gulp"), // Подключаем Gulp
	sass = require("gulp-sass")(require("sass")), //Подключаем Sass пакет,
	autoprefixer = require("gulp-autoprefixer"),// Подключаем библиотеку для автоматического добавления префиксов
	cssnano = require("gulp-cssnano"), // Подключаем пакет для минификации CSS

	uglify = require("gulp-uglifyjs"), // Подключаем gulp-uglifyjs (для сжатия JS)
	babel = require('gulp-babel'), // Подключаем транспилятор Babel

	browserSync = require("browser-sync"), // Подключаем Browser Sync

	imagemin = require("gulp-imagemin"), // Подключаем библиотеку для работы с изображениями
	pngquant = require("imagemin-pngquant"), // Подключаем библиотеку для работы с png
	cache = require("gulp-cache"), // Подключаем библиотеку кеширования
	rename = require('gulp-rename'), // Подключаем библиотеку для переименовывания файлов
	concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)

gulp.task("sass", function(){ // Создаем таск Sass
	return gulp.src(["app/sass/main.sass"]) // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(["last 15 versions", "> 1%", "ie 9", "ie 10", "ie 11"], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest("app/css")) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task("sass-dev", function(){ // Создаем таск Sass
	return gulp.src(["app/sass/main.sass"]) // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(["last 15 versions", "> 1%", "ie 9", "ie 10", "ie 11"], { cascade: true })) // Создаем префиксы
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest("dist/css")) // Выгружаем результата в папку dist/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task("browser-sync", function(){ // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: "app" // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task("scripts-libs", function(){
	return gulp.src([ // Берем все необходимые библиотеки
		"app/libs-sources/jquery/dist/jquery.js", // Берем jQuery
		"app/libs-sources/slick-carousel/slick/slick.js", // Берем Slick slide
	])
		.pipe(gulp.dest("app/libs")); // Выгружаем в папку app/libs
});

gulp.task("scripts-libs-dev", function(){
	return gulp.src("app/libs/js/*") // Берем все необходимые библиотеки
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest("dist/libs/js")); // Выгружаем в папку dist/libs/js
});

gulp.task("css-libs-dev", function(){
	return gulp.src("app/libs/css/*.css") // Берем все необходимые библиотеки
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest("dist/libs/css")); // Выгружаем в папку dist/libs/css
});

gulp.task('scripts', function() {
	return gulp.src("app/js/*.js")
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task("scripts-dev", function(){
	return gulp.src("app/js/script.js")
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task("fonts-dev", function(){
	return gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task("html", function(){
	return gulp.src("app/pages/*.html")
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task("html-dev", function(){
	return gulp.src("app/pages/*.html")
		.pipe(gulp.dest("dist"))
});

gulp.task("img", function(){
	return gulp.src("app/images/**/*") // Берем все изображения из app
		.pipe(cache(imagemin({ // Сжимаем с кешированием
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest("dist/images")); // Выгружаем на продакшен
});

gulp.task("clear", function(){
	return cache.clearAll();
})

gulp.task("watch", function(){
	gulp.watch("app/sass/**/*.sass", gulp.parallel("sass")); // Наблюдение за sass файлами
	gulp.watch("app/pages/**/*.html", gulp.parallel("html")); // Наблюдение за HTML файлами в корне проекта
	gulp.watch("app/js/*.js", gulp.parallel('scripts')); // Наблюдение за JS файлами
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));

gulp.task("dev", gulp.parallel("sass-dev", "scripts-dev", "scripts-libs-dev", "css-libs-dev", "fonts-dev", "html-dev", "img", "clear"));