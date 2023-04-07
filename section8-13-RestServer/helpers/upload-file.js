const {v4: uuidv4} = require("uuid");
const path = require("path");

const uploadFile = (files, allowExtensions = ['png','jpg','jpeg','gif'], folder='') => {
    return new Promise ((resolve, reject)=>{
        const { file } = files;
        const fileExtension = file.name.split('.').slice(-1)[0];

        if(!allowExtensions.includes(fileExtension)) return reject(`File with extension ${fileExtension} is not allowed.`);
        const tempName = uuidv4() + '.'+ fileExtension;

        const uploadPath = path.join(__dirname,'../uploads/', folder, tempName);

        file.mv(uploadPath, function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            resolve(tempName);
        });
    })

}

module.exports= {
    uploadFile
}
