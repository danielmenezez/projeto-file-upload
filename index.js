const homeSection = document.getElementById('homeSection');
const filesSection = document.getElementById('filesSection');
const homeLink = document.getElementById('homeLink');
const filesLink = document.getElementById('filesLink');
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const pdfFilesContainer = document.getElementById('pdfFiles');
const imageFilesContainer = document.getElementById('imageFiles');
const modalBackdrop = document.getElementById('modalBackdrop');
const filePreview = document.getElementById('filePreview');
const closeModalBtn = document.getElementById('closeModalBtn');

let uploadedFiles = [];

homeLink.addEventListener('click', () => {
    homeSection.classList.remove('hidden');
    filesSection.classList.add('hidden');
});

filesLink.addEventListener('click', () => {
    homeSection.classList.add('hidden');
    filesSection.classList.remove('hidden');
    displayFiles();
});

uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const files = fileInput.files;
    uploadedFiles.push(...files);
    uploadForm.reset();
});

function displayFiles() {
    pdfFilesContainer.innerHTML = '';
    imageFilesContainer.innerHTML = '';

    for (let file of uploadedFiles) {
        const fileItem = document.createElement('div');
        fileItem.textContent = file.name;
        fileItem.addEventListener('click', () => openFileModal(file));

        if (file.type.includes('pdf')) {
            pdfFilesContainer.appendChild(fileItem);
        } else if (file.type.includes('image')) {
            imageFilesContainer.appendChild(fileItem);
        }
    }
}

function openFileModal(file) {
    modalBackdrop.style.display = 'flex';
    filePreview.innerHTML = '';

    if (file.type.includes('image')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.classList.add('file-preview');
        img.style.maxWidth = '100%'; 
        img.style.height = 'auto'; 
        filePreview.appendChild(img);
    } else if (file.type.includes('pdf')) {
        const iframe = document.createElement('iframe');
        iframe.src = URL.createObjectURL(file);
        iframe.classList.add('file-preview');
        iframe.style.width = '100%'; 
        iframe.style.height = '600px'; 
        filePreview.appendChild(iframe);
    } else {
        filePreview.textContent = 'Não é possível visualizar este tipo de arquivo. Faça o download para visualizar.';
    }
}

closeModalBtn.addEventListener('click', () => {
    modalBackdrop.style.display = 'none';
});
