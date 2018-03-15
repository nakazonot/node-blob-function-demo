const storage = require('azure-storage');
const blobService = storage.createBlobService();

const BufferStream = require('./BufferStream');
const fs = require('fs');

module.exports = (context, myBlob) => {

    context.log('init...');

    context.log('BEFORE create stream');
    const stream = new BufferStream(myBlob);
    //const stream = fs.createReadStream(myBlob);
    context.log('AFTER create stream');

    let options = {
        contentSettings: { contentType: 'image/png'}
    };

    context.log('BEFORE blobService.createBlockBlobFromStream');
    blobService.createBlockBlobFromStream('thumbnails', 'test.png', stream, myBlob.length, options, (err) => {

        context.log('CALLBACK from blobService.createBlockBlobFromStream');

        if(err) context.log(JSON.stringify(err));

        context.log('COMPLETE');
        context.done();
    });
};