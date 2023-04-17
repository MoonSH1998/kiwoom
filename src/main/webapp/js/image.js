// ImageUploader object ------------------------------------------------------------------
var ImageUploader = {
    init: function (fileview, imgview, cbfunc) {
        document.getElementById(fileview).onchange = function() {
            if (this.files && this.files[0]) {
                ImageUploader._addImage(imgview, this.files[0], cbfunc);
            }
        };
    },

    open: function (fileview, imgview, cbfunc) {
        // SHKIM 20190325
        var cfgDevice = SessionStore.get("cfgDevice");
        
        // native app
        if(isValid(cfgDevice) && cfgDevice.platform == "android") {
            document.getElementById(fileview).click();
        }
        // browser
        else {
            document.getElementById(fileview).click();
        }
    },
    
    appendParams: function (params, name, file, filename) {
        if (isValid(file.blob)) {
        	if(isValid(filename)) {
                params.append(name, file.blob, filename);
        	}
        	else {
                params.append(name, file.blob, file.name);
        	}
        }
        else {
            params.append(name, file);
        }
        return params;
    },

    _checkType: function (file) {
        var ext = file.split('.').pop().toLowerCase();
        return ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) ? false : true; 
    },
    
    _addImage: function (imgview, file, cbfunc) {
        if(!this._checkType(file.name)) {
            Dialog.alert("이미지 형식의 파일이 아닙니다.");
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            $("#" + imgview).css('background-image', 'url(' + e.target.result + ')');
            cbfunc(file);
        }
        reader.readAsDataURL(file);
    },
};

var ImageUtil = {
    base64ToArrayBuffer: function (base64) {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    },
};


// ImageUploader2 object ------------------------------------------------------------------
var ImageUploader2 = {
    vwMain: "",
    imageIdx: 0,
    imageList: [],

    init: function (vid) {
        this.vwMain = vid;
        
        $(vid).append("<input id='--photo-input' type='file' style='display:none' multiple>");
        document.getElementById("--photo-input").onchange = function() {
            if(this.files && (this.files.length > 0)){
                for(let i=0; i<this.files.length; i++){
                    ImageUploader2._addImage(this.files[i]);
                }
            }
        };
    },
    
    add: function () {
        $(this.vwMain).removeClass("hide");
        document.getElementById("--photo-input").click();
    },
    
    get: function () {
        var list = [];
        for (var i=0; i<this.imageList.length; i++) {
            if (this.imageList[i] == null) continue;
            list.push(this.imageList[i]);
        }
        return list;
    },

    getNames: function () { // for update cache
        let list = this.get();
        let res = [];
        list.forEach(function (elem) {
            res.push(elem.name);
        });

        return res;
    },

    getNamesForPrevImgs: function (imgurls) {
        var previmgs = [];
        $("[name='previmage[]']").each(function() {
            var url = $(this).css("background-image");
            for (var i=0; i<imgurls.length; i++) {
                if (url.indexOf(imgurls[i]) >= 0) {
                    previmgs.push(imgurls[i]);
                    break;
                }
            }
        });

        return previmgs;
    },
    
    getCount: function () {
        return this.get().length;
    },
    
    load: function (imgsrc) {
        var index = this.imageIdx++;
        
        var str = "<div id='--photo-" + index + "'>"; 
            str += "<div id='--photo-pane-" + index + "' class='grid wid-50 icon-box'>";
                str += "<div id='--photo-img-" + index + "' class='img-frame ptop-75' name='previmage[]'></div>";
            str += "</div>";
        str += "</div>";
        $(this.vwMain).append(str);

        this._loadImage(index, imgsrc);
    },

    appendParams: function (params, name) {
    	name = isValid(name) ? name : "images";

        // SHKIM 20190325
        var cfgDevice = SessionStore.get("cfgDevice");
        
        // native app
        var list = this.get();
        if(isValid(cfgDevice) && cfgDevice.platform === "android") {
            for (var i=0; i<list.length; i++) {
                params.append(name, list[i].blob, list[i].name);
            }
        } else { // browser
            for (var i=0; i<list.length; i++) {
                params.append(name, list[i]);
            }
        }
        return params;
    },
    
    appendParamsForPrevImgs: function(params, imgurls) {
    	var previmgs = [];
    	$("[name='previmage[]']").each(function() {
    		var url = $(this).css("background-image");
    		for (var i=0; i<imgurls.length; i++) {
    			if (url.indexOf(imgurls[i]) >= 0) {
    				previmgs.push(imgurls[i]);
    				break; 
    			} 
    		}
    	});
    	for (var i=0; i<previmgs.length; i++) {
    		params.append("previmg", previmgs[i]);
    	}
    	return params;
    },

    _checkType: function (file) {
        var ext = file.split('.').pop().toLowerCase();
        return ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) ? false : true; 
    },
    
    _addImage: function (file) {
        if(!this._checkType(file.name)) {
            Dialog.alert("이미지 형식의 파일이 아닙니다.");
            return;
        }
            // hide the empty message if exists
        $(".empty-msg").addClass("hide");
        
        var index = this.imageIdx++;
        
        var str = "<div id='--photo-" + index + "'>"; 
        str += "<div id='--photo-pane-" + index + "' class='grid wid-50 icon-box'>";
        str += "<div id='--photo-img-" + index + "' class='img-frame ptop-75'></div>";
        str += "</div></div>";
        
        $(this.vwMain).append(str);

        var reader = new FileReader();
        reader.onload = function (e) {
            ImageUploader2._loadImage(index, e.target.result);
            ImageUploader2.imageList.push(file);
            // remove the loading icon from the image frame
            $("#--photo-img-" + index).html("");
        }
        reader.readAsDataURL(file);
    },

    _loadImage: function (index, imgdata) {
        // load the image data
        $("#--photo-img-" + index).css('background-image', 'url(' + imgdata + ')');
        // 모바일 글 작성 이미지 추가 시 x표시 url 수정 by Moon 0308
        var thisUrl = window.location.pathname
        // add a remove button with index
        if(thisUrl.includes("/mobile/")){
            var str = "<div class='icon' style='background-image: url(\"../images/svg/ico_del.svg\")'  onclick='ImageUploader2._removeImage(" + index + ");'></div>";
        }else{
            var str = "<div class='icon' style='background-image: url(\"images/svg/ico_del.svg\")'  onclick='ImageUploader2._removeImage(" + index + ");'></div>";
        }
        $("#--photo-pane-" + index).append(str);
    },
    
    _removeImage: function (index) {

        var elem = document.getElementById("--photo-" + index);
        if (elem == null) return;

        // NOTE THAT we don't need to remove the element !!
        //
        // remove the element from imageList first
        // this.imageList[index] = null;

        // MUST be invoked using JQuery because remove() is not yet the Javascript standard!

        //this.imageList[index] = null;
        if(window.location.pathname.includes('/update/'))
            ImageUploader2.imageList = pagectx.feed.images;
        ImageUploader2.imageList.splice(index,1)

        $("#--photo-" + index).remove();
    },
};

const  generateRandomString = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Math.random().toString(36).substring(0,15);
}
