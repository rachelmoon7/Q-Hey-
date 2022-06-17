'use strict';


function addPic2() {
    //Callback function for eventListener when user wishes to upload second picture in same post
    document.querySelector("#upload-form").insertAdjacentHTML('afterbegin', '<input type="file" name="my-file-2"></input>')
}

document.querySelector('input[type=file]').addEventListener('click', () => { 
    document.querySelector("#upload").insertAdjacentHTML('afterbegin','<button id="add-pic">Add 2nd picture</button>')
    document.querySelector('#add-pic').addEventListener('click', addPic2)
});




