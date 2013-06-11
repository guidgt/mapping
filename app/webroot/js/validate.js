$(document).bind("ready", function() {
	
	var
		validationMessages = [],
		$list = $("#msgerro > ul");
	
	$(document).trule({
		messages: window.messages,
		firstErro: function(r) {
                        try{
                            var classes = r.oRef.className.split(" ");
                            for(var x=0;x<classes.length;x++){
                                if(classes[x] == 'tab1'){
                                    $('#tabpanel').tabs('option', 'selected', 0);
                                }
                                else if(classes[x] == 'tab2'){
                                    $('#tabpanel').tabs('option', 'selected', 1);
                                }
                                else if(classes[x] == 'tab3'){
                                    $('#tabpanel').tabs('option', 'selected', 2);
                                }
                            }
                        }
                        catch (e){

                        }

			try {
				r.oRef.focus();
			} catch (ex) {
			}

                        
		},
		error: function(r, msg) {
			validationMessages.push(msg+'.');
		},
		lastErro: function(r) {
			//habilita o elemento que mostra os erros
			$("#msgerro").show();
			// Junta as mensagens e faz a saída
			$list.empty().html("<li>".concat(validationMessages.join("</li><li>"), "</li>"));
			//$('.boxError').show();
			// Reseta mensagens
			validationMessages = [];

                        //Volta ao topo da página
                        $('html, body').animate({scrollTop: 0});
		}
	});

        $("form").bind("submit", function(e) {
            if ($(this).trule().validateAll() === false) {
                e.preventDefault();
            } else {
                var validaManual = false;
                $("#msgerro > ul").each(function(){
                    if($(this).attr('id')=='')
                        $(this).remove();
                    else
                        validaManual = true;
                });
                if(validaManual == false){
//                    $('#msgerro').remove();
                    $("#msgerro > ul[id!='']").remove();
                }

                $("select[class='validateRequired'] option[value='']").attr("value", '0');
            }
        });
		$("select option[value='0']").attr("value", '');
		
		
		
		//tratar data com apenas dia e mes
		var validateDataDM = {
            name: "validateDataDM",
            event: "submit",
            rule: function(r) {
                var
                    $this = $(this),
                    splittedEntry = $this.val().match(/^(\d{2})\/(\d{2})$/),
                    day, month;
                if (splittedEntry !== null) {
                    day = parseInt(splittedEntry[1], 10);
                    month = parseInt(splittedEntry[2], 10);

                    if (month >= 1 && month <= 12) {
                        if (day >= 1) {
                            switch (month) {
                                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                                    if (day <= 31) {
                                        return r.firesSuccess();
                                    }
                                    break;

                                case 4: case 6: case 9: case 11:
                                    if (day <= 30) {
                                        return r.firesSuccess();
                                    }
                                    break;

                                case 2:
                                    if (day <= 29) {
                                        return r.firesSuccess();
                                    }
                                    break;
                            }
                        }
                    }
					return r.firesError("dataDMInvalid", {fieldname: r.showAs});
                }

                //return r.firesError("dataDMInvalid", {fieldname: r.showAs});
            },
            messages: {
                "pt-br": {
                    dataDMInvalid: "{fieldname} não está com um formato válido DD/MM"
                }
            },
            mask: "99/99"
        };
        $(".validateDataDM").trule().addRule(validateDataDM);
        
        
        /*
        //tratar data com apenas dia e mes
		var validateNames = {
            name: "validateNames",
            event: "submit",
            rule: function(r) {
			
                var
                    $this = $(this),
                    splittedEntry = $this.val().match(/^(\w+)\s(\w+)$/),
                    day, month;
                
                if ($(this).validate("validateDataDM1")) {
                    return r.firesSuccess();
                }
                if ($(this).validate("validateDataDM2")) {
                    return r.firesSuccess();
                }
                
				return r.firesError("validateNames", {fieldname: r.showAs});
            },
            messages: {
                "pt-br": {
            		validateNames: "{fieldname} tem que ter dois nomes"
                }
            }
        };
		
		$(".validateNames").trule().addRule(validateNames);
		
		// Exemplo de aplicação pós-ajax
		var rls = $.fn.trule.validators.rules;
		$.get("uashiusahas", function() {
			$("#novoForm .validateRequired").trule().addRule(rls.validateRequired);
		});
		*/
	
});
