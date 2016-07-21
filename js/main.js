var list = [];

function getTotal(list){
	var total = 0;
	for(var key in list){
		total += list[key].value * list[key].amount;
	}
	document.querySelector("#totalValue").innerHTML = formatValue(total);
};

function setList(list){
	var table = '<table id="listTable" class="table"><thead><tr><td>Descrição</td><td>Valor</td><td>Quantidade</td><td>Ações</td></tr></thead><tbody>'
	for(var key in list){
		table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + formatAmount(list[key].value) + '</td><td>' + formatValue(list[key].amount) + '</td><td><button class="btn btn-default" onClick="setUpdate('+ key +');">Edit</button>   <button class="btn btn-default" onClick="deleteData('+ key +');">Delete</button></td></tr>'
	}
	table += '</tbody>';
	if(list != ""){
		document.querySelector("#listTable").innerHTML = table;
	}

	getTotal(list);
	resetForm();
	savelistStorage(list);

}

function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".",",");
	str = "R$ " + str;
	return str;
}
function formatAmount(amount){
	return parseInt(amount);
}

function addData(){
	if(!validation()){
		return;
	}
	var desc = document.querySelector("#desc").value;
	var amount = document.querySelector("#amount").value;
	var value = document.querySelector("#value").value;
	list.unshift({"desc": desc, "amount": amount, "value":value});

	
	setList(list);
	desc = "";
	amount = "";
	value = "";
}

function setUpdate(id){
	var obj = list[id];
	document.querySelector("#desc").value = obj.desc;
	document.querySelector("#amount").value = obj.amount;
	document.querySelector("#value").value = obj.value;
	document.querySelector("#btnUpdate").style.display = "inline-block";
	document.querySelector("#btnAdd").style.display = "none";
	document.querySelector("#inputIdUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+ id +'" />'
}



function updateData(){
	if(!validation()){
		return;
	}
	var id = document.querySelector("#idUpdate").value;
	var desc = document.querySelector("#desc").value;
	var amount = document.querySelector("#amount").value;
	var value = document.querySelector("#value").value;

	list[id] = {"desc": desc, "amount": amount, "value":value};
	resetForm();
	setList(list);
	desc = "";
	amount = "";
	value = "";
}
function deleteData(id){
	var desc = document.querySelector("#desc").value;
	if(confirm("Deseja deletar o " + desc + "?")){
	list.splice(id,1);
	}
	setList(list);
}


function resetForm(){
	document.querySelector("#desc").value = "";
	document.querySelector("#amount").value = "";
	document.querySelector("#value").value = "";
	document.querySelector("#btnUpdate").style.display = "none";
	document.querySelector("#btnAdd").style.display = "inline-block";

	document.querySelector("#inputIdUpdate").innerHTML = '';
}
function validation(){

	var desc = document.querySelector("#desc");
	var amount = document.querySelector("#amount");
	var valor = document.querySelector("#value");

	var errors = "";
	if(desc.value === ""){
		desc.placeholder = "Descrição necessária";
		desc.classList.add("invalid");
		errors += "erro Description";
	}

	
	if(amount.value === ""){
		amount.placeholder = "Quantidade necessária";
		amount.classList.add("invalid");
		errors += "erro quantidade";
	}
	else if(amount.value != parseInt(amount.value)){
		errors += "erro quantidade numero";
		amount.placeholder = "Digite um número";	
		amount.classList.add("invalid");
		amount.value = "";
	}

	if(valor.value === ""){
		errors += "erro quantidade";
		valor.placeholder = "Valor necessário";
		valor.classList.add("invalid");
	}
	else if(valor.value != parseInt(valor.value)){
		errors += "erro quantidade numero";
		valor.value = "";
		valor.placeholder = "Digite um número";
		valor.classList.add("invalid");
	}
	


	if(errors != ""){
		document.querySelector("#errors").style.display = "none"
		document.querySelector("#errors").innerHTML = "<p>" + errors + "</p>"
		console.log("error");
		return 0;
	} else {
		document.querySelector("#errors").style.display = "none"
		console.log("pass");
		return 1;

	}

}
function deleteList(){
	if(confirm("Deseja deletar a lista?")){
		list = [];
		setList(list);
	}
}

function savelistStorage(){
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list",jsonStr);
}
function initListStorage(){
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);
}

initListStorage();


