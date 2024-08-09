const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview")
    uploadImageInput.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    if(file){
        uploadImagePreview.src = URL.createObjectURL(file)
    } 
    })
}
const uploadAudio = document.querySelector("[upload-audio]")
if(uploadAudio){
    const uploadAudioInput = document.querySelector("[upload-audio-input]")
    const uploadAudioPlay= document.querySelector("[upload-audio-play")
    uploadAudioInput.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    if(e.target.files.length){
        const audio = URL.createObjectURL(e.target.files[0])
        const source = uploadAudio.querySelector("source")
        source.src = audio;
        uploadAudioPlay.load( )
    } 
    })
}
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length >0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button => {
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Bạn có chắc muốn xoá ?")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDeleteItem.action = action;
                formDeleteItem.submit();   
            }
        })
    })
}
// change status 
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",() =>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = statusCurrent == "active"? "inactive" : "active" ;
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// end change