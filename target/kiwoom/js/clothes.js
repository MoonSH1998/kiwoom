var Clothes = {

    getCloName: function(code) {
        for (var i=0; i<this.clothes.length; i++) {
            if (this.clothes[i].code == code) return this.clothes[i].name;
        }
        return null;
    },
    getTop: function(code) {
        for (var i=0; i<this.top.length; i++) {
            if (this.top[i].code == code) return this.top[i];
        }
        return null;
    },

    getRecommend: function (temp) {
        for (var i=0; i<this.recommend.length; i++) {
            if (this.recommend[i].temp > temp) return this.recommend[i];
        }
        return this.recommend[this.recommend.length-1];
        return null;
    },


    recommend: [
        {temp:"-5", code1:"1,2,3,4",code2:"11,12,13,14,15",code3:"27"},
        {temp:"0", code1:"5,6,7,9",code2:"11,12,13,14,15",code3:"25,26,27"},
        {temp:"5", code1:"5,6,7,9",code2:"11,12,13,14,15",code3:"23,24,25,26,27"},
        {temp:"10", code1:"5,6,7,9",code2:"11,12,13,14,15",code3:"22,23,24,25,26"},
        {temp:"15", code1:"3,5,6,7,9",code2:"11,12,13,14,15,18",code3:"21,22,23,24,25,26"},
        {temp:"20", code1:"3,4,5,6,7,8",code2:"11,12,13,14,15,16,18,19",code3:"20,22,23,24"},
        {temp:"25", code1:"1,3,4",code2:"10,11,12,13,14,15,16,17,18,19",code3:"20,22"},
        {temp:"30", code1:"1,2",code2:"10,11,12,13,14,15,17,18,19",code3:" "},
        {temp:"35", code1:"1,2",code2:"10,11,12,13,14,15,17,18,19",code3:" "},
    ],

    notMan: [
        {code:"17,18,19"},
        {code:"18"},
        {code:"19"}
    ],

    notWoman: [
        {code:"2"},
    ],

    clothes:[

        {name:"반팔", code:"1"},
        {name:"민소매", code:"2"},
        {name:"얇은셔츠", code:"3"},
        {name:"얇은긴팔", code:"4"},
        {name:"긴팔", code:"5"},
        {name:"후드티", code:"6"},
        {name:"맨무맨", code:"7"},
        {name:"얇은니트", code:"8"},
        {name:"니트", code:"9"},

        {name:"반바지", code:"10"},
        {name:"면바지", code:"11"},
        {name:"슬랙스", code:"12"},
        {name:"청바지", code:"13"},
        {name:"트레이닝바지", code:"14"},
        {name:"조거팬츠", code:"15"},
        {name:"점프슈트", code:"16"},
        {name:"레깅스", code:"17"},
        {name:"치마", code:"18"},
        {name:"원피스", code:"19"},

        {name:"얇은가디건", code:"20"},
        {name:"가디건", code:"21"},
        {name:"자켓", code:"22"},
        {name:"야상", code:"23"},
        {name:"트렌치코트", code:"24"},
        {name:"코트", code:"25"},
        {name:"가죽자켓", code:"26"},
        {name:"패딩", code:"27"}

    ],

    top: [
        {name:"반팔", code:"1", notMatch:"19"},
        {name:"민소매", code:"2", notMatch:"16,17,19"},
        {name:"얇은셔츠", code:"3", notMatch:"14, 15, 16, 17, 18, 19"},
        {name:"얇은긴팔", code:"4", notMatch:"16,19"},
        {name:"긴팔", code:"5", notMatch: "19"},
        {name:"후드티", code:"6", notMatch: "19"},
        {name:"맨투맨", code:"7", notMatch: "19"},
        {name:"얇은니트", code:"8", notMatch: "14,15,16,19"},
        {name:"니트", code:"9", notMatch: "14,15,16,19"},
    ],

    bottom: [
        {name:"반바지", code:"10", notMatch:"22"},
        {name:"면바지", code:"11", notMatch:"23"},
        {name:"슬랙스", code:"12", notMatch:"23"},
        {name:"청바지", code:"13"},
        {name:"트레이닝바지", code:"14", notMatch:"20, 22, 23, 24, 25"},
        {name:"조거팬츠", code:"15", notMatch:"20, 22, 23, 24, 25"},
        {name:"점프슈트", code:"16", notMatch:"20, 21, 22, 23, 24, 25, 26, 27"},
        {name:"레깅스", code:"17", notMatch:"22"},
        {name:"치마", code:"18", notMatch:"23"},
        {name:"원피스", code:"19", notMatch:"23, 24"}
    ],

    outer: [
        {name:"얇은가디건", code:"20"},
        {name:"가디건", code:"21"},
        {name:"자켓", code:"22"},
        {name:"야상", code:"23"},
        {name:"트렌치코트", code:"24"},
        {name:"코트", code:"25"},
        {name:"가죽자켓", code:"26"},
        {name:"패딩", code:"27"}
    ],
};