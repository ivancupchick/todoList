var table = document.querySelector('#table'); 
var tableArray = [['Выделение для удаления', 'Наименование покупки', 'Кол-во, штук/грамм', 'Выбор магазина', 'Отметка о выполнении' ]];
	// table
fillTable(table, tableArray);
	// functions
function fillTable(table, tableArray) { 
	var div = document.createElement("table");
	table.appendChild(div);
	div.className += "table";
	div.setAttribute('id', 'divman');
	if (localStorage.getItem('done')!=undefined) {
		tableArray = JSON.parse(localStorage.getItem('mainArray'));
	}
	for (var i = 0; i < tableArray.length; i++) {
		var tr = document.createElement('tr');
		var inpcap1 = document.createElement("input")
		//var inpcap2 = document.createElement("input")
		inpcap1.setAttribute('type', 'checkbox');
		//inpcap2.setAttribute('type', 'checkbox');
		for (var j = 0; j < tableArray[i].length; j++) {
			var td = document.createElement('td');
			if ((tableArray[i][j]==false)&&j==0) {
				td.appendChild(inpcap1);
				inpcap1.setAttribute('id', 'capture'+i);
				//td.innerHTML = '<input type="checkbox" id="capture'+i+'">';
				tr.appendChild(td);
			} else if ((tableArray[i][j]==false)&&j==4) {
				//td.appendChild(inpcap2);
				//inpcap2.setAttribute('id', 'checkd'+i);
				td.innerHTML = '<input type="checkbox" id="checkd'+i+'">';
				tr.appendChild(td);
			} else if ((tableArray[i][j]==true)&&j==0) {
				td.appendChild(inpcap1);
				inpcap1.setAttribute('id', 'capture'+i);
				//td.innerHTML = '<input type="checkbox" id="capture'+i+'" ckecked>';
				tr.appendChild(td);
			} else if ((tableArray[i][j]==true)&&j==4) {
				//td.appendChild(inpcap2);
				//inpcap2.setAttribute('id', 'checkd'+i);
				//inpcap2.setAttribute('ckecked', 'false');
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
}
function addRow() {
	if (document.getElementById('inp1').value=='') {
		alert('Введите наименование покупки');
		return 0;
	}
	if (isNaN(document.getElementById('inp2').value)) {
		alert('Строка с "Кол-во" должна быть числом');
		return 0;
	} else if (document.getElementById('inp2').value == "") {
		alert('Введите кол-во покупки');
		return 0;
	}
	if (localStorage.getItem('done')!=undefined) {
		tableArray = JSON.parse(localStorage.getItem('mainArray'));
	}
	var shop = document.getElementById('s1').options.selectedIndex;
	var r = tableArray.length;
	var c = 5;
	var rows = r+1;
	var cols = 5;
	if (localStorage.getItem('done')!=undefined) {
		tableArray = JSON.parse(localStorage.getItem('mainArray'));
	}
	for( var i=r; i<rows; i++ ) {
		tableArray.push( [] );
	}
	for (var i = 0; i < rows; i++) {
		for (var j =  tableArray[i].length; j < cols; j++) {
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
	let strCheck = 'done';
	localStorage.setItem('done', strCheck);
	localStorage.setItem('mainArray', JSON.stringify(tableArray));
	fillTable(table, tableArray);
	document.getElementById('inp1').value='';
	document.getElementById('inp2').value='';
}
function deleteRow() {
	if (localStorage.getItem('done')!=undefined) {
		tableArray = JSON.parse(localStorage.getItem('mainArray'));
	}
	var arrayCapture = [];
	for (var i = 0; i < tableArray.length; i++) {
		for (var j = 0; j < tableArray[i].length; j++) {
			if (j==0&&i>0) {
				var chbox;
				chbox = document.getElementById('capture'+i);
				if (chbox.checked==true) {
				arrayCapture.push(i);
				}
			} 
		}
	}
	spliceRows(tableArray, arrayCapture);
	localStorage.clear();
	let strCheck = 'done';
	localStorage.setItem('done', strCheck);
	localStorage.setItem('mainArray', JSON.stringify(tableArray));
	var div = document.querySelector('#divman');
	table.removeChild(div);
	fillTable(table, tableArray);
}
function checkkk() {
	if (localStorage.getItem('done')!=undefined) {
		tableArray = JSON.parse(localStorage.getItem('mainArray'));
	}
	for (var i = 0; i < tableArray.length; i++) {
		for (var j = 0; j < tableArray[i].length; j++) {
			if (j==4&&i>0) {
				var chbox;
				chbox = document.getElementById('checkd'+i);
				if (chbox.checked==true) {
					tableArray[i][j]=true;
				} else {
					tableArray[i][j]=false;
				}
			} 
		}
	}
	var div = document.querySelector('#divman');
	table.removeChild(div);
	let strCheck = 'done';
	localStorage.setItem('done', strCheck);
	localStorage.setItem('mainArray', JSON.stringify(tableArray));
	fillTable(table, tableArray);
}
function spliceRows(mainArray, arrayWithCapture) {
	for (var i = arrayWithCapture.length-1; i > -1; i--) {
		mainArray.splice(arrayWithCapture[i], 1);
	}
}
