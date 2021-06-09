const incomeTitle = document.getElementById('input-text');
const incomeAmount = document.getElementById('input-amount');
const expenseTitle = document.getElementById('expense-text');
const expenseAmount = document.getElementById('expense-amount');
const addIncomeButton = document.querySelector('.add-income img');
const addExpenseButton = document.querySelector('.add-expense img');
const dashToggle = document.querySelector('.dash-toggle');
const expenseBtn = dashToggle.firstElementChild;
const incomeBtn = dashToggle.children[1];
const allBtn = dashToggle.lastElementChild;
// const listTab = document.querySelector('.income')
const editButton = document.querySelector('.income .edit > img')
const deleteButton = document.querySelector('.income .delete > img')
const balanceEl = document.querySelector('.balance > .value')
const incomeTotalEl = document.querySelector('.incomes > .income-value')
const outcomeTotalEl = document.querySelector('.expenses > .expenses-value')
const allList = document.querySelector("#all .list");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const expenseList = document.querySelector("#expense .list");
const dashBoard = document.querySelector('.budget-dashboard');
const dashIncome = dashBoard.children[3]
const dashExpense = dashBoard.children[2]

// console.log(expenseList)

console.log(dashBoard.children[2])
console.log(dashBoard.children[3])
 
let ENTRY_LIST = []; 


addIncomeButton.addEventListener('click', function(){
    if(incomeTitle.value === ""){
        alert('Sorry! Your input title is empty 😡');
        return;
    } 
    if(incomeAmount.value === ""){
        alert('Sorry! Your input Amount is empty 😱');
        return;
    }
    if(!parseInt(incomeAmount.value)){
        alert('Sorry! Your input value should be in numbers 🥺');
        return;
    }

    let income = {
        type: 'income',
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value)
    }
    ENTRY_LIST.push(income)
    updateUI()
    clearInput([incomeTitle, incomeAmount])
    // console.log(ENTRY_LIST)
})

addExpenseButton.addEventListener("click", function(){
    if(expenseTitle.value === ""){
        alert('Sorry! Your input title is empty 😡');
        return;
    } 
    if(expenseAmount.value === ""){
        alert('Sorry! Your input Amount is empty 😱');
        return;
    }
    if(!parseInt(expenseAmount.value)){
        alert('Sorry! Your input value should be in numbers 🥺');
        return;
    }
    
    let expense = {
        type: 'expense',
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }
    ENTRY_LIST.push(expense)
    updateUI()
    clearInput([expenseTitle, expenseAmount])
    // console.log(ENTRY_LIST)
})

document.addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        if(dashIncome === incomeEl){
            if(incomeTitle.value === ""){
                alert('Sorry! Your input title is empty 😡');
                return;
            } 
            if(incomeAmount.value === ""){
                alert('Sorry! Your input Amount is empty 😱');
                return;
            }
            if(!parseInt(incomeAmount.value)){
                alert('Sorry! Your input value should be in numbers 🥺');
                return;
            }
        
            let income = {
                type: 'income',
                title: incomeTitle.value,
                amount: parseFloat(incomeAmount.value)
            }
            ENTRY_LIST.push(income)
            updateUI()
            clearInput([incomeTitle, incomeAmount])
        } 
        
    }
})


incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

function deleteOrEdit(event){
    
    const targetBtn = event.target;
    console.log(targetBtn)
    
    const entry = targetBtn.parentNode;
    console.log(entry)
    
    if(targetBtn.id == "delete"){
        // console.log(entry)
        deleteEntry(entry);
    }else if(targetBtn.id == "edit"){
        // console.log('yes sir')
        editEntry(entry);

    }
}

function deleteEntry(entry){
    ENTRY_LIST.splice( entry.id, 1);
    updateUI();
}

function editEntry(entry){
    // console.log(entry)
    let ENTRY = ENTRY_LIST[entry.id];

    if(ENTRY.type == "income"){
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title;
    }else if(ENTRY.type == "expense"){
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title;
    }

    deleteEntry(entry);
}

function updateUI(){
    
    income = calculateTotal('income', ENTRY_LIST)
    outcome = calculateTotal('expense', ENTRY_LIST)
    balance = Math.abs(calculateBalance(income, outcome))
    
    let sign = (income >= outcome) ? "$" : "-$";
    balanceEl.innerHTML = `<span>${sign}<small>${balance}</small></span>`
    incomeTotalEl.innerHTML = `<span>$<small>${income}</small></span>`
    outcomeTotalEl.innerHTML = `<span>$<small>${outcome}</small></span>`

    clearElement([expenseList, incomeList, allList]);

    ENTRY_LIST.forEach( (entry, index) => {
        if( entry.type == "expense" ){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        }else if( entry.type == "income" ){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });

    updateChart(income, outcome);
}


function showEntry(list, type, title, amount, id){

    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;
    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry)
}

// CALCULATING THE INCOME & OUTCOME STATEMENT
function calculateTotal(type, inputsArray){
    let sum = 0;
    inputsArray.forEach(input=> {
        if(input.type === type){
            sum += input.amount;
        }
    })
    return sum;
}

function calculateBalance(income, expense){
    return income - expense;
}

function clearInput(inputsArray){
    inputsArray.forEach(input => {
        input.value = ""
    })
}

function clearElement(elements){
    elements.forEach(element => {
        element.innerHTML = " ";
    })
}

// TOGGLING THE BUTTON 
function active(element){
    element.classList.add('active')
}

function inactive(elementsArray){
    elementsArray.forEach(element =>{
        element.classList.remove('active')
    })
}

function show(element){
    element.classList.remove('hide')
}

function hide(elementsArray){
    elementsArray.forEach(element =>{
        element.classList.add('hide')
    })
}

expenseBtn.addEventListener("click", ()=>{
    active(expenseBtn)
    inactive([incomeBtn, allBtn])
    show(expenseEl)
    hide([incomeEl, allEl])
})

incomeBtn.addEventListener("click", ()=>{
    active(incomeBtn)
    inactive([expenseBtn, allBtn])
    show(incomeEl)
    hide([expenseEl, allEl])
})

allBtn.addEventListener("click", ()=>{
    active(allBtn)
    inactive([expenseBtn, incomeBtn])
    show(allEl)
    hide([expenseEl, incomeEl])
})