( function(A) {
    A(document)
    .bind(
    "initTrule",
    function() {
        var B = A.fn.trule.validators, D = B.rules;
        A.fn.trule.validators = A.extend(A.fn.trule.validators,
        {
            cpf : function(E) {
                E = E.replace(/[.-]/g, "");
                var G;
                var I = E.substr(0, 9);
                var F = E.substr(9, 2);
                var H = 0;
                for (G = 0; G < 9; G++) {
                    H += I.charAt(G) * (10 - G)
                }
                if (H == 0) {
                    return false
                }
                H = 11 - (H % 11);
                if (H > 9) {
                    H = 0
                }
                if (F.charAt(0) != H) {
                    return false
                }
                H *= 2;
                for (G = 0; G < 9; G++) {
                    H += I.charAt(G) * (11 - G)
                }
                H = 11 - (H % 11);
                if (H > 9) {
                    H = 0
                }
                if (F.charAt(1) != H) {
                    return false
                }
                return true
            },
            cnpj : function(H) {
                H += "";
                H = H.replace(/[.\/-]/g, "");
                H = (H.length > 14 ? H.substr(1,
                H.length) : H);
                var F;
                var I = H.substr(0, 12);
                var E = H.substr(12, 2);
                var G = 0;
                for (F = 0; F < 12; F++) {
                    G += I.charAt(11 - F)
                        * (2 + (F % 8))
                }
                if (G == 0) {
                    return false
                }
                G = 11 - (G % 11);
                if (G > 9) {
                    G = 0
                }
                if (E.charAt(0) != G) {
                    return false
                }
                G *= 2;
                for (F = 0; F < 12; F++) {
                    G += I.charAt(11 - F)
                        * (2 + ((F + 1) % 8))
                }
                G = 11 - (G % 11);
                if (G > 9) {
                    G = 0
                }
                if (E.charAt(1) != G) {
                    return false
                }
                return true
            },
            creditcard : function(H) {
                if (/[^0-9-]+/.test(H)) {
                    return false
                }
                var I = 0, G = 0, E = false;
                H = H.replace(/\D/g, "");
                for (n = H.length - 1; n >= 0; n--) {
                    var F = H.charAt(n);
                    var G = parseInt(F, 10);
                    if (E) {
                        if ((G *= 2) > 9) {
                            G -= 9
                        }
                    }
                    I += G;
                    E = !E
                }
                return (I % 10) == 0
            }
        });
        var C = A("input:not(:submit, :reset, :button, :image), select, textarea");
        D.validateRequired = {
            name :"validateRequired",
            event :"submit",
            rule : function(E) {
                if (B.required(A(this).val())) {
                    E.firesSuccess()
                } else {
                    return E.firesError("required", {
                        fieldname :E.showAs
                    })
                }
            }
        };
        C.filter(".validateRequired").trule().addRule(
        D.validateRequired);
        D.validateNumeric = {
            name :"validateNumeric",
            event :"submit",
            rule : function(E) {
                if (B.numeric(A(this).val())) {
                    E.firesSuccess()
                } else {
                    return E.firesError("numeric", {
                        fieldname :E.showAs
                    })
                }
            },
            preventChars :B.sets.alpha + B.sets.special,
            noCaps :true
        };
        C.filter(".validateNumeric").trule().addRule(
        D.validateNumeric);
        D.validateAlpha = {
            name :"validateAlpha",
            event :"submit",
            rule : function(F) {
                var E = A(this).trule().attrNS("special") || true;
                E = E != "false";
                if (E) {
                    if (B.alphaLatin(A(this).val())) {
                        F.firesSuccess()
                    } else {
                        return F.firesError("alpha", {
                            fieldname :F.showAs
                        })
                    }
                } else {
                    if (B.alpha(A(this).val())) {
                        F.firesSuccess()
                    } else {
                        return F.firesError("alpha", {
                            fieldname :F.showAs
                        })
                    }
                }
            },
            preventChars :B.sets.numeric + B.sets.special,
            allowChars :" "
        };
        C.filter(".validateAlpha").trule().addRule(
        D.validateAlpha);
        D.validateAlphanumeric = {
            name :"validateAlphanumeric",
            event :"submit",
            rule : function(F) {
                var E = A(this).trule().attrNS("special") || true;
                E = E != "false";
                if (E) {
                    if (B.alphanumericLatin(A(this).val())) {
                        F.firesSuccess()
                    } else {
                        return F.firesError("alphanumeric", {
                            fieldname :F.showAs
                        })
                    }
                } else {
                    if (B.alphanumeric(A(this).val())) {
                        F.firesSuccess()
                    } else {
                        return F.firesError("alphanumeric", {
                            fieldname :F.showAs
                        })
                    }
                }
            },
            preventChars :B.sets.special,
            allowChars :" "
        };
        C.filter(".validateAlphanumeric").trule().addRule(
        D.validateAlphanumeric);
        D.validateUpperCase = {
            name :"validateUpperCase",
            event :"submit",
            rule : function(E) {
                this.value = this.value.toUpperCase()
            },
            allCaps :true
        };
        C.filter(".validateUpperCase").trule().addRule(
        D.validateUpperCase);
        D.validateLowerCase = {
            name :"validateLowerCase",
            event :"submit",
            rule : function(E) {
                this.value = this.value.toLowerCase()
            },
            noCaps :true
        };
        C.filter(".validateLowerCase").trule().addRule(
        D.validateLowerCase);
        D.validateMaxlength = {
            name :"validateMaxlength",
            event :"submit",
            rule : function(F) {
                var G = A(this), E = G.trule().attrNS(
                "maxlength");
                if (!E) {
                    return F.firesSuccess()
                }
                if (B.maxlength(G.val(), E)) {
                    return F.firesSuccess()
                } else {
                    return F.firesError("maxlength", {
                        fieldname :F.showAs,
                        maxlength :E
                    })
                }
            }
        };
        C.filter(".validateMaxlength").trule().addRule(
        D.validateMaxlength);
        D.validateMinlength = {
            name :"validateMinlength",
            event :"submit",
            rule : function(F) {
                var G = A(this), E = G.trule().attrNS(
                "minlength");
                if (!E) {
                    return F.firesSuccess()
                }
                if (B.minlength(G.val(), E)) {
                    return F.firesSuccess()
                } else {
                    return F.firesError("minlength", {
                        fieldname :F.showAs,
                        minlength :E
                    })
                }
            }
        };
        C.filter(".validateMinlength").trule().addRule(
        D.validateMinlength);
        D.validateMax = {
            name :"validateMax",
            event :"submit",
            rule : function(F) {
                var H = A(this), G = H.val(), E = H.trule()
                .attr("max");
                if (G === "" || typeof E === "undefined"
                    || isNaN(E) || E == "") {
                    return F.firesSuccess()
                }
                if (parseFloat(G, 10) <= parseFloat(E, 10)) {
                    return F.firesSuccess()
                } else {
                    return F.firesError("max", {
                        fieldname :F.showAs,
                        max :E
                    })
                }
            }
        };
        C.filter(".validateMax").trule().addRule(D.validateMax);
        
        D.validateMin = {
            name :"validateMin",
            event :"submit",
            rule : function(F) {
                var H = A(this), G = H.val(), E = H.trule()
                .attrNS("min");
                if (G === "" || typeof E === "undefined"
                    || isNaN(E) || E == "") {
                    return F.firesSuccess()
                }
                if (parseFloat(G, 10) >= parseFloat(E, 10)) {
                    return F.firesSuccess()
                } else {
                    return F.firesError("min", {
                        fieldname :F.showAs,
                        min :E
                    })
                }
            }
        };
        C.filter(".validateMin").trule().addRule(D.validateMin);

        D.validateDateUS = {
            name :"validateDataUS",
            event :"submit",
            rule : function(E) {
                var P = A(this), N = P.trule().attrNS(
                "operator"), I = P.trule().attrNS(
                "target"), L, J, O;
                E.firesSuccess();
                if (P.val().replace(/[_\/]/g, "") != "") {
                    if (B.date(P.val(), "%m/%d/%Y")) {
                        if (N && I) {
                            L = A(I);
                            J = L.val();
                            if (L.size() > 0) {
                                O = L.trule().getShowAs();
                                if (A.trim(J) != ""
                                    && B
                                .date(J,
                                "%m/%d/%Y")) {
                                    var H = new Date(B.f
                                    .dateformat(
                                    P.val(),
                                    "%m/%d/%Y",
                                    true))
                                    .valueOf(), F = new Date(
                                    B.f.dateformat(J,
                                    "%m/%d/%Y",
                                    true))
                                    .valueOf();
                                    if (B.compare(H, N, F)) {
                                        E.firesSuccess()
                                    } else {
                                        var G = A.fn.trule.globalOptions.simbolLib, K = ( function() {
                                            for (k in G) {
                                                if (G[k] == N) {
                                                    return k
                                                }
                                            }
                                        })(), M = E
                                        .getMessage(K)
                                            || N;
                                        return E
                                        .firesError(
                                        "dateCompare",
                                        {
                                            fieldname :E.showAs,
                                            operator :M,
                                            fieldnameCompare :O
                                        })
                                    }
                                }
                            } else {
                                return E.firesError(
                                "notExists", {
                                    fieldname :I
                                })
                            }
                        }
                    } else {
                        return E.firesError("date", {
                            fieldname :E.showAs,
                            format :"mm/dd/aaaa"
                        })
                    }
                }
            },
            mask :"99/99/9999"
        };
        C.filter(".validateDateUS").trule().addRule(
            D.validateDateUS);

//Inicio da regra para validação de data no padrão brasileiro. Danilo Viana.
//
        D.validateDateBR = {
            name :"validateDataBR",
            event :"submit",
            rule : function(E) {
                var P = A(this), N = P.trule().attrNS(
                "operator"), I = P.trule().attrNS(
                "target"), L, J, O;
                E.firesSuccess();
                if (P.val().replace(/[_\/]/g, "") != "") {
                    if (B.date(P.val(), "%d/%m/%Y")) {
                        if (N && I) {
                            L = A(I);
                            J = L.val();
                            if (L.size() > 0) {
                                O = L.trule().getShowAs();
                                if (A.trim(J) != ""
                                    && B
                                .date(J,
                                "%d/%m/%Y")) {
                                    var H = new Date(B.f
                                    .dateformat(
                                    P.val(),
                                    "%d/%m/%Y",
                                    true))
                                    .valueOf(), F = new Date(
                                    B.f.dateformat(J,
                                    "%d/%m/%Y",
                                    true))
                                    .valueOf();
                                    if (B.compare(H, N, F)) {
                                        E.firesSuccess()
                                    } else {
                                        var G = A.fn.trule.globalOptions.simbolLib, K = ( function() {
                                            for (k in G) {
                                                if (G[k] == N) {
                                                    return k
                                                }
                                            }
                                        })(), M = E
                                        .getMessage(K)
                                            || N;
                                        return E
                                        .firesError(
                                        "dateCompare",
                                        {
                                            fieldname :E.showAs,
                                            operator :M,
                                            fieldnameCompare :O
                                        })
                                    }
                                }
                            } else {
                                return E.firesError(
                                "notExists", {
                                    fieldname :I
                                })
                            }
                        }
                    } else {
                        return E.firesError("date", {
                            fieldname :E.showAs,
                            format :"dd/mm/aaaa"
                        })
                    }
                }
            },
            mask :"99/99/9999"
        };
        C.filter(".validateDateBR").trule().addRule(
            D.validateDateBR);
//
//Fim da regra para validação de data no padrão brasileiro. Danilo Viana.

        D.validateHora = {
            name :"validateHora",
            event :"submit",
            rule : function(E) {
                var O = A(this);
                value = O.val(), op = O.trule().attrNS(
                "operator"), tg = O.trule().attrNS(
                "target"), hour = parseInt(value
                .split(":")[0], 10), minute = value
                .split(":")[1],seconds = value
                .split(":")[2];
                E.firesSuccess();

                if (hour < 0 || hour > 23) {
                    return E.firesError("time", {
                        fieldname :E.showAs
                    })
                } else
                    if (parseInt(minute, 10) < 0
                        || parseInt(minute, 10) > 59) {
                        return E.firesError("time", {
                            fieldname :E.showAs
                        })
                    }else{
                    if (parseInt(seconds, 10) < 0
                        || parseInt(seconds, 10) > 59) {
                        return E.firesError("time", {
                            fieldname :E.showAs
                        })
                    }
                    }
                if (op && tg) {
                    var I = A(tg);
                    if (I.size() === 0) {
                        return E.firesError("notExists", {
                            fieldname :tg
                        })
                    }
                    var P = A(tg).trule(), H = I.val(), N = P
                    .getShowAs(), J = true, M = parseInt(
                    value.toString().replace(":", ""),
                    10), G = parseInt(H.toString()
                    .replace(":", ""), 10);
                    hour = parseInt(H.split(":")[0], 10);
                    minute = parseInt(H.split(":")[1], 10);
                    seconds = parseInt(H.split(":")[2], 10);

                    if (hour < 0 || hour > 23) {
                        J = false
                    } else 
                        if (parseInt(minute, 10) < 0
                            || parseInt(minute, 10) > 59) {
                            J = false
                        }else {
                        if (parseInt(seconds, 10) < 0
                            || parseInt(seconds, 10) > 59) {
                            J = false
                        }
                    }
                    if (J === true) {
                        if (B.compare(M, op, G)) {
                            E.firesSuccess()
                        } else {
                            var F = A.fn.trule.globalOptions.simbolLib, K = ( function() {
                                for (k in F) {
                                    if (F[k] == op) {
                                        return k
                                    }
                                }
                            })(), L = E.getMessage(K) || op;
                            return E.firesError("timeCompare",
                            {
                                fieldname :E.showAs,
                                operator :L,
                                fieldnameCompare :N
                            })
                        }
                    } else {
                        return E.firesError("time", {
                            fieldname :N
                        })
                    }
                }
            },
            mask :"99:99:99"
        };
        C.filter(".validateHora").trule().addRule(
        D.validateHora);

        
        D.validatePassword = {
            name :"validatePassword",
            event :"submit",
            rule : function(G) {
                var J = A(this), I = J.trule().attrNS("target"), F, H, E;
                if (B.minlength(J.val())) {
                    G.firesSuccess()
                } else {
                    return G.firesError("minlength", {
                        fieldname :G.showAs,
                        minlength :6
                    })
                }
                if (I) {
                    F = A(I);
                    if (F.size() > 0) {
                        E = F.trule().getShowAs();
                        if (J.val() == F.val()) {
                            G.firesSuccess()
                        } else {
                            var K = G.getMessage("equal");
                            return G.firesError("valueCompare",
                            {
                                fieldname :G.showAs,
                                operator :K,
                                fieldnameCompare :E
                            })
                        }
                    }
                    else {
                        return G.firesError("notExists", {
                            fieldname :I
                        })
                    }
                }
            }
        };
        C.filter(".validatePassword").trule().addRule(
        D.validatePassword);
        D.validateTelefone = {
            name :"validateTelefone",
            event :"submit",
            rule : function(E) {
                var F = A(this).val().replace(/[.\/_-]/g, "");
                if (B.numeric(F)) {
                    E.firesSuccess()
                } else {
                    return E.firesError("numeric", {
                        fieldname :E.showAs
                    })
                }
                if (B.minlength(F, 8) && B.maxlength(F, 8)) {
                    E.firesSuccess()
                } else {
                    return E.firesError("length", {
                        fieldname :E.showAs,
                        length :8
                    })
                }
            },
            mask :"9999-9999"
        };
        C.filter(".validateTelefone").trule().addRule(
        D.validateTelefone);
        D.validatePhone={
            name:"validatePhone",
            event:"submit",
            rule:function(E){
                var F=A(this).val().replace(/[(-)\s]/g,"");
                if(B.numeric(F)){
                    E.firesSuccess()
                }else{
                    return E.firesError("numeric",{
                        fieldname:E.showAs
                    })
                }
                if(B.minlength(F,10)&&B.maxlength(F,10)){
                    E.firesSuccess()
                }else{
                    return E.firesError("length",{
                        fieldname:E.showAs,
                        length:10
                    })
                }
            },
            preventChars:B.sets.alpha,
            allowChars:"() -"
        };

        C.filter(".validatePhone").trule().addRule(D.validatePhone);
        D.validateCreditcard={
            name:"validateCreditcard",
            event:"submit",
            rule:function(E){
                var F=A(this).val().replace(/[.\/_-]/g,"");
                if(B.numeric(F)){
                    E.firesSuccess()
                }else{
                    return E.firesError("numeric",{
                        fieldname:E.showAs
                    })
                }
                if(B.creditcard(F)){
                    E.firesSuccess()
                }else{
                    return E.firesError("creditcard",{
                        fieldname:E.showAs
                    })
                }
            },
            mask:"9999-9999-9999-9999"
        };

        C.filter(".validateCreditcard").trule().addRule(D.validateCreditcard);
        D.validateFileExtension={
            name:"validateFileExtension",
            event:"submit",
            rule:function(F){
                var E=A(this).trule().attrNS("acceptExtensions");
                if(!E){
                    return F.firesSuccess()
                }
                if(B.fileExtension(A(this).val(),E)){
                    F.firesSuccess()
                }else{
                    return F.firesError("fileExtension",{
                        fieldname:F.showAs
                    })
                }
            }
        };

        C.filter(".validateFileExtension").trule().addRule(D.validateFileExtension);
        D.validateEmail={
            name:"validateEmail",
            event:"submit",
            rule:function(E){
                if(B.email(A(this).val())){
                    E.firesSuccess()
                }else{
                    return E.firesError("email",{
                        fieldname:E.showAs
                    })
                }
            }
        };

        C.filter(".validateEmail").trule().addRule(D.validateEmail);
        D.validateCompare={
            name:"validateCompare",
            event:"submit",
            rule:function(E){
                var N=A(this),L=N.trule().attrNS("operator"),G=N.trule().attrNS("target"),J,H,M;
                if(L&&G){
                    J=A(G);
                    H=J.val();
                    if(J.size()>0){
                        M=J.trule().getShowAs();
                        if(B.compare(N.val(),L,H)){
                            E.firesSuccess()
                        }else{
                            var F=A.fn.trule.globalOptions.simbolLib,I=(function(){
                                for(k in F){
                                    if(F[k]==L){
                                        return k
                                    }
                                }
                            })(),K=E.getMessage(I)||L;
                            return E.firesError("valueCompare",{
                                fieldname:E.showAs,
                                operator:K,
                                fieldnameCompare:M
                            })
                        }
                    }else{
                        return E.firesError("notExists",{
                            fieldname:G
                        })
                    }
                }
            }
        };

        C.filter(".validateCompare").trule().addRule(D.validateCompare);
        D.validateDependency={
            name:"validateDependency",
            event:"submit",
            rule:function(I){
                var J=A(this),E=false,G=J.trule().attrNS("target"),F=(typeof G==="string"?A(G):null),H=true;
                if(J.is(":radio")||J.is(":checkbox")){
                    if(J.attr("checked")){
                        E=true
                    }
                }else{
                    if(B.required(J.val())){
                        E=true
                    }
                }
                if(F!==null&&F.size()>0){
                    F.each(function(){
                        var L=A(this).trule(),M=D.validateRequired;
                        M.temporarilyRuled=true;
                        if(E){
                            if(L.getRule("validateRequired")===null){
                                L.addRule(M)
                            }
                            if(L.validate(false,"validateRequired")===false&&H!==false){
                                H=false
                            }
                        }else{
                            var K=L.getRule("validateRequired");
                            if(K&&K.temporarilyRuled===true){
                                L.delRule("validateRequired")
                            }
                        }
                    })
                }
                return H
            }
        };

        C.filter(".validateDependency").trule().addRule(D.validateDependency);
        D.validateDDD={
            name:"validateDDD",
            event:"submit",
            rule:function(G){
                var I=A(this),H=I.val().replace(/[.\/_-]/g,""),E=I.trule().attrNS("linkedTo"),F=A(E);
                if(E&&F.size()>0&&F.trule().validate()){
                    if(A.trim(F.val())!=""){
                        if(B.required(H)){
                            G.firesSuccess()
                        }else{
                            return G.firesError("required",{
                                fieldname:G.showAs
                            })
                        }
                    }else{
                        G.firesSuccess()
                    }
                    if(B.minlength(H,2)&&B.maxlength(H,2)){
                        G.firesSuccess()
                    }else{
                        return G.firesError("length",{
                            fieldname:G.showAs,
                            length:2
                        })
                    }
                    if(B.numeric(H)){
                        G.firesSuccess()
                    }else{
                        return G.firesError("numeric",{
                            fieldname:G.showAs
                        })
                    }
                }else{
                    G.firesSuccess()
                }
            },
            mask:"99"
        };

        C.filter(".validateDDD").trule().addRule(D.validateDDD);
        D.validateDateBR={
            name:"validateDataBR",
            event:"submit",
            rule:function(E){
                var P=A(this),N=P.trule().attrNS("operator"),I=P.trule().attrNS("target"),L,J,O;
                E.firesSuccess();
                if(P.val().replace(/[_\/]/g,"")!=""){
                    if(B.date(P.val(),"%d/%m/%Y")){
                        if(N&&I){
                            L=A(I);
                            J=L.val();
                            if(L.size()>0){
                                O=L.trule().getShowAs();
                                if(A.trim(J)!=""&&B.date(J,"%d/%m/%Y")){
                                    var H=new Date(B.f.dateformat(P.val(),"%d/%m/%Y",true)).valueOf(),F=new Date(B.f.dateformat(J,"%d/%m/%Y",true)).valueOf();
                                    if(B.compare(H,N,F)){
                                        E.firesSuccess()
                                    }else{
                                        var G=A.fn.trule.globalOptions.simbolLib,K=(function(){
                                            for(k in G){
                                                if(G[k]==N){
                                                    return k
                                                }
                                            }
                                        })(),M=E.getMessage(K)||N;
                                        return E.firesError("dateCompare",{
                                            fieldname:E.showAs,
                                            operator:M,
                                            fieldnameCompare:O
                                        })
                                    }
                                }
                            }else{
                                return E.firesError("notExists",{
                                    fieldname:I
                                })
                            }
                        }
                    }else{
                        return E.firesError("date",{
                            fieldname:E.showAs,
                            format:"dd/mm/aaaa"
                        })
                    }
                }
            },
            mask:"99/99/9999"
        };

        C.filter(".validateDateBR").trule().addRule(D.validateDateBR);
        D.validateCPF={
            name:"validateCPF",
            event:"submit",
            rule:function(E){
                var F=A(this).val().replace(/[.\/_-]/g,"");
                if(B.numeric(F)){
                    E.firesSuccess();
                    if(F!=""&&!B.cpf(F)){
                        return E.firesError("cpf",{
                            fieldname:E.showAs
                        })
                    }
                }else{
                    return E.firesError("numeric",{
                        fieldname:E.showAs
                    })
                }
            },
            mask:"999.999.999-99"
        };

        C.filter(".validateCPF").trule().addRule(D.validateCPF);
        D.validateCNPJ={
            name:"validateCNPJ",
            event:"submit",
            rule:function(E){
                var F=A(this).val().replace(/[.\/_-]/g,"");
                if(B.numeric(F)){
                    E.firesSuccess();
                    if(F!=""&&!B.cnpj(F)){
                        return E.firesError("cnpj",{
                            fieldname:E.showAs
                        })
                    }
                }else{
                    return E.firesError("numeric",{
                        fieldname:E.showAs
                    })
                }
            },
            mask:"999.999.999/9999-99"
        };

        C.filter(".validateCNPJ").trule().addRule(D.validateCNPJ);
        D.validateCEP={
            name:"validateCEP",
            event:"submit",
            rule:function(E){
                var F=A(this).val().replace(/[\._-]/g,"");
                E.firesSuccess();
                if(B.numeric(F)){
                    if(F!=""){
                        if(!B.minlength(F,8)||!B.maxlength(F,8)){
                            return E.firesError("length",{
                                fieldname:E.showAs,
                                length:8
                            })
                        }
                    }
                }else{
                    return E.firesError("numeric",{
                        fieldname:E.showAs
                    })
                }
            },
            mask:"99.999-999"
        };

        C.filter(".validateCEP").trule().addRule(D.validateCEP);

        D.validateLogin={
            name:"validateLogin",
            event:"submit",
            rule:function(E){
                var valido = A(this).val()==""||/^[A-Za-z0-9]+(([\.\-\_]+[A-Za-z0-9]+)+)?.[A-Za-z0-9]+(([\.\-\_]+[A-Za-z0-9]+)+)/.test(A(this).val().toString());
                if(valido){
                    E.firesSuccess()
                }else{
                    return E.firesError("login",{
                        fieldname:E.showAs
                    })
                }
            }
        };

        C.filter(".validateLogin").trule().addRule(D.validateLogin);
    })
})(jQuery);
function addTruleClass(scope,name){
    scope=(scope.each?scope:jQuery(scope));
    var formControls=scope.find("input:not(:submit, :reset, :button, :image), select, textarea"),ruleObject=eval("jQuery.fn.trule.validators.rules."+name);
    formControls.filter("."+name).trule().addRule(ruleObject)
};