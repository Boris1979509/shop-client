import {ref} from "vue";
import repository from "@/api/repository";
import 'filepond/dist/filepond.min.css';

export const useUploadFiles = prefix => {
    const uploadFiles = ref([]);
    const process = ref(false);
    const server = {
        async process(fieldName, file, metadata, load, error, progress, abort, transfer, options) {
            process.value = true;
            const formData = new FormData();
            formData.append(fieldName, file, file.name);

            const config = { // config fetch
                method: 'post',
                data: formData,
                onUploadProgress(e) {
                    progress(e.lengthComputable, e.loaded, e.total);
                }
            };

            const {errors, response} = await repository.upload(prefix, config);
            if (errors) {
                console.log(errors);
                return;
            }
            load(response);
            uploadFiles.value.push(response);
            process.value = false;
            return {
                abort() {
                    removeFile(response);
                    //abort();
                },
            };
        },
        async revert(uniqueFileId, load, error) {
            const config = { // config fetch
                method: 'delete',
                data: {file: uniqueFileId}
            };
            await repository.removeTemporaryFile(prefix, config);
            error();
            removeFile(uniqueFileId);
            load();
        },
    };
    const removeFile = name => {
        const idx = uploadFiles.value.indexOf(name);
        if (idx !== -1)
            uploadFiles.value.splice(idx, 1);
    };

    return {
        server,
        uploadFiles,
        process
    }
};
