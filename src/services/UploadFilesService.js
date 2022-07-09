import http from '@/http-common';
class UploadFileService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
        formData.append('file', file);
        return http.post('/upload', formData, {
            onUploadProgress
        });
    }
}
export default new UploadFileService();