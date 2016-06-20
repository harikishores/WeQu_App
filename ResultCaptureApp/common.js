Games = new Mongo.Collection('games');
smtpSettings = new Mongo.Collection('smtpSettings');
Connections = new Mongo.Collection('connections');
// Users = new Mongo.Collection('users'); 
Images = new FS.Collection("images", {
  stores: [
    new FS.Store.FileSystem("thumbs", { transformWrite: createThumb }),
    new FS.Store.FileSystem("images"),
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});

var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
};