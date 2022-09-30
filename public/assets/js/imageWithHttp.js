let imageWithHttp={
    withHttp(url){
        var temporaryObject={};
        if(!url){
            temporaryObject.image='../images/nophoto.jpg'
        }
        if(url&&url.search("http")!=-1){
            var ImgObj = new Image(); //判断图片是否存在  
            ImgObj.src = url;  
        
            console.log("输出图片",ImgObj.src,ImgObj,ImgObj.width)
            
            setTimeout(()=>{
                //没有图片，则返回-1  
                if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
                    temporaryObject.image=ImgObj.src
                } else {
                    temporaryObject.temporaryImage=url
                    // temporaryObject.image='../images/nophoto.jpg'
    
                }
            },1500) 
            
           
        }
        if(url&&url.search("http")===-1){
                var ImgObj = new Image(); //判断图片是否存在  
        
        
                url=url.split('')
                url.splice(5,1,"/");
                url=url.join('')
                ImgObj.src = SERSVER_BASE_URL+'/'+url;  
            
                console.log("输出图片",ImgObj.src,ImgObj,ImgObj.width)
                
                setTimeout(()=>{
                    //没有图片，则返回-1  
                    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
                        temporaryObject.image=ImgObj.src
                    } else {  
                        temporaryObject.temporaryImage=url
                        // temporaryObject.image='../images/nophoto.jpg'
                    }
                },1500)
        }
        return temporaryObject
    }
}

// export default imageWithHttp;