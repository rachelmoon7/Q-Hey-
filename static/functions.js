'use strict';

// function showOptionButton() {
//     document.querySelector("#upload").insertAdjacentHTML('afterbegin','<button id="add-pic">Add 2nd picture</button>')
//   };
function addPic2() {
    document.querySelector("#upload-form").insertAdjacentHTML('afterbegin', '<input type="file" name="my-file-2">CAPTION:<input type="text" name="caption"></input>')
}

document.querySelector('input[type=file]').addEventListener('click', () => { 
    document.querySelector("#upload").insertAdjacentHTML('afterbegin','<button id="add-pic">Add 2nd picture</button>')
    document.querySelector('#add-pic').addEventListener('click', addPic2)
});

//addevent listener to add another picture button when this button is click, add html for input 
  


