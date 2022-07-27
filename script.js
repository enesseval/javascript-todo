const addItem = document.getElementById('addItem')
const itemName = document.getElementById('itemName')
const liste = document.getElementById('liste')
const alertClose = document.getElementById('alertClose')
let items = [];


loadItems()

alertClose.addEventListener('click',function(){
    document.getElementById('alert').classList.add('d-none')
})

addItem.addEventListener('click',createItem)
liste.addEventListener('click',deleteItem)

function getItemsFromLS(){
    if(localStorage.getItem('todoapp') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('todoapp'))
    }
    return items;
}

function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(item){
        addItemList(item)
    })
}

function createItem(e){
    if(itemName.value == ''){
        document.getElementById('alert').classList.remove('d-none')
        setTimeout(function(){
            document.getElementById('alert').classList.add('d-none')
        },1500)
    }else{
        let name = itemName.value
        addItemList(name)
        addItemLocalS(name)
    }
    itemName.value = ''
    e.preventDefault();
}


function addItemList(item){
        var li = document.createElement('li')
        li.classList.add('list-group-item')
        li.setAttribute('id','listeItem')
        li.innerHTML = `${item} <span class="delete">X</span>`;
    liste.appendChild(li)
    itemName.value = ''
}

function addItemLocalS(a){
    items = getItemsFromLS();
    items.push(a)
    localStorage.setItem('todoapp',JSON.stringify(items))
}


function deleteItem(e){
    if(e.target.classList == 'delete'){
        e.target.parentElement.remove()
        deleteItemFromLS(e.target.parentElement.textContent)
    }
}

function deleteItemFromLS(x){
    let char = x.slice(0,-2)
    items = getItemsFromLS()
    items.forEach(function (item, index) {
        if (item === char) {
          items.splice(index, 1);
        }
    });
    localStorage.setItem('todoapp',JSON.stringify(items))
}