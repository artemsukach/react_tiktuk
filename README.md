## Реалізований функціонал

- стрічка новин (колекція Get Trending Feed); +
- профіль користувача. +

В Стрічці новин потрібно відображаються останні 30 постів. Пост містить в собі: 

- контент: відео та текст; +
- аватарку та імʼя юзера. Клік по аватарці чи імені повинен вести на сторінку юзера; +
- хештеги; +
- додаткова інформація: кількість коментарів та лайків. +

Сторінка юзера містить: 

- інформацію про юзера (колекція Get User Info); ±

   Інформація про юзера отримується не з колекції Get User Info а з JSON файлу.

- список постів (колекція Get User Feed); ±

   Список постів отримується колекція Get Trending Feed.
	  
- над відео показувати к-ть переглядів. +

Додаткові завдання: 

- пости мають пагінацію на клієнті; -
- пропрацювати помилки від API (помилка мережі, ...); +
- адаптив під мобільну версію; ±

   Розмітка не ламається, але є деякі неточності які впливають лиш на візуальне відображення, і не завдають незручностей в користуванні.

- анімація завантаження відео; -
- автоматичне програвання відео; -

   Теоретична реалізація даного функціоналу:

```javascript
function isVisible(elem) {

	let coords = elem.getBoundingClientRect();

	let windowHeight = document.documentElement.clientHeight;

	let topVisible = coords.top > 0 && coords.top < windowHeight;

	let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
	return topVisible || bottomVisible;
}

function showVisible() {
	for (let video of document.querySelectorAll('video')) {
		if (isVisible(video)) {
			video.play();
		} else {
			video.pause();
		}
	}
}

showVisible();
window.onscroll = showVisible();
```
- відео можна поставити на паузу; +
- покриття тестами. -
