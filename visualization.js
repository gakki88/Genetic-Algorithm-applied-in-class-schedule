const containers = document.getElementsByClassName("container");
function makeRows(rows, cols) {
    for(i = 0; i< containers.length; i++){
        
        containers[i].style.setProperty('--grid-rows', rows);
        containers[i].style.setProperty('--grid-cols', cols);
        cellNumber = 1;
        for (c = 0; c < (rows * cols); c++) {
            let cell = document.createElement("div");
            switch(c){
               case 0: cell.innerText = "Monday"; break;
                case 8:cell.innerText = "Tuesday"; break;
                case 16:cell.innerText = "Wednesday"; break;
                case 24:cell.innerText = "Thursday"; break;
                case 32:cell.innerText = "Friday"; break;
                default: cell.innerText = (cellNumber);cellNumber++;
            }
           
            containers[i].appendChild(cell).className = "grid-item";
        };
    }
        


};

makeRows(5, 8);
