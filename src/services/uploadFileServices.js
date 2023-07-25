const path = require('path');
let uploadSingleFile = async (file) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload")
        let extName = path.extname(file.name);
        let baseName = path.basename(file.name, extName);
        let finalName = `${baseName}-${Date.now()}${extName}`
        let finalPath = `${uploadPath}/${finalName}`
        await file.mv(finalPath);
        return ({
            errorCode: 0,
            path: finalName,
            errorMessage: `Upload file success`
        })
    } catch (error) {
        console.log("🚀 >>>>> UploadSingleFile >>>>> error:", error)
        return ({
            errorCode: 1,
            path: null,
            errorMessage: JSON.stringify(error)
        })
    }

}
let uploadMultipleFile = async (listFile) => {
    if (Array.isArray(listFile)) {
        console.log("🚀 >>>>> UploadMultipleFile >>>>> listFile:", listFile)
        try {
            let resultArr = [];
            let countSuccess = 0;
            for (let i = 0; i < listFile.length; i++) {
                let uploadPath = path.resolve(__dirname, "../public/images/upload")
                let extName = path.extname(listFile[i].name);
                let baseName = path.basename(listFile[i].name, extName);
                let finalName = `${baseName}-${Date.now()}${extName}`
                let finalPath = `${uploadPath}/${finalName}`
                try {
                    await listFile[i].mv(finalPath);
                    resultArr.push({
                        status: 'success',
                        path: finalName,
                        fileName: listFile[i].name,
                        error: null
                    })
                    countSuccess++;
                } catch (error) {
                    resultArr.push({
                        status: 'fail',
                        path: finalName,
                        fileName: listFile[i].name,
                        error: error
                    })
                }
            }
            return ({
                countSuccess: countSuccess, detail: resultArr
            })
        } catch (error) {
            console.log("🚀 >>>>> UploadSingleFile >>>>> error:", error)
            return ({
                errorCode: 1,
                path: null,
                errorMessage: JSON.stringify(error)
            })
        }

    } else {
        return await uploadSingleFile(listFile);
    }
}
module.exports = {
    uploadSingleFile: uploadSingleFile,
    uploadMultipleFile: uploadMultipleFile
}