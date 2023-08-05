//phone input validation
document.getElementById('phone').addEventListener('keypress', ($event) => {
    const theEvent = $event || window.event;
    const regex = /[0-9]|\+/;

    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
})

//next step
document.getElementById('next-step').addEventListener('click', ($event) => {
    $event.preventDefault();
    if(!validateForm()) {
        return false
    } else {
        document.getElementById('page-1').style.display = 'none';
        document.getElementById('page-2').style.display = 'block';
    }
})

//inputs validation

const phone = document.getElementById('phone');
const state = document.getElementById('state');
const name = document.getElementById('name');
const country = document.getElementById('country');

const requiredFields = [phone, state, name, country];

function validateForm() {
    if(phone.value && state.value && name.value && country.value) return true;
    else {
        requiredFields.forEach((field) => {
            if(!field.value) {
                const errElement = document.createElement('span');
                errElement.classList.add('required-err');
                errElement.innerHTML = 'This field is required';

                field.classList.add('required-err');
                field.insertAdjacentElement('afterend', errElement);
            }
        })
        return false;
    }
}

requiredFields.forEach((input) => {
    input.addEventListener('keypress', ($event) => {
        input.classList.remove('required-err');
        input.nextElementSibling.remove();
    })
})

//back btn

document.getElementById('back-btn').addEventListener('click', ($event) => {
    $event.preventDefault();
    document.getElementById('page-2').style.display = 'none';
    document.getElementById('page-1').style.display = 'block';
})

//file uploader
const uploadField = document.getElementById("uploader");
const accepted = ['doc', 'docx', 'rtf', 'txt'];
let uploadedFile = {};

uploadField.onchange = function() {
    document.getElementById('size-error').style.display = 'none';
    document.getElementById('format-error').style.display = 'none';
    const file = this.files[0];
    if(fileValidate(file)) {
        document.getElementById('upload-wrapper').style.display = 'none';
        document.getElementById('file-preview').style.display = 'flex';
        document.getElementById('file-name').innerHTML = file.name;
        document.getElementById('file-size').innerHTML = Math.floor(file.size/1000) + 'kb';
        document.getElementById('upload-date').innerHTML =  new Date().toLocaleDateString('en-US');

        uploadedFile.name = file.name;
        uploadedFile.size = Math.floor(file.size/1000);
        uploadedFile.format = file.name.split('.').pop();
    };
};

function fileValidate(file) {
    const type = file.name.split('.').pop()
    if(file.size > 10485760){
        document.getElementById('size-error').style.display = 'block';
        this.value = "";
        return false;
     } else if(!accepted.includes(type)) {
        document.getElementById('format-error').style.display = 'block';
         this.value = "";
         return false;
     } else return true;
}

//remove file

document.getElementById('file-rm').addEventListener('click', ($event) => {
    $event.preventDefault();
    uploadField.value = "";
    document.getElementById('upload-wrapper').style.display = 'flex';
    document.getElementById('file-preview').style.display = 'none';
})

//submit form 

const form = document.getElementById("form");
form.addEventListener("submit", function($event){
    $event.preventDefault();
    const formBody = {
        "contactInfo" : {
            "phone": `${document.getElementById('phone').value}`,
            "city": `${document.getElementById('state').value}`,
            "country": `${document.getElementById('country').value}`,
            "name": `${document.getElementById('name').value}`
          },
          "questions" : [
            {
              "question": "Morbi placerat laoreet turpis ut pharetra?",
              "answer": `${document.getElementById('main-1').value}`
            },
            {
              "question": "Donec efficitur fermentum augue vestibulum gravida?",
              "answer": `${document.getElementById('main-1').value}`
            },
            {
              "question": "Praesent ullamcorper malesuada nunc ac blandit?",
              "answer": `${document.getElementById('main-1').value}`
            },
            {
              "question": "Proin euismod leo eu metus commodo sodales?",
              "answer": `${document.getElementById('main-1').value}`
            },
            {
                "question": "Nunc consequat blandit quam dapibus lacinia?",
                "answer": `${document.getElementById('textarea').value}`
            }
          ],
          "file": uploadedFile
    };
    sendForm(formBody);
});

//send form

async function sendForm(formBody) {
    await fetch('https://my-json-server.typicode.com/Nezdara/form-fake-server/data', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formBody)
    })
    .then((res) => {
        if(res.ok) return res.json();
        throw new Error('Something went wrong');
    })
    .then((resJSON) => alert(200, resJSON))
    .catch((err) => alert(err))
}