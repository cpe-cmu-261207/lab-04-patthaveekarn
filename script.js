/* Your code here */
const cout = console.log
// LocalStorage 
if (localStorage.getItem('userData') == null) {
    const dataformat = {
        incompleteArr: [], completeArr: []
    }
    localStorage.setItem('userData', JSON.stringify(dataformat))
}
let pastData = JSON.parse(localStorage.getItem("userData"))

//Press Enter
const PressEnter = (event) => {
    if ((event.which || event.keyCode) === 13) AddInput()
}

//Check Function
function emptyCheck(input){
    if (input.length == 0 || input.indexOf(' ') == 0) {
        return false
    }
    return true
}

function returnArrIndex(arr, key) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === key) return i
    }
    return -1
}


const taskbxCons = (TaskCalled) => {
    //Innit vars
    const Name = TaskCalled;
    const Text = document.createElement('p')
    const Box = document.createElement('div')
    const Action = document.createElement('div')
    const Done = document.createElement('button')
    const Delete = document.createElement('button')
    //listener function
    const DoneAction = () => {
        Text.className = "mainFont text-lg text-center p-1 line-through"
        document.getElementById("CompletedBox").append(Text)
        pastData.incompleteArr[returnArrIndex(pastData.incompleteArr, Name)] = ""
        pastData.completeArr.push(Name)
        localStorage.setItem('userData', JSON.stringify(pastData))
        Box.remove()
    }

    const DeleteAction = () => {
        pastData.incompleteArr[returnArrIndex(pastData.incompleteArr, Name)] = ""
        localStorage.setItem('userData', JSON.stringify(pastData))
        Box.remove()
    }

    const ButtonAppear = () => {
        Done.style.visibility = "visible"
        Delete.style.visibility = "visible"
    }

    const ButtonGone = () => {
        Done.style.visibility = "hidden"
        Delete.style.visibility = "hidden"
    }

    //Task
    Box.className = "max-w-sm mx-auto my-0.5 p-1 border border-indigo-500 flex flex-row justify-between"
    Text.className = "mainFont text-lg text-center p-1 pr-5"
    Action.className = "flex flex-row justify-center space-x-2"
    Delete.className = "p-0.5 border bg-pink-400"
    Delete.style.visibility = "hidden"
    Done.className = "p-0.5 border bg-blue-400"
    Done.style.visibility = "hidden"
    
    Text.innerHTML = TaskCalled
    Done.innerHTML = "Done"
    Delete.innerHTML = "Delete"
    
    Box.addEventListener('mouseenter', ButtonAppear)
    Box.addEventListener('mouseleave', ButtonGone)
    Done.addEventListener("click", DoneAction)
    Delete.addEventListener("click", DeleteAction)
    //show box
    Box.append(Text)
    Box.append(Action)
    Action.append(Done)
    Action.append(Delete)
    document.getElementById("TaskBox").prepend(Box)
}

//Add completed task to localStorage
const complTaskadding = (complTask) => {
    const taskTe = document.createElement('p')
    taskTe.innerHTML = complTask
    document.getElementById("CompletedBox").append(taskTe)
    taskTe.className = "mainFont text-lg text-center p-1 line-through"
}

//Input function
const AddInput = () => {
    const inp = document.getElementById("TaskInput").value

    if (inp == 0) 
         {
        document.getElementById("TaskInput").value = ""
        alert("Task cannot be empty")
        return false 
         }
        taskbxCons(inp)
      
        pastData.incompleteArr.push(inp)
        localStorage.setItem('userData', JSON.stringify(pastData))

        document.getElementById("TaskInput").value = ""
    }


//load data
pastData.incompleteArr.map(x => {
    if (emptyCheck(x)) {
        taskbxCons(x)
    }
})
pastData.completeArr.map(x => {
    if (emptyCheck(x)) {
        complTaskadding(x)
    }
})
