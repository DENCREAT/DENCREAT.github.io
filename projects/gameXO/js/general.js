'use strict';

(function ($) {
	$(document).ready(function () {

		// тест функций и примеров

		(function test() {

			var $body = $('body');
			var last = 1;
			var cells = [];

			var size = {
				x: 3,
				y: 3
			};

			initArray(cells, size);
			refreshDom(cells, size);

			$body.on('click', '.list__item', function () {
				var item = $(this);
				var jsonData = item.attr('data-index');
				var index = JSON.parse(jsonData);
				var arrCell = cells[index.x][index.y];
				if (arrCell === null) {
					last = last === 2 ? 1 : 2;
					item.text(last);
					cells[index.x][index.y] = last;
					refreshDom(cells, size);
					checkCells(cells, size);
				}
			});

			$body.on('click', '.restart', function () {
				initArray(cells, size);
				refreshDom(cells, size);
			});

			function initArray(arr, size) {
				if (arr.length !== 0) {
					for (var i = 0; i < arr.length; i++) {
						for (var j = 0; j < arr[i].length; j++) {
							arr[i][j] = null;
						}
					}
				} else {
					for (var _i = 0; _i < size.x; _i++) {
						arr[_i] = new Array(size.y).fill(null);
					}
				}
			}

			function refreshDom(arr, size) {
				var $list = $('.list');
				$list.empty();
				for (var i = 0; i < size.x; i++) {
					var $row = $('<div>', { class: 'row' });
					for (var j = 0; j < size.y; j++) {
						var val = void 0;
						var $item = $('<div>', { class: 'list__item' });
						switch (arr[i][j]) {
							case 1:
								val = '<span class="symbol_mul"></span>';break;
							case 2:
								val = '<span class="symbol symbol_circle"></span>';break;
							default:
								val = '';
						};

						$item.html(val).attr('data-index', '{"x": "' + i + '", "y": "' + j + '"}');
						$row.append($item);
					}
					$list.append($row);
				}
			}

			function checkCells(arr, size) {
				var counter = 0;
				var t = 1;
				for (var i = 1; i < size.x - 1; i++) {
					for (var j = 1; j < size.y - 1; j++) {
						for (var n = i - 1; n <= i + 1; n++) {
							horizontal(n, j);
						}
						diag(i, j);
					}
					for (var _n = t - 1; _n <= t + 1; _n++) {
						vertical(i, _n);
					}
					t++;
				}

				function horizontal(index, j) {
					if (arr[index][j - 1] === arr[index][j] && arr[index][j] === arr[index][j + 1] && arr[index][j] !== null) {
						var winner = who(arr[index][j]);
						win(winner);
					}
				}

				function vertical(i, index) {
					if (arr[i - 1][index] === arr[i][index] && arr[i][index] === arr[i + 1][index] && arr[i][index] !== null) {
						var winner = who(arr[i][index]);
						win(winner);
					}
				}
				function diag(i, j) {
					if (arr[i - 1][j - 1] === arr[i][j] && arr[i][j] === arr[i + 1][j + 1] && arr[i][j] !== null || arr[i - 1][j + 1] === arr[i][j] && arr[i][j] === arr[i + 1][j - 1] && arr[i][j] !== null) {
						var winner = who(arr[i][j]);
						win(winner);
					}
				}
			}

			function who(value) {
				switch (value) {
					case 1:
						return 'X';break;
					case 2:
						return '0';break;
					default:
						return '';
				};
			}

			function win(winner) {
				alert('Winner is ' + winner);
				$('.restart').trigger('click');
			}
		})();
		// Сумма через замыкание
		(function zamSumma() {

			function sum(a) {
				return function (b) {
					return a + b;
				};
			}

			console.log(sum(3)(2));
		});
		// })();
		// Функция - строковый буфер

		(function zamStrBuffer() {

			function makeBuffer() {
				var str = '';

				function buffer(arg) {
					if (!arg) {
						return str;
					};
					str += arg;
				}

				buffer.clear = function () {
					str = '';
				};

				return buffer;
			}

			var buffer = makeBuffer();

			buffer('0');
			buffer('1');
			buffer('0');

			console.log(buffer());
			buffer.clear();

			console.log(buffer());
		});
		// })();
		// Сортировка через замыкание

		(function zamSort() {

			var users = [{
				name: "Вася",
				surname: 'Иванов',
				age: 20
			}, {
				name: "Петя",
				surname: 'Чапаев',
				age: 25
			}, {
				name: "Маша",
				surname: 'Медведева',
				age: 18
			}];

			users.sort(byField('name'));
			users.forEach(function (user) {
				console.log(user.name);
			});

			users.sort(byField('age'));
			users.forEach(function (user) {
				console.log(user.name);
			});

			//functions
			function byField(field) {
				return function (a, b) {
					return a[field] > b[field] ? 1 : -1;
				};
			}
		});
		// })();
		//Фильтр

		(function zamFilter() {

			var arr = [1, 2, 3, 4, 5, 6, 7];

			console.log(filter(arr, function (a) {
				return a % 2 == 0;
			}));
			console.log(filter(arr, inBetween(3, 6)));
			console.log(filter(arr, inArray([1, 2, 10])));

			//functions
			function filter(arr, func) {
				var result = [];
				arr.forEach(function (item) {
					if (func(item)) {
						result.push(item);
					}
				});
				return result;
			}

			function inBetween(a, b) {
				return function (x) {
					return x >= a && x <= b;
				};
			}

			function inArray(arr) {
				return function (x) {
					return ~arr.indexOf(x);
				};
			}
		});
		// })();
		// Армия функций

		(function zamArmy() {

			var army = makeArmy();

			army[0]();
			army[5]();

			// Functions

			function makeArmy() {

				var shooters = [];

				for (var i = 0; i < 10; i++) {
					var shooter = function (a) {
						// функция-стрелок
						return function () {
							return console.log(a);
						};
					}(i);
					shooters.push(shooter);
				}

				return shooters;
			}
		});
		// })();
		// Сравнение скорости цикла и рекурсии
		// цикл бысрее в 2 раза (в Chrome), в IE до 17 раз.

		(function memorySpeedTest() {

			function sumTo(n) {
				// обычный цикл 1+2+...+n
				var result = 0;
				for (var i = 1; i <= n; i++) {
					result += i;
				}
				return result;
			}

			function sumToRec(n) {
				// рекурсия sumToRec(n) = n+SumToRec(n-1)
				return n == 1 ? 1 : n + sumToRec(n - 1);
			}

			var timeLoop = performance.now();
			for (var i = 1; i < 1000; i++) {
				sumTo(1000);
			} // цикл
			timeLoop = performance.now() - timeLoop;

			var timeRecursion = performance.now();
			for (var i = 1; i < 1000; i++) {
				sumToRec(1000);
			} // рекурсия
			timeRecursion = performance.now() - timeRecursion;

			console.log("Разница в " + timeRecursion / timeLoop + " раз");
		});
		// })();
		// Калькулятор

		(function objCalculator() {

			var calculator = {
				read: function read() {
					this.a = +prompt('Первое число: ', 0);
					this.b = +prompt('Второе число: ', 0);
				},
				sum: function sum() {
					return this.a + this.b;
				},
				mul: function mul() {
					return this.a * this.b;
				}
			};

			calculator.read();
			console.log(calculator.sum());
			console.log(calculator.mul());
		});
		// })();
		// Цепочка вызовов

		(function objCallChain() {

			var ladder = {
				step: 0,
				up: function up() {
					this.step++;
					return this;
				},
				down: function down() {
					this.step--;
					return this;
				},
				showStep: function showStep() {
					console.log(this.step);
					return this;
				}
			};

			ladder.up().up().down().showStep();
		});
		// })();
		// Сумма произвольного количества скобок

		(function castSum() {

			console.log(sum(1)(2));
			console.log(sum(5)(-1)(2));
			console.log(sum(6)(-1)(-2)(-3));
			console.log(sum(0)(1)(2)(3)(4)(5));

			// functions
			function sum(a) {

				function result(b) {
					a += b;
					return result;
				}

				result.toString = function () {
					return a;
				};

				return result;
			}
		});
		// })();
		(function newCalcConstructor() {

			var calculator = new Calculator();
			calculator.read();

			console.log('Сумма = ' + calculator.sum());
			console.log('Произведение = ' + calculator.mul());

			function Calculator() {
				var _this = this;

				this.read = function () {
					_this.a = +prompt('a: ', 0);
					_this.b = +prompt('b: ', 0);
				};

				this.sum = function (a, b) {
					return _this.a + _this.b;
				};
				this.mul = function (a, b) {
					return _this.a * _this.b;
				};
			}
		});
		// })();
		// Создать Accumulator при помощи конструктора
		(function newAccConstructor() {

			var accumulator = new Accumulator(1);
			accumulator.read();
			accumulator.read();
			console.log(accumulator.value);

			// functions
			function Accumulator(startingValue) {
				var _this2 = this;

				this.value = startingValue;
				this.read = function () {
					_this2.value += +prompt('Value: ', 0);
				};
			}
		});
		// })();
		/* Создайте калькулятор
  *  Напишите конструктор Calculator, который создаёт 
  *	 расширяемые объекты-калькуляторы.
  */

		(function newCalcConstructorExtend() {

			var calc = new Calculator();

			console.log('a+b: ' + calc.calculate('2 + 3'));

			var powerCalc = new Calculator();
			powerCalc.addMethod('*', function (a, b) {
				return a * b;
			});
			powerCalc.addMethod('/', function (a, b) {
				return a / b;
			});
			powerCalc.addMethod('**', function (a, b) {
				return Math.pow(a, b);
			});

			console.log('a*b: ' + powerCalc.calculate('2 * 3'));
			console.log('a/b: ' + powerCalc.calculate('2 / 3'));
			console.log('a**b: ' + powerCalc.calculate('2 ** 3'));

			function Calculator() {
				var _this3 = this;

				this['+'] = function (a, b) {
					return a + b;
				};
				this['-'] = function (a, b) {
					return a - b;
				};

				this.calculate = function (str) {
					var args = str.split(' ');
					var a = +args[0];
					var op = args[1];
					var b = +args[2];
					if (!_this3[op] || isNaN(a) || isNaN(b)) {
						return NaN;
					}
					return _this3[op](a, b);
				};

				this.addMethod = function (type, func) {
					_this3[type] = func;
				};
			}
		});
		// })();
		// Добавить get/set-свойства

		(function setGet() {

			var vasya = new User("Василий Попкин");

			console.log(vasya.firstName); // Василий
			console.log(vasya.lastName); // Попкин

			vasya.lastName = 'Сидоров';

			console.log(vasya.fullName);

			// functions
			function User(fullName) {
				var _this4 = this;

				this.fullName = fullName;

				Object.defineProperties(this, {
					firstName: {
						get: function get() {
							return _this4.fullName.split(' ')[0];
						},
						set: function set(newFirstName) {
							_this4.fullName = newFirstName + ' ' + _this4.lastName;
						}
					},
					lastName: {
						get: function get() {
							return _this4.fullName.split(' ')[1];
						},
						set: function set(newLastName) {
							_this4.fullName = _this4.firstName + ' ' + newLastName;
						}
					}
				});
			}
		});
		// })();
		(function counterObj() {

			function Article() {
				this.created = new Date();
				Article.count++;
				Article.lastObjDate = this.created;
			}

			Article.count = 0;

			Article.showStats = function () {
				console.log(this.count + ' ' + this.lastObjDate);
			};

			new Article();
			new Article();

			Article.showStats();

			new Article();

			Article.showStats();
		});
		// })();
		(function callApplySumArgs() {

			function sumArgs() {
				return [].reduce.call(arguments, function (a, b) {
					return a + b;
				});
			}

			console.log(sumArgs(1, 2, 3)); // 6
		});
		// })();
		/* Примените функцию к аргументам
   * Напишите функцию applyAll(func, arg1, arg2...), 
  *  которая получает функцию func и произвольное количество аргументов.
  *  Она должна вызвать func(arg1, arg2...), то есть передать в func 
  *  все аргументы, начиная со второго, и возвратить результат.
  */

		(function callApplyFuncArgs() {

			function sum() {
				// суммирует аргументы
				return [].reduce.call(arguments, function (a, b) {
					return a + b;
				});
			}

			function mul() {
				// перемножает аргументы
				return [].reduce.call(arguments, function (a, b) {
					return a * b;
				});
			}

			function applyAll(func) {
				return func.apply(null, [].slice.call(arguments, 1));
			}

			console.log(applyAll(sum, 1, 2, 3));
			console.log(applyAll(mul, 2, 3, 4));
			console.log(applyAll(Math.max, 2, 7, 4));
		});
		// })();
		// Кросс-браузерная эмуляция bind

		(function bindCarrCrossBrowser() {

			function bind(func, context /*, args*/) {
				var bindArgs = [].slice.call(arguments, 2); // (1)
				function wrapper() {
					// (2)
					var args = [].slice.call(arguments);
					var unshiftArgs = bindArgs.concat(args); // (3)
					return func.apply(context, unshiftArgs); // (4)
				}
				return wrapper;
			}

			bind(Math.max, null, 2);
		})();
		(function fibonachi() {

			//

		})();
	});
})(jQuery);