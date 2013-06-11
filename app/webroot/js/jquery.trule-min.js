(function($){
    function _isUndef(o){
        return typeof o==="undefined"
        }
        function _objInArray(a,k,v){
        for(var i in a){
            for(prop in a[i]){
                if(prop==k&&a[i][prop]===v){
                    return a[i];
                    break
                }
            }
            }
        }
    function _getRule(o,n){
    var elRules=_objInArray(_t.rulesManager,"oRef",o),rule;
    if(elRules){
        rule=_objInArray(elRules.rules,"name",n)
        }
        return rule
    }
    $.oGrep=function(o,fn){
    var _o={};

    $.each(o,function(i,v){
        if(fn(i,v)){
            _o[i]=v
            }
        });
return _o
};

function _template(s,p){
    return s.replace(/{([^{}]*)}/g,function(a,b){
        var r=p[b]||a;
        return r.toString()
        })
    }
    $.fn.trule=function(){
    var i,j,rl,ml,_t=$.fn.trule,lang;
    if(!_isUndef(arguments[0])){
        $.extend(_t.globalOptions,arguments[0])
        }
        lang=$("html").attr("lang");
    if(lang){
        _t.globalOptions.lang=lang.toLowerCase()
        }
        if(arguments[0]&&arguments[0].messages){
        rl=$.fn.trule.rulesManager.length;
        for(i=0;i<rl;i++){
            ml=$.fn.trule.rulesManager[i].rules.length;
            for(j=0;j<ml;j++){
                $.fn.trule.rulesManager[i].rules[j].messages=$.extend($.fn.trule.rulesManager[i].rules[j].messages,_t.globalOptions.messages)
                }
            }
        }
    return $.extend(this,{
    addRule:function(){
        var _args=$.makeArray(arguments);
        return $(this.each(function(){
            var globalOptions=$.oGrep(_t.globalOptions,function(k){
                return !(k=="error"||k=="success")
                }),options=$.extend(globalOptions,(!_isUndef(_args[0])?_args[0]:{})),rule,elRules,ruleDef,lang,$this=$(this),_binded=false;
            lang=$this.attr("lang");
            if(lang){
                options.lang=lang.toLowerCase()
                }
                elRules=_objInArray(_t.rulesManager,"oRef",this);
            if(!elRules){
                elRules={
                    oRef:this,
                    rules:[],
                    lang:options.lang
                    };

                if(options.name=="validateDependency"){
                    _t.rulesManager.unshift(elRules)
                    }else{
                    _t.rulesManager.push(elRules)
                    }
                }
            $.each(elRules.rules,function(i,r){
            if(r.event==options.event){
                _binded=true;
                return false
                }
            });
        if(options.name&&options.event){
            rule=_objInArray(elRules.rules,"name",options.name);
            if(!rule){
                ruleDef={
                    oRef:elRules.oRef,
                    showAs:(function(){
                        return $(elRules.oRef).trule().getShowAs()
                        })(),
                    event:null,
                    name:null,
                    rule:null,
                    quiet:null,
                    error:function(){
                        $.fn.trule.globalOptions.error.apply(this,arguments)
                        },
                    success:function(){
                        $.fn.trule.globalOptions.success.apply(this,arguments)
                        },
                    callback:null,
                    allowChars:null,
                    preventChars:null,
                    singleChar:null,
                    maskApplyed:false,
                    mask:null,
                    maskPlaceholder:"_",
                    messages:{},
                    getMessage:function(n){
                        var langDef;
                        for(l in this.messages){
                            if(l===elRules.lang){
                                langDef=this.messages[l];
                                break
                            }
                        }
                        if(langDef){
                        for(m in langDef){
                            if(m===n){
                                return _template(langDef[m],arguments[1]||{})
                                }
                            }
                        }
                    },
        firesError:function(errn){
            if(!elRules._erroFired&&!this.quiet){
                elRules._erroFired=true;
                var p=$.makeArray(arguments).length==2?arguments[1]:{},msg=this.getMessage(errn,p);
                this.error.call(this.oRef,this,msg)
                }
                return false
            },
        firesSuccess:function(){
            if(!elRules._erroFired&&!this.quiet){
                var scsn=arguments[0],p=$.makeArray(arguments).length==2?arguments[1]:{},msg="";
                if(!_isUndef(scsn)){
                    msg=this.getMessage(scsn,p)
                    }
                    this.success.call(this.oRef,this,msg)
                }
                return true
            }
        };

rule=$.extend({},ruleDef,options);
    if(rule.name=="validateDependency"){
    elRules.rules.unshift(rule)
    }else{
    elRules.rules.push(rule)
    }
}
if(!_binded){
    $this.bind(rule.event+".trule",function(ev){
        $this.trule().validate(rule.event,ev)
        })
    }
    if(rule.maskApplyed){
    $this.trigger("unmask");
    rule.maskApplyed=false
    }
    if(rule.mask){
    if(!rule.maskPlaceholder){
        $this.mask(rule.mask)
        }else{
        $this.mask(rule.mask,{
            placeholder:rule.maskPlaceholder
            })
        }
        rule.maskApplyed=true
    }
    if(rule.preventChars||rule.allowChars||rule.singleChar||rule.noCaps||rule.allCaps){
    var params={};

    if(rule.preventChars){
        $.extend(params,{
            nchars:rule.preventChars
            })
        }
        if(rule.allowChars){
        $.extend(params,{
            allow:rule.allowChars
            })
        }
        if(rule.singleChar){
        $.extend(params,{
            singleChar:rule.singleChar
            })
        }
        if(rule.noCaps){
        $.extend(params,{
            nocaps:rule.noCaps
            })
        }
        if(rule.allCaps){
        $.extend(params,{
            allcaps:rule.allCaps
            })
        }
        $this.alphanumeric(params)
    }
    rule=$.extend(rule,options)
}
}))
},
getRule:function(name){
    var elRules=_objInArray(_t.rulesManager,"oRef",this.get(0)),rule;
    if(elRules){
        rule=_objInArray(elRules.rules,"name",name);
        return rule||null
        }
        return null
    },
delRule:function(r){
    return $(this.each(function(){
        var elRules=_objInArray(_t.rulesManager,"oRef",this),rule,that;
        if(elRules){
            if(typeof r==="string"){
                rule=_objInArray(elRules.rules,"name",r)
                }else{
                if(typeof r==="object"){
                    rule=r
                    }
                }
            if(rule!==undefined){
            elRules.rules=$.grep(elRules.rules,function(e,i){
                var eq=(e===rule);
                if(e.maskApplyed){
                    $(that).trigger("unmask");
                    e.maskApplyed=false
                    }
                    return !eq
                })
            }
        }
    }))
},
validate:function(){
    var args=$.makeArray(arguments),allValid=true,quiet=false,lastElRules;
    if(!_isUndef(args[0])&&args[0]===true){
        quiet=args.shift()
        }
        this.each(function(){
        var _args=$.makeArray(args);
        _args.unshift(this);
        function _fireRule(){
            var p,result,el=arguments[0],n=arguments[1],ev=arguments[2],elRule=_getRule(el,n);
            if(elRule){
                p=[elRule];
                if(ev){
                    p.push(ev)
                    }
                    elRule.quiet=quiet;
                try{
                    var b=elRule.rule.apply(el,p);
                    elRule.quiet=false;
                    return b!==undefined?b:true
                    }catch(e){
                    if(console&&console.error){
                        console.error(e)
                        }
                        return false
                    }
                }
        }
    var elRules=_objInArray(_t.rulesManager,"oRef",this);
    if(!elRules||elRules.rules.length===0){
        var $thisT=$(this).trule();
        $thisT.addRule({
            name:"cleanRule",
            event:"submit",
            rule:function(r){
                r.firesSuccess();
                $thisT.delRule("cleanRule")
                }
            });
    elRules=_objInArray(_t.rulesManager,"oRef",this)
    }
    elRules._erroFired=false;
$.each(elRules.rules,function(i,rule){
    if(!args[0]||rule.event===args[0]){
        var __args=$.makeArray(_args);
        __args[1]=rule.name;
        if(!_fireRule.apply(_fireRule,__args)){
            if(allValid){
                if(!_t.firstErroElRules){
                    _t.firstErroElRules=[elRules,rule]
                    }
                    allValid=false
                }
                _t.lastErroElRules=[elRules,rule]
            }
        }
})
});
return allValid
},
validateAll:function(){
    var elements=[],$elements,f,toValidate=[],thisSize,i;
    $.each($.fn.trule.rulesManager,function(i,elRules){
        elements.push(elRules.oRef)
        });
    $this=this.filter(function(){
        return this.nodeType==1
        });
    _t.firstErroElRules=_t.lastErroElRules=null;
    try{
        thisSize=$this.size();
        if(thisSize>0){
            for(i=0;i<thisSize;i++){
                f=$this.get(i);
                $(elements).filter(function(){
                    if($(this).parents().filter(function(){
                        return this==f
                        }).size()>0){
                        toValidate.push(this);
                        return false
                        }
                    });
            return(toValidate.length>0?$(toValidate).trule().validate():true)
                }
            }else{
    return(elements.length>0?$(elements).trule().validate():true)
    }
}finally{
    if(typeof _t.globalOptions.firstErro=="function"&&_t.firstErroElRules&&_t.firstErroElRules[0]&&_t.firstErroElRules[0].oRef){
        _t.globalOptions.firstErro(_t.firstErroElRules[0],_t.firstErroElRules[1])
        }
        if(typeof _t.globalOptions.lastErro=="function"&&_t.lastErroElRules&&_t.lastErroElRules[0]&&_t.lastErroElRules[0].oRef){
        _t.globalOptions.lastErro(_t.lastErroElRules[0],_t.lastErroElRules[1])
        }
    }
},
getShowAs:function(){
    if(this.size()>0){
        return this.attrNS("showAs")||$(this).attr("alt")||$(this).attr("id")||$(this).attr("name")||""
        }
        return null
    },
attrNS:function(attributeName){
    var tns=$.fn.trule.globalOptions.attrNamespace;
    if(tns){
        tns+=":"
        }else{
        tns=""
        }
        return this.attr(tns.concat(attributeName))
    }
})
};

var _t=$.fn.trule;
_t.firstErroElRules=null;
_t.lastErroElRules=null;
_t.globalOptions={
    lang:"en",
    messages:{},
    attrNamespace:"t",
    error:function(r,msg){
        //alert(msg)
        },
    success:function(r,msg){},
    simbolLib:{
        great:">",
        less:"<",
        greatOrEqual:">=",
        lessOrEqual:"<=",
        equal:"==",
        notEqual:"!="
    }
};

_t.validators={
    maxlength:function(value,maxlength){
        return value==""||!(value.length>maxlength)
        },
    minlength:function(value,minlength){
        return value==""||!(value.length<minlength)
        },
    required:function(value){
        var t=typeof value;
        switch(t){
            case"number":case"string":
                value=value+"";
                return $.trim(value)!="";
            case"array":
                return value.length>0;
            default:
                return !(!value)
                }
            },
numeric:function(value){
    return !(/\D/.test(value.toString()))
    },
alpha:function(value){
    return !(/[^a-z\s]/.test(value.toString().toLowerCase()))
    },
alphanumeric:function(value){
    return !(/[^0-9a-z\s]/.test(value.toString().toLowerCase()))
    },
alphaLatin:function(value){
    return !(/[^a-z\s\xE0-\xE4\xE7-\xEF\xF1-\xFF]/.test(value.toString().toLowerCase()))
    },
alphanumericLatin:function(value){
    return !(/[^0-9a-z\s\xE0-\xE4\xE7-\xEF\xF1-\xFF]/.test(value.toString().toLowerCase()))
    },
email:function(email){
    return email==""||/^[A-Za-z0-9]+(([\.\-\_]+[A-Za-z0-9]+)+)?@[A-Za-z0-9]+(([\.\-\_]+[A-Za-z0-9]+)+)?\.[A-Za-z]{2,4}$/.test(email.toString())
    },
date:function(date,format){
    return date==""||_t.validators.f.dateformat(date,format,true)
    },
compare:function(v1,op,v2){
    if(typeof v1=="string"){
        v1="'"+v1+"'"
        }
        if(typeof v2=="string"){
        v2="'"+v2+"'"
        }
        return eval(v1+op+v2)
    },
fileExtension:function(value,acceptRange){
    return value==""||value.match(new RegExp(".("+acceptRange+")$","i"))
    },
sets:{
    alphabet:"abcdefghijklmnopqrstuvwxyz",
    alphabetLatin:"çñáàäâãéèëêíìïîóòöôõúùüûýÿ",
    alpha:"abcdefghijklmnopqrstuvwxyzçñáàäâãéèëêíìïîóòöôõúùüûýÿ",
    numeric:"0123456789",
    alphanumeric:"abcdefghijklmnopqrstuvwxyzçñáàäâãéèëêíìïîóòöôõúùüûýÿ0123456789",
    special:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.-_ "
},
f:{
    dateformat:function(source,input_format,output_format){
        input_format=input_format.replace(/\//g,"\\/");
        var values={
            day:null,
            month:null,
            year:null
        },formats={
            d:"0[1-9]|[123]\\d",
            j:"\\d|[12]\\d|3[01]",
            m:"0[1-9]|1[0-2]",
            n:"[1-9]|1[0-2])",
            Y:"\\d{4}",
            y:"\\d{2}"
        },positions=[],fullYear=false,regexp,splittedDate,sdLen,i,trueDate;
        if(typeof source=="string"){
            regexp=new RegExp("^"+input_format.replace(/%([a-zA-Z]){1}/g,function(a,b){
                switch(b){
                    case"d":case"j":
                        positions.push("day");
                        break;
                    case"m":case"n":
                        positions.push("month");
                        break;
                    case"Y":
                        fullYear=true;
                    case"y":
                        positions.push("year");
                        break
                        }
                        if(formats[b]){
                    formats[b]="("+formats[b]+")"
                    }
                    return formats[b]||a
                })+"$");
            splittedDate=source.match(regexp);
            if(splittedDate){
                splittedDate.shift();
                sdLen=splittedDate.length;
                for(i=0;i<sdLen;i++){
                    values[positions[i]]=splittedDate[i]
                    }
                    trueDate=new Date();
                values.month--;
                if(fullYear){
                    trueDate.setFullYear(values.year,values.month,values.day)
                    }else{
                    trueDate.setYear(values.year);
                    trueDate.setMonth(values.month);
                    trueDate.setDate(values.day)
                    }
                }
        }else{
    if(typeof source=="object"){
        trueDate=source
        }else{
        if(typeof source=="number"){
            trueDate=new Date();
            trueDate.setTime(source)
            }
        }
}
try{
    if(typeof trueDate=="object"){
        if(output_format===true){
            return trueDate
            }
            return output_format.replace(/%([a-zA-Z]){1}/g,function(a,b){
            switch(b){
                case"d":case"j":
                    return(trueDate.getDate()<10?"0":"")+trueDate.getDate();
                case"m":case"n":
                    return(trueDate.getMonth()<9?"0":"")+(trueDate.getMonth()+1);
                case"Y":
                    return trueDate.getFullYear();
                case"y":
                    return trueDate.getYear()
                    }
                    return a
            })
        }else{
        return null
        }
    }catch(e){
    return null
    }finally{
    trueDate=null
    }
}
},
rules:{}
};

_t.rulesManager=[];
$.fn.caret=function(begin,end){
    if(this.length==0){
        return
    }
    if(typeof begin=="number"){
        end=(typeof end=="number")?end:begin;
        return this.each(function(){
            if(this.setSelectionRange){
                this.focus();
                this.setSelectionRange(begin,end)
                }else{
                if(this.createTextRange){
                    var range=this.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character",end);
                    range.moveStart("character",begin);
                    range.select()
                    }
                }
        })
}else{
    if(this[0].setSelectionRange){
        begin=this[0].selectionStart;
        end=this[0].selectionEnd
        }else{
        if(document.selection&&document.selection.createRange){
            var range=document.selection.createRange();
            begin=0-range.duplicate().moveStart("character",-100000);
            end=begin+range.text.length
            }
        }
    return{
    begin:begin,
    end:end
}
}
};

var charMap={
    "9":"[0-9]",
    a:"[A-Za-z]",
    "*":"[A-Za-z0-9]"
};

$.mask={
    addPlaceholder:function(c,r){
        charMap[c]=r
        }
    };

$.fn.unmask=function(){
    return this.trigger("unmask")
    };

$.fn.mask=function(mask,settings){
    settings=$.extend({
        placeholder:"_",
        completed:null
    },settings);
    var re=new RegExp("^"+$.map(mask.split(""),function(c,i){
        return charMap[c]||((/[A-Za-z0-9]/.test(c)?"":"\\")+c)
        }).join("")+"$");
    return this.each(function(){
        var input=$(this);
        var buffer=new Array(mask.length);
        var locked=new Array(mask.length);
        var valid=false;
        var ignore=false;
        var firstNonMaskPos=null;
        $.each(mask.split(""),function(i,c){
            locked[i]=(charMap[c]==null);
            buffer[i]=locked[i]?c:settings.placeholder;
            if(!locked[i]&&firstNonMaskPos==null){
                firstNonMaskPos=i
                }
            });
    function focusEvent(){
        checkVal();
        writeBuffer();
        setTimeout(function(){
            $(input[0]).caret(valid?mask.length:firstNonMaskPos)
            },0)
        }
        function keydownEvent(e){
        var pos=$(this).caret();
        var k=e.keyCode;
        ignore=(k<16||(k>16&&k<32)||(k>32&&k<41));
        if((pos.begin-pos.end)!=0&&(!ignore||k==8||k==46)){
            clearBuffer(pos.begin,pos.end)
            }
            if(k==8){
            while(pos.begin-->=0){
                if(!locked[pos.begin]){
                    buffer[pos.begin]=settings.placeholder;
                    if($.browser.opera){
                        s=writeBuffer();
                        input.val(s.substring(0,pos.begin)+" "+s.substring(pos.begin));
                        $(this).caret(pos.begin+1)
                        }else{
                        writeBuffer();
                        $(this).caret(Math.max(firstNonMaskPos,pos.begin))
                        }
                        return false
                    }
                }
        }else{
        if(k==46){
            clearBuffer(pos.begin,pos.begin+1);
            writeBuffer();
            $(this).caret(Math.max(firstNonMaskPos,pos.begin));
            return false
            }else{
            if(k==27){
                clearBuffer(0,mask.length);
                writeBuffer();
                $(this).caret(firstNonMaskPos);
                return false
                }
            }
    }
}
function keypressEvent(e){
    if(ignore){
        ignore=false;
        return(e.keyCode==8)?false:null
        }
        e=e||window.event;
    var k=e.charCode||e.keyCode||e.which;
    var pos=$(this).caret();
    if(e.ctrlKey||e.altKey){
        return true
        }else{
        if((k>=41&&k<=122)||k==32||k>186){
            var p=seekNext(pos.begin-1);
            if(p<mask.length){
                if(new RegExp(charMap[mask.charAt(p)]).test(String.fromCharCode(k))){
                    buffer[p]=String.fromCharCode(k);
                    writeBuffer();
                    var next=seekNext(p);
                    $(this).caret(next);
                    if(settings.completed&&next==mask.length){
                        settings.completed.call(input)
                        }
                    }
            }
    }
}
return false
}
function clearBuffer(start,end){
    for(var i=start;i<end&&i<mask.length;i++){
        if(!locked[i]){
            buffer[i]=settings.placeholder
            }
        }
    }
function writeBuffer(){
    return input.val(buffer.join("")).val()
    }
    function checkVal(){
    var test=input.val();
    var pos=0;
    for(var i=0;i<mask.length;i++){
        if(!locked[i]){
            buffer[i]=settings.placeholder;
            while(pos++<test.length){
                var reChar=new RegExp(charMap[mask.charAt(i)]);
                if(test.charAt(pos-1).match(reChar)){
                    buffer[i]=test.charAt(pos-1);
                    break
                }
            }
        }
    }
var s=writeBuffer();
if(!s.match(re)){
    input.val("");
    clearBuffer(0,mask.length);
    valid=false
    }else{
    valid=true
    }
}
function seekNext(pos){
    while(++pos<mask.length){
        if(!locked[pos]){
            return pos
            }
        }
    return mask.length
}
input.one("unmask",function(){
    input.unbind("focus",focusEvent);
    input.unbind("blur",checkVal);
    input.unbind("keydown",keydownEvent);
    input.unbind("keypress",keypressEvent);
    if($.browser.msie){
        this.onpaste=null
        }else{
        if($.browser.mozilla){
            this.removeEventListener("input",checkVal,false)
            }
        }
});
input.bind("focus",focusEvent);
input.bind("blur",checkVal);
input.bind("keydown",keydownEvent);
input.bind("keypress",keypressEvent);
if($.browser.msie){
    this.onpaste=function(){
        setTimeout(checkVal,0)
        }
    }else{
    if($.browser.mozilla){
        this.addEventListener("input",checkVal,false)
        }
    }
checkVal()
})
};

jQuery.fn.alphanumeric=function(p){
    p=jQuery.extend({
        ichars:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.-_ ",
        nchars:"",
        allow:""
    },p);
    return this.each(function(){
        if(p.nocaps){
            p.nchars+="ABCDEFGHIJKLMNOPQRSTUVWXYZÇÑÁÀÄÂÃÉÈËÊÍÌÏÎÓÒÖÔÕÚÙÜÛÝŸ"
            }
            if(p.allcaps){
            p.nchars+="abcdefghijklmnopqrstuvwxyzçñáàäâãéèëêíìïîóòöôõúùüûýÿ"
            }
            if(p.floatField&&p.allow.indexOf(",")===-1){
            p.allow+=","
            }
            s=p.allow.split("");
        for(i=0;i<s.length;i++){
            if(p.ichars.indexOf(s[i])!=-1){
                s[i]="\\"+s[i]
                }
            }
        p.allow=s.join("|");
        var reg=new RegExp(p.allow,"gi"),ch=p.ichars+p.nchars;
        ch=ch.replace(reg,"");
        var pointer=this;
        if(p.singleChar){
        var scSplit=p.singleChar.split(""),scSplitLen=scSplit.length
        }
        jQuery(this).keypress(function(e){
        if(p.allcaps){
            e.which=String.fromCharCode(e.which).toUpperCase().charCodeAt(0)
            }else{
            if(p.nocaps){
                e.which=String.fromCharCode(e.which).toLowerCase().charCodeAt(0)
                }
            }
        var k=String.fromCharCode(e.which),i;
        if(e.which!==35&&e.which!==36&&e.which!==37&&e.which!==39){
        if(e.which===180||e.which===192){
            e.preventDefault()
            }
            if(ch.indexOf(k)!==-1){
            e.preventDefault()
            }
            if(p.singleChar){
            for(i=0;i<scSplitLen;i++){
                if(k==scSplit[i]){
                    if(this.value.indexOf(scSplit[i])!==-1){
                        e.preventDefault()
                        }
                    }
            }
        }
    }
setTimeout(function(){
    if(p.allcaps){
        pointer.value=pointer.value.toUpperCase()
        }else{
        if(p.nocaps){
            pointer.value=pointer.value.toLowerCase()
            }
        }
},0);
if(!e.ctrlKey&&(k.toUpperCase()!="V"&&e.keyCode!=45)){
    setTimeout(function(){
        pointer.goodValue=pointer.value
        },0)
    }
});
function checkVal(){
    var that=this;
    setTimeout(function(){
        var v=that.value,t="",i;
        //alert(that.value);
        if(v){
        for(i=0;i<v.length;i++){
            if(t.indexOf(v.charAt(i))===-1){
                t+=v.charAt(i)
                }
            }
        }else{this.value="";}
        for(i=0;i<t.length;i++){
        if(ch.indexOf(t.charAt(i))!==-1){
            that.value=pointer.goodValue||"";
            return false
            }
        }
    pointer.goodValue=that.value
    },0)
}
if(jQuery.browser.msie){
    this.onpaste=function(){
        setTimeout(checkVal,1)
        }
    }else{
    if(jQuery.browser.mozilla){
        this.addEventListener("input",checkVal,false)
        }
    }
})
};

$(document).bind("ready",function(){
    $(document).trigger("initTrule")
    })
})(jQuery);