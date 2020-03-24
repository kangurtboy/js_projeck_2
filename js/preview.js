(function () {

	var uploadFIleInput = document.querySelector("#upload-file");
	window.editWindow = document.querySelector(".img-upload__overlay");
	var imgPreview = window.editWindow.querySelector(".img-upload__preview");
	var imgScale = window.editWindow.querySelector(".scale__line");
	var scaleValue = editWindow.querySelector(".scale__value");
	var scalePin = editWindow.querySelector(".scale__pin");
	var scaleLevel = editWindow.querySelector(".scale__level");
	var filterLevel;
	var defaultFilter = {
		chrome: 'grayscale(0.2)',
		sepia: 'sepia(0.2)',
		marvin: 'invert(0.2)',
		phobos: 'blur(1px)',
		heat: 'brightness(0.60)'
	}
	var onLoadFile = function () {
		//при загрузки фото открывается окно редактирование
		window.editWindow.classList.remove("hidden");
		imgScale.parentElement.classList.add('hidden');

	};
	var onSelectFilter = function (e) {
		if (e.target.classList.contains("effects__preview")) {
			//применение филтров при нажании на соответствющих блоках
			scaleLevel.style.width = '20%';
			scalePin.style.left = '20%';
			if (imgPreview.classList[1]) {
				imgPreview.classList.remove(imgPreview.classList[1]);
			}
			imgPreview.classList.add(e.target.classList[1]);
			imgScale.parentElement.classList.remove('hidden');
			if (e.target.classList.contains('effects__preview--chrome')) {
				imgPreview.style.filter = defaultFilter.chrome;
			} else if (e.target.classList.contains('effects__preview--sepia')) {
				imgPreview.style.filter = defaultFilter.sepia;
			} else if (e.target.classList.contains('effects__preview--marvin')) {
				imgPreview.style.filter = defaultFilter.marvin;
			} else if (e.target.classList.contains('effects__preview--phobos')) {
				imgPreview.style.filter = defaultFilter.phobos;
			} else if (e.target.classList.contains('effects__preview--heat')) {
				imgPreview.style.filter = defaultFilter.heat;
			} else if (e.target.classList.contains('effects__preview--none')) {
				imgPreview.style.filter = 'none';
				imgScale.parentElement.classList.add('hidden');
			}
		}
	}
	var onEditWindowOpen = function (e) {
		if (e.target.classList.contains("img-upload__cancel")) {
			//закрытие окно
			editWindow.classList.add("hidden");
			uploadFIleInput.value = "";
		};
		onSelectFilter(e)
	};
	var onScaleMouseup = function (e) {
		//изменение ползунка
		var maxLevel = imgScale.offsetWidth;
		scaleValue.value = e.offsetX;
		if (e.target !== scalePin) {
			scaleLevel.style.width = scaleValue.value + "px";
			filterLevel = (Math.floor((scaleLevel.offsetWidth * 100) / maxLevel) + 1) / 100;
			scalePin.style.left = scaleValue.value + "px";
		}
		//изменение уровня филтра при изменение ползунка
		if (imgPreview.classList.contains('effects__preview--chrome')) {
			imgPreview.style.filter = `grayscale(${filterLevel})`;
		} else if (imgPreview.classList.contains('effects__preview--sepia')) {
			imgPreview.style.filter = `sepia(${filterLevel})`;
		} else if (imgPreview.classList.contains('effects__preview--marvin')) {
			imgPreview.style.filter = `invert(${filterLevel})`;
		} else if (imgPreview.classList.contains('effects__preview--phobos')) {
			imgPreview.style.filter = `blur(${filterLevel * 5}px)`;
		} else if (imgPreview.classList.contains('effects__preview--heat')) {
			imgPreview.style.filter = `brightness(${filterLevel * 3})`;
		}
	};
	var onMouseDown = function (e) {
		var scale = window.editWindow.querySelector('.img-upload__scale');
		function onMouseMove(moveEvent) {
			var currentLevel = 0;
			if (moveEvent.target === scalePin) {
				currentLevel = scaleLevel.offsetWidth + moveEvent.offsetWidth;
			} else if (e.target === imgScale) {
				currentLevel = scaleLevel.offsetWidth + scalePin.offsetWidth * 2;
			} else {
				currentLevel = moveEvent.offsetX - scalePin.offsetWidth;
			}
			if (currentLevel > 0 && currentLevel <= imgScale.offsetWidth) {
				filterLevel = (Math.floor((scaleLevel.offsetWidth * 100) / imgScale.offsetWidth) + 1) / 100;
				scaleLevel.style.width = currentLevel + 'px';
				scalePin.style.left = currentLevel + 'px';
			}
			//изменение уровня филтра при изменение ползунка
			if (imgPreview.classList.contains('effects__preview--chrome')) {
				imgPreview.style.filter = `grayscale(${filterLevel})`;
			} else if (imgPreview.classList.contains('effects__preview--sepia')) {
				imgPreview.style.filter = `sepia(${filterLevel})`;
			} else if (imgPreview.classList.contains('effects__preview--marvin')) {
				imgPreview.style.filter = `invert(${filterLevel})`;
			} else if (imgPreview.classList.contains('effects__preview--phobos')) {
				imgPreview.style.filter = `blur(${filterLevel * 5}px)`;
			} else if (imgPreview.classList.contains('effects__preview--heat')) {
				imgPreview.style.filter = `brightness(${filterLevel * 3})`;
			}
		};
		function onMouseUp(upEvent) {
			scale.removeEventListener('mousemove', onMouseMove);
		}
		window.editWindow.addEventListener('mouseup', onMouseUp);
		scale.addEventListener('mousemove', onMouseMove);
	}

	uploadFIleInput.addEventListener("change", onLoadFile);
	editWindow.addEventListener("click", onEditWindowOpen);
	imgScale.addEventListener("click", onScaleMouseup);
	scalePin.addEventListener('mousedown', onMouseDown);
	window.editWindow.classList.remove('hidden');
})();