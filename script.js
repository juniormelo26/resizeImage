const uploadBox = document.querySelector(".upload-box")
const previewImage = document.querySelector("img")
const fileInput = uploadBox.querySelector("input")
const widthInput = document.querySelector(".width input")
const heightInput = document.querySelector(".height input")
const ratioInput = document.querySelector(".ratio input")
const qualityInput = document.querySelector(".quality input")
const downloadBtn = document.querySelector(".download-btn")

let ogImageRatio
let file

const loadFile = (e) => {
    file = e.target.files[0]
    if(!file) return

    previewImage.src = URL.createObjectURL(file)
    previewImage.addEventListener("load", () => {
        widthInput.value = previewImage.naturalWidth;
        heightInput.value = previewImage.naturalHeight;
        ogImageRatio = previewImage.naturalWidth / previewImage.naturalHeight
        document.querySelector(".wrapper").classList.add("active")
    })
    console.log(file.name);
}

widthInput.addEventListener("keyup", () => {
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value
    heightInput.value = Math.floor(height)
})
heightInput.addEventListener("keyup", () => {
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value
    widthInput.value = Math.floor(width)
})

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas")
    const a = document.createElement("a")
    const ctx = canvas.getContext("2d")
    const imageQuality = qualityInput.checked ? 0.7 : 1.0

    canvas.width = widthInput.value
    canvas.height = heightInput.value

    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height )
    a.href = canvas.toDataURL("image/jpeg", imageQuality)
    //a.download = new Date().getTime()
    a.download = file.name + " - " + canvas.width + " x " + canvas.height
    a.click()
    //document.body.appendChild(canvas)
}

downloadBtn.addEventListener("click", resizeAndDownload)
fileInput.addEventListener("change", loadFile)
uploadBox.addEventListener("click", () => fileInput.click())