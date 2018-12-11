	var table = document.querySelector('#table'); //table - ссылка на id div'а
	var tableArray = [['Выделение для удаления', 'Наименование покупки', 'Кол-во, штук/грамм', 'Выбор магазина', 'Отметка о выполнении' ]]
	var buttons = document.querySelector('#buttons');
	// добавление кнопки удалить
	var button2 = document.createElement("button");
	button2.innerHTML = 'Удалить';
	button2.setAttribute('onclick', 'deleteRow()');
	button2.setAttribute('id', 'butt2');
	buttons.appendChild(button2);
	// добавление кнопки добавить
	var button1 = document.createElement("button");
	button1.innerHTML = 'Добавить';
	button1.setAttribute('onclick', 'addRow()');
	button1.setAttribute('id', 'butt1');
	buttons.appendChild(button1)
	//Поля ввода
	var input1 = document.createElement("input");
	buttons.appendChild(input1);
	input1.setAttribute('text', 'text');
	input1.setAttribute('id', 'inp1');
	var input2 = document.createElement("input");
	buttons.appendChild(input2);
	input2.setAttribute('text', 'text');
	input2.setAttribute('id', 'inp2');
	//Выбор магазина
	var sel1 = document.createElement("select");
	buttons.appendChild(sel1);
	sel1.setAttribute('id', 's1');
	var opt1 = document.createElement("option");
	sel1.appendChild(opt1);
	opt1.setAttribute('value', 'shop1');
	opt1.innerHTML = 'Соседи';
	var opt2 = document.createElement("option");
	sel1.appendChild(opt2);
	opt2.setAttribute('value', 'shop2');
	opt2.innerHTML = 'Брусничка';
	var opt3 = document.createElement("option");
	sel1.appendChild(opt3);
	opt3.setAttribute('value', 'shop3');
	opt3.innerHTML = 'Алми';
	//добавление кнопки выделить
	var button3 = document.createElement("button");
	button3.innerHTML = 'Выделить';
	button3.setAttribute('onclick', 'checkkk()');
	button3.setAttribute('id', 'butt3');
	buttons.appendChild(button3)

	fillTable(table, tableArray);

	//Функции
	function fillTable(table, tableArray) {
		var div = document.createElement("div");
		table.appendChild(div);
		div.setAttribute('id', 'divman');
		for (var i = 0; i < tableArray.length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < tableArray[i].length; j++) {
				var td = document.createElement('td');
				if ((tableArray[i][j]==false)&&j==0) {
					td.innerHTML = '<input type="checkbox" id="capture'+i+'">';
					tr.appendChild(td);
				} else if ((tableArray[i][j]==false)&&j==4) {
					td.innerHTML = '<input type="checkbox" id="checkd'+i+'">';
					tr.appendChild(td);
				} else if ((tableArray[i][j]==true)&&j==0) {
					td.innerHTML = '<input type="checkbox" id="capture'+i+'" ckecked>';
					tr.appendChild(td);
				} else if ((tableArray[i][j]==true)&&j==4) {
					td.innerHTML = '<input type="checkbox" id="checkd'+i+'" checked>';
					tr.appendChild(td);
					tr.className+="tr_clas";
				} else {
				td.innerHTML = tableArray[i][j];
				tr.appendChild(td);
				}
			}
			div.appendChild(tr);
		}
		buttons.className+="buttons";
		table.className+="text-center";
		buttons.className+="text-center";
	}
	function addRow() {
		if (document.getElementById('inp1').value=='') {
			alert('Введите наименование покупки');
			return 0;
		}
		var shop = document.getElementById('s1').options.selectedIndex;
		var r = tableArray.length;
		var c = 5;
		var rows = r+1;
		for( var i=r; i<rows; i++ ) {
 			tableArray.push( [] );
		}
		for (var i = 0; i < rows; i++) {
    		for (var j =  tableArray[i].length; j < c; j++) {
     		   if (j==0) {
     		   	tableArray[i].push(false);
     		   } else if (j==1) {
     		   	tableArray[i].push(document.getElementById('inp1').value);
     		   } else if (j==2) {
     		   	tableArray[i].push(document.getElementById('inp2').value);
     		   } else if (j==3){
     		   	tableArray[i].push(document.getElementById('s1').options[shop].text);
     		   } else {
				tableArray[i].push(false);
     		   }
  			}
		}
		var shop = document.getElementById('s1').options.selectedIndex;
		var div = document.querySelector('#divman');
		table.removeChild(div);
		fillTable(table, tableArray);
		document.getElementById('inp1').value='';
		document.getElementById('inp2').value='';
	}
	function deleteRow() {
		localStorage.clear()
		for (var i = 0; i < tableArray.length; i++) {
			for (var j = 0; j < tableArray[i].length; j++) {
				if (j==0&&i>0) {
					var chbox;
					chbox = document.getElementById('capture'+i);
					if (chbox.checked==true) {
						if (i==tableArray.length) {
							cutcut(tableArray, i-1, 1);
							break;
						} else  if (i+1==tableArray.length) {
							cutcut(tableArray, i, 1);
							break;
						} else {
							cutcut(tableArray, i, 1);
							continue;
						}
					}
				} 
			}
		}
		var div = document.querySelector('#divman');
		table.removeChild(div);
		fillTable(table, tableArray);
	}
	function checkkk() {
		for (var i = 0; i < tableArray.length; i++) {
			for (var j = 0; j < tableArray[i].length; j++) {
				if (j==4&&i>0) {
					var chbox;
					chbox = document.getElementById('checkd'+i);
					if (chbox.checked==true) {
						tableArray[i][j]=true;
					}
				} 
			}
		}
		var div = document.querySelector('#divman');
		table.removeChild(div);
		fillTable(table, tableArray);
	}
	function cutcut(array, k, n) {
		array.splice(k, n);
	}