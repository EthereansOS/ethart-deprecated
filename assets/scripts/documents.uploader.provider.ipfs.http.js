var DocumentsUploaderProvider = function() {
    var api;
    return {
        async upload(files) {
            var single = !(files instanceof Array);
            files = single ? [files] : files;
            for(var i in files) {
                var file = files[i];
                if(!(file instanceof File) && !(file instanceof Blob)) {
                    files[i] = new Blob([JSON.stringify(files[i], null, 4)], {type: "application/json"});
                }
            }
            var hashes = [];
            api = api || new IpfsHttpClient(window.context.ipfsHost);
            for await(var upload of api.add(files)) {
                hashes.push(window.context.ipfsUrlTemplate + upload.path);
            }
            return single ? hashes[0] : hashes;
        }
    };
}();