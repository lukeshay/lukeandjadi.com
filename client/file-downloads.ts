const downloadFile = (content: string, type: string, name: string, ext: string): void => {
    const file = new Blob([content], {type});
    const downloadLink = document.createElement('a');

    const date = new Date();

    downloadLink.download = `${name} - ${date.getMonth()}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}.${ext}`;
    downloadLink.href = window.URL.createObjectURL(file);
    downloadLink.style.display = 'none';
    document.body.append(downloadLink);

    downloadLink.click();
};

export {downloadFile};
