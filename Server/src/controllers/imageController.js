const Image = require('../models/imageModel');
const fs = require('fs');

const imageController = {
    createSingle: async file => {
        try {
            const image = new Image({
                path: file.path.replace(/\\/g, '/').slice(6),
                name: file.filename,
            });

            await image.save();
            return image;
        } catch (error) {
            deleteLocalImage(file.filename);
            throw error;
        }
    },

    /*
     * @param {Array} files
     * @returns {Promise}
     * Create images
     * Return array of images
     * If error, delete all images
     * and throw error
     * */
    createImage: async files => {
        try {
            let images = [];
            for (let i = 0; i < files.length; i++) {
                const image = new Image({
                    path: files[i].path.replace(/\\/g, '/').slice(6),
                    name: files[i].filename,
                });

                await image.save();
                images.push(image);
            }
            return images;
        } catch (error) {
            for (let i = 0; i < files.length; i++) {
                deleteLocalImage(files[i].filename);
            }
            throw error;
        }
    },

    /*
     * @param {Array} ids
     * @returns {Promise}
     * Delete images by ids
     */
    deleteImages: async ids => {
        for (let i = 0; i < ids.length; i++) {
            const image = await Image.findByIdAndDelete(ids[i]);
            if (image) {
                deleteLocalImage(image.name);
            }
        }
        return;
    },

    delete: async id => {
        const image = await Image.findByIdAndDelete(id);
        if (image) {
            deleteLocalImage(image.name);
        }
        return;
    },
};

const deleteLocalImage = async name => {
    fs.unlink(`public/images/${name}`, err => {
        if (err) {
            throw err;
        }
    });
};

module.exports = imageController;
