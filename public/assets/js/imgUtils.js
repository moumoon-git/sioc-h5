    function getImageTag(file, tag){
        if (!file) return 0;
        return new Promise((resolve, reject) => {
            /* eslint-disable func-names */
            // 箭头函数会修改this，所以这里不能用箭头函数
            EXIF.getData(file, function () {
                const o = EXIF.getTag(this, tag);
                resolve(o);
            });
        });
    }
    function getRotateImg(img, or) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // 图片原始大小
        const width = img.width;
        const height = img.height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        switch (or) {
            case 6: // 顺时针旋转90度
                rotateImg(img, 'right', canvas);
                break;
            case 8: // 逆时针旋转90度
                rotateImg(img, 'left', canvas);
                break;
            case 3: // 顺时针旋转180度
                rotateImg(img, 'right', canvas, 2);
                break;
            default:
                break;
        }
        return canvas.toDataURL('image/jpeg') 
    }
    function rotateImg (img, dir = 'right', canvas, s = 1){
        const MIN_STEP = 0;
        const MAX_STEP = 3;

        const width = canvas.width || img.width;
        const height = canvas.height || img.height;
        let step = 0;

        if (dir === 'right') {
            step += s;
            step > MAX_STEP && (step = MIN_STEP);
        } else {
            step -= s;
            step < MIN_STEP && (step = MAX_STEP);
        }

        const degree = step * 90 * Math.PI / 180;
        const ctx = canvas.getContext('2d');

        switch (step) {
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height, width, height);
  
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height, width, height);
              
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0, width, height);
               
                break;
            default:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
        
                break;
        }
    };
    function dataURLtoFile(dataUrl){
        const filename = `img${Date.now()}`;
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };